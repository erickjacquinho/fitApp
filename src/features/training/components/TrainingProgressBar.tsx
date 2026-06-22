import { Text } from '@/components/ui/text';
import { Progress } from '@/components/ui/progress';
import React from 'react';
import { View } from 'react-native';

interface TrainingProgressBarProps {
  completed: number;
  total: number;
}

export function TrainingProgressBar({ completed, total }: TrainingProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View className="mb-4 rounded-md border border-soft bg-component-card-bg p-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text variant="label">Progresso da sessão</Text>
        <Text variant="label" color="accent">
          {completed}/{total} exercícios ({percentage}%)
        </Text>
      </View>
      <Progress value={percentage} />
    </View>
  );
}
