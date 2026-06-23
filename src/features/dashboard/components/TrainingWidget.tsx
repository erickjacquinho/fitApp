import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Play, CheckCircle2, Dumbbell, Calendar, Plus } from 'lucide-react-native';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface TrainingWidgetProps {
  programName: string | null;
  hasTrainedToday: boolean;
  weeklyWorkouts: number;
  weeklyGoal: number;
  lastVolume: number;
}

export function TrainingWidget({
  programName,
  hasTrainedToday,
  weeklyWorkouts,
  weeklyGoal,
  lastVolume,
}: TrainingWidgetProps) {
  const percentage = Math.min(Math.round((weeklyWorkouts / weeklyGoal) * 100), 100);

  return (
    <Card>
      <View className="flex-row items-center justify-between border-b border-soft pb-3 mb-3">
        <Text variant="subtitle" className="font-bold">
          Plano de treino
        </Text>
        {programName && (
          <Button
            accessibilityLabel="Iniciar treino"
            variant="secondary"
            size="sm"
            onPress={() => router.push('/training')}
          >
            <Icon as={Play} size={16} className="text-accent-main" fill="currentColor" />
            <Text variant="caption" color="accent">
              Iniciar
            </Text>
          </Button>
        )}
      </View>

      {programName ? (
        <View>
          <Text variant="label" className="font-bold mb-1">
            {programName}
          </Text>

          <View className="flex-row items-center gap-2 mt-2 mb-3 bg-surface-raised p-3 rounded-md border border-soft">
            {hasTrainedToday ? (
              <Icon as={CheckCircle2} className="text-success-main" />
            ) : (
              <Icon as={Dumbbell} className="text-text-muted" />
            )}
            <Text variant="caption" className={hasTrainedToday ? 'text-success-main font-bold' : ''}>
              {hasTrainedToday ? 'Treino concluído hoje.' : 'Nenhum treino registrado hoje.'}
            </Text>
          </View>

          {/* Weekly Summary */}
          <View className="flex-row items-center justify-between mb-2">
            <Text variant="caption" color="muted">
              Meta semanal
            </Text>
            <Text variant="caption" className="font-bold">
              {weeklyWorkouts} / {weeklyGoal} treinos
            </Text>
          </View>

          <Progress value={percentage} className="mb-3" />

          {lastVolume > 0 && (
            <View className="flex-row items-center gap-2 mt-1">
              <Icon as={Calendar} size={16} className="text-text-muted" />
              <Text variant="caption" color="muted">
                Volume da última sessão:{' '}
                <Text variant="caption" className="font-bold text-text-main">
                  {lastVolume.toLocaleString()} kg
                </Text>
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View className="py-4 items-center justify-center">
          <Text variant="text" color="muted" className="text-center mb-4">
            Nenhum programa de treino ativo.
          </Text>
          <Button
            onPress={() => router.push('/training/create-program')}
          >
            <Icon as={Plus} size={16} className="text-text-inverse" />
            <Text>
              Criar programa
            </Text>
          </Button>
        </View>
      )}

      <Button
        variant="ghost"
        onPress={() => router.push('/training')}
        className="mt-4 border-t border-soft"
      >
        <Text variant="caption" color="accent">
          Ver programas
        </Text>
      </Button>
    </Card>
  );
}
