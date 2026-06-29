import React from 'react';
import Food from '../../../db/models/Food';
import { FoodCardBase } from './FoodCardBase';

interface FoodBankCardProps {
  food: Food;
  onDelete?: () => void;
  onPress?: () => void;
  isSelected?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export function FoodBankCard({ food, onDelete, onPress, isSelected, isFirst, isLast }: FoodBankCardProps) {
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
      className="h-food-card"
      isFirst={isFirst}
      isLast={isLast}
    />
  );
}
