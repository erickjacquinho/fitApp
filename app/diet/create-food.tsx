import { FoodForm } from '../../src/features/diet/components/FoodForm';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';

export default function CreateFoodRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Novo alimento" showBackButton />
      <FoodForm />
    </View>
  );
}
