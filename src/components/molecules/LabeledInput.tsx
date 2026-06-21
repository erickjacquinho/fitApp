import React, { forwardRef } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Typography } from '../atoms/Typography';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Input } from "@/components/ui/input";

export interface LabeledInputProps extends TextInputProps {
  label: string;
  errorText?: string;
  isError?: boolean;
  containerClassName?: string;
}

export const LabeledInput = forwardRef<TextInput, LabeledInputProps>(
  ({ label, errorText, isError, containerClassName, className, ...props }, ref) => {
    const hasError = isError || !!errorText;

    return (
      <View className={twMerge(clsx('flex-col space-y-1', containerClassName))}>
        <Typography variant="label" color={hasError ? 'error' : 'default'}>
          {label}
        </Typography>
        <Input 
          ref={ref} 
          {...props} 
          className={twMerge(className, hasError && "border-destructive ring-destructive")} 
        />
        {errorText ? (
          <Typography variant="caption" color="error">
            {errorText}
          </Typography>
        ) : null}
      </View>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';
