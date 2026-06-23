import { cn } from '@/lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

const textVariants = cva(
  cn('', Platform.select({ web: 'select-text' })),
  {
    variants: {
      variant: {
        default: 'text-text',
        display: 'text-display',
        title: 'text-title',
        subtitle: 'text-subtitle',
        text: 'text-text',
        body: 'text-text',
        highlight: 'text-highlight',
        label: 'text-label',
        caption: 'text-caption',
        h1: 'text-display',
        h2: 'text-title',
        h3: 'text-subtitle',
        h4: 'text-highlight',
        p: 'text-text',
        blockquote: 'border-l border-border-subtle pl-3 text-text italic',
        code: 'rounded-sm bg-surface-disabled px-1 py-1 font-mono text-caption',
        lead: 'text-subtitle',
        large: 'text-subtitle',
        small: 'text-caption',
        muted: 'text-caption',
      },
      color: {
        default: 'text-text-primary',
        muted: 'text-text-secondary',
        accent: 'text-primary',
        success: 'text-success',
        error: 'text-error',
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
