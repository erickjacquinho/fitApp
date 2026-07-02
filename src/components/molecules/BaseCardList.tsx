import React from 'react';
import { View } from 'react-native';
import { LongPressable } from '@/components/ui/long-pressable';
import { cn } from '@/lib/utils';

export interface BaseCardListProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
  className?: string;
  testID?: string;
}

export function BaseCardList({
  children,
  onPress,
  onLongPress,
  disabled = false,
  isFirst = false,
  isLast = false,
  isActive = false,
  isSelected = false,
  className,
  testID,
}: BaseCardListProps) {
  return (
    <LongPressable
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || (!onPress && !onLongPress)}
      className={cn(
        'flex-row justify-between items-center px-4 py-3 bg-surface',
        (onPress || onLongPress) && !disabled && 'active:bg-surface-elevated',
        'border-border-subtle border-x border-b',
        isFirst && 'border-t rounded-t-xl',
        isLast && 'rounded-b-xl',
        isActive && 'bg-surface-elevated opacity-70',
        isSelected && 'bg-selected',
        className
      )}
    >
      {children}
    </LongPressable>
  );
}
