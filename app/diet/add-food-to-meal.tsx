import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { AddFoodToMealScreen } from '../../src/features/diet/components/AddFoodToMealScreen';

export default function AddFoodToMealRoute() {
  const { mealId, foodId } = useLocalSearchParams<{ mealId: string; foodId: string }>();

  if (!mealId || !foodId) {
    return null;
  }

  return (
    <Screen
      header={<Header title="Quantidade" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <AddFoodToMealScreen mealId={mealId} foodId={foodId} />
    </Screen>
  );
}
