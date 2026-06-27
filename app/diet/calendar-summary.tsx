import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { CalendarSummaryScreen } from '../../src/features/diet/components/CalendarSummaryScreen';

export default function CalendarSummaryRoute() {
  return (
    <Screen
      header={<Header title="Histórico" showBackButton />}
      scrollable={false}
      withPadding={true}
    >
      <CalendarSummaryScreen />
    </Screen>
  );
}
