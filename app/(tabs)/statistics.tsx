import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function StatisticsPage() {
  return (
    <Screen
      header={<Header title="Estatísticas" />}
      scrollable={true}
      withPadding={true}
    >
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Resumo semanal</CardTitle>
          <CardDescription>
            Aqui entram os gráficos e comparativos principais.
          </CardDescription>
        </CardHeader>
      </Card>
    </Screen>
  );
}
