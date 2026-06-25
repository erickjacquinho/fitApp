import React, { useState } from 'react';
import { MainTabScreen } from '../../../components/organisms/main-tab-screen';
import { Icon } from '@/components/ui/icon';
import { View, ScrollView, UIManager, Platform, LayoutChangeEvent } from 'react-native';
import { useMenu } from '../hooks/useMenu';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS 
} from 'react-native-reanimated';

import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import { Q } from '@nozbe/watermelondb';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { DailyBalance } from './DailyBalance';
import { MealCard } from './MealCard';
import { MealService } from '../services/meal-service';

import { DateSelector } from '../../../components/molecules/DateSelector';
import { Apple, CalendarDays } from 'lucide-react-native';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Skeleton } from '@/components/ui/skeleton';

interface MenuScreenProps {
  meals: Meal[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getTheoreticalY = (
  id: string,
  orderVal: string[],
  heightsVal: Record<string, number>,
  spacing: number
) => {
  'worklet';
  let y = 0;
  for (let i = 0; i < orderVal.length; i++) {
    const currentId = orderVal[i];
    if (currentId === id) {
      return y;
    }
    y += (heightsVal[currentId] || 0) + spacing;
  }
  return y;
};

const recalculateOrder = (
  activeId: string,
  currentY: number,
  orderVal: string[],
  heightsVal: Record<string, number>,
  spacing: number
) => {
  'worklet';
  let accumY = 0;
  let newIndex = 0;
  
  for (let i = 0; i < orderVal.length; i++) {
    const id = orderVal[i];
    const itemHeight = heightsVal[id] || 0;
    
    const midPoint = accumY + itemHeight / 2;
    if (currentY < midPoint) {
      newIndex = i;
      break;
    }
    accumY += itemHeight + spacing;
    newIndex = i;
  }
  
  const currentIndex = orderVal.indexOf(activeId);
  if (currentIndex !== newIndex && currentIndex !== -1) {
    const nextOrder = [...orderVal];
    nextOrder.splice(currentIndex, 1);
    nextOrder.splice(newIndex, 0, activeId);
    return nextOrder;
  }
  return null;
};

interface DraggableMealItemProps {
  id: string;
  order: Animated.SharedValue<string[]>;
  heights: Animated.SharedValue<Record<string, number>>;
  activeId: Animated.SharedValue<string | null>;
  spacing: number;
  onDragStart: () => void;
  onDragEnd: (newOrder: string[]) => void;
  children: React.ReactNode;
}

function DraggableMealItem({
  id,
  order,
  heights,
  activeId,
  spacing,
  onDragStart,
  onDragEnd,
  children
}: DraggableMealItemProps) {
  const dragY = useSharedValue(0);
  const startY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const handleLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && heights.value[id] !== h) {
      heights.value = {
        ...heights.value,
        [id]: h
      };
    }
  };

  const longPressGesture = Gesture.LongPress()
    .minDuration(350)
    .maxDist(15)
    .onStart(() => {
      isDragging.value = true;
      activeId.value = id;
      runOnJS(onDragStart)();
      
      const initialY = getTheoreticalY(id, order.value, heights.value, spacing);
      startY.value = initialY;
      dragY.value = initialY;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (!isDragging.value) return;
      const currentY = startY.value + event.translationY;
      dragY.value = currentY;

      const nextOrder = recalculateOrder(id, currentY, order.value, heights.value, spacing);
      if (nextOrder) {
        order.value = nextOrder;
      }
    })
    .onEnd(() => {
      if (!isDragging.value) return;
      isDragging.value = false;
      activeId.value = null;

      const finalY = getTheoreticalY(id, order.value, heights.value, spacing);
      dragY.value = withSpring(finalY, { damping: 15 }, (finished) => {
        if (finished) {
          runOnJS(onDragEnd)(order.value);
        }
      });
    });

  const dragGesture = Gesture.Sequence(longPressGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const isActive = activeId.value === id;
    const isAnyDragging = activeId.value !== null;

    if (isActive) {
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        transform: [{ translateY: dragY.value }],
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 6,
      };
    } else {
      const targetY = getTheoreticalY(id, order.value, heights.value, spacing);
      return {
        position: isAnyDragging ? 'absolute' : 'relative',
        left: 0,
        right: 0,
        top: 0,
        transform: [{ translateY: isAnyDragging ? withSpring(targetY, { damping: 15 }) : 0 }],
        zIndex: 1,
      };
    }
  });

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View 
        onLayout={handleLayout} 
        style={animatedStyle}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

