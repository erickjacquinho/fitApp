import React from 'react';
import { View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { SwipeableCard } from '../../../components/molecules/SwipeableCard';
import { useCalendarSummary } from '../hooks/useCalendarSummary';
import { useRouter } from 'expo-router';

export const CalendarSummaryScreen = () => {
  const { summaries, loading } = useCalendarSummary();
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-surface-app">
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-app">
      <FlatList
        data={summaries}
        keyExtractor={(item) => item.date}
        contentContainerClassName="px-screen-x py-compact gap-3"
        renderItem={({ item }) => {
          const [yyyy, mm, dd] = item.date.split('-');
          const displayDate = `${dd}/${mm}/${yyyy}`;

          return (
            <Pressable onPress={() => router.push({ pathname: '/(tabs)/diet', params: { date: item.date } })}>
              <SwipeableCard>
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Typography variant="subtitle">{displayDate}</Typography>
                    <Typography variant="caption" color="muted">
                      {Math.round(item.macros.protein)}P • {Math.round(item.macros.carbs)}C • {Math.round(item.macros.fat)}G
                    </Typography>
                  </View>
                  <Typography variant="highlight">{Math.round(item.macros.calories)} kcal</Typography>
                </View>
              </SwipeableCard>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Typography color="muted">Nenhum histórico encontrado.</Typography>
          </View>
        }
      />
    </View>
  );
};
