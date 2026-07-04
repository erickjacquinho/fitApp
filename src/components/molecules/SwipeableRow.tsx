import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
  SharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/ui/icon';
import { Trash2, Pencil, Archive, Share2, Copy, Pin } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';
import type { ThemeColors } from '@/tokens/theme';
import { cn } from '@/lib/utils';

export type SwipeFeature = 'delete' | 'edit' | 'archive' | 'share' | 'duplicate' | 'pin';

type ThemeColorToken = Exclude<keyof ThemeColors, 'chartSeries'>;

interface FeatureRegistryEntry {
  icon: LucideIcon;
  label: string;
  bgToken: ThemeColorToken;
  fgToken: ThemeColorToken;
  autoTrigger?: boolean;
  closeOnAutoTrigger?: boolean;
}

const FEATURE_REGISTRY: Record<SwipeFeature, FeatureRegistryEntry> = {
  delete:    { icon: Trash2,    label: 'Excluir',    bgToken: 'error',   fgToken: 'textInverse', autoTrigger: true },
  edit:      { icon: Pencil,    label: 'Editar',     bgToken: 'primary', fgToken: 'textInverse' },
  archive:   { icon: Archive,   label: 'Arquivar',   bgToken: 'warning', fgToken: 'textInverse' },
  share:     { icon: Share2,    label: 'Compartilhar', bgToken: 'info', fgToken: 'textInverse' },
  duplicate: { icon: Copy,      label: 'Duplicar',   bgToken: 'success', fgToken: 'textInverse' },
  pin:       { icon: Pin,       label: 'Fixar',      bgToken: 'warning', fgToken: 'textInverse' },
};

const ACTION_WIDTH = 72;
const AUTO_TRIGGER_PX = 200;

export interface SwipeableRowProps {
  features?: SwipeFeature[];
  handlers?: Partial<Record<SwipeFeature, () => void>>;
  onPress?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function SwipeableRow({
  features = [],
  handlers,
  onPress,
  children,
  className,
}: SwipeableRowProps) {
  const swipeableRef = React.useRef<any>(null);
  const hasAutoTriggered = React.useRef(false);
  const colors = useThemeColors();

  const activeFeatures = (features ?? []).filter(f => handlers?.[f]);
  const totalWidth = activeFeatures.length * ACTION_WIDTH;

  // Cor do primeiro botão do array (que é o visualmente mais à direita por causa do translateX)
  const edgeFeature = activeFeatures.length > 0 ? activeFeatures[0] : null;
  const edgeConfig = edgeFeature ? FEATURE_REGISTRY[edgeFeature] : null;

  // Feature com autoTrigger
  const autoTriggerFeature = activeFeatures.find(f => FEATURE_REGISTRY[f].autoTrigger);
  const autoTriggerHandlerRef = React.useRef<(() => void) | undefined>(undefined);
  autoTriggerHandlerRef.current = autoTriggerFeature ? handlers?.[autoTriggerFeature] : undefined;

  const autoTriggerFeatureRef = React.useRef<SwipeFeature | undefined>(autoTriggerFeature);
  autoTriggerFeatureRef.current = autoTriggerFeature;

  const triggerHaptic = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  // Dispara o auto-delete diretamente (chamado via runOnJS do useAnimatedReaction)
  const fireAutoDelete = React.useCallback(() => {
    if (!hasAutoTriggered.current && autoTriggerHandlerRef.current) {
      hasAutoTriggered.current = true;
      const config = autoTriggerFeatureRef.current ? FEATURE_REGISTRY[autoTriggerFeatureRef.current] : null;
      
      autoTriggerHandlerRef.current();
      
      if (config?.closeOnAutoTrigger) {
        swipeableRef.current?.close();
      }
    }
  }, []);

  const isPastThreshold = React.useRef(false);
  const onThresholdCrossed = React.useCallback((crossed: boolean) => {
    isPastThreshold.current = crossed;
  }, []);

  const handleSwipeableClose = React.useCallback(() => {
    hasAutoTriggered.current = false;
    isPastThreshold.current = false;
  }, []);

  const handleSwipeableWillOpen = React.useCallback(() => {
    if (isPastThreshold.current) {
      fireAutoDelete();
    }
  }, [fireAutoDelete]);

  const renderRightActions = React.useCallback((
    prog: SharedValue<number>,
    drag: SharedValue<number>,
  ) => {
    if (activeFeatures.length === 0) return null;

    return (
      <RightActionsContent
        prog={prog}
        drag={drag}
        activeFeatures={activeFeatures}
        totalWidth={totalWidth}
        autoTriggerEnabled={!!autoTriggerFeature}
        autoTriggerPx={AUTO_TRIGGER_PX}
        onThresholdCrossed={onThresholdCrossed}
        onHaptic={triggerHaptic}
        handlers={handlers}
        colors={colors}
        swipeableRef={swipeableRef}
      />
    );
  }, [activeFeatures, totalWidth, autoTriggerFeature, triggerHaptic, handlers, colors, onThresholdCrossed]);

  const content = <View className={className}>{children}</View>;

  let isFirst = false;
  let isLast = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.isFirst) isFirst = true;
      if (child.props.isLast) isLast = true;
    }
  });

  if (activeFeatures.length === 0) {
    return onPress ? (
      <Pressable onPress={onPress}>{content}</Pressable>
    ) : (
      content
    );
  }

  const swipeableContent = (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={ACTION_WIDTH * 0.4}
      overshootRight={true}
      friction={2}
      containerStyle={edgeConfig ? { backgroundColor: colors[edgeConfig.bgToken] } : undefined}
      onSwipeableWillOpen={handleSwipeableWillOpen}
      onSwipeableClose={handleSwipeableClose}
    >
      {onPress ? (
        <Pressable onPress={onPress}>{content}</Pressable>
      ) : (
        content
      )}
    </ReanimatedSwipeable>
  );

  return (isFirst || isLast) ? (
    <View className={cn(
      "overflow-hidden",
      isFirst && "rounded-t-xl",
      isLast && "rounded-b-xl"
    )}>
      {swipeableContent}
    </View>
  ) : (
    swipeableContent
  );
}

