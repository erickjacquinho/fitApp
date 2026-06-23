import { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { SessionService } from '../services/session-service';
import WorkoutSession from '../../../db/models/WorkoutSession';
import TrainingBlock from '../../../db/models/TrainingBlock';
import Exercise from '../../../db/models/Exercise';
import ExerciseExecution from '../../../db/models/ExerciseExecution';

export function useWorkoutSession(sessionIdParam?: string, blockIdParam?: string) {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [block, setBlock] = useState<TrainingBlock | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [executions, setExecutions] = useState<ExerciseExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWorkoutData = useCallback(async () => {
    try {
      setIsLoading(true);

      let currentSession: WorkoutSession | null = null;

      if (sessionIdParam) {
        const details = await SessionService.getSessionDetails(sessionIdParam);
        currentSession = details.session;
      } else {
        currentSession = await SessionService.getActiveSession();
      }

      if (!currentSession) {
        router.replace('/training');
        return;
      }

      setSession(currentSession);

      const program = await currentSession.program.fetch();
      const blocks = await program.trainingBlocks.fetch();

      let currentBlock: TrainingBlock | null = null;
      if (blockIdParam) {
        currentBlock = blocks.find((b) => b.id === blockIdParam) || null;
      }

      const sessionExecs = await currentSession.executions.fetch();
      setExecutions(sessionExecs);

      if (!currentBlock) {
        if (sessionExecs.length > 0) {
          const firstExec = sessionExecs[0];
          const exercise = await firstExec.exercise.fetch();
          if (exercise) {
            currentBlock = blocks.find((b) => b.id === exercise.blockId) || null;
          }
        }

        if (!currentBlock && blocks.length > 0) {
          currentBlock = blocks[0];
        }
      }

      if (currentBlock) {
        setBlock(currentBlock);
        const blockExs = await currentBlock.exercises.fetch();
        setExercises(blockExs);
      }
    } catch (error) {
      console.error('Error loading session data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sessionIdParam, blockIdParam]);

  useEffect(() => {
    loadWorkoutData();
  }, [loadWorkoutData]);

  const handleSaveSet = async (exerciseId: string, setNumber: number, reps: number, weight: number) => {
    if (!session) return;

    await SessionService.logSet(session.id, exerciseId, {
      setNumber,
      repsDone: reps,
      weight,
    });

    const updatedExecs = await session.executions.fetch();
    setExecutions(updatedExecs);
  };

  const handleDeleteSet = async (exerciseId: string, setNumber: number) => {
    if (!session) return;

    await SessionService.deleteSet(session.id, exerciseId, setNumber);

    const updatedExecs = await session.executions.fetch();
    setExecutions(updatedExecs);
  };

  const handleFinishWorkout = async () => {
    if (!session) return;
    const completedSession = await SessionService.finishSession(session.id);
    router.replace({
      pathname: `/training/details/[id]`,
      params: { id: completedSession.id },
    });
  };

  const getExerciseExecutions = (exerciseId: string) => {
    return executions.filter((e) => e.exerciseId === exerciseId);
  };

  const isExerciseCompleted = (exerciseId: string, targetSets: number) => {
    const execs = getExerciseExecutions(exerciseId);
    return execs.length >= targetSets && execs.every((e) => e.repsDone > 0 && e.weight > 0);
  };

  const getCompletedExercisesCount = () => {
    return exercises.filter((ex) => isExerciseCompleted(ex.id, ex.sets)).length;
  };

  return {
    session,
    block,
    exercises,
    executions,
    isLoading,
    handleSaveSet,
    handleDeleteSet,
    handleFinishWorkout,
    getExerciseExecutions,
    isExerciseCompleted,
    getCompletedExercisesCount,
  };
}
