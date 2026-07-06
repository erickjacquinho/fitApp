import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { BlockWithSets } from '../hooks/useProgramSummary';
import { WorkoutListItem } from './WorkoutListItem';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import TrainingBlock from '../../../db/models/TrainingBlock';



interface ProgramSummaryScreenProps {
  blocks: BlockWithSets[];
  completedSessionsCount: number;
  formattedDate: string;
  updateBlocksOrder: (blocks: TrainingBlock[]) => void;
  onEditProgram: () => void;
  onWorkoutPress: (blockId: string) => void;
  onStartSession: (blockId: string) => void;
}

export const ProgramSummaryScreen = ({
  blocks,
  completedSessionsCount,
  formattedDate,
  updateBlocksOrder,
  onEditProgram,
  onWorkoutPress,
  onStartSession,
}: ProgramSummaryScreenProps) => {

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<BlockWithSets>) => {
    const index = getIndex();
    const isFirst = index === 0;
    const isLast = index === blocks.length - 1;

    return (
      <WorkoutListItem
        item={item}
        isReordering={false}
        drag={drag}
        isActive={isActive}
        isFirst={isFirst}
        isLast={isLast}
        onPress={() => onWorkoutPress(item.block.id)}
        onStartSession={() => onStartSession(item.block.id)}
      />
    );
  };

  return (
    <View className="flex-1 px-4 py-2">
      <View className="mb-6">
        {/* Row 1: Inicio */}
        <View className="flex-row justify-between items-center px-4 py-3 bg-surface border border-border-subtle rounded-t-xl">
          <Text className="text-text-primary">Inicio:</Text>
          <Text className="text-text-primary">{formattedDate}</Text>
        </View>
        {/* Row 2: Concluídos */}
        <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-x border-b border-border-subtle">
          <Text className="text-text-primary">Concluídos:</Text>
          <Text className="text-text-primary">
            {completedSessionsCount} {completedSessionsCount === 1 ? 'treino' : 'treinos'}
          </Text>
        </View>
        {/* Row 3: Frequencia */}
        <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-x border-b border-border-subtle rounded-b-xl">
          <Text className="text-text-primary">Frequencia:</Text>
          <Text className="text-text-primary">
            {blocks.length} {blocks.length === 1 ? 'vez' : 'vezes'}
          </Text>
        </View>
      </View>

      {blocks.length > 0 && (
        <View className="flex-row items-center justify-between mb-4 mt-2">
          <Text variant="subtitle" className="font-bold text-text-primary">
            Meus Treinos
          </Text>
        </View>
      )}

      {blocks.length === 0 ? (
        <View className="flex-1 items-center justify-center py-10">
          <Text className="text-typography-secondary text-center">
            Nenhum bloco de treino neste programa.
          </Text>
          <Button variant="default" className="mt-4" onPress={onEditProgram}>
            <Text>Adicionar Treino</Text>
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
