import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface RadialProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export function RadialProgress({
  value,
  size = 120,
  strokeWidth = 10,
  color = '#2563EB', // default to a generic primary color if not provided
  backgroundColor = '#E5E7EB',
  children,
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safeValue = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
  const strokeDashoffset = circumference - (safeValue / 100) * circumference;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      {children}
    </View>
  );
}
