import { Text } from '@/components/ui/text';
import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { DailySummaryCard } from '../../../components/molecules/DailySummaryCard';
import { useCalendarSummary } from '../hooks/useCalendarSummary';
import { useRouter } from 'expo-router';


export const CalendarSummaryScreen = () => {
  const { summaries, loading } = useCalendarSummary();
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <FlatList keyboardShouldPersistTaps="handled"
        data={summaries}
        keyExtractor={(item) => item.date}
        contentContainerClassName="py-compact"
        renderItem={({ item, index }) => {
          const isFirst = index === 0;
          const isLast = index === summaries.length - 1;

          return (
            <DailySummaryCard
              date={item.date}
              macros={item.macros}
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
