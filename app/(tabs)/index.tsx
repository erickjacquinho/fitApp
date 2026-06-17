import { View } from 'react-native';
import { Button } from '../../src/components/atoms/Button';
import { Typography } from '../../src/components/atoms/Typography';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function DashboardPage() {
  return (
    <MainTabScreen
      eyebrow="Hoje"
      title="Dashboard"
      description="Resumo rápido do dia, metas ativas e atalhos para as ações principais."
    >
      <View className="gap-6">
        <View className="gap-3">
          <Typography variant="subtitle">
            Visão diária
          </Typography>
          <View className="flex-row gap-grid-gutter">
            <View className="flex-1 rounded-md border border-soft bg-component-card-bg p-4">
              <Typography variant="caption" color="muted">Treino</Typography>
              <Typography variant="subtitle">Planejado</Typography>
            </View>
            <View className="flex-1 rounded-md border border-soft bg-component-card-bg p-4">
              <Typography variant="caption" color="muted">Dieta</Typography>
              <Typography variant="subtitle">No alvo</Typography>
            </View>
          </View>
        </View>

        <View className="gap-3">
          <Typography variant="subtitle">
            Ações rápidas
          </Typography>
          <View className="gap-3">
            <Button title="Registrar treino" />
            <Button title="Adicionar refeição" variant="secondary" />
          </View>
        </View>
      </View>
    </MainTabScreen>
  );
}
