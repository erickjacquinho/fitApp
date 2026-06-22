import { Text } from '@/components/ui/text';
import { SIZES } from '@/tokens/sizes';
import React from 'react';
import { View } from 'react-native';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  label?: string;
}

export function ProgressCircle({
  percentage,
  size = SIZES.progressCircle,
  label,
}: ProgressCircleProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View
      className="items-center justify-center rounded-full bg-surface-app border border-soft relative"
      style={{ width: size, height: size }}
    >
      <Text variant="label" className="font-bold text-accent-main">
        {clampedPercentage}%
      </Text>
      {label && (
        <Text variant="caption" color="muted" className="absolute -bottom-5">
          {label}
        </Text>
      )}
    </View>
  );
}
