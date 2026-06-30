import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useBlockExercises } from '../hooks/useBlockExercises';
import { ExerciseDraggableItem } from './ExerciseDraggableItem';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { useThemeColors } from '../../../hooks/use-theme-colors';

interface WorkoutColumnEditorProps {
  block: TrainingBlock;
}

export function WorkoutColumnEditor({ block }: WorkoutColumnEditorProps) {
  const { exercises, isLoading, updateExercisesOrder } = useBlockExercises(block.id);
  const { primary } = useThemeColors();
  
  // Define width to fill most of the screen but allow peeking the next column
  // For a pure paging scrollview, we usually set width to the viewport width.
  const { width } = Dimensions.get('window');

  return (
    <View style={{ width }} className="flex-1 px-4">
      <View className="mb-4 bg-surface-elevated p-3 rounded-lg border border-border">
        <Text variant="subtitle" className="font-bold text-center text-text-primary">
          {block.name}
        </Text>
        <Text variant="caption" className="text-text-secondary text-center mt-1">
          {exercises.length} {exercises.length === 1 ? 'exercício' : 'exercícios'}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color={primary} />
        </View>
      ) : exercises.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Nenhum exercício neste treino.</Text>
        </View>
      ) : (
        <DraggableFlatList
          data={exercises}
          onDragEnd={({ data }) => updateExercisesOrder(data)}
          keyExtractor={(item) => item.id}
          renderItem={ExerciseDraggableItem}
          containerStyle={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}
