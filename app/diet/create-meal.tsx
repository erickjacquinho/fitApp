import { MealForm } from '../../src/features/diet/components/MealForm';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';

export default function CreateMealRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="New Meal" showBackButton />
      <MealForm />
    </View>
  );
}
