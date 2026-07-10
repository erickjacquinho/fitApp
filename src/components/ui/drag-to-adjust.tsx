import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ChevronsUpDown } from 'lucide-react-native';

type DragToAdjustProps<T> = {
  data: { value: T; label: string }[];
  selectedIndex: number;
  onIndexChanged: (index: number) => void;
  sensitivity?: number; 
};

export function DragToAdjust<T>({
  data,
  selectedIndex,
  onIndexChanged,
  sensitivity = 25, 
}: DragToAdjustProps<T>) {
  const startIndex = useSharedValue(selectedIndex);
  const currentIndex = useSharedValue(selectedIndex);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const updateJS = (newIdx: number) => {
    onIndexChanged(newIdx);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startIndex.value = currentIndex.value;
    })
    .onUpdate((e) => {
      // Movimento PARA CIMA (negativo no eixo Y) AUMENTA o valor
      const deltaSteps = Math.round(-e.translationY / sensitivity);
      let nextIndex = startIndex.value + deltaSteps;
      
      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= data.length) nextIndex = data.length - 1;

      if (nextIndex !== currentIndex.value) {
        currentIndex.value = nextIndex;
        runOnJS(triggerHaptic)();
        runOnJS(updateJS)(nextIndex);
      }
    });

  useEffect(() => {
    currentIndex.value = selectedIndex;
  }, [selectedIndex, currentIndex]);

  const currentItem = data[selectedIndex];

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View className="items-center justify-center py-6 bg-surface-elevated border border-border-control rounded-2xl w-full active:opacity-90">
        <Text variant="h1" className="font-bold text-primary mb-2">
          {currentItem?.label ?? ''}
        </Text>
        <View className="flex-row items-center gap-1.5 opacity-60">
          <ChevronsUpDown size={16} color="#888" />
          <Text variant="caption" className="text-secondary font-semibold uppercase tracking-wider">
            Deslize para ajustar
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
