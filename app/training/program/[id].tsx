import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { ProgramSummaryScreen } from '@/features/training/components/ProgramSummaryScreen';

export default function ProgramSummaryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  if (!id) {
    return null;
  }

  return (
    <Screen
      header={<Header title="Resumo do Programa" showBackButton />}
      scrollable={false}
      withPadding={false}
    >
      <ProgramSummaryScreen 
        programId={id} 
        onEditProgram={() => {
          // Navigate to edit program screen (if it exists or just console log for now)
          console.log('Edit program', id);
        }}
        onWorkoutPress={(blockId) => {
          // Navigate to workout details
          router.push(`/training/details/${blockId}`);
        }}
      />
    </Screen>
  );
}
