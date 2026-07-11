import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { motionPatterns } from '@/tokens/animations';

/**
 * Props for the FocusRing component.
 */
interface FocusRingProps {
  /** 
   * Whether the parent component is currently focused.
   * Controls the opacity and scaling animation of the ring.
   */
  isFocused: boolean;
  
  /** 
   * The layout frame of the parent component to draw the ring around.
   * Usually obtained via the `onLayout` event of the target component.
   */
  layoutFrame: { x: number; y: number; width: number; height: number };
}

/**
 * A standalone, accessible Focus Ring component for native mobile interactions.
 * 
 * **Behavior:**
 * - Exclusively renders on native platforms (returns `null` on Web, as Web uses CSS rings).
 * - Animates its opacity and border width using Reanimated based on the `isFocused` state.
 * - Uses the semantic dynamic token `--color-border-focus-ring` (mapped to `border-border-focus-ring`)
 *   to ensure it blends smoothly as a neutral overlay in both light and dark modes, avoiding
 *   heavy color clashes with the component's default border.
 *
 * **Usage:**
 * Place this component absolutely within a relative wrapper, *behind* or *around* the input element.
 * Pass the bounding box of the input to `layoutFrame` so the ring can accurately wrap it.
 */
export function FocusRing({ isFocused, layoutFrame }: FocusRingProps) {
  const focusAnim = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    if (isFocused) {
      focusAnim.value = withTiming(1, motionPatterns.formControl.focus);
    } else {
      focusAnim.value = withTiming(0, motionPatterns.formControl.blur);
    }
  }, [isFocused, focusAnim]);

  const ringStyle = useAnimatedStyle(() => {
    const ringWidth = focusAnim.value * 3;
    return {
      opacity: focusAnim.value,
      borderWidth: ringWidth,
      left: layoutFrame.x - ringWidth,
      top: layoutFrame.y - ringWidth,
      width: layoutFrame.width + ringWidth * 2,
      height: layoutFrame.height + ringWidth * 2,
      borderRadius: 8 + ringWidth,
    };
  });

  if (Platform.OS === 'web' || layoutFrame.width === 0) {
    return null;
  }

  return (
    <Animated.View 
      style={ringStyle}
      className="absolute border-border-focus-ring bg-transparent"
      pointerEvents="none"
      aria-hidden={true}
    />
  );
}
