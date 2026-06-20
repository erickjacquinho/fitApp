import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import MealItem from '../../../db/models/MealItem';
import { MealService } from '../services/meal-service';

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
      <View className="bg-surface-raised border border-soft rounded-2xl p-4 gap-4 shadow-sm">
        <Typography variant="title">{food.name}</Typography>
        
        <View className="flex-row items-center justify-between border-b border-soft pb-4">
          <Typography variant="text" color="muted">Quantidade (g)</Typography>
          <TextInput
            className="font-semibold text-text-primary text-right w-24 bg-surface-app border border-soft rounded-lg px-3 py-2"
            keyboardType="numeric"
            value={quantityStr}
            onChangeText={setQuantityStr}
            placeholder="0"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View className="gap-2">
          <Typography variant="subtitle" className="mb-1">Valores Nutricionais</Typography>
          <View className="flex-row justify-between">
            <Typography variant="text" color="muted">Proteínas</Typography>
            <Typography variant="text" className="font-semibold text-text-primary">{Math.round(calculatedMacros.protein)}g</Typography>
          </View>
          <View className="flex-row justify-between">
            <Typography variant="text" color="muted">Carboidratos</Typography>
            <Typography variant="text" className="font-semibold text-text-primary">{Math.round(calculatedMacros.carbs)}g</Typography>
          </View>
          <View className="flex-row justify-between">
            <Typography variant="text" color="muted">Gorduras</Typography>
            <Typography variant="text" className="font-semibold text-text-primary">{Math.round(calculatedMacros.fat)}g</Typography>
          </View>
          <View className="flex-row justify-between pt-2 mt-2 border-t border-soft">
            <Typography variant="text" className="font-bold text-text-primary">Calorias</Typography>
            <Typography variant="text" className="font-bold text-primary-main">{Math.round(calculatedMacros.calories)} kcal</Typography>
          </View>
        </View>
      </View>

      <Button 
        title="Salvar Alterações" 
        onPress={handleUpdate} 
        disabled={quantity <= 0} 
      />
    </View>
  );
}

const enhance = withObservables(['foodId', 'mealItemId'], ({ foodId, mealItemId }: { foodId: string; mealItemId: string }) => ({
  food: database.get<Food>('foods').findAndObserve(foodId),
  mealItem: database.get<MealItem>('meal_items').findAndObserve(mealItemId)
}));

export const EditMealItemScreen = enhance(EditMealItemScreenComponent);
