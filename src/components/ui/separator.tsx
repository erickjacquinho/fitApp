import { cn } from '@/lib/utils';
import * as SeparatorPrimitive from '@rn-primitives/separator';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 border-border-soft',
        orientation === 'horizontal'
          ? 'h-0 w-full border-t border-hairline'
          : 'h-full w-0 border-l border-hairline',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
