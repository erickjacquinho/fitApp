import React from 'react';
import { Text } from '@/components/ui/text';

interface ColoredMacrosProps {
  protein: number;
  carbs: number;
  fat: number;
  className?: string;
}

export function ColoredMacros({ protein, carbs, fat, className }: ColoredMacrosProps) {
  return (
    <Text variant="caption" className={className} numberOfLines={1}>
      <Text variant="caption" className="text-protein">P: {protein}</Text>
      {'   '}
      <Text variant="caption" className="text-carbohydrate">C: {carbs}</Text>
      {'   '}
      <Text variant="caption" className="text-fat">G: {fat}</Text>
    </Text>
  );
}
