import React, { useState } from 'react';
import { View } from 'react-native';
import { NutritionalInfoDisplay } from '../../../components/molecules/NutritionalInfoDisplay';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import { MealService } from '../services/meal-service';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddFoodToMealScreenProps {
  food: Food;
  mealId: string;
}

function AddFoodToMealScreenComponent({ food, mealId }: AddFoodToMealScreenProps) {
  const router = useRouter();
  const [quantityStr, setQuantityStr] = useState('100');

  const quantity = parseFloat(quantityStr) || 0;
  const ratio = quantity / (food.preparationWeight || 100);

  const calculatedMacros = {
    protein: food.protein * ratio,
    carbs: food.carbohydrates * ratio,
    fat: food.fat * ratio,
    calories: food.calories * ratio,
  };

  const handleAdd = async () => {
    if (quantity > 0) {
      await MealService.addItemToMeal(mealId, food.id, quantity);
      router.navigate('/(tabs)/diet');
    }
  };

  return (
    <View className="gap-6 pt-6 pb-content-bottom">
      <Card>
        <Text variant="title">{food.name}</Text>
        
        <View className="flex-row items-center justify-between border-b border-border-subtle pb-4">
          <Text variant="text" className="text-text-secondary">Quantidade (g)</Text>
          <Input
            className="w-24 text-right font-semibold"
            keyboardType="numeric"
            value={quantityStr}
            onChangeText={setQuantityStr}
            placeholder="0"
          />
        </View>

        <NutritionalInfoDisplay macros={calculatedMacros} />
      </Card>

      <Button onPress={handleAdd} disabled={quantity <= 0}><Text>Adicionar à refeição</Text></Button>
    </View>
  );
}

const enhance = withObservables(['foodId'], ({ foodId }: { foodId: string; mealId: string }) => ({
  food: database.get<Food>('foods').findAndObserve(foodId)
}));

export const AddFoodToMealScreen = enhance(AddFoodToMealScreenComponent);
