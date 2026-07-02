import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { ProgramForm } from '@/features/training/components/ProgramForm';

export default function EditProgramRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <Screen
      header={<Header title="Editar Programa" showBackButton />}
      scrollable={false}
      withPadding={false}
    >
      <ProgramForm programId={id} />
    </Screen>
  );
}
