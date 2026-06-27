import { Screen } from '@/components/ui/screen';
import { SessionDetailsScreen } from '../../../src/features/training/components/SessionDetailsScreen';
import { Header } from '../../../src/components/molecules/Header';

export default function SessionDetailsRoute() {
  return (
    <Screen
      header={<Header title="Resumo do treino" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <SessionDetailsScreen />
    </Screen>
  );
}
