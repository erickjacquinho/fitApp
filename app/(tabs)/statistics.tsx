import { View } from 'react-native';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function StatisticsPage() {
  return (
    <MainTabScreen
      title="Estatísticas"
    >
      <View className="gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumo semanal</CardTitle>
            <CardDescription>
              Aqui entram os gráficos e comparativos principais.
            </CardDescription>
          </CardHeader>
        </Card>
      </View>
    </MainTabScreen>
  );
}
