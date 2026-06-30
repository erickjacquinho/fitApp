import { useEffect, useState } from 'react';
import { database } from '../../../db';
import Exercise from '../../../db/models/Exercise';
import { observeBlockExercises } from '../../../db/queries/program';

export function useBlockExercises(blockId: string) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const subscription = observeBlockExercises(blockId).subscribe({
      next: (data) => {
        setExercises(data);
        setIsLoading(false);
      },
      error: (err) => {
        setError(err);
        setIsLoading(false);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [blockId]);

  const updateExercisesOrder = async (newOrderedExercises: Exercise[]) => {
    // Optimistic update
    setExercises(newOrderedExercises);

    try {
      await database.write(async () => {
        const updates = newOrderedExercises.map((exercise, index) =>
          exercise.prepareUpdate((e) => {
            e.order = index;
          })
        );
        await database.batch(...updates);
      });
    } catch (err) {
      console.error('Failed to update exercise order:', err);
      setError(err instanceof Error ? err : new Error('Failed to update order'));
    }
  };

  return {
    exercises,
    isLoading,
    error,
    updateExercisesOrder,
  };
}
