import { View } from 'react-native';
import { Button } from '../../src/components/atoms/Button';
import { Typography } from '../../src/components/atoms/Typography';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function TrainingPage() {
  return (
    <MainTabScreen
      eyebrow="Carga e volume"
      title="Treino"
      description="Treinos, exercícios, cargas e histórico de execução em um fluxo direto."
    >
      <View className="gap-3">
        <View className="rounded-md border border-soft bg-component-card-bg p-4">
          <Typography variant="subtitle">Sessão atual</Typography>
          <Typography variant="text" color="muted">
            Estrutura pronta para lista de treinos e início de sessão.
          </Typography>
        </View>
        <Button title="Novo treino" />
      </View>
    </MainTabScreen>
  );
}
