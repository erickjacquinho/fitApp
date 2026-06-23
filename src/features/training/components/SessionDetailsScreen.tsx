import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Calendar, Clock, Dumbbell, Trophy } from 'lucide-react-native';
import { useWorkoutDetails, ExerciseSummary } from '../hooks/useWorkoutDetails';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { COLORS } from '@/tokens/colors';

export function SessionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    session,
    programName,
    exercisesSummary,
    totalVolume,
    isLoading,
  } = useWorkoutDetails(id);

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDuration = (start: number, end?: number | null) => {
    if (!end) return 'N/A';
    const diffMs = end - start;
    const diffMins = Math.round(diffMs / 1000 / 60);
    return `${diffMins} min`;
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center bg-surface p-4">
        <Text variant="subtitle" className="mb-4">
          Detalhes da sessão não encontrados
        </Text>
        <Button onPress={() => router.replace('/training')}><Text>Voltar para treinos</Text></Button>
      </View>
    );
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface p-4">
      {/* Trophy / Congrats Header */}
      <View className="mb-4 items-center justify-center rounded-md bg-success bg-opacity-10 p-5 border border-success border-opacity-20">
        <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-success">
          <Icon as={Trophy} size={24} className="text-text-inverse" />
        </View>
        <Text variant="title" className="text-success font-bold text-center">
          Treino finalizado
        </Text>
        <Text variant="caption" className="text-text-secondary text-center mt-1">
          Seus dados foram salvos no histórico.
        </Text>
      </View>

      {/* Program Summary Card */}
      <Card className="mb-4 p-4">
        <Text variant="title" className="font-bold mb-3">
          {programName}
        </Text>

        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Icon as={Calendar} size={16} className="text-text-secondary" />
            <Text variant="text" className="text-text-secondary">
              {formatDate(session.startDate)}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Icon as={Clock} size={16} className="text-text-secondary" />
            <Text variant="text" className="text-text-secondary">
              Duração: {getDuration(session.startDate, session.endDate)}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Icon as={Dumbbell} size={16} className="text-text-secondary" />
            <Text variant="text" className="text-text-secondary">
              Carga total:{' '}
              <Text variant="highlight" className="font-bold">
                {totalVolume.toLocaleString()} kg
              </Text>
            </Text>
          </View>
        </View>
      </Card>

      {/* Exercises Summary */}
      <Text variant="subtitle" className="mb-3 font-bold">
        Exercícios
      </Text>

      {exercisesSummary.map((ex) => (
        <Card key={ex.exerciseId} className="mb-3 p-4">
          <View className="flex-row items-center justify-between border-b border-border-subtle pb-2 mb-2">
            <Text variant="subtitle" className="font-bold">
              {ex.name}
            </Text>
            <Text variant="caption" className="font-bold text-primary">
              Volume: {ex.volume.toLocaleString()} kg
            </Text>
          </View>

          {ex.sets.map((set) => (
            <View key={set.setNumber} className="flex-row justify-between py-1">
              <Text variant="caption" className="text-text-secondary">
                Série {set.setNumber}
              </Text>
              <Text variant="caption" className="font-semibold">
                {set.weight} kg x {set.reps} reps
              </Text>
            </View>
          ))}
        </Card>
      ))}

      <Button onPress={() => router.replace('/training')} className="my-6 min-h-[var(--size-control-lg)]"><Text>Voltar para programas</Text></Button>
    </ScrollView>
  );
}
