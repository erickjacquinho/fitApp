import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef } from 'react';
import { Platform, TextInput, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { motionPatterns } from '@/tokens/animations';

export interface InputProps extends React.ComponentProps<typeof TextInput> {
  hasError?: boolean;
  'aria-invalid'?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, value, onChangeText, hasError, 'aria-invalid': ariaInvalid, onFocus, onBlur, ...props }, ref) => {
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const focusAnim = useSharedValue(0);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleChangeText = (text: string) => {
      setLocalValue(text);
      if (onChangeText) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onChangeText(text);
        }, 200);
      }
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const isInvalid = hasError || ariaInvalid;

    const [frame, setFrame] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const handleFocus = (e: any) => {
      focusAnim.value = withTiming(1, motionPatterns.formControl.focus);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: any) => {
      focusAnim.value = withTiming(0, motionPatterns.formControl.blur);
      if (onBlur) onBlur(e);
    };

    const ringStyle = useAnimatedStyle(() => {
      const ringWidth = focusAnim.value * 3;
      return {
        opacity: focusAnim.value,
        borderWidth: ringWidth,
        left: frame.x - ringWidth,
        top: frame.y - ringWidth,
        width: frame.width + ringWidth * 2,
        height: frame.height + ringWidth * 2,
        borderRadius: 8 + ringWidth,
      };
    });

    return (
      <View className={cn("relative w-full", className?.includes('flex-1') ? 'flex-1' : '')}>
        {Platform.OS !== 'web' && frame.width > 0 && (
          <Animated.View 
            style={ringStyle}
            className="absolute border-border-focus bg-transparent"
            pointerEvents="none"
          />
        )}
        <TextInput
          ref={ref}
          onLayout={(e) => setFrame(e.nativeEvent.layout)}
          value={localValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={ariaInvalid}
          className={cn(
            'flex h-input-md w-full min-w-0 flex-row items-center rounded-md border border-border-strong bg-surface px-4 py-2 font-sans text-text leading-body text-text-primary shadow-none transition-colors duration-base',
            'focus:border-thin focus:border-border-focus',
            props.editable === false &&
              cn(
                'opacity-50',
                Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
              ),
            isInvalid && 'border-error text-error',
            Platform.select({
              web: cn(
                'placeholder:text-text-secondary selection:bg-primary selection:text-text-inverse outline-none',
                'focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/20',
                'aria-invalid:ring-error/20 aria-invalid:border-error'
              ),
              native: 'placeholder:text-text-secondary',
            }),
            className
          )}
          {...props}
        />
      </View>
    );
  }
);
Input.displayName = 'Input';

export { Input };
