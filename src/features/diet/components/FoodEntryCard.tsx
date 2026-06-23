import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
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
    <SwipeableCard className="mb-2 bg-surface border border-border-subtle" onDelete={onDelete} onPress={onEdit}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text variant="subtitle">{food.name}</Text>
          <Text variant="caption" className="text-text-secondary">
            {quantity}g • {Math.round(macros.protein)}P • {Math.round(macros.carbs)}C • {Math.round(macros.fat)}G
          </Text>
        </View>
        <Text variant="caption" className="font-semibold text-text-primary">
          {Math.round(macros.calories)} kcal
        </Text>
      </View>
    </SwipeableCard>
  );
}
