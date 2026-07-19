import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { BaseCardList } from '@/components/molecules/BaseCardList';

interface ExerciseSummary {
  exerciseId: string;
  name: string;
  volume: number;
  sets: {
    setNumber: number;
    weight: number;
    reps: number;
  }[];
}

interface WorkoutSummaryExerciseListProps {
  exercisesSummary: ExerciseSummary[];
}

export function WorkoutSummaryExerciseList({ exercisesSummary }: WorkoutSummaryExerciseListProps) {
  if (!exercisesSummary || exercisesSummary.length === 0) return null;

  return (
    <View className="mb-section-gap">
      <Text variant="label" className="text-text-secondary px-2 mb-2 uppercase tracking-wider">
        Resumo do Treino
      </Text>

      <View className="gap-y-4">
        {exercisesSummary.map((ex) => (
          <View key={ex.exerciseId} className="flex-1">
            <Text variant="subtitle" className="text-text-primary font-bold px-2 mb-2">
              {ex.name}
            </Text>
            
            <View>
              {ex.sets.map((set, index) => {
                const isFirst = index === 0;
                const isLast = index === ex.sets.length - 1;
                
                return (
                  <BaseCardList 
                    key={set.setNumber}
                    isFirst={isFirst}
                    isLast={isLast}
                  >
                    <View className="flex-row items-center flex-1">
                      <View className="w-6 h-6 rounded-full bg-surface-elevated border border-border-subtle items-center justify-center mr-3">
                        <Text variant="caption" className="text-text-secondary font-bold">
                          {set.setNumber}
                        </Text>
                      </View>
                      <Text variant="text" className="text-text-primary font-semibold">
                        {set.weight} kg <Text variant="caption" className="text-text-secondary">x</Text> {set.reps}
                      </Text>
                    </View>
                  </BaseCardList>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
