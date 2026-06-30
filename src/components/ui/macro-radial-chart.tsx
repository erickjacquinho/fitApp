import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface MacroRadialChartProps {
  protein: number;
  carbs: number;
  fat: number;
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  proteinColor?: string;
  carbsColor?: string;
  fatColor?: string;
  children?: React.ReactNode;
}

export function MacroRadialChart({
  protein,
  carbs,
  fat,
  size = 120,
  strokeWidth = 10,
  backgroundColor = '#E5E7EB',
  proteinColor = '#0800FF',
  carbsColor = '#F1AE11',
  fatColor = '#E43F03',
  children,
}: MacroRadialChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const total = protein + carbs + fat;

  const pPct = total > 0 ? protein / total : 0;
  const cPct = total > 0 ? carbs / total : 0;
  const fPct = total > 0 ? fat / total : 0;

  // dash offsets
  const cOffset = circumference - (cPct * circumference);
  const pOffset = circumference - (pPct * circumference);
  const fOffset = circumference - (fPct * circumference);

  // rotation angles
  const cRot = -90;
  const pRot = -90 + (cPct * 360);
  const fRot = -90 + ((cPct + pPct) * 360);

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
        {total > 0 && (
          <>
            {cPct > 0 && (
              <Circle
                stroke={carbsColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={cOffset}
                transform={`rotate(${cRot}, ${size / 2}, ${size / 2})`}
              />
            )}
            {pPct > 0 && (
              <Circle
                stroke={proteinColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={pOffset}
                transform={`rotate(${pRot}, ${size / 2}, ${size / 2})`}
              />
            )}
            {fPct > 0 && (
              <Circle
                stroke={fatColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={fOffset}
                transform={`rotate(${fRot}, ${size / 2}, ${size / 2})`}
              />
            )}
          </>
        )}
      </Svg>
      {children}
    </View>
  );
}
