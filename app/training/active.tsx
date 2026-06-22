import { WorkoutSessionScreen } from '../../src/features/training/components/WorkoutSessionScreen';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';

export default function ActiveSessionRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Treino em andamento" showBackButton />
      <WorkoutSessionScreen />
    </View>
  );
}
