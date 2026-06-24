import { Text } from '@/components/ui/text';
import React from 'react';
import { View, Pressable } from 'react-native';
import { SwipeableRow } from '../../../components/molecules/SwipeableRow';
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
    <SwipeableRow onDelete={onDelete}>
      <Pressable onPress={onEdit}>
        <View className="h-food-card px-4 flex-row justify-between items-center bg-transparent border-b border-border-subtle active:bg-surface-elevated">
          <View className="flex-1 mr-3 justify-center gap-1">
            <Text variant="subtitle" className="text-text-primary" numberOfLines={1}>{food.name}</Text>
            <Text variant="caption" className="text-text-secondary" numberOfLines={1}>
              {quantity} g
            </Text>
          </View>
          <View className="items-end justify-center gap-1">
            <Text variant="label" className="font-semibold text-text-primary" numberOfLines={1}>
              {Math.round(macros.calories)} Kcal
            </Text>
            <Text variant="caption" numberOfLines={1}>
              <Text variant="caption" className="text-protein">P: {Math.round(macros.protein)}</Text>
              {'   '}
              <Text variant="caption" className="text-carbohydrate">C: {Math.round(macros.carbs)}</Text>
              {'   '}
              <Text variant="caption" className="text-fat">G: {Math.round(macros.fat)}</Text>
            </Text>
          </View>
        </View>
      </Pressable>
    </SwipeableRow>
  );
}
