import { Text } from '@/components/ui/text';
import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Calendar, Clock, Dumbbell, ChevronRight } from 'lucide-react-native';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import { Card } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { useThemeColors } from '../../../hooks/use-theme-colors';
import WorkoutSession from '@/db/models/WorkoutSession';

const formatDate = (timestamp: number) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
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

function HistorySessionItem({ session }: { session: WorkoutSession }) {
  const [programName, setProgramName] = useState('Carregando programa...');

  React.useEffect(() => {
    session.program.fetch().then((p: any) => {
      if (p) setProgramName(p.name);
    });
  }, [session]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Ver detalhes do treino"
      onPress={() =>
        router.push({
          pathname: `/training/details/[id]`,
          params: { id: session.id },
        })
      }
      activeOpacity={0.7}
    >
      <Card className="mb-3 p-4 flex-row items-center justify-between border border-border-subtle bg-surface active:opacity-80">
        <View className="flex-1 pr-2">
          <Text variant="subtitle" className="font-bold">
            {programName}
          </Text>
          
          <View className="flex-row items-center gap-4 mt-2">
            <View className="flex-row items-center gap-1">
              <Icon as={Calendar} size={16} className="text-text-secondary" />
              <Text variant="caption" className="text-text-secondary">
                {formatDate(session.startDate)}
              </Text>
            </View>

            <View className="flex-row items-center gap-1">
              <Icon as={Clock} size={16} className="text-text-secondary" />
              <Text variant="caption" className="text-text-secondary">
                {getDuration(session.startDate, session.endDate)}
              </Text>
            </View>
          </View>
        </View>

        <Icon as={ChevronRight} className="text-text-secondary" />
      </Card>
    </TouchableOpacity>
  );
}

export function HistoryScreen() {
  const { history, isLoading, loadHistory } = useWorkoutHistory();
  const { primary } = useThemeColors();

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );


  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <View className="py-4 pb-content-bottom">

      {history.map((session) => (
        <HistorySessionItem key={session.id} session={session} />
      ))}

      {history.length === 0 && (
        <View className="my-12 items-center justify-center py-10">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surface-elevated">
            <Icon as={Dumbbell} size={32} className="text-text-secondary" />
          </View>
          <Text variant="subtitle" className="mb-2 text-center">
            Nenhum treino registrado
          </Text>
          <Text variant="text" className="text-text-secondary text-center">
            Finalize um treino para criar seu histórico.
          </Text>
        </View>
      )}
    </View>
  );
}
