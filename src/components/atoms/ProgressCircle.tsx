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
      className="relative items-center justify-center rounded-full border border-border-subtle bg-surface"
      style={{ width: size, height: size }}
    >
      <Text variant="label" className="font-bold text-primary">
        {clampedPercentage}%
      </Text>
      {label && (
        <Text variant="caption" className="absolute -bottom-5 text-text-secondary">
          {label}
        </Text>
      )}
    </View>
  );
}
