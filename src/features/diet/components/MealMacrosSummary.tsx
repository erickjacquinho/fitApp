import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Macros } from '../utils/macro-utils';

interface MealMacrosSummaryProps {
  macros: Macros;
}

export function MealMacrosSummary({ macros }: MealMacrosSummaryProps) {
  return (
    <View className="h-control-md border-b border-border-subtle flex-row justify-between items-center px-8">
      <Text variant="caption" className="text-protein" style={{ fontFamily: 'HelveticaNowText-Medium' }}>
        Prot: {Math.round(macros.protein)}
      </Text>
      <Text variant="caption" className="text-carbohydrate" style={{ fontFamily: 'HelveticaNowText-Medium' }}>
        Carb: {Math.round(macros.carbs)}
      </Text>
      <Text variant="caption" className="text-fat" style={{ fontFamily: 'HelveticaNowText-Medium' }}>
        Gord: {Math.round(macros.fat)}
      </Text>
      <Text variant="caption" className="text-text-primary" style={{ fontFamily: 'HelveticaNowText-Medium' }}>
        Cal: {Math.round(macros.calories)}
      </Text>
    </View>
  );
}
