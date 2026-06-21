import { View } from 'react-native';
import { Header } from '../../src/components/molecules/Header';
import { ProgramListScreen } from '../../src/features/training/components/ProgramListScreen';

export default function ProgramsRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="Programas de Treino" showBackButton />
      <ProgramListScreen />
    </View>
  );
}
