import { Screen } from '@/components/ui/screen';
import { WorkoutSessionScreen } from '../../src/features/training/components/WorkoutSessionScreen';
import { Header } from '../../src/components/molecules/Header';

export default function ActiveSessionRoute() {
  return (
    <Screen
      header={<Header title="Treino em andamento" showBackButton />}
      scrollable={false}
      withPadding={false}
    >
      <WorkoutSessionScreen />
    </Screen>
  );
}
