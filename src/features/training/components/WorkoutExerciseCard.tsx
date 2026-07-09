import React from 'react';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import Exercise from '@/db/models/Exercise';

interface WorkoutExerciseCardProps {
  exercise: Exercise;
}

export function WorkoutExerciseCard({ exercise }: WorkoutExerciseCardProps) {
  return (
    <Card className="flex-1 bg-surface p-4 border border-border-subtle m-4 items-center">
      <Text variant="h4" className="text-text-primary font-bold text-center">
        {exercise.name}
      </Text>
    </Card>
  );
}
