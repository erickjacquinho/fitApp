import { Text } from '@/components/ui/text';
import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Calendar, Clock, Dumbbell, ChevronRight } from 'lucide-react-native';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import { Card } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { COLORS } from '@/tokens/colors';

export function HistoryScreen() {
  const { history, isLoading, loadHistory } = useWorkoutHistory();

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

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

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface-app p-4">
      <Text variant="title" className="mb-4 font-bold">
        Histórico de treinos
      </Text>

      {history.map((session) => {
        // We need to fetch the program name dynamically
        const [programName, setProgramName] = useState('Carregando programa...');

        React.useEffect(() => {
          session.program.fetch().then((p) => {
            if (p) setProgramName(p.name);
          });
        }, [session]);

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ver detalhes do treino"
            key={session.id}
            onPress={() =>
              router.push({
                pathname: `/training/details/[id]`,
                params: { id: session.id },
              })
            }
            activeOpacity={0.7}
          >
            <Card className="mb-3 p-4 flex-row items-center justify-between border border-soft bg-component-card-bg active:bg-surface-muted/10">
              <View className="flex-1 pr-2">
                <Text variant="subtitle" className="font-bold">
                  {programName}
                </Text>
                
                <View className="flex-row items-center gap-4 mt-2">
                  <View className="flex-row items-center gap-1">
                    <Icon as={Calendar} size={16} className="text-text-muted" />
                    <Text variant="caption" color="muted">
                      {formatDate(session.startDate)}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-1">
                    <Icon as={Clock} size={16} className="text-text-muted" />
                    <Text variant="caption" color="muted">
                      {getDuration(session.startDate, session.endDate)}
                    </Text>
                  </View>
                </View>
              </View>

              <Icon as={ChevronRight} className="text-text-muted" />
            </Card>
          </TouchableOpacity>
        );
      })}

      {history.length === 0 && (
        <View className="my-12 items-center justify-center py-10">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
            <Icon as={Dumbbell} size={32} className="text-text-muted" />
          </View>
          <Text variant="subtitle" className="mb-2 text-center">
            Nenhum treino registrado
          </Text>
          <Text variant="text" color="muted" className="text-center">
            Finalize um treino para criar seu histórico.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
