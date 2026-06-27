import React from 'react';
import Food from '../../../db/models/Food';
import { calculateMacros } from '../utils/macro-utils';
import { FoodCardBase } from './FoodCardBase';

interface FoodEntryCardProps {
  food: Food;
  quantity: number;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function FoodEntryCard({ food, quantity, onDelete, onEdit }: FoodEntryCardProps) {
  const macros = calculateMacros(food, quantity);

  return (
    <FoodCardBase
      title={food.name}
      subtitle={`${quantity} g`}
      calories={Math.round(macros.calories)}
      protein={Math.round(macros.protein)}
      carbs={Math.round(macros.carbs)}
      fat={Math.round(macros.fat)}
      onDelete={onDelete}
      onPress={onEdit}
      className="h-food-card px-4 bg-transparent border-b border-border-subtle"
    />
  );
}
