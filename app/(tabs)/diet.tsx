import { MenuScreen } from '../../src/features/diet/components/MenuScreen';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function DietTab() {
  return (
    <MainTabScreen
      eyebrow="My Diet"
      title="Daily Menu"
      description="Track your caloric intake and macronutrients for today."
      scrollable={false}
    >
      <MenuScreen />
    </MainTabScreen>
  );
}
