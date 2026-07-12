import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useWorkoutDetails } from '../hooks/useWorkoutDetails';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useThemeColors } from '../../../hooks/use-theme-colors';
import { WorkoutSummaryHeader } from './WorkoutSummaryHeader';
import { WorkoutSummaryMetrics } from './WorkoutSummaryMetrics';
import { WorkoutSummaryExerciseList } from './WorkoutSummaryExerciseList';

export function SessionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { primary } = useThemeColors();

  const {
    session,
    programName,
    exercisesSummary,
    totalVolume,
    isLoading,
  } = useWorkoutDetails(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text variant="subtitle" className="mb-4">
          Detalhes da sessão não encontrados
        </Text>
        <Button onPress={() => router.replace('/training')}><Text>Voltar para treinos</Text></Button>
      </View>
    );
  }

  return (
    <View className="pb-content-bottom">
      <WorkoutSummaryHeader />

      <WorkoutSummaryMetrics 
        programName={programName}
        startDate={session.startDate}
        endDate={session.endDate}
        totalVolume={totalVolume}
      />

      <WorkoutSummaryExerciseList 
        exercisesSummary={exercisesSummary} 
      />

      <Button onPress={() => router.replace('/training')} className="mb-6 min-h-control-lg bg-surface border border-border-strong" variant="outline">
        <Text className="text-text-primary">Voltar para histórico</Text>
      </Button>
    </View>
  );
}
