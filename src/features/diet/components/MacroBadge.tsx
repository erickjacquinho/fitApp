import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';

export type MacroType = 'protein' | 'carbs' | 'fat' | 'calories';

interface MacroBadgeProps {
  label: string;
  value: number;
  type: MacroType;
  unit?: string;
}

export function MacroBadge({ label, value, type, unit = 'g' }: MacroBadgeProps) {
  const typeColors = {
    protein: 'bg-primary-soft',
    carbs: 'bg-accent-soft',
    fat: 'bg-tomato-soft',
    calories: 'bg-gray-300',
  };

  const actualUnit = type === 'calories' ? 'kcal' : unit;

  return (
    <View className={`px-2 py-1 rounded-md flex-row items-center gap-1 ${typeColors[type]}`}>
      <Typography variant="caption" className="font-bold">
        {label}:
      </Typography>
      <Typography variant="caption">
        {value.toFixed(1)}{actualUnit}
      </Typography>
    </View>
  );
}
