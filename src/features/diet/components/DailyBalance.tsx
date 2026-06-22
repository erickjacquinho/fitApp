import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

interface DailyBalanceProps {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export function DailyBalance({ protein, carbs, fat, calories }: DailyBalanceProps) {
  return (
    <View className="bg-surface-raised border-b border-soft pb-2 pt-2">
      <View className="flex-row">
        <View className="flex-1 px-1 py-3 items-center justify-center border-r border-soft">
          <Text variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Proteína</Text>
          <Text variant="subtitle" className="text-text-main">{Math.round(protein)}g</Text>
        </View>
        <View className="flex-1 px-1 py-3 items-center justify-center border-r border-soft">
          <Text variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Carbos</Text>
          <Text variant="subtitle" className="text-text-main">{Math.round(carbs)}g</Text>
        </View>
        <View className="flex-1 px-1 py-3 items-center justify-center border-r border-soft">
          <Text variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Gordura</Text>
          <Text variant="subtitle" className="text-text-main">{Math.round(fat)}g</Text>
        </View>
        <View className="flex-1 px-1 py-3 items-center justify-center">
          <Text variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Calorias</Text>
          <Text variant="subtitle" className="text-text-main">{Math.round(calories)}</Text>
        </View>
      </View>
    </View>
  );
}
