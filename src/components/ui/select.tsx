import { Icon } from '@/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/components/ui/native-only-animated-view';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as SelectPrimitive from '@rn-primitives/select';
import { cssInterop } from 'nativewind';
import { Check, ChevronDown, ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';

cssInterop(SelectPrimitive.Value, { className: 'style' });
cssInterop(SelectPrimitive.ItemText, { className: 'style' });
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { AnimatePresence } from 'moti';
import { PopoverAnimation } from '@/components/ui/popover-animation';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';
import { FocusRing } from './focus-ring';

type Option = SelectPrimitive.Option;

const SelectContext = React.createContext<{
  triggerWidth: number;
  setTriggerWidth: (width: number) => void;
}>({ triggerWidth: 0, setTriggerWidth: () => {} });

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const [triggerWidth, setTriggerWidth] = React.useState(0);
  return (
    <SelectContext.Provider value={{ triggerWidth, setTriggerWidth }}>
      <SelectPrimitive.Root {...props} />
    </SelectContext.Provider>
  );
}

const SelectGroup = SelectPrimitive.Group;

function SelectValue({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value> & {
    className?: string;
  }) {
  const { value } = SelectPrimitive.useRootContext();
  return (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(
        'font-sans text-text leading-body line-clamp-1 flex flex-1 flex-row items-center gap-2 text-left',
        !value ? 'text-text-secondary' : 'text-text-primary',
        className
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  ref,
  className,
  children,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    children?: React.ReactNode;
    size?: 'default' | 'sm';
    'aria-invalid'?: boolean;
  }) {
  const { setTriggerWidth } = React.useContext(SelectContext);
  const { open } = SelectPrimitive.useRootContext();
  const [frame, setFrame] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  return (
    <View className={cn("relative w-full", className?.includes('flex-1') ? 'flex-1' : '')}>
      <FocusRing isFocused={open} layoutFrame={frame} />
      <SelectPrimitive.Trigger
        ref={ref}
        onLayout={(e) => {
          setFrame(e.nativeEvent.layout);
          setTriggerWidth(e.nativeEvent.layout.width);
        }}
        className={cn(
          'border-border-strong bg-surface flex h-input-md w-full min-w-0 min-h-touch-target flex-row items-center justify-between gap-2 rounded-md border px-4 shadow-none transition-colors duration-base',
          Platform.select({
            web: 'aria-invalid:border-error w-full whitespace-nowrap text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
          }),
          props['aria-invalid'] && 'border-error',
          props.disabled && 'opacity-50',
          size === 'sm' && 'h-10 px-3',
          className
        )}
        {...props}>
        <>{children}</>
        <Icon as={ChevronDown} aria-hidden={true} className="text-text-secondary size-5" />
      </SelectPrimitive.Trigger>
    </View>
  );
}

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
    className?: string;
    portalHost?: string;
  }) {
  const { triggerWidth } = React.useContext(SelectContext);
  const { open } = SelectPrimitive.useRootContext();

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <AnimatePresence>
          {open && (
            <SelectPrimitive.Overlay
              forceMount
              style={Platform.select({
                native: StyleSheet.flatten([
                  StyleSheet.absoluteFill,
                  { zIndex: 50 }
                ])
              })}
              className="bg-transparent"
            >
              <SelectPrimitive.Content
                forceMount
                asChild
                position={position}
                {...props}
              >
                <PopoverAnimation
                  style={Platform.select({
                    native: {
                      transformOrigin:
                        props.side === 'top'
                          ? 'bottom'
                          : props.side === 'left'
                            ? 'right'
                            : props.side === 'right'
                              ? 'left'
                              : 'top',
                      width: triggerWidth,
                    },
                    web: undefined,
                  })}
                  className={cn(
                    'bg-surface-elevated border-border-subtle relative z-50 rounded-md border p-1 shadow-floating',
                    Platform.select({
                      web: cn(
                        'w-full animate-in fade-in-0 zoom-in-95 origin-(--radix-select-content-transform-origin) max-h-(--radix-select-content-available-height) overflow-y-auto overflow-x-hidden',
                        props.side === 'bottom' && 'slide-in-from-top-2',
                        props.side === 'top' && 'slide-in-from-bottom-2'
                      ),
                      native: 'p-1',
                    }),
                    position === 'popper' &&
                    Platform.select({
                      web: cn(
                        props.side === 'bottom' && 'translate-y-1',
                        props.side === 'top' && '-translate-y-1'
                      ),
                    }),
                    className
                  )}
                >
                  <TextClassContext.Provider value="text-text-primary">
                    <SelectScrollUpButton />
                    <SelectPrimitive.Viewport
                      className={cn(
                        'p-1',
                        position === 'popper' &&
                        cn(
                          'w-full',
                          Platform.select({
                            web: 'h-[var(--radix-select-trigger-height)] w-[var(--radix-select-trigger-width)]',
                          })
                        )
                      )}
                    >
                      {children}
                    </SelectPrimitive.Viewport>
                    <SelectScrollDownButton />
                  </TextClassContext.Provider>
                </PopoverAnimation>
              </SelectPrimitive.Content>
            </SelectPrimitive.Overlay>
          )}
        </AnimatePresence>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn('text-text-secondary pl-2 pr-2 py-1.5 text-sm font-normal', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'active:bg-surface-disabled group relative flex w-full min-h-touch-target flex-row items-center gap-2 rounded-sm py-2 pl-2 pr-10',
        Platform.select({
          web: 'focus:bg-surface-disabled focus:text-text-primary cursor-default outline-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none',
        }),
        props.disabled && 'opacity-50',
        className
      )}
      {...props}>
      <SelectPrimitive.ItemText className="font-sans text-text leading-body text-text-primary group-active:text-text-primary flex-1 select-none text-left" />
      <View className="absolute right-4 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon as={Check} className="text-text-primary size-4 shrink-0" />
        </SelectPrimitive.ItemIndicator>
      </View>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        'bg-border-subtle -mx-1 my-1 h-px',
        Platform.select({ web: 'pointer-events-none' }),
        className
      )}
      {...props}
    />
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <Icon as={ChevronUpIcon} className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <Icon as={ChevronDownIcon} className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}



export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
