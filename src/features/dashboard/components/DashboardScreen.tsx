import React, { useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { DietWidget } from './DietWidget';
import { TrainingWidget } from './TrainingWidget';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';

export function DashboardScreen() {
  const { metrics, isLoading, refetch } = useDashboardMetrics();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading && !metrics) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <ActivityIndicator size="large" color="#005B94" />
      </View>
    );
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  });

  return (
    <ScrollView keyboardShouldPersistTaps="handled"
      className="flex-1 bg-surface-app p-4"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} colors={['#005B94']} />
      }
    >
      {/* Welcome Banner */}
      <View className="mb-4">
        <Typography variant="caption" color="muted" className="uppercase font-bold tracking-wider">
          {dateStr}
        </Typography>
        <Typography variant="title" className="text-2xl font-bold mt-0.5">
          Welcome Back!
        </Typography>
      </View>

      <View className="gap-4 pb-20">
        {/* Diet Widget */}
        {metrics && (
          <DietWidget
            calories={metrics.caloriesConsumed}
            goal={metrics.caloriesGoal}
            protein={metrics.proteinConsumed}
            proteinGoal={metrics.proteinGoal}
            carbs={metrics.carbsConsumed}
            carbsGoal={metrics.carbsGoal}
            fat={metrics.fatConsumed}
            fatGoal={metrics.fatGoal}
          />
        )}

        {/* Training Widget */}
        {metrics && (
          <TrainingWidget
            programName={metrics.activeProgramName}
            hasTrainedToday={metrics.hasTrainedToday}
            weeklyWorkouts={metrics.weeklyWorkoutsCount}
            weeklyGoal={metrics.weeklyWorkoutsGoal}
            lastVolume={metrics.lastSessionVolume}
          />
        )}

        {/* Quick Shortcuts */}
        <View className="mt-2">
          <Typography variant="subtitle" className="mb-3 font-bold">
            Quick Actions
          </Typography>
          <View className="flex-row gap-2">
            <Button
              title="Add Calories"
              variant="outline"
              className="flex-1"
              onPress={() => router.push('/diet/create-meal')}
            />
            <Button
              title="Workout Plan"
              variant="secondary"
              className="flex-1"
              onPress={() => router.push('/training')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
