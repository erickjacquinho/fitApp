import { Text } from '@/components/ui/text';
import React from 'react';
import { cn } from '@/lib/utils';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { ColoredMacros } from './ColoredMacros';
import { Pressable, View } from 'react-native';
import { PluralText } from '@/components/ui/plural-text';
import { Progress } from '@/components/ui/progress';

interface DailySummaryCardProps {
  date: string; // YYYY-MM-DD
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealCount: number;
  onPress: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const DailySummaryCard = ({
  date,
  calories,
  protein,
  carbs,
  fat,
  mealCount,
  onPress,
  isFirst = false,
  isLast = false
}: DailySummaryCardProps) => {
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

  const goal = 2200;
  const percentage = Math.min(Math.round((calories / goal) * 100), 100);
  const diff = calories - goal;

  let statusText = '';
  let statusBadgeStyle = '';
  let fillStyle = '';
  let accessibilityStatusText = '';

  if (Math.abs(diff) <= 100) {
    statusText = 'Meta Batida';
    statusBadgeStyle = 'text-primary bg-primary/10 border-primary/30';
    accessibilityStatusText = 'Meta de calorias atingida';
  } else if (diff < -100) {
    statusText = 'Próximo';
    statusBadgeStyle = 'text-text-secondary bg-surface-elevated border-border-subtle';
    accessibilityStatusText = 'Abaixo da meta de calorias';
  } else {
    statusText = 'Desvio';
    statusBadgeStyle = 'text-text-secondary bg-surface-elevated border-border-subtle';
    accessibilityStatusText = 'Excedeu a meta de calorias';
  }

  return (
    <View>
      <Pressable 
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${displayDate}, ${mealCount} refeições. ${calories} de ${goal} calorias consumidas, ${accessibilityStatusText}.`}
        className={cn(
          'flex-col active:bg-surface-elevated px-4 py-3 bg-surface',
          'border-border-subtle',
          'border-x border-b',
          'gap-2',
          isFirst && 'rounded-t-lg border-t',
          isLast && 'rounded-b-lg',
          !isFirst && !isLast && 'rounded-none'
        )}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-3 justify-center gap-1">
            <View className="flex-row items-center gap-2">
              <View className={cn('px-2 py-0.5 rounded-md border', statusBadgeStyle)}>
                <Text variant="caption" className="font-bold text-[10px] uppercase">{statusText}</Text>
              </View>
              <Text variant="subtitle" className="text-text-primary font-bold" numberOfLines={1}>
                {displayDate}
              </Text>
            </View>
            <PluralText 
              count={mealCount} 
              singular="refeição" 
              plural="refeições" 
              zero="Nenhuma refeição"
              variant="caption" 
              className="text-text-secondary pl-1" 
            />
          </View>
          <View className="items-end justify-center">
            <Text variant="label" className="font-mono font-semibold text-text-primary">
              {calories} <Text className="text-text-secondary font-sans text-xs">/ {goal} kcal</Text>
            </Text>
          </View>
        </View>

        <Progress value={percentage} indicatorClassName="bg-primary" className="h-1.5 rounded-full" />

        <View className="flex-row justify-between items-center">
          <ColoredMacros protein={protein} carbs={carbs} fat={fat} />
        </View>
      </Pressable>
    </View>
  );
};
