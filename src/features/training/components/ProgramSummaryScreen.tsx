import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { useProgramSummary, BlockWithSets } from '../hooks/useProgramSummary';
import { WorkoutListItem } from './WorkoutListItem';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { Edit2, ArrowDownUp, Check } from 'lucide-react-native';

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

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FF3B30" />
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
              {isReordering ? <Check size={18} color="#FFFFFF" /> : <ArrowDownUp size={18} color="#000000" />}
            </Button>
          )}
          {!isReordering && (
            <Button variant="outline" size="sm" onPress={onEditProgram}>
              <Edit2 size={18} color="#000000" />
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
