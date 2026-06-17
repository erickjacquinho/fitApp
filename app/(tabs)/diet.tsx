import { View } from 'react-native';
import { Button } from '../../src/components/atoms/Button';
import { Typography } from '../../src/components/atoms/Typography';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function DietPage() {
  return (
    <MainTabScreen
      eyebrow="Macros e refeições"
      title="Dieta"
      description="Planejamento alimentar, refeições e acompanhamento de macros no mesmo fluxo."
    >
      <View className="gap-3">
        <View className="rounded-md border border-soft bg-component-card-bg p-4">
          <Typography variant="subtitle">Plano do dia</Typography>
          <Typography variant="text" color="muted">
            Espaço preparado para refeições, alimentos e metas nutricionais.
          </Typography>
        </View>
        <Button title="Adicionar refeição" />
      </View>
    </MainTabScreen>
  );
}
