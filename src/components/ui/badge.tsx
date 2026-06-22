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
        default: 'bg-accent-main',
        secondary: 'bg-surface-muted',
        destructive: 'bg-tomato-main',
        outline: 'border-border-soft bg-transparent',
        success: 'bg-success-soft',
        warning: 'bg-warning-soft',
        info: 'bg-info-soft',
        neutral: 'bg-surface-strong',
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
      secondary: 'text-text-main',
      destructive: 'text-text-inverse',
      outline: 'text-text-main',
      success: 'text-success-dark',
      warning: 'text-warning-dark',
      info: 'text-info-dark',
      neutral: 'text-text-main',
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
