import { router } from 'expo-router';
import { TrainingHomeScreen } from '../../src/features/training/components/TrainingHomeScreen';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Plus, History } from 'lucide-react-native';

export default function TrainingTab() {
  return (
    <Screen
      header={
        <Header 
          title="Planos de Treino" 
          headerLeft={
            <Button variant="ghost" size="icon" onPress={() => router.push('/training/history')}>
              <Icon as={History} size={24} />
            </Button>
          }
          headerRight={
            <Button variant="ghost" size="icon" onPress={() => router.push('/training/create-program')}>
              <Icon as={Plus} size={24} />
            </Button>
          }
        />
      }
      scrollable={true}
      withPadding={true}
    >
      <TrainingHomeScreen />
    </Screen>
  );
}
