import React from 'react';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface CaloriesTextProps {
  calories: number;
  className?: string;
}

export function CaloriesText({ calories, className }: CaloriesTextProps) {
  return (
    <Text variant="label" className={cn("font-semibold text-text-primary", className)} numberOfLines={1}>
      {calories} Kcal
    </Text>
  );
}
