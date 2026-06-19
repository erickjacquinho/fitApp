import { Pressable, PressableProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from './Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  title: string;
  className?: string;
}

export function Button({ variant = 'primary', size = 'md', title, disabled, className, ...props }: ButtonProps) {
  const baseClasses = 'items-center justify-center rounded-sm border border-transparent';
  
  const sizeClasses = {
    sm: 'min-h-control-sm px-3 py-1',
    md: 'min-h-control-md px-4 py-2',
    lg: 'min-h-control-lg px-6 py-3',
  };

  const variantClasses = {
    primary: 'bg-component-button-primary-bg active:bg-component-button-primary-pressed',
    secondary: 'bg-secondary-main active:bg-secondary-dark',
    outline: 'bg-transparent border-gray-400 active:bg-gray-300',
    ghost: 'bg-transparent active:bg-white-soft',
    danger: 'bg-component-button-danger-bg active:bg-component-button-danger-pressed',
  };

  const disabledClasses = 'bg-gray-300 border-transparent';

  const textColors = {
    primary: 'inverse',
    secondary: 'default',
    outline: 'default',
    ghost: 'default',
    danger: 'inverse',
  } as const;

  return (
    <Pressable
      disabled={disabled}
      className={twMerge(
        clsx(baseClasses, sizeClasses[size], disabled ? disabledClasses : variantClasses[variant], className)
      )}
      {...props}
    >
      <Typography
        variant="label"
        color={disabled ? 'muted' : textColors[variant]}
      >
        {title}
      </Typography>
    </Pressable>
  );
}
