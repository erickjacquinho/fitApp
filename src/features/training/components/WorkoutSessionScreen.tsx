import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { TrainingProgressBar } from './TrainingProgressBar';
import { ExecuteExerciseModal } from './ExecuteExerciseModal';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import Exercise from '../../../db/models/Exercise';

export function WorkoutSessionScreen() {
  const params = useLocalSearchParams<{ sessionId?: string; blockId?: string }>();
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    session,
    block,
    exercises,
    isLoading,
    handleSaveSet,
    handleDeleteSet,
    handleFinishWorkout,
    getExerciseExecutions,
    isExerciseCompleted,
    getCompletedExercisesCount,
  } = useWorkoutSession(params.sessionId, params.blockId);

  const handleOpenExerciseModal = (exercise: Exercise) => {
    setActiveExercise(exercise);
    setIsModalVisible(true);
  };

  const handleSaveSetCallback = async (setNumber: number, reps: number, weight: number) => {
    if (!activeExercise) return;
    await handleSaveSet(activeExercise.id, setNumber, reps, weight);
  };

  const handleDeleteSetCallback = async (setNumber: number) => {
    if (!activeExercise) return;
    await handleDeleteSet(activeExercise.id, setNumber);
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
                <Typography variant="caption" className="mt-0.5 text-primary-main">
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
          onSaveSet={handleSaveSetCallback}
          onDeleteSet={handleDeleteSetCallback}
        />
      )}
    </View>
  );
}
