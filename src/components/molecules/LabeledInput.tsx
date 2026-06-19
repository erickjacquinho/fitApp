import React, { forwardRef } from 'react';
import { View, TextInput } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Input, InputProps } from '../atoms/Input';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface LabeledInputProps extends InputProps {
  label: string;
  errorText?: string;
  containerClassName?: string;
}

export const LabeledInput = forwardRef<TextInput, LabeledInputProps>(
  ({ label, errorText, isError, containerClassName, ...props }, ref) => {
    const hasError = isError || !!errorText;

    return (
      <View className={twMerge(clsx('flex-col space-y-1', containerClassName))}>
        <Typography variant="label" color={hasError ? 'error' : 'default'}>
          {label}
        </Typography>
        <Input ref={ref} isError={hasError} {...props} />
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
