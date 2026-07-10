import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { DashboardScreen } from '../../src/features/dashboard/components/DashboardScreen';
import { useDashboardMetrics } from '../../src/features/dashboard/hooks/useDashboardMetrics';
import { RefreshControl } from 'react-native';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function DashboardPage() {
  const { metrics, isLoading, refetch } = useDashboardMetrics();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;
  const router = useRouter();

  return (
    <Screen
      header={
        <Header 
          title="Dashboard" 
          headerRight={
            <Button variant="ghost" onPress={() => router.push('/wheel-picker-demo')}>
              <Text className="text-primary font-bold">Roleta</Text>
            </Button>
          } 
        />
      }
      scrollable={true}
      withPadding={true}
      scrollViewProps={{
        refreshControl: (
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[colors.primary]}
          />
        )
      }}
    >
      <DashboardScreen metrics={metrics} isLoading={isLoading} refetch={refetch} />
    </Screen>
  );
}
