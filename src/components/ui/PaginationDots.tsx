import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, SharedValue, Extrapolation } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PaginationDotsProps {
  total: number;
  scrollX: SharedValue<number>;
}

export function PaginationDots({ total, scrollX }: PaginationDotsProps) {
  if (total <= 1) return null;

  return (
    <View className="flex-row items-center justify-center gap-2 py-2 bg-transparent">
      {Array.from({ length: total }).map((_, index) => {
        return <Dot key={index} index={index} scrollX={scrollX} />;
      })}
    </View>
  );
}

interface DotProps {
  index: number;
  scrollX: SharedValue<number>;
}

function Dot({ index, scrollX }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const width = interpolate(
      scrollX.value,
      inputRange,
      [6, 16, 6],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    return {
      width,
      height: 6,
      opacity,
    };
  });

  return (
    <Animated.View
      style={animatedStyle}
      className="rounded-full bg-text-primary"
    />
  );
}
