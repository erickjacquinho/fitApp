import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TrainingProgressBar } from './TrainingProgressBar';
import { ExecuteExerciseModal } from './ExecuteExerciseModal';
import { ExerciseListItem } from './ExerciseListItem';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import Exercise from '../../../db/models/Exercise';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { useThemeColors } from '../../../hooks/use-theme-colors';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';

export function WorkoutSessionScreen() {
  const params = useLocalSearchParams<{ sessionId?: string; blockId?: string }>();
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmFinishVisible, setConfirmFinishVisible] = useState(false);
  const { primary } = useThemeColors();

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
    feedback,
    setFeedback,
    clearFeedback,
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

  const handleAttemptFinish = () => {
    setConfirmFinishVisible(true);
  };

  const onConfirmFinish = async () => {
    try {
      setConfirmFinishVisible(false);
      await handleFinishWorkout();
    } catch {
      setFeedback({
        type: 'error',
        title: 'Erro ao finalizar',
        message: 'Não foi possível salvar a sessão. Tente novamente.',
      });
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <View className="py-4 pb-content-bottom">
      {block && (
        <Text variant="title" className="mb-2 font-bold">
          Treino {block.name}
        </Text>
      )}

      <TrainingProgressBar
        completed={getCompletedExercisesCount()}
        total={exercises.length}
      />

      <Text variant="label" className="mb-3 text-text-secondary">
        Exercícios
      </Text>

      {exercises.map((exercise) => {
        const exExecs = getExerciseExecutions(exercise.id);
        const completed = isExerciseCompleted(exercise.id, exercise.sets);
        
        return (
          <ExerciseListItem
            key={exercise.id}
            name={exercise.name}
            setsCount={exExecs.length}
            targetSets={exercise.sets}
            repsMin={exercise.repsMin}
            repsMax={exercise.repsMax}
            advancedTechnique={exercise.advancedTechnique || undefined}
            isCompleted={completed}
            onPress={() => handleOpenExerciseModal(exercise)}
          />
        );
      })}

      {exercises.length === 0 && (
        <Card className="my-8 items-center justify-center py-10 border-dashed">
          <Text variant="text" className="text-text-secondary text-center">
            Nenhum exercício neste bloco de treino.
          </Text>
        </Card>
      )}

      <Button onPress={handleAttemptFinish} className="my-6 min-h-[var(--size-control-lg)] bg-success"><Text>Finalizar treino</Text></Button>

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
          repsReserve={activeExercise.repsReserve ?? undefined}
          initialExecutions={getExerciseExecutions(activeExercise.id).map((e) => ({
            setNumber: e.setNumber,
            repsDone: e.repsDone,
            weight: e.weight,
          }))}
          onSaveSet={handleSaveSetCallback}
          onDeleteSet={handleDeleteSetCallback}
        />
      )}

      <ConfirmModal
        visible={confirmFinishVisible}
        onCancel={() => setConfirmFinishVisible(false)}
        onConfirm={onConfirmFinish}
        title="Finalizar Treino"
        description="Tem certeza que deseja finalizar esta sessão de treino?"
        confirmLabel="Sim, Finalizar"
        cancelLabel="Cancelar"
      />

      <FeedbackDialog
        visible={!!feedback}
        onClose={clearFeedback}
        state={{
          visible: !!feedback,
          title: feedback?.title || '',
          description: feedback?.message || '',
          isError: feedback?.type === 'error'
        }}
      />
    </View>
  );
}
