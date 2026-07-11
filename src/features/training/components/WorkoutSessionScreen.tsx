import React, { useRef } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { ArrowLeft, Check, Plus } from 'lucide-react-native';
import { Header } from '@/components/molecules/Header';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from "@/components/ui/text";
import { MacroExerciseListItem } from './MacroExerciseListItem';
import { DraggableList } from '@/components/organisms/DraggableList';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { useThemeColors } from '../../../hooks/use-theme-colors';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import * as Haptics from 'expo-haptics';

import { WorkoutSessionListHeader } from './WorkoutSession/WorkoutSessionListHeader';
import { EmptySessionCard } from './WorkoutSession/EmptySessionCard';

export function WorkoutSessionScreen() {
  const params = useLocalSearchParams<{ sessionId?: string; blockId?: string }>();
  const { primary } = useThemeColors();

  const {
    session,
    block,
    exercises,
    isLoading,
    handleFinishWorkout,
    getExerciseExecutions,
    handleRemoveExerciseFromSession,
    handleReorderExercises,
    feedback,
    setFeedback,
    clearFeedback,
  } = useWorkoutSession(params.sessionId, params.blockId);

  const navigation = useNavigation();
  const isFinishingRef = useRef(false);

  const onConfirmFinish = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      isFinishingRef.current = true;
      await handleFinishWorkout();
    } catch {
      isFinishingRef.current = false;
      setFeedback({
        type: 'error',
        title: 'Erro ao finalizar',
        message: 'Não foi possível salvar a sessão. Tente novamente.',
      });
    }
  };

  const confirmRemoveExercise = (exerciseId: string, exerciseName: string) => {
    Alert.alert(
      'Remover exercício',
      `Deseja remover ${exerciseName} da sessão atual? Ele não será apagado do plano de treino original.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Remover', 
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            handleRemoveExerciseFromSession(exerciseId);
          }
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Treino em andamento"
        headerLeft={
          <Button
            accessibilityLabel="Voltar"
            variant="ghost"
            size="icon"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.goBack();
            }}
            className="-ml-1"
          >
            <Icon as={ArrowLeft} size={24} className="text-text-primary" />
          </Button>
        }
        headerRight={
          <Button
            accessibilityLabel="Concluir"
            variant="ghost"
            size="icon"
            onPress={onConfirmFinish}
            className="-mr-1"
          >
            <Icon as={Check} size={24} className="text-primary" />
          </Button>
        }
      />

      {exercises.length > 0 ? (
        <DraggableList
          data={exercises}
          onReorder={handleReorderExercises}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <WorkoutSessionListHeader block={block} session={session} />
          }
          renderItem={(item, isActive, drag, index) => {
            const executions = getExerciseExecutions(item.id);
            const completedSets = executions.length;
            const totalSets = Math.max(item.sets, completedSets);
            
            return (
              <MacroExerciseListItem
                exercise={item}
                order={(index ?? 0) + 1}
                completedSets={completedSets}
                totalSets={totalSets}
                isFirst={index === 0}
                isLast={index === exercises.length - 1}
                drag={drag}
                isActive={isActive}
                onReplace={() => console.log('Substituir', item.id)}
                onDelete={() => confirmRemoveExercise(item.id, item.name)}
                onPress={() => {
                  if (session) {
                    router.push({
                      pathname: '/training/exercise-kanban',
                      params: { sessionId: session.id, initialExerciseId: item.id },
                    });
                  }
                }}
              />
            );
          }}
          ListFooterComponent={
            <View className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  console.log('Add exercise');
                }}
              >
                <Icon as={Plus} size={20} className="text-text-primary mr-2" />
                <Text>Adicionar Exercício</Text>
              </Button>
            </View>
          }
        />
      ) : (
        <EmptySessionCard />
      )}

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
