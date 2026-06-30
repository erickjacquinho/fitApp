import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import React from 'react';
import { Pressable, View } from 'react-native';
import { CaloriesText } from '../../../components/molecules/CaloriesText';
import { ColoredMacros } from '../../../components/molecules/ColoredMacros';
import { SwipeableRow } from '../../../components/molecules/SwipeableRow';
import Food from '../../../db/models/Food';
import { calculateMacros } from '../utils/macro-utils';

export interface FoodCardMealProps {
  food: Food;
  quantity: number;
  onDelete?: () => void;
  onEdit?: () => void;
  className?: string;
}

export function FoodCardMeal({
  food,
  quantity,
  onDelete,
  onEdit,
  className,
}: FoodCardMealProps) {
  const macros = calculateMacros(food, quantity);
  const calories = Math.round(macros.calories);
  const protein = Math.round(macros.protein);
  const carbs = Math.round(macros.carbs);
  const fat = Math.round(macros.fat);

  return (
    <SwipeableRow onDelete={onDelete}>
      <Pressable 
        onPress={onEdit}
        className={cn(
          'flex-row justify-between items-center active:bg-surface-elevated px-4 py-3 bg-surface',
          'border-border-subtle border-b',
          'h-food-card',
          className
        )}
      >
        <View className="flex-1 mr-3 justify-center gap-1">
          <Text variant="subtitle" className="text-text-primary" numberOfLines={1}>{food.name}</Text>
          <Text variant="caption" className="text-text-secondary" numberOfLines={1}>
            {quantity} g
          </Text>
        </View>
        <View className="items-end justify-center gap-1">
          <CaloriesText calories={calories} />
          <ColoredMacros protein={protein} carbs={carbs} fat={fat} />
        </View>
      </Pressable>
    </SwipeableRow>
  );
}

