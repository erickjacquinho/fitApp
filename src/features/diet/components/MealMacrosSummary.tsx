import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Macros } from '../utils/macro-utils';

interface MealMacrosSummaryProps {
  macros: Macros;
}

export function MealMacrosSummary({ macros }: MealMacrosSummaryProps) {
  return (
    <View className="pt-2 mt-2 border-t border-soft">
      <Typography variant="caption" className="font-semibold text-text-primary">
        P: {Math.round(macros.protein)}g; C: {Math.round(macros.carbs)}g; G: {Math.round(macros.fat)}g; Kcal: {Math.round(macros.calories)}
      </Typography>
    </View>
  );
}
