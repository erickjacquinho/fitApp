import React, { useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { SwipeableCard } from '../../../components/molecules/SwipeableCard';
import { MealService } from '../services/meal-service';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import { Q } from '@nozbe/watermelondb';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { PreviewMacros } from './PreviewMacros';

interface MenuScreenProps {
  meals: Meal[];
}

function MenuScreenComponent({ meals }: MenuScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [dailyTotalKcal, setDailyTotalKcal] = useState(0);

  React.useEffect(() => {
    const calcDailyTotal = async () => {
      let total = 0;
      for (const meal of meals) {
        const items = await meal.items.fetch();
        for (const item of items) {
          const food = await item.food.fetch();
          if (food) {
            total += food.calories * (item.quantity / 100);
          }
        }
      }
      setDailyTotalKcal(total);
    };
    calcDailyTotal();
  }, [meals]);

  const handleDelete = async () => {
    if (selectedMealId) {
      await MealService.delete(selectedMealId);
      setDeleteModalVisible(false);
      setSelectedMealId(null);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedMealId(id);
    setDeleteModalVisible(true);
  };

  return (
    <View className="flex-1 bg-surface-app">
      <View className="px-screen-x py-compact border-b border-soft bg-surface-raised gap-2">
        <Typography variant="caption" color="muted" className="uppercase font-bold">Today's Balance</Typography>
        <View className="flex-row items-baseline gap-2">
          <Typography variant="display" className="text-primary-main">{Math.round(dailyTotalKcal)}</Typography>
          <Typography color="muted">/ 2200 kcal</Typography>
        </View>
      </View>

      <View className="px-screen-x py-compact flex-row gap-3">
        <View className="flex-1">
          <Button title="+ New Meal" onPress={() => router.push('/diet/create-meal')} />
        </View>
        <View className="flex-1">
          <Button title="Food Bank" variant="secondary" onPress={() => router.push('/diet/food-bank')} />
        </View>
      </View>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-screen-x pb-20"
        renderItem={({ item }) => (
          <MealCard meal={item} onDelete={() => confirmDelete(item.id)} />
        )}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Typography color="muted">No meals registered for today</Typography>
          </View>
        }
      />

      <ConfirmModal 
        visible={deleteModalVisible}
        title="Remove Meal?"
        description="This action will remove the meal from your daily menu."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        isDestructive
      />
    </View>
  );
}

// Sub-component for Meal Card to handle its own item observation
const enhanceMeal = withObservables(['meal'], ({ meal }: { meal: Meal }) => ({
  meal,
  items: meal.items.observeWithColumns(['quantity']),
}));

const MealCard = enhanceMeal(({ meal, items, onDelete }: { meal: Meal; items: any[]; onDelete: () => void }) => {
  // Map items to the format PreviewMacros expects
  const formattedItems = items.map(item => ({
    food: item.food.fetch(), // This is still a bit tricky in withObservables
    // Actually, withObservables should ideally observe the food too
    quantity: item.quantity
  }));

  // Better approach for withObservables:
  return <MealCardContent meal={meal} items={items} onDelete={onDelete} />;
});

// Since I can't easily chain observations here without more complexity, 
// I'll simplify or use a more robust pattern.
// For now, I'll implement a simpler version that fetches on render for the demo, 
// but the goal is reactivity.

function MealCardContent({ meal, items, onDelete }: { meal: Meal; items: any[]; onDelete: () => void }) {
  const [foodItems, setFoodItems] = useState<any[]>([]);

  React.useEffect(() => {
    const loadFoods = async () => {
      const data = await Promise.all(items.map(async (item) => ({
        food: await item.food.fetch(),
        quantity: item.quantity
      })));
      setFoodItems(data);
    };
    loadFoods();
  }, [items]);

  return (
    <SwipeableCard className="mb-4 gap-3" onDelete={onDelete}>
      <View className="flex-row justify-between items-center">
        <Typography variant="subtitle">{meal.name}</Typography>
        <Typography variant="caption" color="muted">{meal.preparationState}</Typography>
      </View>
      
      {foodItems.length > 0 && <PreviewMacros items={foodItems} />}
    </SwipeableCard>
  );
}

const enhance = withObservables([], () => ({
  meals: database.get<Meal>('meals').query(Q.sortBy('created_at', Q.desc))
}));

export const MenuScreen = enhance(MenuScreenComponent);
