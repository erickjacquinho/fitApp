import React from 'react';
import { View, Pressable } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { cn } from '@/lib/utils';

import { SwipeFeature, FEATURE_REGISTRY, ACTION_WIDTH, AUTO_TRIGGER_PX } from './SwipeableRow/types';
import { useSwipeableRow } from './SwipeableRow/useSwipeableRow';
import { RightActionsContent } from './SwipeableRow/SwipeableRowActions';

export type { SwipeFeature };

export interface SwipeableRowProps {
  features?: SwipeFeature[];
  handlers?: Partial<Record<SwipeFeature, () => void>>;
  onPress?: () => void;
  children?: React.ReactNode | ((props: { isSwiped: boolean }) => React.ReactNode);
  className?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export function SwipeableRow({
  features = [],
  handlers,
  onPress,
  children,
  className,
  isFirst = false,
  isLast = false,
}: SwipeableRowProps) {
  const swipeableRef = React.useRef<any>(null);
  const colors = useThemeColors();

  const activeFeatures = (features ?? []).filter(f => handlers?.[f]);
  const totalWidth = activeFeatures.length * ACTION_WIDTH;

  const edgeFeature = activeFeatures.length > 0 ? activeFeatures[0] : null;
  const edgeConfig = edgeFeature ? FEATURE_REGISTRY[edgeFeature] : null;

  const {
    isSwiped,
    isSwipeActive,
    autoTriggerFeature,
    triggerHaptic,
    onThresholdCrossed,
    handleOpenStartDrag,
    handleSwipeableClose,
    handleSwipeableWillOpen
  } = useSwipeableRow(activeFeatures, handlers, swipeableRef);

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
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  }, [activeFeatures, totalWidth, autoTriggerFeature, triggerHaptic, handlers, colors, onThresholdCrossed, isFirst, isLast]);

  const renderedChildren = typeof children === 'function' ? children({ isSwiped }) : children;
  const content = <View className={className}>{renderedChildren}</View>;

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
      containerStyle={isSwipeActive && edgeConfig ? { backgroundColor: colors[edgeConfig.bgToken] } : undefined}
      onSwipeableOpenStartDrag={handleOpenStartDrag}
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
