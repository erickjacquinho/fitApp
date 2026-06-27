import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform } from 'react-native';
import { SIZES } from '@/tokens/sizes';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      hitSlop={props.hitSlop ?? (SIZES.touchTarget - SIZES.iconLarge) / 2}
      className={cn(
        'flex h-6 w-10 shrink-0 flex-row items-center rounded-lg border border-border-strong',
        Platform.select({
          web: 'peer inline-flex outline-none transition-all focus-visible:border-border-control focus-visible:ring-2 focus-visible:ring-border-subtle/50 disabled:cursor-not-allowed',
        }),
        props.checked ? 'bg-primary' : 'bg-surface-disabled',
        props.disabled && 'opacity-50',
        className
      )}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'h-icon-md w-icon-md rounded-md bg-white-pure transition-transform',
          Platform.select({
            web: 'pointer-events-none block ring-0',
          }),
          props.checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
