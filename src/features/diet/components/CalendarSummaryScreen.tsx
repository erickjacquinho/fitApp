import { Text } from '@/components/ui/text';
import React from 'react';
import { View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { DailySummaryCard } from '../../../components/molecules/DailySummaryCard';
import { useCalendarSummary } from '../hooks/useCalendarSummary';
import { useRouter } from 'expo-router';
import { COLORS } from '@/tokens/colors';

export const CalendarSummaryScreen = () => {
  const { summaries, loading } = useCalendarSummary();
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-surface-app">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-app">
      <FlatList keyboardShouldPersistTaps="handled"
        data={summaries}
        keyExtractor={(item) => item.date}
        contentContainerClassName="px-screen-x py-compact gap-3"
        renderItem={({ item }) => {
          return (
            <DailySummaryCard
              date={item.date}
              macros={item.macros}
              onPress={() => router.push({ pathname: '/(tabs)/diet', params: { date: item.date } })}
            />
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text color="muted">Nenhum histórico encontrado.</Text>
          </View>
        }
      />
    </View>
  );
};
