import React, { useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';
import * as Haptics from 'expo-haptics';

export interface LongPressableProps extends PressableProps {
  onLongPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function LongPressable({ onLongPress, children, style, className, ...props }: LongPressableProps) {

  const handleLongPress = useCallback((e: GestureResponderEvent) => {
    // Haptic feedback (phone vibration) — guarded for dev client without native module
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Native module not available (dev client without rebuild)
    }

    if (onLongPress) {
      onLongPress(e);
    }
  }, [onLongPress]);

  return (
    <Pressable
      delayLongPress={500}
      onLongPress={handleLongPress}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </Pressable>
  );
}
