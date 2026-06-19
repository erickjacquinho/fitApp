import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';

interface MacroTrackerCardProps {
  name: string;
  current: number;
  target: number;
  colorClass: string; // e.g. "text-sky-600"
  progressColorClass: string; // e.g. "bg-sky-500"
  progress: number; // Percentage value (0 - 100)
}

export function MacroTrackerCard({
  name,
  current,
  target,
  colorClass,
  progressColorClass,
  progress,
}: MacroTrackerCardProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View className="flex-1 rounded bg-surface-app p-2 border border-soft">
      <Typography variant="caption" className={`font-bold mb-1 text-center ${colorClass}`}>
        {name}
      </Typography>
      <Typography variant="label" className="text-center font-bold">
        {current}g
      </Typography>
      <Typography variant="caption" color="muted" className="text-center text-[10px]">
        of {target}g
      </Typography>
      <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
        <View
          className={`h-full ${progressColorClass}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
    </View>
  );
}
