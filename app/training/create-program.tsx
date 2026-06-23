import { ProgramForm } from '../../src/features/training/components/ProgramForm';
import { Header } from '../../src/components/molecules/Header';
import { View } from 'react-native';

export default function CreateProgramRoute() {
  return (
    <View className="flex-1 bg-surface">
      <Header title="Novo programa" showBackButton />
      <ProgramForm />
    </View>
  );
}
