import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { ListItem } from './ListItem';
import { Macros } from '../../features/diet/utils/macro-utils';

interface DailySummaryCardProps {
  date: string; // YYYY-MM-DD
  macros: Macros;
  onPress: () => void;
}

export const DailySummaryCard = ({ date, macros, onPress }: DailySummaryCardProps) => {
  const [yyyy, mm, dd] = date.split('-');
  const displayDate = `${dd}/${mm}/${yyyy}`;

  return (
    <ListItem
      title={displayDate}
      subtitle={`${Math.round(macros.protein)}P • ${Math.round(macros.carbs)}C • ${Math.round(macros.fat)}G`}
      rightAccessory={<Text className="font-bold text-primary">{Math.round(macros.calories)} kcal</Text>}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver resumo de ${displayDate}`}
    />
  );
};
