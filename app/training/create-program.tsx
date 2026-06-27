import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { ProgramForm } from '../../src/features/training/components/ProgramForm';

export default function CreateProgramRoute() {
  return (
    <Screen
      header={<Header title="Novo programa" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <ProgramForm />
    </Screen>
  );
}
