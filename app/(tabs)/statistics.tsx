import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function StatisticsPage() {
  return (
    <MainTabScreen
      title="Estatísticas"
    >
      <View className="gap-3">
        <View className="rounded-md border border-soft bg-component-card-bg p-4">
          <Text variant="subtitle">Resumo semanal</Text>
          <Text variant="text" color="muted">
            Aqui entram os gráficos e comparativos principais.
          </Text>
        </View>
      </View>
    </MainTabScreen>
  );
}
