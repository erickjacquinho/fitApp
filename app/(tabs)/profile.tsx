import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function ProfilePage() {
  return (
    <MainTabScreen
      title="Perfil"
    >
      <View className="gap-3">
        <View className="rounded-md border border-soft bg-component-card-bg p-4">
          <Text variant="subtitle">Configurações principais</Text>
          <Text variant="text" color="muted">
            Base pronta para perfil, metas e ajustes de uso.
          </Text>
        </View>
      </View>
    </MainTabScreen>
  );
}
