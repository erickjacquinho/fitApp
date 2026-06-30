import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { MealForm } from '../../src/features/diet/components/MealForm';

export default function CreateMealRoute() {
  return (
    <Screen
      header={<Header title="Nova refeição" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <MealForm />
    </Screen>
  );
}
