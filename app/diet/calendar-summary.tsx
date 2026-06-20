import { View } from 'react-native';
import { Header } from '../../src/components/molecules/Header';
import { CalendarSummaryScreen } from '../../src/features/diet/components/CalendarSummaryScreen';

export default function CalendarSummaryRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Histórico" showBackButton />
      <CalendarSummaryScreen />
    </View>
  );
}
