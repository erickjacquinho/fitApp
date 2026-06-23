import React, { useMemo } from 'react';
import { View } from 'react-native';
import { MacroBadge } from './MacroBadge';
import { Food } from '../../../db';

interface PreviewMacrosProps {
  items: {
    food: Food;
    quantity: number;
  }[];
}

export function PreviewMacros({ items }: PreviewMacrosProps) {
  const totals = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const factor = item.quantity / 100;
        acc.protein += item.food.protein * factor;
        acc.carbohydrates += item.food.carbohydrates * factor;
        acc.fat += item.food.fat * factor;
        acc.calories += item.food.calories * factor;
        return acc;
      },
      { protein: 0, carbohydrates: 0, fat: 0, calories: 0 }
    );
  }, [items]);

  return (
    <View className="flex-row flex-wrap gap-2">
      <MacroBadge label="P" value={totals.protein} type="protein" />
      <MacroBadge label="C" value={totals.carbohydrates} type="carbs" />
      <MacroBadge label="G" value={totals.fat} type="fat" />
      <MacroBadge label="Kcal" value={totals.calories} type="calories" />
    </View>
  );
}
