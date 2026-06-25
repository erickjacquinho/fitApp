import React, { useState } from 'react';
import { View, UIManager, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, Easing } from 'react-native-reanimated';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import { Apple, ArrowUpDown, CalendarDays } from 'lucide-react-native';

import { MainTabScreen } from '../../../components/organisms/main-tab-screen';
import { Icon } from '@/components/ui/icon';
import { useMenu } from '../hooks/useMenu';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { DailyBalance } from './DailyBalance';
import { MealCard } from './MealCard';
import { MealService } from '../services/meal-service';
import { DateSelector } from '../../../components/molecules/DateSelector';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Skeleton } from '@/components/ui/skeleton';
import { LongPressable } from '@/components/ui/long-pressable';

const FOOTER_ENTER = FadeIn.duration(200).easing(Easing.ease);
const FOOTER_EXIT = FadeOut.duration(200).easing(Easing.ease);

interface MenuScreenProps {
  meals: Meal[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function MenuScreenComponent({ meals, selectedDate, onSelectDate }: MenuScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const [isReordering, setIsReordering] = useState(false);
  const [tempMeals, setTempMeals] = useState<Meal[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const { dailyMacros, deleteMeal, isReady } = useMenu(meals, selectedDate);

  const startReorder = React.useCallback(() => {
    setTempMeals([...meals]);
    setIsReordering(true);
  }, [meals]);

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
  }, [selectedDate]);

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
          />
        </View>
      </ScaleDecorator>
    );
  }, [isReordering, confirmDelete]);

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
      customTitle={
        <LongPressable onLongPress={startReorder}>
          <DateSelector selectedDate={selectedDate} onSelectDate={onSelectDate} />
        </LongPressable>
      }
      isFlatList={false}
      scrollable={false}
      disablePadding={true}
      headerLeft={
        <Button accessibilityLabel="Reordenar refeições" variant="ghost" size="icon" onPress={startReorder}>
          <Icon as={ArrowUpDown} size={24} />
        </Button>
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
      <View className="flex-1 bg-background pt-4 flex-col">
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
            activationDistance={isReordering ? 8 : 1000} // Disable drag accidentally when not reordering
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
          <Animated.View 
            entering={FOOTER_ENTER}
            exiting={FOOTER_EXIT}
            className="flex-row items-center justify-between px-screen-x py-4"
          >
            <Button variant="outline" className="flex-1 mr-2" onPress={cancelReorder}>
              <Text>Cancelar</Text>
            </Button>
            <Button className="flex-1 ml-2" onPress={confirmReorder}>
              <Text>Confirmar</Text>
            </Button>
          </Animated.View>
        )}
      </View>

      {showSkeleton && (
        <View className="absolute inset-0 bg-background z-10 pt-4 px-screen-x">
          <View className="mb-6 overflow-hidden border border-border-subtle rounded-lg bg-surface flex-row items-center justify-between py-4 px-card">
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-1 items-center">
                <Skeleton className="size-24 rounded-full" />
              </View>
              <View className="flex-1 items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
              </View>
              <View className="flex-1 items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
              </View>
              <View className="flex-1 items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
              </View>
            </View>
          </View>
          
          <View className="gap-0">
            {[1, 2, 3].map((i) => (
              <View key={i} className="mb-6 overflow-hidden border border-border-subtle rounded-lg bg-surface flex-col">
                <View className="px-4 h-control-md bg-surface flex-row justify-between items-center">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-12" />
                </View>
                <View className="h-1 w-full flex-row overflow-hidden bg-border-subtle">
                  <Skeleton className="h-1 w-full" />
                </View>
                <View className="flex-col">
                  <View className="gap-0">
                    <Skeleton className="h-food-card w-full rounded-none border-b border-border-subtle" />
                    <Skeleton className="h-food-card w-full rounded-none border-b border-border-subtle" />
                  </View>
                  <View className="px-4 h-control-md flex-row justify-between items-center bg-surface border-b border-border-subtle">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </View>
                  <View className="h-control-md flex-row items-center justify-center w-full">
                    <Skeleton className="h-4 w-40" />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

        <ConfirmModal 
          visible={deleteModalVisible}
          title="Remover refeição?"
          description="Esta ação removerá a refeição do seu menu diário."
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalVisible(false)}
          isDestructive
        />
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
