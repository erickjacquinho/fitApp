import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { SwipeableCard } from '../../../components/molecules/SwipeableCard';
import Food from '../../../db/models/Food';
import { calculateMacros } from '../utils/macro-utils';

interface FoodEntryCardProps {
  food: Food;
  quantity: number;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function FoodEntryCard({ food, quantity, onDelete, onEdit }: FoodEntryCardProps) {
  const macros = calculateMacros(food, quantity);

  return (
    <SwipeableCard className="mb-2 bg-surface-raised border border-soft" onDelete={onDelete} onEdit={onEdit}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Typography variant="subtitle" className="text-sm">{food.name}</Typography>
          <Typography variant="caption" color="muted">
            {quantity}g • {Math.round(macros.protein)}P • {Math.round(macros.carbs)}C • {Math.round(macros.fat)}G
          </Typography>
        </View>
        <Typography variant="caption" className="font-semibold text-text-primary">
          {Math.round(macros.calories)} kcal
        </Typography>
      </View>
    </SwipeableCard>
  );
}
