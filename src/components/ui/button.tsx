import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';
import { SIZES } from '@/tokens/sizes';

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 rounded-sm shadow-none',
    Platform.select({
      web: "focus-visible:border-accent-main focus-visible:ring-accent-main/30 aria-invalid:ring-tomato-main/20 aria-invalid:border-tomato-main whitespace-nowrap outline-none transition-all focus-visible:ring-2 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-component-button-primary-bg active:bg-component-button-primary-pressed',
          Platform.select({ web: 'hover:bg-component-button-primary-pressed' })
        ),
        destructive: cn(
          'bg-tomato-main active:bg-tomato-dark',
          Platform.select({
            web: 'hover:bg-tomato-dark focus-visible:ring-tomato-main/20',
          })
        ),
        outline: cn(
          'border border-border-strong bg-surface-app active:bg-surface-muted',
          Platform.select({
            web: 'hover:bg-surface-muted',
          })
        ),
        secondary: cn(
          'bg-surface-muted active:bg-surface-strong',
          Platform.select({ web: 'hover:bg-surface-strong' })
        ),
        ghost: cn(
          'active:bg-surface-muted',
          Platform.select({ web: 'hover:bg-surface-muted' })
        ),
        link: '',
      },
      size: {
        default: cn('h-control-md px-4 py-2', Platform.select({ web: 'has-[>svg]:px-3' })),
        sm: cn('h-control-sm gap-2 rounded-sm px-3', Platform.select({ web: 'has-[>svg]:px-2' })),
        lg: cn('h-control-lg rounded-sm px-6', Platform.select({ web: 'has-[>svg]:px-4' })),
        icon: 'h-control-md w-control-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn(
    'text-text-main font-bold font-sans',
    Platform.select({ web: 'pointer-events-none transition-colors' })
  ),
  {
    variants: {
      variant: {
        default: 'text-text-inverse',
        destructive: 'text-text-inverse',
        outline: cn(
          'text-accent-main group-active:text-accent-dark',
          Platform.select({ web: 'group-hover:text-accent-dark' })
        ),
        secondary: 'text-text-main group-active:text-text-main',
        ghost: cn(
          'text-accent-main group-active:text-accent-dark',
          Platform.select({ web: 'group-hover:text-accent-dark' })
        ),
        link: cn(
          'text-accent-main group-active:underline',
          Platform.select({ web: 'underline-offset-4 hover:underline group-hover:underline' })
        ),
      },
      size: {
        default: 'text-text',
        sm: 'text-caption',
        lg: 'text-subtitle',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> & React.RefAttributes<typeof Pressable> & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, style, hitSlop, ...props }: ButtonProps) {
  const resolvedHitSlop =
    hitSlop ??
    (size === 'sm' ? (SIZES.touchTarget - SIZES.controlSmall) / 2 : undefined);

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          props.disabled && 'opacity-50',
          'active:opacity-80', // Fallback feedback effect
          buttonVariants({ variant, size }),
          className
        )}
        role="button"
        hitSlop={resolvedHitSlop}
        style={style}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
