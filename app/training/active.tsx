import { Screen } from '@/components/ui/screen';
import { WorkoutSessionScreen } from '../../src/features/training/components/WorkoutSessionScreen';

export default function ActiveSessionRoute() {
  return (
    <Screen
      scrollable={false}
      withPadding={false}
      safeAreaEdges={[]}
    >
      <WorkoutSessionScreen />
    </Screen>
  );
}

