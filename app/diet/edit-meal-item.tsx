import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { EditMealItemScreen } from '../../src/features/diet/components/EditMealItemScreen';

export default function EditMealItemRoute() {
  const { mealItemId, foodId } = useLocalSearchParams<{ mealItemId: string; foodId: string }>();

  if (!mealItemId || !foodId) {
    return null;
  }

  return (
    <Screen
      header={<Header title="Editar quantidade" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <EditMealItemScreen mealItemId={mealItemId} foodId={foodId} />
    </Screen>
  );
}
