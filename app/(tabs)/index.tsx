import { DashboardScreen } from '../../src/features/dashboard/components/DashboardScreen';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function DashboardPage() {
  return (
    <MainTabScreen
      title="Dashboard"
      scrollable={false}
    >
      <DashboardScreen />
    </MainTabScreen>
  );
}
