import { Screen } from '@/components/ui/screen';
import { HistoryScreen } from '../../src/features/training/components/HistoryScreen';
import { Header } from '../../src/components/molecules/Header';

export default function HistoryRoute() {
  return (
    <Screen
      header={<Header title="Histórico de treinos" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <HistoryScreen />
    </Screen>
  );
}
