import * as React from 'react';
import { View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { Text } from './text';

const ITEM_HEIGHT = 56; // Taller touch target for comfortable swipe
const VISIBLE_ITEMS = 5;

export interface WheelPickerProps<T> {
  data: T[];
  value: T;
  onValueChange: (value: T) => void;
  keyExtractor: (item: T, index: number) => string;
  renderLabel: (item: T) => string;
}

export function WheelPicker<T>({
  data,
  value,
  onValueChange,
  keyExtractor,
  renderLabel,
}: WheelPickerProps<T>) {
  const scrollY = useSharedValue(0);

  // Calcula o offset inicial para começar na posição correta
  const initialIndex = React.useMemo(() => {
    const idx = data.findIndex((d) => d === value);
    return Math.max(0, idx);
  }, [data, value]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Haptic Feedback suave na mudança de index
  useAnimatedReaction(
    () => Math.round(scrollY.value / ITEM_HEIGHT),
    (currentIndex, prevIndex) => {
      if (prevIndex !== null && currentIndex !== prevIndex) {
        runOnJS(Haptics.selectionAsync)();
      }
    },
    [scrollY]
  );

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (data[index] && data[index] !== value) {
      onValueChange(data[index]);
    }
  };

  const spacerHeight = ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;
  const containerHeight = ITEM_HEIGHT * VISIBLE_ITEMS;

  return (
    <View 
      className="w-full justify-center items-center overflow-hidden relative"
      style={{ height: containerHeight }}
    >
      {/* Faixa destacada no fundo simulando o foco */}
      <View 
        className="absolute w-full bg-surface-elevated rounded-xl" 
        style={{ height: ITEM_HEIGHT }} 
      />

      <Animated.FlatList
        data={data}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingVertical: spacerHeight,
        }}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <WheelItem
            index={index}
            scrollY={scrollY}
            label={renderLabel(item)}
          />
        )}
      />
    </View>
  );
}

const WheelItem = ({
  index,
  scrollY,
  label,
}: {
  index: number;
  scrollY: Animated.SharedValue<number>;
  label: string;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const itemPosition = index * ITEM_HEIGHT;
    const distanceFromCenter = Math.abs(scrollY.value - itemPosition);

    // O item no centro tem tamanho padrão (1). 
    // Os anteriores e próximos encolhem de forma fluida.
    const scale = interpolate(
      distanceFromCenter,
      [0, ITEM_HEIGHT, ITEM_HEIGHT * 2, ITEM_HEIGHT * 3],
      [1, 0.75, 0.5, 0.4],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      distanceFromCenter,
      [0, ITEM_HEIGHT, ITEM_HEIGHT * 2, ITEM_HEIGHT * 3],
      [1, 0.4, 0.15, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    };
  });

  return (
    <Animated.View style={animatedStyle} className="w-full">
      {/* Usamos text-2xl aqui para que o scale=1 fique num tamanho bem legível */}
      <Text className="text-2xl font-bold text-primary text-center">
        {label}
      </Text>
    </Animated.View>
  );
};
