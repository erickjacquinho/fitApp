import React from 'react';
import Food from '../../../db/models/Food';
import { FoodCardBase } from './FoodCardBase';

interface FoodBankCardProps {
  food: Food;
  onDelete?: () => void;
  onPress?: () => void;
  isSelected?: boolean;
}

export function FoodBankCard({ food, onDelete, onPress, isSelected }: FoodBankCardProps) {
  return (
    <FoodCardBase
      title={food.name}
      subtitle={`${food.preparationWeight} g`}
      calories={Math.round(food.calories)}
      protein={Math.round(food.protein)}
      carbs={Math.round(food.carbohydrates)}
      fat={Math.round(food.fat)}
      onDelete={onDelete}
      onPress={onPress}
      isSelected={isSelected}
      className="px-4 py-3 bg-surface"
      showDivider={true}
    />
  );
}
