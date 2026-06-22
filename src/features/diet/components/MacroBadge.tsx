import { Text } from '@/components/ui/text';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';

export type MacroType = 'protein' | 'carbs' | 'fat' | 'calories';

interface MacroBadgeProps {
  label: string;
  value: number;
  type: MacroType;
  unit?: string;
}

export function MacroBadge({ label, value, type, unit = 'g' }: MacroBadgeProps) {
  const typeVariants: Record<MacroType, BadgeProps['variant']> = {
    protein: 'info',
    carbs: 'warning',
    fat: 'secondary',
    calories: 'neutral',
  };

  const actualUnit = type === 'calories' ? 'kcal' : unit;

  return (
    <Badge variant={typeVariants[type]}>
      <Text variant="caption">{label}: {value.toFixed(1)}{actualUnit}</Text>
    </Badge>
  );
}
