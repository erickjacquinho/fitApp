import { ProgramListScreen } from '../../src/features/training/components/ProgramListScreen';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function TrainingTab() {
  return (
    <MainTabScreen
      title="Training Plan"
      scrollable={false}
    >
      <ProgramListScreen />
    </MainTabScreen>
  );
}
