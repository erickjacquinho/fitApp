import { cn } from '@/lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

const textVariants = cva(
  cn('font-sans', Platform.select({ web: 'select-text' })),
  {
    variants: {
      variant: {
        default: 'text-text font-regular leading-body tracking-normal',
        display: 'text-display font-black leading-display tracking-tight',
        title: 'text-title font-bold leading-title tracking-tight',
        subtitle: 'text-subtitle font-semibold leading-subtitle tracking-normal',
        text: 'text-text font-regular leading-body tracking-normal',
        highlight: 'text-highlight font-semibold leading-body tracking-normal',
        label: 'text-label font-bold leading-label tracking-label uppercase',
        caption: 'text-caption font-regular leading-caption tracking-normal',
        h1: 'text-display font-black leading-display tracking-tight',
        h2: 'text-title font-bold leading-title tracking-tight',
        h3: 'text-subtitle font-semibold leading-subtitle tracking-normal',
        h4: 'text-text font-bold leading-body tracking-normal',
        p: 'text-text font-regular leading-body tracking-normal',
        blockquote: 'border-l border-border-soft pl-3 text-text italic leading-body',
        code: 'rounded-sm bg-surface-muted px-1 py-1 font-mono text-caption font-semibold',
        lead: 'text-subtitle font-regular leading-subtitle',
        large: 'text-subtitle font-semibold leading-subtitle',
        small: 'text-caption font-semibold leading-caption',
        muted: 'text-caption font-regular leading-caption',
      },
      color: {
        default: 'text-text-main',
        muted: 'text-text-muted',
        accent: 'text-accent-main',
        success: 'text-success-main',
        error: 'text-tomato-main',
        inverse: 'text-text-inverse',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
    },
  }
);

type TextVariantProps = VariantProps<typeof textVariants>;
type TextVariant = NonNullable<TextVariantProps['variant']>;

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  blockquote: Platform.select({ web: 'blockquote' as Role }),
  code: Platform.select({ web: 'code' as Role }),
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = React.ComponentProps<typeof RNText> &
  React.RefAttributes<typeof RNText> &
  TextVariantProps & {
    asChild?: boolean;
  };

function Text({
  className,
  asChild = false,
  variant = 'default',
  color,
  ...props
}: TextProps) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot : RNText;
  const resolvedColor = color ?? (variant === 'highlight' ? 'accent' : 'default');

  return (
    <Component
      className={cn(textVariants({ variant, color: resolvedColor }), textClass, className)}
      role={variant ? ROLE[variant] : undefined}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      {...props}
    />
  );
}

export { Text, TextClassContext, textVariants };
export type { TextProps, TextVariantProps };
