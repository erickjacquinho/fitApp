import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
  SharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Icon } from '@/components/ui/icon';
import type { LucideIcon } from 'lucide-react-native';
import type { ThemeColors } from '@/tokens/theme';
import { FEATURE_REGISTRY, ACTION_WIDTH, SwipeFeature } from './types';

export interface RightActionsContentProps {
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
  isFirst: boolean;
  isLast: boolean;
}

export function RightActionsContent({
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
  isFirst,
  isLast,
}: RightActionsContentProps) {
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
            isFirst={isFirst}
            isLast={isLast}
          />
        );
      })}
    </View>
  );
}

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
  isFirst,
  isLast,
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
  isFirst: boolean;
  isLast: boolean;
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
        { 
          backgroundColor: bgColor,
          borderTopRightRadius: (isFirst && index === 0) ? 12 : 0,
          borderBottomRightRadius: (isLast && index === 0) ? 12 : 0,
        },
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
    marginTop: 1,
    marginBottom: 1,
  },
  actionPressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