/**
 * Componente interno para os botões do swipe.
 * Usa hooks do Reanimated que precisam estar em um componente React.
 */
function RightActionsContent({
  prog,
  drag,
  activeFeatures,
  totalWidth,
  autoTriggerEnabled,
  autoTriggerPx,
  onThresholdCrossed,
  onHaptic,
  handlers,
  colors,
  swipeableRef,
}: {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  activeFeatures: SwipeFeature[];
  totalWidth: number;
  autoTriggerEnabled: boolean;
  autoTriggerPx: number;
  onThresholdCrossed: (crossed: boolean) => void;
  onHaptic: () => void;
  handlers?: Partial<Record<SwipeFeature, () => void>>;
  colors: ThemeColors;
  swipeableRef: React.RefObject<any>;
}) {
  // Monitora o drag e dispara haptic + auto-delete ao cruzar o threshold
  useAnimatedReaction(
    () => drag.value,
    (currentDrag, previousDrag) => {
      if (!autoTriggerEnabled) return;

      const isAboveThreshold = currentDrag <= -autoTriggerPx;
      const wasAboveThreshold = (previousDrag ?? 0) <= -autoTriggerPx;

      if (isAboveThreshold && !wasAboveThreshold) {
        runOnJS(onHaptic)();
        runOnJS(onThresholdCrossed)(true);
      } else if (!isAboveThreshold && wasAboveThreshold) {
        runOnJS(onThresholdCrossed)(false);
      }
    },
    [autoTriggerEnabled, autoTriggerPx, onHaptic, onThresholdCrossed],
  );

  return (
    <View style={styles.actionsContainer}>
      {activeFeatures.map((feature, index) => {
        const config = FEATURE_REGISTRY[feature];
        const handler = handlers?.[feature];
        if (!handler) return null;

        return (
          <ActionButton
            key={feature}
            label={config.label}
            icon={config.icon}
            bgColor={colors[config.bgToken]}
            fgColor={colors[config.fgToken]}
            handler={handler}
            index={index}
            totalFeatures={activeFeatures.length}
            prog={prog}
            swipeableRef={swipeableRef}
          />
        );
      })}
    </View>
  );
}

/**
 * Cada botão individual com animação de entrada via Reanimated.
 */
function ActionButton({
  label,
  icon,
  bgColor,
  fgColor,
  handler,
  index,
  totalFeatures,
  prog,
  swipeableRef,
}: {
  label: string;
  icon: LucideIcon;
  bgColor: string;
  fgColor: string;
  handler: () => void;
  index: number;
  totalFeatures: number;
  prog: SharedValue<number>;
  swipeableRef: React.RefObject<any>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      prog.value,
      [0, 1],
      [ACTION_WIDTH * (totalFeatures - index), 0],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateX }] };
  });

  return (
    <Reanimated.View
      style={[
        styles.actionButton,
        { backgroundColor: bgColor },
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={() => {
          handler();
          swipeableRef.current?.close();
        }}
        accessibilityLabel={label}
        accessibilityRole="button"
        style={styles.actionPressable}
      >
        <Icon as={icon} size={20} color={fgColor} />
      </Pressable>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  actionButton: {
    width: ACTION_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionPressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
