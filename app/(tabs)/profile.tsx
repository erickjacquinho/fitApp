import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <Screen
      header={<Header title="Perfil" />}
      scrollable={true}
      withPadding={true}
    >
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Configurações principais</CardTitle>
          <CardDescription>
            Base pronta para perfil, metas e ajustes de uso.
          </CardDescription>
        </CardHeader>
      </Card>
    </Screen>
  );
}
