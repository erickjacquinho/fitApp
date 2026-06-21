import { FoodBankScreen } from '../../src/features/diet/components/FoodBankScreen';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

export default function FoodBankRoute() {
  const { mealId } = useLocalSearchParams<{ mealId?: string }>();
  
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Food Bank" showBackButton />
      <FoodBankScreen mealId={mealId} />
    </View>
  );
}
