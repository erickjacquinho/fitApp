import { TextInput, TextInputProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

export interface InputProps extends TextInputProps {
  isError?: boolean;
  className?: string;
}

export function Input({ isError, disabled, className, onFocus, onBlur, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  const baseClasses = 'w-full px-4 py-3 bg-white-soft border border-gray-400 text-black-main text-text font-sans';
  
  const focusClasses = focused ? 'border-primary-main ring-2 ring-primary-main/20' : '';
  const errorClasses = isError ? 'border-red-500 ring-2 ring-red-500/20' : '';
  const disabledClasses = disabled ? 'bg-gray-300 text-gray-500' : '';

  return (
    <TextInput
      editable={!disabled}
      placeholderTextColor="#A0A0A0"
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
