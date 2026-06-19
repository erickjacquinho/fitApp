import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from './Typography';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral';

export interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  label: string;
  className?: string;
}

export function Badge({ variant = 'neutral', label, className, ...props }: BadgeProps) {
  const variantClasses = {
    success: 'bg-success-soft',
    warning: 'bg-warning-soft',
    info: 'bg-info-soft',
    neutral: 'bg-gray-300',
  };

  const textColors = {
    success: 'default',
    warning: 'inverse',
    info: 'default',
    neutral: 'default',
  } as const;

  return (
    <View
      className={twMerge(
        clsx('px-2 py-1 rounded-sm self-start', variantClasses[variant], className)
      )}
      {...props}
    >
      <Typography variant="caption" color={textColors[variant]} className="font-bold">
        {label}
      </Typography>
    </View>
  );
}
