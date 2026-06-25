import { Icon } from '@/components/ui/icon';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';
import * as React from 'react';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuSubTrigger({
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
        'text-sm select-none group-active:text-text-primary',
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

function DropdownMenuSubContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  const { open } = DropdownMenuPrimitive.useSubContext();

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPrimitive.SubContent forceMount asChild {...props}>
          <MotiView
            from={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'timing', duration: open ? 150 : 120 }}
            style={{ transformOrigin: 'center' }}
            className={cn(
              'bg-surface-elevated border-border-subtle overflow-hidden rounded-md border p-1 shadow-floating',
              Platform.select({
                web: 'animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fade-in-0 data-[state=closed]:zoom-out-95 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin) z-50 min-w-[8rem]',
              }),
              className
            )}
          >
            {children}
          </MotiView>
        </DropdownMenuPrimitive.SubContent>
      )}
    </AnimatePresence>
  );
}

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function DropdownMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
    overlayStyle?: StyleProp<ViewStyle>;
    overlayClassName?: string;
    portalHost?: string;
  }) {
  const { open, onOpenChange } = DropdownMenuPrimitive.useRootContext();
  const insets = useSafeAreaInsets();

  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <AnimatePresence>
          {open && (
            <DropdownMenuPrimitive.Overlay
              forceMount
              closeOnPress={true}
              onTouchStart={() => onOpenChange(false)}
              style={Platform.select({
                web: overlayStyle ?? undefined,
                native: overlayStyle
                  ? StyleSheet.flatten([
                    StyleSheet.absoluteFill,
                    overlayStyle as typeof StyleSheet.absoluteFill,
                  ])
                  : StyleSheet.absoluteFill,
              })}
              className={cn('bg-transparent', overlayClassName)}>
              <DropdownMenuPrimitive.Content
                forceMount
                asChild
                insets={{ top: insets.top, bottom: insets.bottom, left: 16, right: 16 }}
                onTouchStart={(e) => e.stopPropagation()}
                {...props}
              >
                <MotiView
                  from={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'timing', duration: open ? 150 : 120 }}
                  style={{ transformOrigin: 'center' }}
                  className={cn(
                    'bg-surface-elevated border-border-subtle min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-floating',
                    Platform.select({
                      web: cn(
                        'animate-in fade-in-0 zoom-in-95 max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) z-50 cursor-default',
                        props.side === 'bottom' && 'slide-in-from-top-2',
                        props.side === 'top' && 'slide-in-from-bottom-2'
                      ),
                    }),
                    className
                  )}
                >
                  <TextClassContext.Provider value="text-text-primary">
                    {children}
                  </TextClassContext.Provider>
                </MotiView>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Overlay>
          )}
        </AnimatePresence>
      </FullWindowOverlay>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    className?: string;
    inset?: boolean;
    variant?: 'default' | 'destructive';
  }) {
  return (
    <TextClassContext.Provider
      value={cn(
        'select-none text-sm text-text-primary group-active:text-text-primary',
        variant === 'destructive' && 'text-error group-active:text-error'
      )}>
      <DropdownMenuPrimitive.Item
        className={cn(
          'active:bg-surface-disabled group relative flex flex-row items-center gap-2 rounded-sm px-2 py-2 sm:py-1.5',
          Platform.select({
            web: cn(
              'focus:bg-surface-disabled focus:text-text-primary cursor-default outline-none data-[disabled]:pointer-events-none',
              variant === 'destructive' && 'focus:bg-error/10 dark:focus:bg-error/20'
            ),
          }),
          variant === 'destructive' && 'active:bg-error/10 dark:active:bg-error/20',
          props.disabled && 'opacity-50',
          inset && 'pl-8',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
    children?: React.ReactNode;
  }) {
  return (
    <TextClassContext.Provider value="text-sm text-text-primary select-none group-active:text-text-primary">
      <DropdownMenuPrimitive.CheckboxItem
        className={cn(
          'active:bg-surface-disabled group relative flex flex-row items-center gap-2 rounded-sm py-2 pl-8 pr-2 sm:py-1.5',
          Platform.select({
            web: 'focus:bg-surface-disabled focus:text-text-primary cursor-default outline-none data-[disabled]:pointer-events-none',
          }),
          props.disabled && 'opacity-50',
          className
        )}
        {...props}>
        <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <Icon
              as={Check}
              className={cn(
                'text-text-primary size-4',
                Platform.select({ web: 'pointer-events-none' })
              )}
            />
          </DropdownMenuPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </DropdownMenuPrimitive.CheckboxItem>
    </TextClassContext.Provider>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
    children?: React.ReactNode;
  }) {
  return (
    <TextClassContext.Provider value="text-sm text-text-primary select-none group-active:text-text-primary">
      <DropdownMenuPrimitive.RadioItem
        className={cn(
          'active:bg-surface-disabled group relative flex flex-row items-center gap-2 rounded-sm py-2 pl-8 pr-2 sm:py-1.5',
          Platform.select({
            web: 'focus:bg-surface-disabled focus:text-text-primary cursor-default outline-none data-[disabled]:pointer-events-none',
          }),
          props.disabled && 'opacity-50',
          className
        )}
        {...props}>
        <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <View className="bg-text-primary h-2 w-2 rounded-full" />
          </DropdownMenuPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </DropdownMenuPrimitive.RadioItem>
    </TextClassContext.Provider>
  );
}

function DropdownMenuLabel({
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
        'text-text-primary px-2 py-2 text-sm font-medium sm:py-1.5',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
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

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn('text-text-secondary ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
