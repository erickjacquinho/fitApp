import { View } from 'react-native';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <MainTabScreen
      title="Perfil"
    >
      <View className="gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Configurações principais</CardTitle>
            <CardDescription>
              Base pronta para perfil, metas e ajustes de uso.
            </CardDescription>
          </CardHeader>
        </Card>
      </View>
    </MainTabScreen>
  );
}
