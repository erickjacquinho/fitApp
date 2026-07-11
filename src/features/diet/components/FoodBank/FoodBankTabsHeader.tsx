import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from "@/components/ui/text";
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { animationTokens } from '@/tokens/animations';
import { cn } from '@/lib/utils';

interface FoodBankTabsHeaderProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  clearSelection: () => void;
}

export function FoodBankTabsHeader({ tabs, activeTab, setActiveTab, clearSelection }: FoodBankTabsHeaderProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const activeIndex = tabs.findIndex(t => t.id === activeTab);
  const tabWidth = containerWidth > 0 ? (containerWidth - 8) / tabs.length : 0;

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: withSpring(activeIndex * tabWidth, animationTokens.physics.spring.snappy)
      }],
      width: tabWidth,
    };
  }, [activeIndex, tabWidth]);

  return (
    <View 
      className="mb-content-gap flex-row items-center rounded-xl bg-surface-elevated p-1"
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {containerWidth > 0 && (
        <Animated.View 
          className="absolute top-1 bottom-1 rounded-lg bg-surface border border-border-subtle"
          style={[{ left: 4 }, animatedIndicatorStyle]}
        />
      )}
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          className="flex-1 items-center justify-center py-2 min-h-touch-target"
          onPress={() => {
            if (activeTab !== tab.id) {
              clearSelection();
              setActiveTab(tab.id);
            }
          }}
        >
          <Text className={cn("font-bold text-label", activeTab === tab.id ? "text-text-primary" : "text-text-secondary")}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
