import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';

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
          <Typography variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Proteína</Typography>
          <Typography variant="subtitle" className="text-text-primary">{Math.round(protein)}g</Typography>
        </View>
        <View className="flex-1 px-1 py-3 items-center justify-center border-r border-soft">
          <Typography variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Carbos</Typography>
          <Typography variant="subtitle" className="text-text-primary">{Math.round(carbs)}g</Typography>
        </View>
        <View className="flex-1 px-1 py-3 items-center justify-center border-r border-soft">
          <Typography variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Gordura</Typography>
          <Typography variant="subtitle" className="text-text-primary">{Math.round(fat)}g</Typography>
        </View>
        <View className="flex-1 px-1 py-3 items-center justify-center">
          <Typography variant="caption" color="muted" className="uppercase font-bold mb-1" numberOfLines={1} adjustsFontSizeToFit>Calorias</Typography>
          <Typography variant="subtitle" className="text-text-primary">{Math.round(calories)}</Typography>
        </View>
      </View>
    </View>
  );
}
