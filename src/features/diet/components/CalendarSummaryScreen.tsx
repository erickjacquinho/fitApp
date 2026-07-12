import { Text } from '@/components/ui/text';
import React from 'react';
import { View, SectionList } from 'react-native';
import { DailySummaryCard } from '../../../components/molecules/DailySummaryCard';
import { useCalendarSummary } from '../hooks/useCalendarSummary';
import { useRouter } from 'expo-router';
import { format, startOfWeek, subWeeks, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Icon } from '@/components/ui/icon';
import { Flame, Target } from 'lucide-react-native';
import { DailySummary } from '../types';
import { getDietGoal, getDietComplianceStatus } from '../utils/diet-goal-config';

import { CalendarSummarySkeleton } from './CalendarSummary/CalendarSummarySkeleton';
import { HeatmapCard } from './CalendarSummary/HeatmapCard';

interface SectionData {
  key: string;
  title: string;
  avgCalories: number;
  adherenceRate: number;
  data: DailySummary[];
}

export const CalendarSummaryScreen = () => {
  const { summaries, loading, error } = useCalendarSummary();
  const router = useRouter();

  const sections = React.useMemo<SectionData[]>(() => {
    if (error || !summaries) return [];
    const grouped: Record<string, DailySummary[]> = {};
    
    summaries.forEach((item) => {
      const [year, month] = item.date.split('-');
      const sectionKey = `${year}-${month}`;
      if (!grouped[sectionKey]) {
        grouped[sectionKey] = [];
      }
      grouped[sectionKey].push(item);
    });

    const { caloriesGoal: goal } = getDietGoal();

    return Object.keys(grouped).map((key) => {
      const items = grouped[key];
      const [year, month] = key.split('-');
      
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, 1);
      const formattedTitle = format(dateObj, "MMMM 'de' yyyy", { locale: ptBR });
      const title = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);

      const totalCalories = items.reduce((acc, curr) => acc + curr.calories, 0);
      const avgCalories = Math.round(totalCalories / items.length);

      const metCount = items.filter((curr) => getDietComplianceStatus(curr.calories, goal) === 'success').length;
      const adherenceRate = Math.round((metCount / items.length) * 100);

      return {
        key,
        title,
        avgCalories,
        adherenceRate,
        data: items,
      };
    }).sort((a, b) => b.key.localeCompare(a.key));
  }, [summaries]);

  const heatmapDays = React.useMemo(() => {
    const today = new Date();
    const startDate = startOfWeek(subWeeks(today, 3), { weekStartsOn: 0 }); // 0 = Sunday
    
    const days = [];
    for (let i = 0; i < 28; i++) {
      const date = addDays(startDate, i);
      const dateString = format(date, 'yyyy-MM-dd');
      
      const summary = summaries.find((s) => s.date === dateString);
      
      days.push({
        date,
        dateString,
        dayOfMonth: date.getDate(),
        summary,
      });
    }
    return days;
  }, [summaries]);

  if (loading) {
    return <CalendarSummarySkeleton />;
  }

  if (error) {
    return (
      <View className="flex-1 p-4 justify-center items-center bg-background gap-4">
        <Text variant="title" className="text-error font-bold mb-2">Erro de Carregamento</Text>
        <Text variant="text" className="text-text-secondary text-center font-mono text-[11px] p-4 bg-surface-elevated rounded border border-border-subtle w-full">
          {error.message || String(error)}
        </Text>
        {error.stack && (
          <Text variant="caption" className="text-text-disabled text-left font-mono text-[9px] p-3 bg-surface border border-border-subtle rounded w-full overflow-hidden" numberOfLines={10}>
            {error.stack.slice(0, 500)}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1">
      <SectionList keyboardShouldPersistTaps="handled"
        sections={sections}
        keyExtractor={(item) => item.date}
        contentContainerClassName="pb-content-bottom"
        ListHeaderComponent={<HeatmapCard heatmapDays={heatmapDays} />}
        renderSectionHeader={({ section: { title, avgCalories, adherenceRate } }) => (
          <View className="bg-background pt-4 pb-2 border-b border-border-subtle mb-2">
            <Text variant="subtitle" className="text-text-primary font-bold uppercase tracking-wide">
              {title}
            </Text>
            <View className="flex-row gap-4 mt-1">
              <View className="flex-row items-center gap-1">
                <Icon as={Flame} size={14} className="text-primary" />
                <Text variant="caption" className="text-text-secondary">
                  Média: {avgCalories} kcal/dia
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Icon as={Target} size={14} className="text-primary" />
                <Text variant="caption" className="text-text-secondary">
                  Adesão: {adherenceRate}%
                </Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item, index, section }) => {
          const isFirst = index === 0;
          const isLast = index === section.data.length - 1;

          return (
            <View>
              <DailySummaryCard
                date={item.date}
                calories={item.calories}
                protein={item.protein}
                carbs={item.carbs}
                fat={item.fat}
                mealCount={item.mealCount}
                isFirst={isFirst}
                isLast={isLast}
                onPress={() => router.push({ pathname: '/(tabs)/diet', params: { date: item.date } })}
              />
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-text-secondary">Nenhum histórico encontrado.</Text>
          </View>
        }
      />
    </View>
  );
};
