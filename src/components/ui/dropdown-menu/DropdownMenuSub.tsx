import * as React from 'react';
import { Platform } from 'react-native';
import { AnimatePresence } from 'moti';
import { PopoverAnimation } from '@/components/ui/popover-animation';
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  iconClassName,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  children?: React.ReactNode;
  iconClassName?: string;
  inset?: boolean;
}) {
  const { open } = DropdownMenuPrimitive.useSubContext();
  const icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn(
        'text-base select-none group-active:text-text-primary',
        open && 'text-text-primary'
      )}>
      <DropdownMenuPrimitive.SubTrigger
        className={cn(
          'active:bg-surface-disabled group flex flex-row items-center rounded-sm px-2 py-2 sm:py-1.5',
          Platform.select({
            web: 'focus:bg-surface-disabled focus:text-text-primary cursor-default outline-none [&_svg]:pointer-events-none',
          }),
          className,
          open && 'bg-surface-disabled',
          inset && 'pl-8'
        )}
        {...props}>
        <>{children}</>
        <Icon as={icon} className={cn('text-text-primary ml-auto size-4 shrink-0', iconClassName)} />
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
}

export function DropdownMenuSubContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>, 'children'> & {
  children?: React.ReactNode;
}) {
  const { open } = DropdownMenuPrimitive.useSubContext();

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPrimitive.SubContent forceMount asChild {...props}>
          <PopoverAnimation
            style={Platform.select({
              native: { transformOrigin: (props as any).side === 'top' ? 'bottom' : (props as any).side === 'left' ? 'right' : (props as any).side === 'right' ? 'left' : 'top' },
              web: undefined,
            })}
            className={cn(
              'bg-surface-elevated border-border-subtle overflow-hidden rounded-md border p-1 shadow-floating',
              Platform.select({
                web: 'animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fade-in-0 data-[state=closed]:zoom-out-95 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin) z-50 min-w-[8rem]',
              }),
              className
            )}
          >
            {children}
          </PopoverAnimation>
        </DropdownMenuPrimitive.SubContent>
      )}
    </AnimatePresence>
  );
}
