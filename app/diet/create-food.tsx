import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { FoodForm } from '../../src/features/diet/components/FoodForm';

export default function CreateFoodRoute() {
  return (
    <Screen
      header={<Header title="Novo alimento" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <FoodForm />
    </Screen>
  );
}