function MenuScreenComponent({ meals, selectedDate, onSelectDate }: MenuScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const order = useSharedValue<string[]>([]);
  const heights = useSharedValue<Record<string, number>>({});
  const activeId = useSharedValue<string | null>(null);

  const { dailyMacros, deleteMeal, isReady } = useMenu(meals, selectedDate);

  React.useEffect(() => {
    order.value = meals.map(m => m.id);
  }, [meals]);

  const handleDragEnd = React.useCallback(async (newOrderIds: string[]) => {
    setScrollEnabled(true);
    try {
      await MealService.updateMealOrder(newOrderIds);
    } catch (error) {
      console.error('Error updating meal order:', error);
    }
  }, []);

  const handleDelete = async () => {
    if (selectedMealId) {
      await deleteMeal(selectedMealId);
      setDeleteModalVisible(false);
      setSelectedMealId(null);
    }
  };

  const confirmDelete = React.useCallback((id: string) => {
    setSelectedMealId(id);
    setDeleteModalVisible(true);
  }, []);

  const handleAddMeal = async () => {
    const nextNumber = meals.length + 1;
    await MealService.createWithItems({ name: `Refeição ${nextNumber}`, quantity: 1, preparationState: '' }, [], selectedDate);
  };

  React.useEffect(() => {
    const ensureDefaultMeal = async () => {
      if (meals.length === 0) {
        await MealService.createWithItems({ name: 'Refeição 1', quantity: 1, preparationState: '' }, [], selectedDate);
      }
    };

    const migrateOldMeals = async () => {
      const oldMeals = await database.get<Meal>('meals').query(Q.where('target_date', null)).fetch();
      if (oldMeals.length > 0) {
        await database.write(async () => {
          const updates = oldMeals.map(m => m.prepareUpdate(meal => {
            meal.targetDate = selectedDate;
          }));
          await database.batch(...updates);
        });
      }
    };

    migrateOldMeals().then(() => ensureDefaultMeal());
  }, [meals.length, selectedDate]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const isAnyDragging = activeId.value !== null;
    if (!isAnyDragging) {
      return { height: 'auto' };
    }
    
    let totalHeight = 0;
    const ids = order.value;
    const spacing = 16;
    for (let i = 0; i < ids.length; i++) {
      totalHeight += (heights.value[ids[i]] || 0) + spacing;
    }
    if (ids.length > 0) {
      totalHeight -= spacing;
    }
    return {
      height: totalHeight,
    };
  });

  const showSkeleton = !isReady || meals.length === 0;

  return (
    <MainTabScreen
      customTitle={<DateSelector selectedDate={selectedDate} onSelectDate={onSelectDate} />}
      isFlatList={false}
      scrollable={false}
      disablePadding={true}
      headerLeft={undefined}
      headerRight={
        <View className="-mr-2 flex-row items-center gap-2">
          <Button accessibilityLabel="Ver calendário" variant="ghost" size="icon" onPress={() => router.push('/diet/calendar-summary')}>
            <Icon as={CalendarDays} size={24} />
          </Button>
          <Button accessibilityLabel="Abrir banco de alimentos" variant="ghost" size="icon" onPress={() => router.push('/diet/food-bank')}>
            <Icon as={Apple} size={24} />
          </Button>
        </View>
      }
    >
      <View className="flex-1 bg-background pt-4 flex-col">
        <GestureHandlerRootView className="flex-1">
          <ScrollView
            scrollEnabled={scrollEnabled}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 16, paddingHorizontal: 16 }}
          >
            <DailyBalance 
              protein={dailyMacros.protein}
              carbs={dailyMacros.carbs}
              fat={dailyMacros.fat}
              calories={dailyMacros.calories}
            />

            <Animated.View style={containerAnimatedStyle} className="mt-4 relative">
              {meals.map((item) => (
                <DraggableMealItem
                  key={item.id}
                  id={item.id}
                  order={order}
                  heights={heights}
                  activeId={activeId}
                  spacing={16}
                  onDragStart={() => setScrollEnabled(false)}
                  onDragEnd={handleDragEnd}
                >
                  <MealCard 
                    meal={item} 
                    onDelete={confirmDelete} 
                  />
                </DraggableMealItem>
              ))}
            </Animated.View>

            {meals.length > 0 && (
              <View className="mt-4">
                <Button variant="outline" onPress={handleAddMeal}>
                  <Text>Adicionar refeição</Text>
                </Button>
              </View>
            )}
          </ScrollView>
        </GestureHandlerRootView>
      </View>

      {showSkeleton && (
        <View className="absolute inset-0 bg-background z-10 pt-4 px-screen-x">
          <View className="mb-6 overflow-hidden border border-border-subtle rounded-lg bg-surface flex-row items-center justify-between py-4 px-card">
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-1 items-center">
                <Skeleton className="size-24 rounded-full" />
              </View>
              <View className="flex-1 items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
              </View>
              <View className="flex-1 items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
              </View>
              <View className="flex-1 items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
              </View>
            </View>
          </View>
          
          <View className="gap-0">
            {[1, 2, 3].map((i) => (
              <View key={i} className="mb-6 overflow-hidden border border-border-subtle rounded-lg bg-surface flex-col">
                <View className="px-4 h-control-md bg-surface flex-row justify-between items-center">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-12" />
                </View>
                <View className="h-1 w-full flex-row overflow-hidden bg-border-subtle">
                  <Skeleton className="h-1 w-full" />
                </View>
                <View className="flex-col">
                  <View className="gap-0">
                    <Skeleton className="h-food-card w-full rounded-none border-b border-border-subtle" />
                    <Skeleton className="h-food-card w-full rounded-none border-b border-border-subtle" />
                  </View>
                  <View className="px-4 h-control-md flex-row justify-between items-center bg-surface border-b border-border-subtle">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </View>
                  <View className="h-control-md flex-row items-center justify-center w-full">
                    <Skeleton className="h-4 w-40" />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      <ConfirmModal 
        visible={deleteModalVisible}
        title="Remover refeição?"
        description="Esta ação removerá a refeição do seu menu diário."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        isDestructive
      />
    </MainTabScreen>
  );
}

const enhance = withObservables(['selectedDate'], ({ selectedDate }: { selectedDate: string }) => ({
  meals: database.get<Meal>('meals').query(
    Q.where('target_date', selectedDate),
    Q.sortBy('order_index', Q.asc),
    Q.sortBy('created_at', Q.asc)
  )
}));

export const MenuScreen = enhance(MenuScreenComponent);
