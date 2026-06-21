import React from 'react';
import { View, Pressable } from 'react-native';
import { Typography } from '../atoms/Typography';
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
    <Pressable onPress={onPress}>
      <SwipeableCard>
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Typography variant="subtitle">{displayDate}</Typography>
            <Typography variant="caption" color="muted">
              {Math.round(macros.protein)}P • {Math.round(macros.carbs)}C • {Math.round(macros.fat)}G
            </Typography>
          </View>
          <Typography variant="highlight">{Math.round(macros.calories)} kcal</Typography>
        </View>
      </SwipeableCard>
    </Pressable>
  );
};
