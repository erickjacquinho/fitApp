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
  withTiming,
  withDecay,
  Easing,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCREEN_PADDING = 16; // Typically px-4 is 16px
const GAP = 8;
const VISIBLE_DAYS = 6.2;
// Calculate dynamic width so exactly 7 days fit on the screen
const DAY_WIDTH = (SCREEN_WIDTH - 2 * SCREEN_PADDING - GAP * (VISIBLE_DAYS - 1)) / VISIBLE_DAYS;

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
  const hojeScale = useSharedValue(1);

  const MAX_TRANSLATE = 0;
  const contentWidth = daysInMonth.length * DAY_WIDTH + (daysInMonth.length > 0 ? (daysInMonth.length - 1) * GAP : 0);
  const viewportWidth = SCREEN_WIDTH - 2 * SCREEN_PADDING;
  const MIN_TRANSLATE = -(Math.max(0, contentWidth - viewportWidth));

  // Scroll to selected date when it changes
  React.useEffect(() => {
    // Only scroll if the selected date is in the current month we are viewing
    if (
      selectedDate.getFullYear() === currentDate.getFullYear() &&
      selectedDate.getMonth() === currentDate.getMonth()
    ) {
      const index = getDate(selectedDate) - 1;
      let targetX = -(index * (DAY_WIDTH + GAP));

      // Adjust so the selected day is roughly centered if possible
      const centerOffset = (SCREEN_WIDTH - 2 * SCREEN_PADDING - DAY_WIDTH) / 2;
      targetX += centerOffset;

      if (targetX > MAX_TRANSLATE) targetX = MAX_TRANSLATE;
      if (targetX < MIN_TRANSLATE) targetX = MIN_TRANSLATE;

      translateX.value = withSpring(targetX, { damping: 16, stiffness: 120 });
    }
  }, [selectedDate, currentDate, MIN_TRANSLATE, translateX]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
    })
    .onUpdate((event) => {
      let nextX = contextX.value + event.translationX;
      // Rubber-banding
      if (nextX > MAX_TRANSLATE) {
        const overshoot = nextX - MAX_TRANSLATE;
        nextX = MAX_TRANSLATE + (overshoot * 0.3); // Resistance
      } else if (nextX < MIN_TRANSLATE) {
        const overshoot = MIN_TRANSLATE - nextX;
        nextX = MIN_TRANSLATE - (overshoot * 0.3);
      }
      translateX.value = nextX;
    })
    .onEnd((event) => {
      if (translateX.value > MAX_TRANSLATE) {
        translateX.value = withSpring(MAX_TRANSLATE, { damping: 16, stiffness: 120 });
      } else if (translateX.value < MIN_TRANSLATE) {
        translateX.value = withSpring(MIN_TRANSLATE, { damping: 16, stiffness: 120 });
      } else {
        translateX.value = withDecay({
          velocity: event.velocityX,
          clamp: [MIN_TRANSLATE, MAX_TRANSLATE],
          deceleration: 0.994,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleJumpToToday = () => {
    hojeScale.value = withSequence(
      withTiming(0.9, { duration: 50 }),
      withSpring(1, { damping: 12, stiffness: 200 })
    );
    onJumpToToday();
  };

  const hojeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: hojeScale.value }]
  }));

  return (
    <View className="flex flex-col w-full gap-2 mt-4">
      <View className="flex-row items-center justify-between px-screen-x">
        <Animated.View style={hojeAnimatedStyle}>
          <Button variant="link" onPress={handleJumpToToday}>
            <Text className="text-primary font-bold">Hoje</Text>
          </Button>
        </Animated.View>
        <View className="flex-row items-center gap-1">
          <Button variant="ghost" size="icon" onPress={() => onMonthChange(subMonths(currentDate, 1))}>
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
          >
            <Icon 
              as={ChevronRight} 
              size={20} 
              className="text-text-primary" 
            />
          </Button>
        </View>
      </View>

      <GestureDetector gesture={panGesture}>
        <View className="overflow-hidden pl-screen-x pr-screen-x py-1">
          <Animated.View style={[styles.container, animatedStyle]}>
            {daysInMonth.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              return (
                <Pressable
                  key={day.toISOString()}
                  onPress={() => onDateSelect(day)}
                  className={cn(
                    'flex-col items-center justify-center rounded-lg h-20 border',
                    isSelected 
                      ? 'bg-primary border-primary' 
                      : 'bg-surface-elevated border-border-subtle'
                  )}
                  style={{ width: DAY_WIDTH }}
                >
                  <Text 
                    variant="caption" 
                    className={cn(
                      'capitalize mb-1 font-medium',
                      isSelected ? 'text-text-inverse' : 'text-text-secondary'
                    )}
                  >
                    {format(day, 'eee', { locale: ptBR }).substring(0, 3)}
                  </Text>
                  <Text 
                    variant="h4" 
                    className={cn(
                      'font-bold',
                      isSelected ? 'text-text-inverse' : 'text-text-primary'
                    )}
                  >
                    {format(day, 'd')}
                  </Text>
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
