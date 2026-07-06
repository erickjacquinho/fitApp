import React, { useState } from 'react';
import { View, ActivityIndicator, Pressable, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TrainingProgressBar } from './TrainingProgressBar';
import { ExerciseColumn } from './ExerciseColumn';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { useThemeColors } from '../../../hooks/use-theme-colors';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing } from 'react-native-reanimated';

export function WorkoutSessionScreen() {
  const params = useLocalSearchParams<{ sessionId?: string; blockId?: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const { primary } = useThemeColors();
  const { width } = Dimensions.get('window');

  const {
    block,
    exercises,
    isLoading,
    handleSaveSet,
    handleDeleteSet,
    handleFinishWorkout,
    getExerciseExecutions,
    getCompletedExercisesCount,
    feedback,
    setFeedback,
    clearFeedback,
  } = useWorkoutSession(params.sessionId, params.blockId);

  const progress = useSharedValue(0);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const onConfirmFinish = async () => {
    try {
      await handleFinishWorkout();
    } catch {
      setFeedback({
        type: 'error',
        title: 'Erro ao finalizar',
        message: 'Não foi possível salvar a sessão. Tente novamente.',
      });
    }
  };

  const handleHoldStart = () => {
    progress.value = withTiming(1, {
      duration: 1500,
      easing: Easing.linear,
    }, (finished) => {
      if (finished) {
        progress.value = 0; // reset
        runOnJS(onConfirmFinish)();
      }
    });
  };

  const handleHoldEnd = () => {
    if (progress.value < 1) {
      progress.value = withTiming(0, { duration: 200 });
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
    <View className="flex-1 py-4 justify-between">
      <View className="px-4">
        {block && (
          <Text variant="title" className="mb-2 font-bold">
            Treino {block.name}
          </Text>
        )}

        <TrainingProgressBar
          completed={getCompletedExercisesCount()}
          total={exercises.length}
        />

        {/* Modular, monochromatic PaginationDots positioned cleanly */}
        <View className="mt-2 mb-4 items-center">
          <PaginationDots total={exercises.length} active={activeIndex} />
        </View>
      </View>

      {exercises.length > 0 ? (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={{ width }}>
              <ExerciseColumn
                exercise={item}
                executions={getExerciseExecutions(item.id)}
                onSaveSet={handleSaveSet}
                onDeleteSet={handleDeleteSet}
              />
            </View>
          )}
          className="flex-1"
        />
      ) : (
        <View className="flex-1 justify-center px-4">
          <Card className="my-8 items-center justify-center py-10 border-dashed">
            <Text variant="text" className="text-text-secondary text-center">
              Nenhum exercício neste bloco de treino.
            </Text>
          </Card>
        </View>
      )}

      {/* Persistent Hold to Finish Button at the bottom */}
      <View className="px-4 pb-content-bottom">
        <Pressable
          onPressIn={handleHoldStart}
          onPressOut={handleHoldEnd}
          className="my-3 min-h-control-lg bg-success rounded-md overflow-hidden justify-center items-center relative active:opacity-90"
        >
          <Animated.View 
            className="absolute left-0 top-0 bottom-0 bg-text-inverse opacity-35" 
            style={animatedProgressStyle} 
          />
          <Text variant="label" className="text-text-inverse font-bold z-10">
            Segure para finalizar treino
          </Text>
        </Pressable>
      </View>

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
