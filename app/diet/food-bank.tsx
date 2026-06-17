import { FoodBankScreen } from '../../src/features/diet/components/FoodBankScreen';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';

export default function FoodBankRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Food Bank" showBackButton />
      <FoodBankScreen />
    </View>
  );
}
