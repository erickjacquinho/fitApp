import { SessionDetailsScreen } from '../../../src/features/training/components/SessionDetailsScreen';
import { Header } from '../../../src/components/molecules/Header';
import { View } from 'react-native';

export default function SessionDetailsRoute() {
  return (
    <View className="flex-1 bg-surface">
      <Header title="Resumo do treino" showBackButton />
      <SessionDetailsScreen />
    </View>
  );
}
