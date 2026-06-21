import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Header } from '../../src/components/molecules/Header';
import { EditMealItemScreen } from '../../src/features/diet/components/EditMealItemScreen';

export default function EditMealItemRoute() {
  const { mealItemId, foodId } = useLocalSearchParams<{ mealItemId: string; foodId: string }>();

  if (!mealItemId || !foodId) {
    return null;
  }

  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Editar Quantidade" showBackButton />
      <EditMealItemScreen mealItemId={mealItemId} foodId={foodId} />
    </View>
  );
}
