import React, { useState } from 'react';
import { MainTabScreen } from '../../../components/organisms/main-tab-screen';
import { Icon } from '@/components/ui/icon';
import { View, FlatList } from 'react-native';
import { useMenu } from '../hooks/useMenu';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import { Q } from '@nozbe/watermelondb';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { DailyBalance } from './DailyBalance';
import { MealCard } from './MealCard';
import { MealService } from '../services/meal-service';
import { ReorderMealsModal } from './ReorderMealsModal';

import { DateSelector } from '../../../components/molecules/DateSelector';
import { Apple, ArrowUpDown, CalendarDays } from 'lucide-react-native';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Skeleton } from '@/components/ui/skeleton';

interface MenuScreenProps {
  meals: Meal[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

function MenuScreenComponent({ meals, selectedDate, onSelectDate }: MenuScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const [reorderModalVisible, setReorderModalVisible] = useState(false);
  const { dailyMacros, deleteMeal, isReady } = useMenu(meals, selectedDate);

  const handleDelete = async () => {
    if (selectedMealId) {
      await deleteMeal(selectedMealId);
      setDeleteModalVisible(false);
      setSelectedMealId(null);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedMealId(id);
    setDeleteModalVisible(true);
  };

  const handleAddMeal = async () => {
    const nextNumber = meals.length + 1;
    await MealService.createWithItems({ name: `Refeição ${nextNumber}`, quantity: 1, preparationState: '' }, [], selectedDate);
  };

  React.useEffect(() => {
    const ensureDefaultMeal = async () => {
      if (meals.length === 0) {
        // Automatically create a default meal so there's always at least 1
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
    <MainTabScreen
      title="Minha dieta"
      scrollable={false}
      headerLeft={
        meals.length > 1 ? (
          <Button
            accessibilityLabel="Reordenar refeições"
            variant="ghost"
            size="icon"
            className="-ml-2"
            onPress={() => setReorderModalVisible(true)}
          >
            <Icon as={ArrowUpDown} size={24} />
          </Button>
        ) : undefined
      }
      headerRight={
        <View className="-mr-2 flex-row items-center gap-2">
          <Button accessibilityLabel="Ver calendário" variant="ghost" size="icon" onPress={() => router.push('/diet/calendar-summary')}>
            <Icon as={CalendarDays} size={24} />
          </Button>
          <Button accessibilityLabel="Abrir banco de alimentos" variant="ghost" size="icon" onPress={() => router.push('/diet/food-bank')}>
            <Icon as={Apple} size={24} />
          </Button>
        </View>
      }
    >
      <View className="flex-1">
        <DateSelector selectedDate={selectedDate} onSelectDate={onSelectDate} />
        
        <View className="flex-1 relative">
          <View style={{ opacity: showSkeleton ? 0 : 1, flex: 1 }} pointerEvents={showSkeleton ? "none" : "auto"}>
            <DailyBalance 
              protein={dailyMacros.protein}
              carbs={dailyMacros.carbs}
              fat={dailyMacros.fat}
              calories={dailyMacros.calories}
            />

            <FlatList keyboardShouldPersistTaps="handled"
              data={meals}
              keyExtractor={(item) => item.id}
              contentContainerClassName="pb-content-bottom pt-4"
              renderItem={({ item }) => (
                <MealCard meal={item} onDelete={() => confirmDelete(item.id)} />
              )}
              ListFooterComponent={
                <View className="mt-4">
                  <Button variant="outline" onPress={handleAddMeal}><Text>Adicionar refeição</Text></Button>
                </View>
              }
            />
          </View>

          {showSkeleton && (
            <View className="absolute inset-0 bg-background z-10 pt-2">
              <Skeleton className="h-16 w-full mb-4" />
              <View className="gap-6 pt-2">
                <View>
                  <Skeleton className="h-14 w-full mb-1 rounded-t-2xl" />
                  <Skeleton className="h-[3px] w-full mb-4" />
                  <Skeleton className="h-12 w-full rounded-md mb-3 mx-4" style={{ width: 'auto' }} />
                  <Skeleton className="h-10 w-32 rounded-md mx-4" />
                </View>
                <View>
                  <Skeleton className="h-14 w-full mb-1 rounded-t-2xl" />
                  <Skeleton className="h-[3px] w-full mb-4" />
                  <Skeleton className="h-12 w-full rounded-md mb-3 mx-4" style={{ width: 'auto' }} />
                  <Skeleton className="h-10 w-32 rounded-md mx-4" />
                </View>
              </View>
            </View>
          )}
        </View>

        <ConfirmModal 
          visible={deleteModalVisible}
          title="Remover refeição?"
          description="Esta ação removerá a refeição do seu menu diário."
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalVisible(false)}
          isDestructive
        />

        <ReorderMealsModal 
          visible={reorderModalVisible}
          meals={meals}
          onClose={() => setReorderModalVisible(false)}
        />
      </View>
    </MainTabScreen>
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
