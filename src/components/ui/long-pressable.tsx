import React, { useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface LongPressableProps extends PressableProps {
  onLongPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function LongPressable({ onLongPress, children, style, className, ...props }: LongPressableProps) {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const handleLongPress = useCallback((e: GestureResponderEvent) => {
    // Haptic feedback (phone vibration) — guarded for dev client without native module
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Native module not available (dev client without rebuild)
    }

    // Visual shake animation
    translateX.value = withSequence(
      withTiming(-5, { duration: 40 }),
      withTiming(5, { duration: 40 }),
      withTiming(-5, { duration: 40 }),
      withTiming(5, { duration: 40 }),
      withTiming(0, { duration: 40 })
    );

    if (onLongPress) {
      onLongPress(e);
    }
  }, [onLongPress, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value }
    ],
  }));

  return (
    <AnimatedPressable
      delayLongPress={500}
      onLongPress={handleLongPress}
      onPressIn={(e) => {
        scale.value = withSpring(0.97, { mass: 0.5, damping: 10 });
        if (props.onPressIn) props.onPressIn(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, { mass: 0.5, damping: 10 });
        if (props.onPressOut) props.onPressOut(e);
      }}
      style={[animatedStyle, style]}
      className={className}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
