import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { GripVertical } from 'lucide-react-native';
import Exercise from '../../../db/models/Exercise';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ExerciseDraggableItem({ item, drag, isActive }: RenderItemParams<Exercise>) {
  return (
    <Card 
      className={cn(
        "mb-2 p-3 flex-row items-center border border-border bg-surface",
        isActive && "opacity-80 scale-[1.02] shadow-sm border-primary"
      )}
    >
      <Pressable
        onPressIn={drag}
        className="p-2 mr-2"
        hitSlop={8}
      >
        <Icon as={GripVertical} size={20} className="text-text-disabled" />
      </Pressable>
      
      <View className="flex-1">
        <Text variant="label" className="font-bold text-text-primary">
          {item.name}
        </Text>
        <Text variant="caption" className="text-text-secondary mt-1">
          {item.sets} {item.sets === 1 ? 'série' : 'séries'}
        </Text>
      </View>
    </Card>
  );
}
