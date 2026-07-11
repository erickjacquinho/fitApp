import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Q } from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import React, { useState } from 'react';
import { Platform, UIManager, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import { useMenu } from '../hooks/useMenu';
import { MealService } from '../services/meal-service';
import { DailyBalance } from './DailyBalance';
import { EditMealModal } from './EditMealModal';
import { MealCard } from './MealCard';
import { MenuScreenSkeleton } from './MenuScreenSkeleton';
import { MenuReorderFooter } from './MenuReorderFooter';

interface MenuScreenProps {
  meals: Meal[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  menuRef?: React.MutableRefObject<{ startReorder: () => void } | null>;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function MenuScreenComponent({ meals, selectedDate, onSelectDate, menuRef }: MenuScreenProps) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const [isReordering, setIsReordering] = useState(false);
  const [tempMeals, setTempMeals] = useState<Meal[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const { dailyMacros, deleteMeal, isReady } = useMenu(meals, selectedDate);

  const startReorder = React.useCallback(() => {
    setTempMeals([...meals]);
    setIsReordering(true);
  }, [meals]);

  React.useEffect(() => {
    if (menuRef) {
      menuRef.current = { startReorder };
    }
  }, [menuRef, startReorder]);

  const confirmReorder = async () => {
    setIsSaving(true);
    try {
      const orderedIds = tempMeals.map(m => m.id);
      await MealService.updateMealOrder(orderedIds);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  const cancelReorder = () => {
    setIsReordering(false);
  };

  React.useEffect(() => {
    if (isReordering) {
      cancelReorder();
    }
  }, [selectedDate, isReordering]);

  React.useEffect(() => {
    if (isSaving) {
      const mealsIds = meals.map(m => m.id);
      const tempIds = tempMeals.map(m => m.id);
      const isSync = mealsIds.length === tempIds.length && mealsIds.every((id, idx) => id === tempIds[idx]);
      
      if (isSync) {
        setIsReordering(false);
        setIsSaving(false);
      }
    }
  }, [meals, isSaving, tempMeals]);

  const handleDelete = async () => {
    if (selectedMealId) {
      await deleteMeal(selectedMealId);
      setDeleteModalVisible(false);
      setSelectedMealId(null);
    }
  };

  const confirmDelete = React.useCallback((id: string) => {
    setSelectedMealId(id);
    setDeleteModalVisible(true);
  }, []);

  const handleAddMeal = async () => {
    const nextNumber = meals.length + 1;
    await MealService.createWithItems({ name: `Refeição ${nextNumber}`, quantity: 1, preparationState: '' }, [], selectedDate);
  };

  const renderItem = React.useCallback(({ item, drag }: { item: Meal; drag: () => void }) => {
    return (
      <ScaleDecorator>
        <View key={item.id} className="pb-6">
          <MealCard 
            meal={item} 
            isReordering={isReordering}
            drag={drag}
            onDelete={confirmDelete} 
            onEdit={setEditingMeal}
          />
        </View>
      </ScaleDecorator>
    );
  }, [isReordering, confirmDelete, setEditingMeal]);

  React.useEffect(() => {
    const ensureDefaultMeal = async () => {
      if (meals.length === 0) {
        await MealService.createWithItems({ name: 'Refeição 1', quantity: 1, preparationState: '' }, [], selectedDate);
      }
    };

    const migrateOldMeals = async () => {
      const oldMeals = await database.get<Meal>('meals').query(Q.where('target_date', null)).fetch();
      if (oldMeals.length > 0) {
        await database.write(async () => {
          const updates = oldMeals.map(m => m.prepareUpdate(meal => {
            meal.targetDate = selectedDate;
          }));
          await database.batch(...updates);
        });
      }
    };

    migrateOldMeals().then(() => ensureDefaultMeal());
  }, [meals.length, selectedDate]);

  const showSkeleton = !isReady || meals.length === 0;

  return (
    <>
      <View className="flex-1 pt-4 flex-col">
        <GestureHandlerRootView className="flex-1 relative">
          <DraggableFlatList
            key={isReordering ? 'meal-reorder-list' : 'meal-normal-list'}
            data={isReordering ? tempMeals : meals}
            extraData={isReordering}
            onDragEnd={({ data }) => {
              if (isReordering) setTempMeals(data);
            }}
            keyExtractor={(item) => item.id}
            contentContainerClassName="pb-content-bottom pt-4 px-screen-x"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            activationDistance={isReordering ? 8 : 1000}
            ListHeaderComponent={
              <View>
                <DailyBalance 
                  protein={dailyMacros.protein}
                  carbs={dailyMacros.carbs}
                  fat={dailyMacros.fat}
                  calories={dailyMacros.calories}
                />
              </View>
            }
            renderItem={renderItem}
            ListFooterComponent={
              !isReordering ? (
                <View className="mt-4">
                  <Button variant="outline" onPress={handleAddMeal}>
                    <Text>Adicionar refeição</Text>
                  </Button>
                </View>
              ) : null
            }
          />
        </GestureHandlerRootView>

        {isReordering && (
          <MenuReorderFooter onCancel={cancelReorder} onConfirm={confirmReorder} />
        )}
      </View>

      {showSkeleton && <MenuScreenSkeleton />}

      <EditMealModal
        visible={!!editingMeal}
        onClose={() => setEditingMeal(null)}
        meal={editingMeal}
        onSave={async (mealId, name, time) => {
          try {
            await MealService.updateBasicInfo(mealId, name, time);
            setEditingMeal(null);
          } catch (err) {
            console.error('Failed to update meal info:', err);
          }
        }}
      />

      <ConfirmModal 
        visible={deleteModalVisible}
        title="Remover refeição?"
        description="Esta ação removerá a refeição do seu menu diário."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        isDestructive
      />
    </>
  );
}

const enhance = withObservables(['selectedDate'], ({ selectedDate }: { selectedDate: string }) => ({
  meals: database.get<Meal>('meals').query(
    Q.where('target_date', selectedDate),
    Q.sortBy('order_index', Q.asc),
    Q.sortBy('created_at', Q.asc)
  )
}));

export const MenuScreen = enhance(MenuScreenComponent);
