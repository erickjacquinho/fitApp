import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { Macros } from '../utils/macro-utils';

interface MealMacrosSummaryProps {
  macros: Macros;
}

export function MealMacrosSummary({ macros }: MealMacrosSummaryProps) {
  return (
    <View className="h-control-md border-b border-border-subtle justify-center items-center">
      <Text variant="caption" className="font-semibold text-text-primary text-center">
        P: {Math.round(macros.protein)}   C: {Math.round(macros.carbs)}   G: {Math.round(macros.fat)}   kcal: {Math.round(macros.calories)}
      </Text>
    </View>
  );
}
