import { View } from 'react-native';
import { Typography } from '../../src/components/atoms/Typography';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function ProfilePage() {
  return (
    <MainTabScreen
      eyebrow="Conta e metas"
      title="Perfil"
      description="Dados pessoais, objetivos, preferências e configurações gerais do app."
    >
      <View className="gap-3">
        <View className="rounded-md border border-soft bg-component-card-bg p-4">
          <Typography variant="subtitle">Configurações principais</Typography>
          <Typography variant="text" color="muted">
            Base pronta para perfil, metas e ajustes de uso.
          </Typography>
        </View>
      </View>
    </MainTabScreen>
  );
}
