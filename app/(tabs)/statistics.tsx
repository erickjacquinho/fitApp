import { View } from 'react-native';
import { Typography } from '../../src/components/atoms/Typography';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function StatisticsPage() {
  return (
    <MainTabScreen
      eyebrow="Evolução"
      title="Estatísticas"
      description="Gráficos, comparações e histórico para acompanhar progresso de treino e dieta."
    >
      <View className="gap-3">
        <View className="rounded-md border border-soft bg-component-card-bg p-4">
          <Typography variant="subtitle">Resumo semanal</Typography>
          <Typography variant="text" color="muted">
            Aqui entram os gráficos e comparativos principais.
          </Typography>
        </View>
      </View>
    </MainTabScreen>
  );
}
