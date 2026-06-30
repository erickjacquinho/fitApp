import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export type MacroType = 'protein' | 'carbs' | 'fat' | 'calories';

interface MacroBadgeProps {
  label: string;
  value: number;
  type: MacroType;
  unit?: string;
}

export function MacroBadge({ label, value, type, unit = 'g' }: MacroBadgeProps) {
  const typeClasses: Record<MacroType, string> = {
    protein: 'bg-protein',
    carbs: 'bg-carbohydrate',
    fat: 'bg-fat',
    calories: 'bg-primary',
  };

  const actualUnit = type === 'calories' ? 'kcal' : unit;

  return (
    <View className={`group shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-1 ${typeClasses[type]}`}>
      <Text variant="caption" className="font-bold leading-caption text-text-inverse">
        {label}: {value.toFixed(1)}{actualUnit}
      </Text>
    </View>
  );
}
