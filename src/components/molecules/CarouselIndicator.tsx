import React from 'react';
import { View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withSpring 
} from 'react-native-reanimated';
import { animationTokens } from '@/tokens/animations';
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';

export interface CarouselIndicatorProps {
  total: number;
  currentIndex: number;
  className?: string;
}

export function CarouselIndicator({ total, currentIndex, className }: CarouselIndicatorProps) {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  if (total <= 1) return null;

  return (
    <View className={cn("flex-row items-center justify-center gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} isActive={i === currentIndex} colors={colors} />
      ))}
    </View>
  );
}

function Dot({ isActive, colors }: { isActive: boolean; colors: any }) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(isActive ? 24 : 8, animationTokens.physics.spring.snappy),
      backgroundColor: withTiming(isActive ? colors.primary : colors.borderSubtle, { duration: animationTokens.duration.slow })
    };
  });

  return (
    <Animated.View 
      className="h-2 rounded-full"
      style={animatedStyle}
    />
  );
}
