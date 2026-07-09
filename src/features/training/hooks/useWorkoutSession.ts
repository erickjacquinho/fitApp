import { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { SessionService } from '../services/session-service';
import WorkoutSession from '../../../db/models/WorkoutSession';
import TrainingBlock from '../../../db/models/TrainingBlock';
import Exercise from '../../../db/models/Exercise';
import ExerciseExecution from '../../../db/models/ExerciseExecution';
import { PresentationFeedback } from '../types';

export function useWorkoutSession(sessionIdParam?: string, blockIdParam?: string) {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [block, setBlock] = useState<TrainingBlock | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [skippedExerciseIds, setSkippedExerciseIds] = useState<string[]>([]);
  const [executions, setExecutions] = useState<ExerciseExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<PresentationFeedback | null>(null);

  const clearFeedback = () => setFeedback(null);

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

  const handleUpdateSessionTime = async (newStartDate: number, newEndDate?: number | null) => {
    if (!session) return;
    await SessionService.updateSessionTime(session.id, newStartDate, newEndDate);
    const updated = await SessionService.getSessionDetails(session.id);
    setSession(updated.session);
  };

  const getExerciseExecutions = (exerciseId: string) => {
    return executions.filter((e) => e.exerciseId === exerciseId);
  };

  const handleRemoveExerciseFromSession = async (exerciseId: string) => {
    // We only skip it locally for this session
    setSkippedExerciseIds((prev) => [...prev, exerciseId]);
    // Also delete any logged sets for this exercise in this session, if they exist
    const execs = getExerciseExecutions(exerciseId);
    if (session && execs.length > 0) {
      for (const exec of execs) {
        await SessionService.deleteSet(session.id, exerciseId, exec.setNumber);
      }
      const updatedExecs = await session.executions.fetch();
      setExecutions(updatedExecs);
    }
  };

  const isExerciseCompleted = (exerciseId: string, targetSets: number) => {
    const execs = getExerciseExecutions(exerciseId);
    return execs.length >= targetSets && execs.every((e) => e.repsDone > 0 && e.weight > 0);
  };

  const activeExercises = exercises.filter((ex) => !skippedExerciseIds.includes(ex.id));

  const handleReorderExercises = (newOrder: Exercise[]) => {
    // Only update the active exercises in the list, preserving skipped ones in the background if we needed to
    // But since the DraggableFlatList will give us the array of active exercises, we can just replace the whole state
    // with the new order + any skipped ones at the end (or just overwrite the active ones)
    
    // Simplest approach: just update the exercises state by rearranging them
    const skipped = exercises.filter((ex) => skippedExerciseIds.includes(ex.id));
    setExercises([...newOrder, ...skipped]);
  };

  const getCompletedExercisesCount = () => {
    return activeExercises.filter((ex) => isExerciseCompleted(ex.id, ex.sets)).length;
  };

  return {
    session,
    block,
    exercises: activeExercises,
    executions,
    isLoading,
    handleSaveSet,
    handleDeleteSet,
    handleFinishWorkout,
    handleUpdateSessionTime,
    getExerciseExecutions,
    isExerciseCompleted,
    getCompletedExercisesCount,
    handleRemoveExerciseFromSession,
    handleReorderExercises,
    feedback,
    setFeedback,
    clearFeedback,
  };
}
