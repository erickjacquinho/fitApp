import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../../components/ui/text';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { GripVertical } from 'lucide-react-native';
import { cn } from '@/lib/utils';

import { BlockWithSets } from '../hooks/useProgramSummary';

interface WorkoutListItemProps {
  item: BlockWithSets;
  isReordering: boolean;
  drag?: () => void;
  isActive?: boolean;
  onPress?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const WorkoutListItem = ({
  item,
  isReordering,
  drag,
  isActive,
  onPress,
  isFirst = false,
  isLast = false,
}: WorkoutListItemProps) => {
  const { block, validSets, totalSets } = item;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={isReordering ? drag : undefined}
      disabled={isReordering && !drag}
      className={cn(
        'flex-row justify-between items-center active:bg-surface-elevated px-4 py-3 bg-surface',
        'border-border-subtle',
        'border-x border-b',
        isFirst && 'rounded-t-lg border-t',
        isLast && 'rounded-b-lg',
        !isFirst && !isLast && 'rounded-none',
        isActive && 'bg-surface-elevated opacity-70'
      )}
    >
      <View className="flex-row items-center flex-1">
        {isReordering && (
          <Pressable onPressIn={drag} className="p-1 mr-2">
            <GripVertical size={20} color="#71717A" /> 
          </Pressable>
        )}
        <View className="flex-1 mr-3 justify-center gap-1">
          <Text variant="subtitle" className="text-text-primary" numberOfLines={1}>
            {block.name}
          </Text>
          <Text variant="caption" className="text-text-secondary" numberOfLines={1}>
            {validSets} séries válidas / {totalSets} séries totais
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
