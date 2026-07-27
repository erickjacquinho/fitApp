import * as React from 'react';
import { View, Dimensions, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths, getDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { motionPatterns } from '@/tokens/animations';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCREEN_PADDING = 16;
const GAP = 10;
const VISIBLE_DAYS = 7;
// Base width for 7 days + 14px added width for increased card prominence and personality
const BASE_DAY_WIDTH = (SCREEN_WIDTH - 2 * SCREEN_PADDING - GAP * (VISIBLE_DAYS - 1)) / VISIBLE_DAYS;
const DAY_WIDTH = Math.round(BASE_DAY_WIDTH + 14);

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
  const viewportWidth = SCREEN_WIDTH - 2 * SCREEN_PADDING;
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
      const centerOffset = (SCREEN_WIDTH - 2 * SCREEN_PADDING - DAY_WIDTH) / 2;
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
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View className="flex flex-col w-full gap-2 mt-4">
      <View className="flex-row items-center justify-between px-screen-x">
        <Button 
          variant="ghost" 
          onPress={onJumpToToday}
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
            onPress={() => onMonthChange(subMonths(currentDate, 1))}
            accessibilityRole="button"
            accessibilityLabel="Mês anterior"
            className="min-h-touch-target min-w-[44px] active:opacity-80"
          >
            <Icon as={ChevronLeft} size={20} className="text-text-primary" />
          </Button>
          <Text variant="large" className="capitalize font-semibold w-28 text-center">
            {format(currentDate, 'MMM, yyyy', { locale: ptBR })}
          </Text>
          <Button 
            variant="ghost" 
            size="icon" 
            onPress={() => onMonthChange(addMonths(currentDate, 1))}
            disabled={isNextMonthDisabled}
            accessibilityRole="button"
            accessibilityLabel="Próximo mês"
            className="min-h-touch-target min-w-[44px] active:opacity-80"
          >
            <Icon 
              as={ChevronRight} 
              size={20} 
              className={cn('text-text-primary', isNextMonthDisabled && 'opacity-40')} 
            />
          </Button>
        </View>
      </View>

      <GestureDetector gesture={panGesture}>
        <View className="overflow-hidden pl-screen-x pr-screen-x py-1">
          <Animated.View style={[styles.container, animatedStyle]}>
            {daysInMonth.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              const dayLabel = format(day, "EEEE, d 'de' MMMM", { locale: ptBR });
              return (
                <Pressable
                  key={day.toISOString()}
                  onPress={() => onDateSelect(day)}
                  accessibilityRole="button"
                  accessibilityLabel={dayLabel}
                  accessibilityState={{ selected: isSelected }}
                  className={cn(
                    'flex-col items-center justify-between rounded-xl h-22 py-2.5 border min-h-touch-target active:opacity-80',
                    isSelected 
                      ? 'bg-primary border-primary shadow-sm' 
                      : 'bg-surface-elevated border-border-subtle'
                  )}
                  style={{ width: DAY_WIDTH }}
                >
                  <Text 
                    variant="caption" 
                    className={cn(
                      'capitalize font-semibold tracking-wide',
                      isSelected ? 'text-text-inverse' : 'text-text-secondary'
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
                        'w-1.5 h-1.5 rounded-full',
                        isSelected ? 'bg-text-inverse' : 'bg-primary'
                      )} 
                    />
                  ) : (
                    <View className="w-1.5 h-1.5" />
                  )}
                </Pressable>
              );
            })}
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: GAP,
  }
});
