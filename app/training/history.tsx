import { HistoryScreen } from '../../src/features/training/components/HistoryScreen';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';

export default function HistoryRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Workout History" showBackButton />
      <HistoryScreen />
    </View>
  );
}
