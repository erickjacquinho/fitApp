import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { BlockDetailsScreen } from '@/features/training/components/BlockDetailsScreen';

export default function BlockDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return (
    <Screen
      header={<Header title="Detalhes do Treino" showBackButton />}
      scrollable={false}
      withPadding={true}
    >
      <BlockDetailsScreen blockId={id} />
    </Screen>
  );
}
