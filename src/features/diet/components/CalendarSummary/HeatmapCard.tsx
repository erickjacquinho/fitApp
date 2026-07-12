import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { getDietGoal, getDietComplianceStatus } from '../../utils/diet-goal-config';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HeatmapCardProps {
  heatmapDays: {
    date: Date;
    dateString: string;
    dayOfMonth: number;
    summary: any;
  }[];
}

export const HeatmapCard = ({ heatmapDays }: HeatmapCardProps) => {
  const { caloriesGoal: goal } = getDietGoal();

  return (
    <View className="bg-surface border border-border-subtle rounded-xl p-4 mb-4 mt-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text variant="caption" className="font-bold uppercase tracking-wider text-text-secondary">
          Consistência Mensal
        </Text>
        <Text variant="caption" className="font-mono text-primary text-[11px]">
          Meta: {goal} kcal
        </Text>
      </View>
      
      {/* Weekday headers */}
      <View className="flex-row justify-between mb-1.5 px-0.5">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
          <View key={idx} className="w-8 items-center">
            <Text variant="caption" className="text-[10px] font-bold text-text-disabled">
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Heatmap Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-2">
        {heatmapDays.map((day, idx) => {
          let dotColor = 'bg-surface/30 border-border-subtle';
          let textColor = 'text-text-disabled';
          if (day.summary) {
            const compliance = getDietComplianceStatus(day.summary.calories, goal);
            if (compliance === 'success') {
              dotColor = 'bg-diet-success border-diet-success/20';
              textColor = 'text-text-inverse';
            } else if (compliance === 'warning') {
              dotColor = 'bg-diet-warning border-diet-warning/20';
              textColor = 'text-text-inverse';
            } else {
              dotColor = 'bg-diet-error border-diet-error/20';
              textColor = 'text-text-inverse';
            }
          }
          return (
            <View 
              key={idx} 
              className={cn('w-8 h-8 rounded-lg items-center justify-center border', dotColor)}
              accessibilityLabel={`${format(day.date, "d 'de' MMMM", { locale: ptBR })}: ${day.summary ? `${day.summary.calories} kcal` : 'sem registro'}`}
            >
              <Text variant="caption" className={cn('text-[10px] font-bold', textColor)}>
                {day.dayOfMonth}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View className="flex-row justify-between mt-3 pt-3 border-t border-border-subtle">
        <View className="flex-row items-center gap-1.5">
          <View className="w-2.5 h-2.5 rounded-full bg-diet-success" />
          <Text variant="caption" className="text-[10px] text-text-secondary">Meta</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-2.5 h-2.5 rounded-full bg-diet-warning" />
          <Text variant="caption" className="text-[10px] text-text-secondary">Próximo</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-2.5 h-2.5 rounded-full bg-diet-error" />
          <Text variant="caption" className="text-[10px] text-text-secondary">Desvio</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-2.5 h-2.5 rounded-full bg-surface-elevated border border-border-subtle" />
          <Text variant="caption" className="text-[10px] text-text-secondary">Sem registro</Text>
        </View>
      </View>
    </View>
  );
};
