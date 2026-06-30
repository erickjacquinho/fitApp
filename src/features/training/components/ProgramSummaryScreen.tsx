import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { useProgramSummary, BlockWithSets } from '../hooks/useProgramSummary';
import { WorkoutListItem } from './WorkoutListItem';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { Edit2, ArrowDownUp, Check } from 'lucide-react-native';
import { ProgramKanbanEditor } from './ProgramKanbanEditor';
import { useThemeColors } from '../../../hooks/use-theme-colors';
import { Icon } from '@/components/ui/icon';
interface ProgramSummaryScreenProps {
  programId: string;
  onEditProgram: () => void;
  onWorkoutPress: (blockId: string) => void;
}

export const ProgramSummaryScreen = ({
  programId,
  onEditProgram,
  onWorkoutPress,
}: ProgramSummaryScreenProps) => {
  const { program, blocks, isLoading, error, updateBlocksOrder } = useProgramSummary(programId);
  const [isReordering, setIsReordering] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { primary } = useThemeColors();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (error || !program) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-typography-primary text-center">
          {error?.message || 'Program not found'}
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<BlockWithSets>) => {
    const index = getIndex();
    const isFirst = index === 0;
    const isLast = index === blocks.length - 1;

    return (
      <WorkoutListItem
        item={item}
        isReordering={isReordering}
        drag={drag}
        isActive={isActive}
        isFirst={isFirst}
        isLast={isLast}
        onPress={() => !isReordering && onWorkoutPress(item.block.id)}
      />
    );
  };

  return (
    <View className="flex-1 px-4">
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-1">
          <Text variant="subtitle" className="font-bold">
            {program.name}
          </Text>
        </View>
        
        <View className="flex-row gap-2">
          {blocks.length > 1 && (
            <Button
              variant={isReordering ? "default" : "secondary"}
              size="sm"
              onPress={() => setIsReordering(!isReordering)}
            >
              {isReordering ? <Icon as={Check} size={18} className="text-text-inverse" /> : <Icon as={ArrowDownUp} size={18} className="text-text-primary" />}
            </Button>
          )}
          {!isReordering && (
            <Button variant="outline" size="sm" onPress={() => setIsEditMode(!isEditMode)}>
              <Icon as={isEditMode ? Check : Edit2} size={18} className="text-text-primary" />
            </Button>
          )}
        </View>
      </View>

      {blocks.length === 0 ? (
        <View className="flex-1 items-center justify-center py-10">
          <Text className="text-typography-secondary text-center">
            No workouts found for this program.
          </Text>
          <Button variant="default" className="mt-4" onPress={onEditProgram}>
            <Text>Add Workout</Text>
          </Button>
        </View>
      ) : isEditMode ? (
        <ProgramKanbanEditor blocks={blocks.map(b => b.block)} />
      ) : (
        <DraggableFlatList
          data={blocks}
          onDragEnd={({ data }) => updateBlocksOrder(data.map(d => d.block))}
          keyExtractor={(item) => item.block.id}
          renderItem={renderItem}
          containerStyle={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
};
