import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { BulkAddFoodToMealScreen } from '../../src/features/diet/components/BulkAddFoodToMealScreen';

export default function BulkAddFoodToMealRoute() {
  const { mealId, foodIds } = useLocalSearchParams<{ mealId: string; foodIds: string }>();

  if (!mealId || !foodIds) {
    return null;
  }

  // Parses comma-separated list of IDs
  const parsedFoodIds = foodIds.split(',').filter(Boolean);

  if (parsedFoodIds.length === 0) {
    return null;
  }

  return (
    <Screen
      header={<Header title="Quantidade em Lote" showBackButton />}
      scrollable={true}
      withPadding={false}
    >
      <BulkAddFoodToMealScreen mealId={mealId} foodIds={parsedFoodIds} />
    </Screen>
  );
}
