import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Header } from '../../src/components/molecules/Header';
import { AddFoodToMealScreen } from '../../src/features/diet/components/AddFoodToMealScreen';

export default function AddFoodToMealRoute() {
  const { mealId, foodId } = useLocalSearchParams<{ mealId: string; foodId: string }>();

  if (!mealId || !foodId) {
    return null;
  }

  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Quantidade" showBackButton />
      <AddFoodToMealScreen mealId={mealId} foodId={foodId} />
    </View>
  );
}
