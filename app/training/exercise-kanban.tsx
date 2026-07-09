import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { WorkoutExerciseKanbanScreen } from '../../src/features/training/components/WorkoutExerciseKanbanScreen';

export default function ExerciseKanbanRoute() {
  const { sessionId, initialExerciseId } = useLocalSearchParams<{
    sessionId: string;
    initialExerciseId: string;
  }>();

  return (
    <WorkoutExerciseKanbanScreen
      sessionId={sessionId || ''}
      initialExerciseId={initialExerciseId || ''}
    />
  );
}
