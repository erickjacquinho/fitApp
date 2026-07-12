import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { DashboardScreen } from '../../src/features/dashboard/components/DashboardScreen';
import { DashboardCalendar } from '../../src/features/dashboard/components/DashboardCalendar';
import { useDashboardMetrics } from '../../src/features/dashboard/hooks/useDashboardMetrics';
import { RefreshControl } from 'react-native';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';
import { useCallback } from 'react';

export default function DashboardPage() {
  const { metrics, isLoading, refetch } = useDashboardMetrics();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handleDateChange = useCallback((date: Date) => {
    // We would pass this date to the metrics hook or some global state
    // For now we just log it or handle it minimally
    console.log('Selected date in Dashboard:', date);
  }, []);

  return (
    <Screen
      header={
        <Header 
          title="Dashboard" 
        />
      }
      scrollable={true}
      withPadding={false}
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
      <DashboardCalendar onDateChange={handleDateChange} />
      <DashboardScreen metrics={metrics} isLoading={isLoading} refetch={refetch} />
    </Screen>
  );
}
