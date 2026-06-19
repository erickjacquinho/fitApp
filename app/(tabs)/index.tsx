import { DashboardScreen } from '../../src/features/dashboard/components/DashboardScreen';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function DashboardPage() {
  return (
    <MainTabScreen
      eyebrow="Overview"
      title="Dashboard"
      description="Quick summary of your day, active goals, and quick actions."
      scrollable={false}
    >
      <DashboardScreen />
    </MainTabScreen>
  );
}
