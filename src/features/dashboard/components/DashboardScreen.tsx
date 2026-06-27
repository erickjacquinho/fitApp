import React, { useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { DietWidget } from './DietWidget';
import { TrainingWidget } from './TrainingWidget';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';

interface DashboardScreenProps {
  metrics: any;
  isLoading: boolean;
  refetch: () => void;
}

export function DashboardScreen({ metrics, isLoading, refetch }: DashboardScreenProps) {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading && !metrics) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
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
    <View className="gap-4 pt-4 pb-content-bottom">
      {/* Welcome Banner */}
      <View className="mb-4">
        <Text variant="caption" className="text-text-secondary uppercase font-bold tracking-wide">
          {dateStr}
        </Text>
        <Text variant="title" className="font-bold mt-1">
          Bem-vindo!
        </Text>
      </View>

      <View className="gap-4 pb-content-bottom">
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
          <Text variant="subtitle" className="mb-3 font-bold">
            Ações rápidas
          </Text>
          <View className="flex-row gap-2">
            <Button variant="outline" className="flex-1" onPress={() => router.push('/diet/create-meal')}><Text>Adicionar refeição</Text></Button>
            <Button variant="secondary" className="flex-1" onPress={() => router.push('/training')}><Text>Plano de treino</Text></Button>
          </View>
        </View>
      </View>
    </View>
  );
}
