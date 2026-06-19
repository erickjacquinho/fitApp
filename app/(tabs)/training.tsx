import { ProgramListScreen } from '../../src/features/training/components/ProgramListScreen';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';

export default function TrainingTab() {
  return (
    <MainTabScreen
      eyebrow="Weight and Volume"
      title="Training Plan"
      description="Create training routines, log exercise execution and track workload."
      scrollable={false}
    >
      <ProgramListScreen />
    </MainTabScreen>
  );
}
