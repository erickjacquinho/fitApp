import { Text } from '@/components/ui/text';
import React from 'react';
import { View, SectionList } from 'react-native';
import { DailySummaryCard } from '../../../components/molecules/DailySummaryCard';
import { useCalendarSummary } from '../hooks/useCalendarSummary';
import { useRouter } from 'expo-router';
import { format, parseISO, startOfWeek, subWeeks, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Icon } from '@/components/ui/icon';
import { Flame, Target } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { DailySummary } from '../types';

interface SectionData {
  key: string;
  title: string;
  avgCalories: number;
  adherenceRate: number;
  data: DailySummary[];
}

const CalendarSummarySkeleton = () => (
  <View className="flex-1 gap-content-gap py-compact animate-pulse">
    {/* Heatmap skeleton */}
    <View className="bg-surface-elevated border border-border-subtle rounded-xl p-4 h-44 w-full" />
    
    {/* Month group skeleton */}
    <View className="h-6 w-32 bg-surface-elevated rounded-md mt-2" />
    
    {/* Card skeletons */}
    <View className="bg-surface-elevated border border-border-subtle rounded-xl p-4 h-24 w-full" />
    <View className="bg-surface-elevated border border-border-subtle rounded-xl p-4 h-24 w-full" />
  </View>
);

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

    const goal = 2200;

    return Object.keys(grouped).map((key) => {
      const items = grouped[key];
      const [year, month] = key.split('-');
      
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, 1);
      const formattedTitle = format(dateObj, "MMMM 'de' yyyy", { locale: ptBR });
      const title = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);

      const totalCalories = items.reduce((acc, curr) => acc + curr.calories, 0);
      const avgCalories = Math.round(totalCalories / items.length);

      const metCount = items.filter((curr) => Math.abs(curr.calories - goal) <= 100).length;
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

  const HeatmapCard = () => (
    <View className="bg-surface border border-border-subtle rounded-xl p-4 mb-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text variant="caption" className="font-bold uppercase tracking-wider text-text-secondary">
          Consistência Mensal
        </Text>
        <Text variant="caption" className="font-mono text-primary text-[11px]">
          Meta: 2200 kcal
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
            const diff = day.summary.calories - 2200;
            if (Math.abs(diff) <= 100) {
              dotColor = 'bg-diet-success border-diet-success/20';
              textColor = 'text-text-inverse';
            } else if (diff < -100) {
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

  return (
    <View className="flex-1">
      <SectionList keyboardShouldPersistTaps="handled"
        sections={sections}
        keyExtractor={(item) => item.date}
        contentContainerClassName="py-compact"
        ListHeaderComponent={<HeatmapCard />}
        renderSectionHeader={({ section: { title, avgCalories, adherenceRate } }) => (
          <View className="bg-background pt-4 pb-2 px-1">
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
