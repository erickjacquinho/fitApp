import { Text } from '@/components/ui/text';
import React from 'react';
import { Macros } from '../../features/diet/utils/macro-utils';
import { cn } from '@/lib/utils';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { ColoredMacros } from './ColoredMacros';
import { CaloriesText } from './CaloriesText';
import { SwipeableRow } from './SwipeableRow';
import { Pressable, View } from 'react-native';

interface DailySummaryCardProps {
  date: string; // YYYY-MM-DD
  macros: Macros;
  onPress: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const DailySummaryCard = ({ date, macros, onPress, isFirst = false, isLast = false }: DailySummaryCardProps) => {
  const [yyyy, mm, dd] = date.split('-');
  const targetDate = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = targetDate.getTime() - todayMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  let displayDate = '';
  if (diffDays === 0) displayDate = 'Hoje';
  else if (diffDays === 1) displayDate = 'Amanhã';
  else if (diffDays === -1) displayDate = 'Ontem';
  else if (diffDays === -2) displayDate = 'Anteontem';
  else {
    const formatted = format(targetDate, "EEEE, d 'de' MMMM", { locale: ptBR }).replace('-feira', '');
    displayDate = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    if (targetDate.getFullYear() !== today.getFullYear()) {
      displayDate += ` (${targetDate.getFullYear()})`;
    }
  }

  return (
    <View>
      <Pressable 
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Ver resumo de ${displayDate}`}
        className={cn(
          'flex-row justify-between items-center active:bg-surface-elevated px-4 py-3 bg-surface',
          "border-border-subtle",
          "border-x border-b",
          isFirst && "rounded-t-lg border-t",
          isLast && "rounded-b-lg",
          !isFirst && !isLast && "rounded-none"
        )}
      >
        <View className="flex-1 mr-3 justify-center gap-1">
          <Text variant="subtitle" className="text-text-primary" numberOfLines={1}>{displayDate}</Text>
        </View>
        <View className="items-end justify-center gap-1">
          <CaloriesText calories={Math.round(macros.calories)} />
          <ColoredMacros protein={Math.round(macros.protein)} carbs={Math.round(macros.carbs)} fat={Math.round(macros.fat)} />
        </View>
      </Pressable>
    </View>
  );
};
