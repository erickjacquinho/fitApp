import { Text } from '@/components/ui/text';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import React from 'react';
import { View } from 'react-native';

interface TrainingProgressBarProps {
  completed: number;
  total: number;
}

export function TrainingProgressBar({ completed, total }: TrainingProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text variant="label">Progresso da sessão</Text>
        <Text variant="label" color="accent">
          {completed}/{total} exercícios ({percentage}%)
        </Text>
      </View>
      <Progress value={percentage} />
    </Card>
  );
}
