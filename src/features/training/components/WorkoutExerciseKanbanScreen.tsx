import React, { useEffect, useRef, useMemo } from 'react';
import { View, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { Header } from '@/components/molecules/Header';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { useThemeColors } from '../../../hooks/use-theme-colors';
import { WorkoutExerciseCard } from './WorkoutExerciseCard';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedScrollHandler, runOnJS } from 'react-native-reanimated';
import { WorkoutTimer } from './WorkoutTimer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface WorkoutExerciseKanbanScreenProps {
  sessionId: string;
  initialExerciseId: string;
}

export function WorkoutExerciseKanbanScreen({
  sessionId,
  initialExerciseId,
}: WorkoutExerciseKanbanScreenProps) {
  const { primary } = useThemeColors();
  const navigation = useNavigation();
  
  const {
    exercises,
    executions,
    session,
    isLoading,
  } = useWorkoutSession(sessionId);

  const flatListRef = useRef<FlatList>(null);

  // Compute the initial scroll index
  const initialIndex = useMemo(() => {
    if (isLoading || exercises.length === 0) return 0;
    const idx = exercises.findIndex((ex) => ex.id === initialExerciseId);
    return idx >= 0 ? idx : 0;
  }, [isLoading, exercises, initialExerciseId]);

  const scrollX = useSharedValue(initialIndex * SCREEN_WIDTH);
  const activeIndexRef = useRef(initialIndex);

  // Keep scrollX in sync once loaded
  useEffect(() => {
    if (!isLoading && exercises.length > 0) {
      scrollX.value = initialIndex * SCREEN_WIDTH;
      activeIndexRef.current = initialIndex;
    }
  }, [isLoading, exercises, initialIndex, scrollX]);

  const triggerHaptic = () => {
    Haptics.selectionAsync();
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / SCREEN_WIDTH);
      if (index >= 0 && index < exercises.length && index !== activeIndexRef.current) {
        activeIndexRef.current = index;
        runOnJS(triggerHaptic)();
      }
    },
  });

  const getItemLayout = (_data: any, index: number) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  const completedSetsCount = executions ? executions.length : 0;
  const totalSetsCount = useMemo(() => {
    return exercises.reduce((acc, ex) => acc + ex.sets, 0);
  }, [exercises]);

  if (isLoading || exercises.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <Screen
      scrollable={false}
      withPadding={false}
      safeAreaEdges={[]}
      header={
        <Header
          title="Registro de Séries"
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
        />
      }
    >
      <View className="flex-1">
        {/* Row with Sets Completed, Pagination Dots, and Timer */}
        <View className="flex-row items-center justify-between px-4 mt-6 mb-6 bg-transparent">
          <View className="flex-1 items-start">
            <Badge variant="secondary" shape="pill">
              <Icon as={Check} size={14} className="text-primary" />
              <Text variant="caption" className="text-text-primary font-mono font-bold tracking-widest mt-0.5">
                {completedSetsCount}/{totalSetsCount}
              </Text>
            </Badge>
          </View>

          <View className="flex-2 items-center">
            <PaginationDots total={exercises.length} scrollX={scrollX} />
          </View>

          <View className="flex-1 items-end">
            {session && (
              <WorkoutTimer 
                startDate={session.startDate} 
                endDate={session.endDate}
              />
            )}
          </View>
        </View>

        <Animated.FlatList
          ref={flatListRef as any}
          data={exercises}
          horizontal
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment="center"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          bounces={true}
          overScrollMode="always"
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          initialScrollIndex={initialIndex}
          getItemLayout={getItemLayout}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ width: SCREEN_WIDTH }} className="flex-1">
                <WorkoutExerciseCard
                  exercise={item}
                />
              </View>
            );
          }}
        />
      </View>
    </Screen>
  );
}
