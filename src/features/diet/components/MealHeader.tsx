import React from 'react';
import { View, GestureResponderEvent } from 'react-native';
import { Text } from '@/components/ui/text';
import { LongPressable } from '@/components/ui/long-pressable';

export interface MealHeaderProps {
  name: string;
  time?: string | null;
  onLongPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
}

export function MealHeader({ name, time, onLongPress = () => {}, children }: MealHeaderProps) {
  return (
    <LongPressable 
      onLongPress={onLongPress}
      className="px-4 h-control-md flex-row justify-between items-center"
    >
      <Text variant="subtitle" className="text-text-primary">{name}</Text>
      {(time !== undefined || children) && (
        <View className="flex-row items-center gap-3">
          {time !== undefined && (
            <Text variant="label" className="text-text-primary">{time}</Text>
          )}
          {children}
        </View>
      )}
    </LongPressable>
  );
}
