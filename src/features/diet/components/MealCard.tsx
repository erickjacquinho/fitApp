import React, { useState } from 'react';
import { View } from 'react-native';
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
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Icon } from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

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
    <Card className="mb-6 overflow-hidden p-0">
      <View className="px-4 py-3 bg-surface-app border-b border-soft flex-row justify-between items-center">
        <View>
          <Text variant="subtitle">{meal.name}</Text>
          {meal.preparationState ? <Text variant="caption" color="muted">{meal.preparationState}</Text> : null}
        </View>
        <Button accessibilityLabel={`Excluir ${meal.name}`} variant="ghost" size="icon" onPress={onDelete}>
          <Icon as={Trash2} className="text-tomato-main" />
        </Button>
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
        
        <Button variant="secondary" onPress={() => router.push({ pathname: '/diet/food-bank', params: { mealId: meal.id } })}><Text>Adicionar alimento</Text></Button>
        
        {foodItems.length > 0 && <MealMacrosSummary macros={macros} />}
      </View>
    </Card>
  );
}

const enhanceMeal = withObservables(['meal'], ({ meal }: { meal: Meal }) => ({
  meal,
  items: meal.items.observeWithColumns(['quantity']),
}));

export const MealCard = enhanceMeal(({ meal, items, onDelete }: { meal: Meal; items: MealItem[]; onDelete: () => void }) => {
  return <MealCardContent meal={meal} items={items} onDelete={onDelete} />;
});
