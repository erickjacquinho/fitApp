import { Text } from '@/components/ui/text';
import React, { forwardRef, useId } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

export interface LabeledInputProps extends TextInputProps {
  label: string;
  errorText?: string;
  isError?: boolean;
  containerClassName?: string;
}

export const LabeledInput = forwardRef<TextInput, LabeledInputProps>(
  ({ label, errorText, isError, containerClassName, className, ...props }, ref) => {
    const hasError = isError || !!errorText;
    const inputId = useId();
    const labelId = `${inputId}-label`;

    return (
      <View className={twMerge(clsx('flex-col gap-2', containerClassName))}>
        <Label nativeID={labelId} className={hasError ? 'text-tomato-main' : undefined}>
          {label}
        </Label>
        <Input
          ref={ref}
          aria-labelledby={labelId}
          aria-invalid={hasError}
          {...props}
          className={twMerge(className, hasError && 'border-tomato-main')}
        />
        {errorText ? (
          <Text variant="caption" color="error">
            {errorText}
          </Text>
        ) : null}
      </View>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';
