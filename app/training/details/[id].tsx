import { SessionDetailsScreen } from '../../../src/features/training/components/SessionDetailsScreen';
import { Header } from '../../../src/components/molecules/Header';
import { View } from 'react-native';

export default function SessionDetailsRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Workout Summary" showBackButton />
      <SessionDetailsScreen />
    </View>
  );
}
