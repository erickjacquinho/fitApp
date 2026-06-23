import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, View } from 'react-native';

const badgeVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-1',
    Platform.select({
      web: 'w-fit whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3',
    })
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-surface-elevated',
        destructive: 'bg-error',
        outline: 'border border-border-subtle bg-transparent',
        success: 'bg-success',
        warning: 'bg-warning',
        info: 'bg-info',
        neutral: 'bg-surface-disabled',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-caption font-bold leading-caption', {
  variants: {
    variant: {
      default: 'text-text-inverse',
      secondary: 'text-text-primary',
      destructive: 'text-text-inverse',
      outline: 'text-text-primary',
      success: 'text-text-inverse',
      warning: 'text-text-primary',
      info: 'text-text-inverse',
      neutral: 'text-text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BadgeProps = React.ComponentProps<typeof View> & React.RefAttributes<View> & {
  asChild?: boolean;
} & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
