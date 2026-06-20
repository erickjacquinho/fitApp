import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import Food from '../../../db/models/Food';
import { FoodEntryCard } from './FoodEntryCard';
import { MealMacrosSummary } from './MealMacrosSummary';
import { aggregateMacros } from '../utils/macro-utils';
import { MealService } from '../services/meal-service';
import { Trash2 } from 'lucide-react-native';

function MealCardContent({ meal, items, onDelete }: { meal: Meal; items: MealItem[]; onDelete: () => void }) {
  const router = useRouter();
  const [foodItems, setFoodItems] = useState<{ id: string; foodId: string; food: Food; quantity: number }[]>([]);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0, calories: 0 });

  React.useEffect(() => {
    const loadFoods = async () => {
      const data = await Promise.all(items.map(async (item) => ({
        id: item.id,
        foodId: item.food.id,
        food: await item.food.fetch(),
        quantity: item.quantity
      })));
      const validData = data.filter((d): d is { id: string; foodId: string; food: Food; quantity: number } => d.food !== null);
      setFoodItems(validData);
      setMacros(aggregateMacros(validData));
    };
    loadFoods();
  }, [items]);

  const handleDeleteItem = async (mealItemId: string) => {
    await MealService.removeItemFromMeal(mealItemId);
  };

  const handleEditItem = (mealItemId: string, foodId: string) => {
    router.push({ pathname: '/diet/edit-meal-item', params: { mealItemId, foodId } });
  };

  return (
    <View className="mb-6 bg-surface-raised border border-soft rounded-2xl overflow-hidden shadow-sm">
      <View className="px-4 py-3 bg-surface-app border-b border-soft flex-row justify-between items-center">
        <View>
          <Typography variant="subtitle">{meal.name}</Typography>
          {meal.preparationState ? <Typography variant="caption" color="muted">{meal.preparationState}</Typography> : null}
        </View>
        <Pressable onPress={onDelete} className="p-2">
          <Trash2 size={20} color="#EF4444" />
        </Pressable>
      </View>
      
      <View className="p-4 gap-3">
        {foodItems.map((item, index) => (
          <FoodEntryCard 
            key={index} 
            food={item.food} 
            quantity={item.quantity} 
            onDelete={() => handleDeleteItem(item.id)}
            onEdit={() => handleEditItem(item.id, item.foodId)}
          />
        ))}
        
        <Button 
          title="+ Adicionar Alimento" 
          variant="secondary" 
          onPress={() => router.push({ pathname: '/diet/food-bank', params: { mealId: meal.id } })} 
        />
        
        {foodItems.length > 0 && <MealMacrosSummary macros={macros} />}
      </View>
    </View>
  );
}

const enhanceMeal = withObservables(['meal'], ({ meal }: { meal: Meal }) => ({
  meal,
  items: meal.items.observeWithColumns(['quantity']),
}));

export const MealCard = enhanceMeal(({ meal, items, onDelete }: { meal: Meal; items: MealItem[]; onDelete: () => void }) => {
  return <MealCardContent meal={meal} items={items} onDelete={onDelete} />;
});
