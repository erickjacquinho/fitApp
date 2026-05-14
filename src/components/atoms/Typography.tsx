import { Text, TextProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type TypographyVariant = 'display' | 'title' | 'subtitle' | 'text' | 'highlight' | 'label' | 'caption';
export type TypographyColor = 'default' | 'muted' | 'success' | 'error' | 'inverse';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  className?: string;
}

export function Typography({ variant = 'text', color = 'default', className, children, ...props }: TypographyProps) {
  const variantClasses = {
    display: 'text-display',
    title: 'text-title',
    subtitle: 'text-subtitle',
    text: 'text-text',
    highlight: 'text-highlight text-primary-main',
    label: 'text-label',
    caption: 'text-caption',
  };

  const colorClasses = {
    default: 'text-black-main',
    muted: 'text-gray-500',
    success: 'text-success-main',
    error: 'text-tomato-main',
    inverse: 'text-white-pure',
  };

  return (
    <Text
      className={twMerge(clsx(variantClasses[variant], colorClasses[color], className))}
      {...props}
    >
      {children}
    </Text>
  );
}
