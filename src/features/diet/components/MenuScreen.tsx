import React, { useState } from 'react';
import { MainTabScreen } from '../../../components/organisms/main-tab-screen';
import { Pressable } from 'react-native';
import { Icon } from '../../../components/atoms/Icon';
import { COLORS } from '../../../components/atoms/colors';
import { View, FlatList } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
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

import { CalendarStrip } from '../../../components/molecules/CalendarStrip';

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
  const { dailyMacros, deleteMeal } = useMenu(meals);

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
    ensureDefaultMeal();
  }, [meals.length, selectedDate]);

  return (
    <MainTabScreen
      title="Minha Dieta"
      scrollable={false}
      headerLeft={
        meals.length > 1 ? (
          <Pressable onPress={() => setReorderModalVisible(true)} className="p-2 -ml-2">
            <Icon name="ArrowUpDown" size={24} color={COLORS.textMain} />
          </Pressable>
        ) : undefined
      }
      headerRight={
        <Pressable onPress={() => router.push('/diet/food-bank')} className="p-2 -mr-2">
          <Icon name="Apple" size={24} color={COLORS.textMain} />
        </Pressable>
      }
    >
      <View className="flex-1">
        <CalendarStrip selectedDate={selectedDate} onSelectDate={onSelectDate} />
        <DailyBalance 
          protein={dailyMacros.protein}
          carbs={dailyMacros.carbs}
          fat={dailyMacros.fat}
          calories={dailyMacros.calories}
        />

        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-screen-x pb-20 pt-4"
          renderItem={({ item }) => (
            <MealCard meal={item} onDelete={() => confirmDelete(item.id)} />
          )}
        ListFooterComponent={
          <View className="mt-4">
            <Button 
              title="+ Adicionar Refeição" 
              variant="outline" 
              onPress={handleAddMeal} 
            />
          </View>
        }
      />

      <ConfirmModal 
        visible={deleteModalVisible}
        title="Remover Refeição?"
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
    Q.or(
      Q.where('target_date', selectedDate),
      Q.where('target_date', null)
    ),
    Q.sortBy('order_index', Q.asc),
    Q.sortBy('created_at', Q.asc) // Fallback for old records
  )
}));

export const MenuScreen = enhance(MenuScreenComponent);
