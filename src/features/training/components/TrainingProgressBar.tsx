import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';

interface TrainingProgressBarProps {
  completed: number;
  total: number;
}

export function TrainingProgressBar({ completed, total }: TrainingProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View className="mb-4 rounded-md border border-soft bg-component-card-bg p-4">
      <View className="flex-row items-center justify-between mb-2">
        <Typography variant="label">Session Progress</Typography>
        <Typography variant="label" className="text-primary-main">
          {completed}/{total} Exercises ({percentage}%)
        </Typography>
      </View>
      <View className="h-2 w-full overflow-hidden rounded-full bg-surface-app">
        <View
          className="h-full bg-primary-main transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
}
