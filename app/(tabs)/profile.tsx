import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <MainTabScreen
      title="Perfil"
    >
      <View className="gap-3">
        <Card>
          <CardTitle>Configurações principais</CardTitle>
          <CardDescription>
            Base pronta para perfil, metas e ajustes de uso.
          </CardDescription>
        </Card>
      </View>
    </MainTabScreen>
  );
}
