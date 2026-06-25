import React from 'react';
import { MealForm } from '../../src/features/diet/components/MealForm';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function EditMealRoute() {
  const { mealId } = useLocalSearchParams<{ mealId: string }>();

  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Editar refeição" showBackButton />
      <MealForm mealId={mealId} />
    </View>
  );
}
