import React, { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { motionPatterns } from '@/tokens/animations';

interface KeyboardShiftProps {
  /** Content to shift upward when the keyboard opens. */
  children: React.ReactNode;
  /**
   * Extra upward offset in pixels added on top of half the keyboard height.
   * Useful to leave breathing room between the popup and the keyboard.
   * @default 16
   */
  offset?: number;
  /**
   * When false the component renders children as-is without any shift logic.
   * Handy to disable the behaviour conditionally without removing the wrapper.
   * @default true
   */
  enabled?: boolean;
}

/**
 * Wraps any content and translates it upward by half the keyboard height
 * (plus an optional offset) whenever the soft keyboard appears.
 *
 * Usage:
 * ```tsx
 * <KeyboardShift>
 *   <MyModal />
 * </KeyboardShift>
 * ```
 */
export function KeyboardShift({
  children,
  offset = 16,
  enabled = true,
}: KeyboardShiftProps) {
  const shift = useSharedValue(0);

  useEffect(() => {
    if (!enabled || Platform.OS === 'web') return;

    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      // Shift up by half the keyboard height + extra breathing room
      shift.value = withTiming(-(keyboardHeight / 2 + offset), motionPatterns.expandable.expand);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      shift.value = withTiming(0, motionPatterns.expandable.collapse);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [enabled, offset, shift]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  if (!enabled || Platform.OS === 'web') {
    return <>{children}</>;
  }

  return (
    <Animated.View style={[animatedStyle, { width: '100%', alignItems: 'center' }]}>
      {children}
    </Animated.View>
  );
}
