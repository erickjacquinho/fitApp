import * as React from 'react';
import { Platform, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

export function DropdownMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DropdownMenuPrimitive.Content>, 'children'> & {
  children?: React.ReactNode;
  portalHost?: string;
  overlayClassName?: string;
  overlayStyle?: StyleProp<ViewStyle>;
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
