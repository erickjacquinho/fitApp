import * as React from 'react';
import { View, Dimensions, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths, getDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withDecay,
  withSpring,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { animationTokens, motionPatterns } from '@/tokens/animations';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCREEN_PADDING = 16;
const CONTAINER_PADDING = 8;
const GAP = 6;
const VISIBLE_DAYS = 7;

// Base width calculation for 7 days fitting within the unified card container
const AVAILABLE_WIDTH = SCREEN_WIDTH - (2 * SCREEN_PADDING) - (2 * CONTAINER_PADDING);
const BASE_DAY_WIDTH = (AVAILABLE_WIDTH - GAP * (VISIBLE_DAYS - 1)) / VISIBLE_DAYS;
const DAY_WIDTH = Math.max(42, Math.round(BASE_DAY_WIDTH));

interface DayPillProps {
  day: Date;
  isSelected: boolean;
  isToday: boolean;
  dayWidth: number;
  onSelect: (day: Date) => void;
}

function DayPill({ day, isSelected, isToday, dayWidth, onSelect }: DayPillProps) {
  const pressScale = useSharedValue(1);
  const selectionProgress = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    selectionProgress.value = withSpring(isSelected ? 1 : 0, animationTokens.physics.spring.snappy);
  }, [isSelected, selectionProgress]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = pressScale.value + (selectionProgress.value * 0.035);
    return {
      transform: [{ scale }],
    };
  });

  const handlePressIn = React.useCallback(() => {
    pressScale.value = withTiming(animationTokens.physics.activeScale, {
      duration: animationTokens.duration.fast,
      easing: animationTokens.easing.entrance,
    });
  }, [pressScale]);

  const handlePressOut = React.useCallback(() => {
    pressScale.value = withSpring(1, motionPatterns.interactive.pressOut);
  }, [pressScale]);

  const handlePress = React.useCallback(() => {
    Haptics.selectionAsync().catch(() => {});
    onSelect(day);
  }, [day, onSelect]);

  const dayLabel = format(day, "EEEE, d 'de' MMMM", { locale: ptBR });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={dayLabel}
        accessibilityState={{ selected: isSelected }}
        className={cn(
          'flex-col items-center justify-between rounded-2xl h-20 py-2 min-h-touch-target',
          isSelected 
            ? 'bg-primary shadow-xs' 
            : 'bg-transparent'
        )}
        style={{ width: dayWidth }}
      >
        <Text 
          variant="caption" 
          className={cn(
            'capitalize font-semibold tracking-tight text-xs',
            isSelected ? 'text-text-inverse opacity-90' : 'text-text-secondary'
          )}
        >
          {format(day, 'eee', { locale: ptBR }).substring(0, 3)}
        </Text>
        <Text 
          variant="h4" 
          className={cn(
            'font-extrabold text-base',
            isSelected ? 'text-text-inverse' : 'text-text-primary'
          )}
        >
          {format(day, 'd')}
        </Text>
        {isToday ? (
          <View 
            className={cn(
              'w-1.5 h-1.5 rounded-full mb-0.5',
              isSelected ? 'bg-text-inverse' : 'bg-primary'
            )} 
          />
        ) : (
          <View className="w-1.5 h-1.5 mb-0.5" />
        )}
      </Pressable>
    </Animated.View>
  );
}

export interface WeeklyCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (newDate: Date) => void;
  onJumpToToday: () => void;
}

