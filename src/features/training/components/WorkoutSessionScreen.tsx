import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CheckCircle2, Circle, Play, Award } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { TrainingProgressBar } from './TrainingProgressBar';
import { ExecuteExerciseModal } from './ExecuteExerciseModal';
import { SessionService } from '../services/session-service';
import { WorkoutService } from '../services/workout-service';
import WorkoutSession from '../../../db/models/WorkoutSession';
import TrainingBlock from '../../../db/models/TrainingBlock';
import Exercise from '../../../db/models/Exercise';
import ExerciseExecution from '../../../db/models/ExerciseExecution';

export function WorkoutSessionScreen() {
  const params = useLocalSearchParams<{ sessionId?: string; blockId?: string }>();
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [block, setBlock] = useState<TrainingBlock | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [executions, setExecutions] = useState<ExerciseExecution[]>([]);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadWorkoutData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      let currentSession: WorkoutSession | null = null;
      
      if (params.sessionId) {
        const details = await SessionService.getSessionDetails(params.sessionId);
        currentSession = details.session;
      } else {
        currentSession = await SessionService.getActiveSession();
      }

      if (!currentSession) {
        router.replace('/training');
        return;
      }

      setSession(currentSession);

      // Load program and its blocks
      const program = await currentSession.program.fetch();
      const blocks = await program.trainingBlocks.fetch();

      // Determine which block to load
      let currentBlock: TrainingBlock | null = null;
      if (params.blockId) {
        currentBlock = blocks.find((b) => b.id === params.blockId) || null;
      }

      // If no block selected (e.g. direct resume), find from executions or default to first
      const sessionExecs = await currentSession.executions.fetch();
      setExecutions(sessionExecs);

      if (!currentBlock) {
        if (sessionExecs.length > 0) {
          // Find which block the executed exercise belongs to
          const firstExec = sessionExecs[0];
          const exercise = await firstExec.exercise.fetch();
          if (exercise) {
            currentBlock = blocks.find((b) => b.id === exercise.blockId) || null;
          }
        }
        
        if (!currentBlock && blocks.length > 0) {
          currentBlock = blocks[0]; // fallback to first block
        }
      }

      if (currentBlock) {
        setBlock(currentBlock);
        const blockExs = await currentBlock.exercises.fetch();
        // Sort by order or just display
        setExercises(blockExs);
      }
    } catch (error) {
      console.error('Error loading session data:', error);
      Alert.alert('Error', 'Failed to load workout details');
    } finally {
      setIsLoading(false);
    }
  }, [params.sessionId, params.blockId]);

  useEffect(() => {
    loadWorkoutData();
  }, [loadWorkoutData]);

  const handleOpenExerciseModal = (exercise: Exercise) => {
    setActiveExercise(exercise);
    setIsModalVisible(true);
  };

  const handleSaveSet = async (setNumber: number, reps: number, weight: number) => {
    if (!session || !activeExercise) return;
    
    await SessionService.logSet(session.id, activeExercise.id, {
      setNumber,
      repsDone: reps,
      weight,
    });
    
    // Refresh executions
    const updatedExecs = await session.executions.fetch();
    setExecutions(updatedExecs);
  };

  const handleDeleteSet = async (setNumber: number) => {
    if (!session || !activeExercise) return;

    await SessionService.deleteSet(session.id, activeExercise.id, setNumber);

    // Refresh executions
    const updatedExecs = await session.executions.fetch();
    setExecutions(updatedExecs);
  };

  const handleFinishWorkout = () => {
    if (!session) return;

    Alert.alert(
      'Finish Session',
      'Are you sure you want to finish your workout session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Finish',
          onPress: async () => {
            try {
              const completedSession = await SessionService.finishSession(session.id);
              router.replace({
                pathname: `/training/details/[id]`,
                params: { id: completedSession.id },
              });
            } catch (err) {
              console.error('Error finishing session:', err);
              Alert.alert('Error', 'Failed to finish session');
            }
          },
        },
      ]
    );
  };

  // Helper selectors
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

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <ActivityIndicator size="large" color="#005B94" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-app">
      <ScrollView className="flex-1 p-4">
        {block && (
          <Typography variant="title" className="mb-2 text-2xl font-bold">
            {block.name} Routine
          </Typography>
        )}

        <TrainingProgressBar
          completed={getCompletedExercisesCount()}
          total={exercises.length}
        />

        <Typography variant="label" className="mb-3 text-gray-500">
          Exercises
        </Typography>

        {exercises.map((exercise) => {
          const exExecs = getExerciseExecutions(exercise.id);
          const completed = isExerciseCompleted(exercise.id, exercise.sets);
          
          return (
            <Card
              key={exercise.id}
              className={`mb-3 p-4 flex-row items-center border ${
                completed ? 'border-success-main/30 bg-success-main/5' : 'border-soft'
              }`}
            >
              <View className="mr-3">
                {completed ? (
                  <CheckCircle2 size={24} color="#2e7d32" />
                ) : (
                  <Circle size={24} color="#ccc" />
                )}
              </View>

              <View className="flex-1">
                <Typography
                  variant="subtitle"
                  className={`text-base font-bold ${completed ? 'line-through text-gray-500' : ''}`}
                >
                  {exercise.name}
                </Typography>
                <Typography variant="caption" color="muted" className="mt-1">
                  Target: {exercise.sets} sets x {exercise.repsMin}-{exercise.repsMax} reps
                  {exercise.advancedTechnique && ` • ${exercise.advancedTechnique}`}
                </Typography>
                <Typography variant="caption" color="highlight" className="mt-0.5">
                  Logged: {exExecs.length}/{exercise.sets} sets
                </Typography>
              </View>

              <Button
                title={exExecs.length > 0 ? 'Edit' : 'Start'}
                variant={completed ? 'outline' : 'primary'}
                size="sm"
                onPress={() => handleOpenExerciseModal(exercise)}
              />
            </Card>
          );
        })}

        {exercises.length === 0 && (
          <View className="my-8 items-center justify-center p-6 bg-component-card-bg border border-soft rounded">
            <Typography variant="text" color="muted" className="text-center">
              No exercises in this workout block.
            </Typography>
          </View>
        )}

        <Button
          title="Finish Workout Session"
          onPress={handleFinishWorkout}
          className="my-6 min-h-control-lg bg-success-main active:bg-success-dark"
        />
      </ScrollView>

      {activeExercise && (
        <ExecuteExerciseModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setActiveExercise(null);
          }}
          exerciseName={activeExercise.name}
          exerciseId={activeExercise.id}
          sessionId={session?.id || ''}
          targetSets={activeExercise.sets}
          repsMin={activeExercise.repsMin}
          repsMax={activeExercise.repsMax}
          repsReserve={activeExercise.repsReserve}
          initialExecutions={getExerciseExecutions(activeExercise.id).map((e) => ({
            setNumber: e.setNumber,
            repsDone: e.repsDone,
            weight: e.weight,
          }))}
          onSaveSet={handleSaveSet}
          onDeleteSet={handleDeleteSet}
        />
      )}
    </View>
  );
}
