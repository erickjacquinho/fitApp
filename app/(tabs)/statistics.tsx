import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export default function StatisticsPage() {
  return (
    <MainTabScreen
      title="Estatísticas"
    >
      <View className="gap-3">
        <Card>
          <CardTitle>Resumo semanal</CardTitle>
          <CardDescription>
            Aqui entram os gráficos e comparativos principais.
          </CardDescription>
        </Card>
      </View>
    </MainTabScreen>
  );
}