export function WeeklyCalendar({
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
  onJumpToToday,
}: WeeklyCalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = React.useMemo(() => {
    let days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const realToday = new Date();
    
    // Only scroll up to today + 1 day
    if (
      monthStart.getFullYear() === realToday.getFullYear() &&
      monthStart.getMonth() === realToday.getMonth()
    ) {
      days = days.slice(0, getDate(realToday) + 1);
    } else if (monthStart > realToday) {
      days = [];
    }
    return days;
  }, [monthStart, monthEnd]);

  const isNextMonthDisabled = 
    currentDate.getFullYear() > new Date().getFullYear() || 
    (currentDate.getFullYear() === new Date().getFullYear() && currentDate.getMonth() >= new Date().getMonth());

  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const MAX_TRANSLATE = 0;
  const contentWidth = daysInMonth.length * DAY_WIDTH + (daysInMonth.length > 0 ? (daysInMonth.length - 1) * GAP : 0);
  const viewportWidth = AVAILABLE_WIDTH;
  const MIN_TRANSLATE = -(Math.max(0, contentWidth - viewportWidth));

  // Reaction to catch inertia overshoot at boundary limits and trigger smooth elastic pull-back
  useAnimatedReaction(
    () => ({ pos: translateX.value, dragging: isDragging.value }),
    (state) => {
      if (!state.dragging) {
        if (state.pos > MAX_TRANSLATE + 1) {
          translateX.value = withSpring(MAX_TRANSLATE, motionPatterns.gesture.elasticReturn);
        } else if (state.pos < MIN_TRANSLATE - 1) {
          translateX.value = withSpring(MIN_TRANSLATE, motionPatterns.gesture.elasticReturn);
        }
      }
    }
  );

  // Smooth spring scroll to selected date when it changes
  React.useEffect(() => {
    if (
      selectedDate.getFullYear() === currentDate.getFullYear() &&
      selectedDate.getMonth() === currentDate.getMonth()
    ) {
      const index = getDate(selectedDate) - 1;
      let targetX = -(index * (DAY_WIDTH + GAP));

      // Adjust so the selected day is centered
      const centerOffset = (AVAILABLE_WIDTH - DAY_WIDTH) / 2;
      targetX += centerOffset;

      if (targetX > MAX_TRANSLATE) targetX = MAX_TRANSLATE;
      if (targetX < MIN_TRANSLATE) targetX = MIN_TRANSLATE;

      translateX.value = withSpring(targetX, motionPatterns.gesture.elasticReturn);
    }
  }, [selectedDate, currentDate, MIN_TRANSLATE, translateX]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      contextX.value = translateX.value;
    })
    .onUpdate((event) => {
      let nextX = contextX.value + event.translationX;
      // Soft elastic boundary resistance during touch dragging
      if (nextX > MAX_TRANSLATE) {
        nextX = MAX_TRANSLATE + (nextX - MAX_TRANSLATE) * 0.25;
      } else if (nextX < MIN_TRANSLATE) {
        nextX = MIN_TRANSLATE + (nextX - MIN_TRANSLATE) * 0.25;
      }
      translateX.value = nextX;
    })
    .onEnd((event) => {
      isDragging.value = false;
      if (translateX.value > MAX_TRANSLATE) {
        translateX.value = withSpring(MAX_TRANSLATE, motionPatterns.gesture.elasticReturn);
      } else if (translateX.value < MIN_TRANSLATE) {
        translateX.value = withSpring(MIN_TRANSLATE, motionPatterns.gesture.elasticReturn);
      } else {
        // High fluid inertia horizontal glide using standardized motion patterns
        translateX.value = withDecay({
          velocity: event.velocityX * motionPatterns.gesture.velocityMultiplier,
          deceleration: motionPatterns.gesture.decayDeceleration,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isDragging.value ? 0.99 : 1, animationTokens.physics.spring.gentle);
    return {
      transform: [
        { translateX: translateX.value },
        { scale },
      ],
    };
  });

  const handleJumpToTodayPress = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    onJumpToToday();
  }, [onJumpToToday]);

  const handlePrevMonthPress = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onMonthChange(subMonths(currentDate, 1));
  }, [currentDate, onMonthChange]);

  const handleNextMonthPress = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onMonthChange(addMonths(currentDate, 1));
  }, [currentDate, onMonthChange]);

  const formattedMonth = React.useMemo(() => {
    return format(currentDate, 'MMM, yyyy', { locale: ptBR });
  }, [currentDate]);

  return (
    <View className="flex flex-col w-full gap-2.5 mt-2">
      <View className="flex-row items-center justify-between px-screen-x">
        <Button 
          variant="ghost" 
          onPress={handleJumpToTodayPress}
          accessibilityRole="button"
          accessibilityLabel="Ir para a data de hoje"
          className="active:opacity-80"
        >
          <Text className="text-primary font-bold">Hoje</Text>
        </Button>

        <View className="flex-row items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onPress={handlePrevMonthPress}
            accessibilityRole="button"
            accessibilityLabel="Mês anterior"
            className="min-h-touch-target min-w-touch-target active:opacity-80"
          >
            <Icon as={ChevronLeft} size={20} className="text-text-primary" />
          </Button>
          <Animated.View 
            key={formattedMonth} 
            entering={FadeIn.duration(animationTokens.duration.fast)} 
            exiting={FadeOut.duration(animationTokens.duration.fast)}
          >
            <Text variant="large" className="capitalize font-semibold w-28 text-center">
              {formattedMonth}
            </Text>
          </Animated.View>
          <Button 
            variant="ghost" 
            size="icon" 
            onPress={handleNextMonthPress}
            disabled={isNextMonthDisabled}
            accessibilityRole="button"
            accessibilityLabel="Próximo mês"
            className="min-h-touch-target min-w-touch-target active:opacity-80"
          >
            <Icon 
              as={ChevronRight} 
              size={20} 
              className={cn('text-text-primary', isNextMonthDisabled && 'opacity-40')} 
            />
          </Button>
        </View>
      </View>

      <View className="px-screen-x">
        <View className="bg-surface-elevated border border-border-subtle rounded-3xl p-2 overflow-hidden shadow-xs">
          <GestureDetector gesture={panGesture}>
            <View className="overflow-hidden">
              <Animated.View style={[styles.container, animatedStyle]}>
                {daysInMonth.map((day) => {
                  const isSelected = isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, new Date());
                  return (
                    <DayPill
                      key={day.toISOString()}
                      day={day}
                      isSelected={isSelected}
                      isToday={isToday}
                      dayWidth={DAY_WIDTH}
                      onSelect={onDateSelect}
                    />
                  );
                })}
              </Animated.View>
            </View>
          </GestureDetector>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: GAP,
  }
});
