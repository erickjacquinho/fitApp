import { Icon } from '@/components/ui/icon';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@rn-primitives/accordion';
import { ChevronDown } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';
import Animated, {
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { animationTokens, motionPatterns } from '@/tokens/animations';

function Accordion({
  children,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof AccordionPrimitive.Root>, 'asChild'>) {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root
        {...(props as AccordionPrimitive.RootProps)}
        asChild={Platform.OS !== 'web'}>
        <Animated.View layout={LinearTransition.duration(motionPatterns.expandable.expand.duration as number).easing(motionPatterns.expandable.expand.easing!)}>{children}</Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
}

function AccordionItem({
  children,
  className,
  value,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'border-b border-border-subtle',
        Platform.select({ web: 'last:border-b-0' }),
        className
      )}
      value={value}
      asChild={Platform.OS !== 'web'}
      {...props}>
      <Animated.View
        className="native:overflow-hidden"
        layout={Platform.select({ native: LinearTransition.duration(motionPatterns.expandable.expand.duration as number).easing(motionPatterns.expandable.expand.easing!) })}>
        {children}
      </Animated.View>
    </AccordionPrimitive.Item>
  );
}

const Trigger = Platform.OS === 'web' ? View : Pressable;

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  children?: React.ReactNode;
}) {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(
    () => (isExpanded ? withTiming(1, motionPatterns.expandable.expand) : withTiming(0, motionPatterns.expandable.collapse)),
    [isExpanded]
  );
  const chevronStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${progress.value * 180}deg` }],
    }),
    [progress]
  );

  return (
    <TextClassContext.Provider
      value={cn(
        'text-left text-subtitle font-semibold text-text-primary'
      )}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger {...props} asChild>
          <Trigger
            className={cn(
              'min-h-touch-target flex-row items-center justify-between gap-4 rounded-sm px-4 py-3 active:bg-surface-elevated disabled:opacity-50',
              Platform.select({
                web: 'flex flex-1 outline-none transition-all focus-visible:border-border-control focus-visible:ring-2 focus-visible:ring-border-subtle/50 disabled:pointer-events-none',
              }),
              className
            )}>
            <>{children}</>
            <Animated.View style={chevronStyle}>
              <Icon
                as={ChevronDown}
                size={16}
                className={cn(
                  'shrink-0 text-text-secondary',
                  Platform.select({
                    web: 'pointer-events-none translate-y-0.5 transition-transform duration-200',
                  })
                )}
              />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  return (
    <TextClassContext.Provider value="text-text text-text-primary">
      <AccordionPrimitive.Content
        className={cn(
          'overflow-hidden',
          Platform.select({
            web: isExpanded ? 'animate-accordion-down' : 'animate-accordion-up',
          })
        )}
        {...props}>
        <Animated.View
          exiting={Platform.select({ native: FadeOutUp.duration(motionPatterns.expandable.collapse.duration as number).easing(motionPatterns.expandable.collapse.easing!) })}
          className={cn('px-4 pb-4', className)}>
          {children}
        </Animated.View>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
