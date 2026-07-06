import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface PaginationDotsProps {
  total: number;
  active: number;
}

export function PaginationDots({ total, active }: PaginationDotsProps) {
  if (total <= 1) return null;

  return (
    <View className="flex-row items-center justify-center gap-2 py-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === active;

        return <Dot key={index} isActive={isActive} />;
      })}
    </View>
  );
}

interface DotProps {
  isActive: boolean;
}

function Dot({ isActive }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: isActive ? withTiming(16, { duration: 200 }) : withTiming(6, { duration: 200 }),
      height: 6,
      opacity: isActive ? withTiming(1, { duration: 200 }) : withTiming(0.3, { duration: 200 }),
    };
  });

  return (
    <Animated.View
      style={animatedStyle}
      className="rounded-full bg-text-primary"
    />
  );
}
