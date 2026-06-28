import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../../components/ui/text';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { GripVertical } from 'lucide-react-native';

interface WorkoutListItemProps {
  block: TrainingBlock;
  isReordering: boolean;
  drag?: () => void;
  isActive?: boolean;
  onPress?: () => void;
}

export const WorkoutListItem = ({
  block,
  isReordering,
  drag,
  isActive,
  onPress,
}: WorkoutListItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={isReordering ? drag : undefined}
      disabled={isReordering && !drag}
      className={`flex-row items-center justify-between p-4 mb-2 rounded-lg ${
        isActive ? 'bg-surface-app-elevated' : 'bg-surface-app'
      } border border-border-default shadow-sm`}
      style={isActive ? { elevation: 5, shadowOpacity: 0.2 } : {}}
    >
      <View className="flex-row items-center gap-3">
        {isReordering && (
          <Pressable onPressIn={drag} className="p-1">
            <GripVertical size={20} color="#71717A" /> 
            {/* TODO: use proper color token for grip */}
          </Pressable>
        )}
        <View>
          <Text className="text-typography-primary font-semibold text-body-md">
            {block.name}
          </Text>
          <Text className="text-typography-secondary text-body-sm">
            Workout {block.order + 1}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
