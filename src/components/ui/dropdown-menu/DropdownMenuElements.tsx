import * as React from 'react';
import { Text } from 'react-native';
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { cn } from '@/lib/utils';

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  className?: string;
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'text-text-primary px-2 py-2 text-base font-medium sm:py-1.5',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('bg-border-subtle -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

export function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn('text-text-secondary ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
}
