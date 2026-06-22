import { Text } from '@/components/ui/text';
import React from 'react';
import { View, Pressable } from 'react-native';
import { SwipeableCard } from './SwipeableCard';
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
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver resumo de ${displayDate}`} onPress={onPress}>
      <SwipeableCard>
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text variant="subtitle">{displayDate}</Text>
            <Text variant="caption" color="muted">
              {Math.round(macros.protein)}P • {Math.round(macros.carbs)}C • {Math.round(macros.fat)}G
            </Text>
          </View>
          <Text variant="highlight">{Math.round(macros.calories)} kcal</Text>
        </View>
      </SwipeableCard>
    </Pressable>
  );
};
