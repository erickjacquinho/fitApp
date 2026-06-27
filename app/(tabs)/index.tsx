import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { DashboardScreen } from '../../src/features/dashboard/components/DashboardScreen';
import { useDashboardMetrics } from '../../src/features/dashboard/hooks/useDashboardMetrics';
import { RefreshControl } from 'react-native';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';

export default function DashboardPage() {
  const { metrics, isLoading, refetch } = useDashboardMetrics();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Screen
      header={<Header title="Dashboard" />}
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
