import React from 'react';
import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className, ...props }: DividerProps) {
  const isHorizontal = orientation === 'horizontal';
  return (
    <View
      className={twMerge(
        clsx(
          'bg-soft',
          isHorizontal ? 'h-[1px] w-full' : 'w-[1px] h-full',
          className
        )
      )}
      {...props}
    />
  );
}
