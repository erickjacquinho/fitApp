import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../../components/ui/text';
import { GripVertical } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { BaseCardList } from '../../../components/molecules/BaseCardList';

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
    <BaseCardList
      onPress={onPress}
      onLongPress={isReordering ? drag : undefined}
      disabled={isReordering && !drag}
      isFirst={isFirst}
      isLast={isLast}
      isActive={isActive}
    >
      <View className="flex-row items-center flex-1">
        {isReordering && (
          <Pressable onPressIn={drag} className="p-1 mr-2">
            <Icon as={GripVertical} size={20} className="text-text-secondary" /> 
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
    </BaseCardList>
  );
};
