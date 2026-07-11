import React from 'react';
import * as Haptics from 'expo-haptics';
import { FEATURE_REGISTRY } from './types';
import type { SwipeFeature } from './types';

export function useSwipeableRow(
  activeFeatures: SwipeFeature[],
  handlers?: Partial<Record<SwipeFeature, () => void>>,
  swipeableRef?: React.RefObject<any>
) {
  const [isSwiped, setIsSwiped] = React.useState(false);
  const [isSwipeActive, setIsSwipeActive] = React.useState(false);
  const hasAutoTriggered = React.useRef(false);
  
  const autoTriggerFeature = activeFeatures.find(f => FEATURE_REGISTRY[f].autoTrigger);
  const autoTriggerHandlerRef = React.useRef<(() => void) | undefined>(undefined);
  autoTriggerHandlerRef.current = autoTriggerFeature ? handlers?.[autoTriggerFeature] : undefined;

  const autoTriggerFeatureRef = React.useRef<SwipeFeature | undefined>(autoTriggerFeature);
  autoTriggerFeatureRef.current = autoTriggerFeature;

  const triggerHaptic = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const fireAutoDelete = React.useCallback(() => {
    if (!hasAutoTriggered.current && autoTriggerHandlerRef.current) {
      hasAutoTriggered.current = true;
      const config = autoTriggerFeatureRef.current ? FEATURE_REGISTRY[autoTriggerFeatureRef.current] : null;
      
      autoTriggerHandlerRef.current();
      
      if (config?.closeOnAutoTrigger && swipeableRef) {
        swipeableRef.current?.close();
      }
    }
  }, [swipeableRef]);

  const isPastThreshold = React.useRef(false);
  const onThresholdCrossed = React.useCallback((crossed: boolean) => {
    isPastThreshold.current = crossed;
  }, []);

  const handleOpenStartDrag = React.useCallback(() => {
    setIsSwipeActive(true);
  }, []);

  const handleSwipeableClose = React.useCallback(() => {
    setIsSwipeActive(false);
    setIsSwiped(false);
    hasAutoTriggered.current = false;
    isPastThreshold.current = false;
  }, []);

  const handleSwipeableWillOpen = React.useCallback(() => {
    setIsSwipeActive(true);
    setIsSwiped(true);
    if (isPastThreshold.current) {
      fireAutoDelete();
    }
  }, [fireAutoDelete]);

  return {
    isSwiped,
    isSwipeActive,
    autoTriggerFeature,
    triggerHaptic,
    onThresholdCrossed,
    handleOpenStartDrag,
    handleSwipeableClose,
    handleSwipeableWillOpen
  };
}
