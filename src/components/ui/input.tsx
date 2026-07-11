import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { FocusRing } from './focus-ring';
export interface InputProps extends React.ComponentProps<typeof TextInput> {
  hasError?: boolean;
  'aria-invalid'?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, value, onChangeText, hasError, 'aria-invalid': ariaInvalid, onFocus, onBlur, ...props }, ref) => {
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    return (
      <View className={cn("relative w-full", className?.includes('flex-1') ? 'flex-1' : '')}>
        <FocusRing isFocused={isFocused} layoutFrame={frame} />
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
            'focus:border-thin',
            props.editable === false &&
              cn(
                'opacity-50',
                Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
              ),
            isInvalid && 'border-error text-error',
            Platform.select({
              web: cn(
                'placeholder:text-text-secondary selection:bg-primary selection:text-text-inverse outline-none',
                'focus-visible:ring-2 focus-visible:ring-border-subtle/20',
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
