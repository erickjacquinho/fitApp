import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { AddFoodToMealScreen } from './AddFoodToMealScreen';
import { CarouselIndicator } from '../../../components/molecules/CarouselIndicator';
import { Text } from '@/components/ui/text';

export interface BulkAddFoodToMealScreenProps {
  mealId: string;
  foodIds: string[];
}

export function BulkAddFoodToMealScreen({ mealId, foodIds }: BulkAddFoodToMealScreenProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!foodIds || foodIds.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text variant="text" className="text-text-secondary text-center">
          Nenhum alimento selecionado para adicionar.
        </Text>
      </View>
    );
  }

  const currentFoodId = foodIds[currentIndex];
  const isLast = currentIndex === foodIds.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.navigate('/(tabs)/diet');
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <View className="flex-1">
      {/* Carousel Indicator */}
      <View className="py-4 items-center border-b border-border-subtle bg-surface">
        <CarouselIndicator total={foodIds.length} currentIndex={currentIndex} />
        <Text variant="caption" className="text-text-secondary mt-2">
          {currentIndex + 1} de {foodIds.length} alimentos
        </Text>
      </View>

      {/* Form Content - We use key={currentFoodId} to force React to unmount and remount the component, resetting its internal states (like quantityStr) */}
      <Animated.View 
        key={currentFoodId} 
        entering={FadeInRight.duration(300).springify()}
        exiting={FadeOutLeft.duration(200)}
        className="flex-1 px-4"
      >
        <AddFoodToMealScreen 
          mealId={mealId} 
          foodId={currentFoodId} 
          onAdded={handleNext}
        />
      </Animated.View>
    </View>
  );
}
