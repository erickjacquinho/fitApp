import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { FoodBankScreen } from '../../src/features/diet/components/FoodBankScreen';
import { useLocalSearchParams } from 'expo-router';

export default function FoodBankRoute() {
  const { mealId } = useLocalSearchParams<{ mealId?: string }>();
  
  return (
    <Screen
      header={<Header title="Banco de alimentos" showBackButton />}
      scrollable={false}
      withPadding={true}
    >
      <FoodBankScreen mealId={mealId} />
    </Screen>
  );
}
