import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import MealItem from '../../../db/models/MealItem';
import { MealService } from '../services/meal-service';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface EditMealItemScreenProps {
  food: Food;
  mealItem: MealItem;
}

function EditMealItemScreenComponent({ food, mealItem }: EditMealItemScreenProps) {
  const router = useRouter();
  const [quantityStr, setQuantityStr] = useState(mealItem.quantity.toString());

  const quantity = parseFloat(quantityStr) || 0;
  const ratio = quantity / (food.preparationWeight || 100);

  const calculatedMacros = {
    protein: food.protein * ratio,
    carbs: food.carbohydrates * ratio,
    fat: food.fat * ratio,
    calories: food.calories * ratio,
  };

  const handleUpdate = async () => {
    if (quantity > 0) {
      await MealService.updateItemInMeal(mealItem.id, quantity);
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-surface-app px-screen-x pt-6 gap-6">
      <Card>
        <Text variant="title">{food.name}</Text>
        
        <View className="flex-row items-center justify-between border-b border-soft pb-4">
          <Text variant="text" color="muted">Quantidade (g)</Text>
          <Input
            className="w-24 text-right font-semibold"
            keyboardType="numeric"
            value={quantityStr}
            onChangeText={setQuantityStr}
            placeholder="0"
          />
        </View>

        <View className="gap-2">
          <Text variant="subtitle" className="mb-1">Valores nutricionais</Text>
          <View className="flex-row justify-between">
            <Text variant="text" color="muted">Proteínas</Text>
            <Text variant="text" className="font-semibold text-text-main">{Math.round(calculatedMacros.protein)}g</Text>
          </View>
          <View className="flex-row justify-between">
            <Text variant="text" color="muted">Carboidratos</Text>
            <Text variant="text" className="font-semibold text-text-main">{Math.round(calculatedMacros.carbs)}g</Text>
          </View>
          <View className="flex-row justify-between">
            <Text variant="text" color="muted">Gorduras</Text>
            <Text variant="text" className="font-semibold text-text-main">{Math.round(calculatedMacros.fat)}g</Text>
          </View>
          <View className="flex-row justify-between pt-2 mt-2 border-t border-soft">
            <Text variant="text" className="font-bold text-text-main">Calorias</Text>
            <Text variant="text" className="font-bold text-accent-main">{Math.round(calculatedMacros.calories)} kcal</Text>
          </View>
        </View>
      </Card>

      <Button onPress={handleUpdate} disabled={quantity <= 0}><Text>Salvar alterações</Text></Button>
    </View>
  );
}

const enhance = withObservables(['foodId', 'mealItemId'], ({ foodId, mealItemId }: { foodId: string; mealItemId: string }) => ({
  food: database.get<Food>('foods').findAndObserve(foodId),
  mealItem: database.get<MealItem>('meal_items').findAndObserve(mealItemId)
}));

export const EditMealItemScreen = enhance(EditMealItemScreenComponent);
