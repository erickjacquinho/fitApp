import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { Progress } from '@/components/ui/progress';

type MacroTone = 'protein' | 'carbs' | 'fat';

interface MacroTrackerCardProps {
  name: string;
  current: number;
  target: number;
  tone: MacroTone;
  progress: number;
}

export function MacroTrackerCard({
  name,
  current,
  target,
  tone,
  progress,
}: MacroTrackerCardProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const toneClasses: Record<MacroTone, { text: string; progress: string }> = {
    protein: { text: 'text-info-main', progress: 'bg-info-main' },
    carbs: { text: 'text-warning-dark', progress: 'bg-warning-main' },
    fat: { text: 'text-tomato-main', progress: 'bg-tomato-main' },
  };

  return (
    <View className="flex-1 rounded-sm border border-soft bg-surface-app p-2">
      <Text variant="caption" className={`mb-1 text-center ${toneClasses[tone].text}`}>
        {name}
      </Text>
      <Text variant="label" className="text-center font-bold">
        {current}g
      </Text>
      <Text variant="caption" color="muted" className="text-center">
        de {target}g
      </Text>
      <Progress
        value={clampedProgress}
        className="mt-1"
        indicatorClassName={toneClasses[tone].progress}
      />
    </View>
  );
}
