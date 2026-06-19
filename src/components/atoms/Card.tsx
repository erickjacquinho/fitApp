import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends ViewProps {
  className?: string;
  variant?: 'default' | 'elevated' | 'outline';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  const variantClasses = {
    default: 'bg-component-card-bg border-component-card-border',
    elevated: 'bg-white dark:bg-zinc-900 shadow-floating',
    outline: 'bg-transparent border-soft',
  };

  return (
    <View
      className={twMerge(
        clsx(
          'rounded-md border p-card',
          variantClasses[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </View>
  );
}
