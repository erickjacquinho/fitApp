import { Screen } from '@/components/ui/screen';
import { Header } from '../../src/components/molecules/Header';
import { FoodBankScreen } from '../../src/features/diet/components/FoodBankScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Plus } from 'lucide-react-native';

export default function FoodBankRoute() {
  const { mealId } = useLocalSearchParams<{ mealId?: string }>();
  const router = useRouter();
  
  return (
    <Screen
      header={
        <Header 
          title="Banco de alimentos" 
          showBackButton 
          headerRight={
            <Button
              accessibilityLabel="Criar alimento"
              variant="ghost"
              size="icon"
              onPress={() => router.push('/diet/create-food')}
              className="-mr-1"
            >
              <Icon as={Plus} size={24} className="text-text" />
            </Button>
          }
        />
      }
      scrollable={false}
      withPadding={true}
    >
      <FoodBankScreen mealId={mealId} />
    </Screen>
  );
}
