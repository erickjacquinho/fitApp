import { TextInput, TextInputProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { COLORS } from './colors';

export interface InputProps extends TextInputProps {
  isError?: boolean;
  className?: string;
}

export function Input({ isError, editable = true, className, onFocus, onBlur, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);
  const isDisabled = !editable;

  const baseClasses = 'w-full px-4 py-3 bg-white-soft border border-gray-400 text-black-main text-text font-sans';

  const focusClasses = focused ? 'border-primary-main ring-2 ring-primary-main/20' : '';
  const errorClasses = isError ? 'border-red-500 ring-2 ring-red-500/20' : '';
  const disabledClasses = isDisabled ? 'bg-gray-300 text-gray-500' : '';

  return (
    <TextInput
      editable={editable}
      placeholderTextColor={COLORS.placeholder}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      className={twMerge(
        clsx(baseClasses, focusClasses, errorClasses, disabledClasses, className)
      )}
      {...props}
    />
  );
}
