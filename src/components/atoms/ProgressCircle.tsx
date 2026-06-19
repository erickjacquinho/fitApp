import React from 'react';
import { View } from 'react-native';
import { Typography } from '../atoms/Typography';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressCircle({
  percentage,
  size = 64,
  label,
}: ProgressCircleProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View
      className="items-center justify-center rounded-full bg-surface-app border border-soft relative"
      style={{ width: size, height: size }}
    >
      <Typography variant="label" className="font-bold text-primary-main text-xs">
        {clampedPercentage}%
      </Typography>
      {label && (
        <Typography variant="caption" color="muted" className="absolute -bottom-5 text-[10px]">
          {label}
        </Typography>
      )}
    </View>
  );
}
