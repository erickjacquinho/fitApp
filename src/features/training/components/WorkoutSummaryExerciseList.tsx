import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

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
        Resumo dos Exercícios
      </Text>

      <View className="rounded-xl overflow-hidden border border-border-subtle bg-surface">
        {exercisesSummary.map((ex, index) => {
          const isLast = index === exercisesSummary.length - 1;
          return (
            <View 
              key={ex.exerciseId} 
              className={`p-card ${!isLast ? 'border-b border-border-subtle' : ''}`}
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text variant="subtitle" className="text-text-primary font-bold flex-1 pr-2">
                  {ex.name}
                </Text>
                <View className="bg-primary bg-opacity-10 px-2 py-1 rounded border border-primary border-opacity-20">
                  <Text variant="caption" className="text-primary font-bold">
                    {ex.volume.toLocaleString()} kg
                  </Text>
                </View>
              </View>

              <View className="bg-surface-elevated rounded-lg p-3 gap-2 border border-border-subtle">
                {ex.sets.map((set) => (
                  <View key={set.setNumber} className="flex-row justify-between items-center">
                    <Text variant="caption" className="text-text-secondary font-medium">
                      Série {set.setNumber}
                    </Text>
                    <Text variant="text" className="text-text-primary font-semibold">
                      {set.weight} kg <Text variant="caption" className="text-text-secondary">x</Text> {set.reps}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
