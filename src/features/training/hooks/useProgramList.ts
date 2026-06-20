import { useState, useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { WorkoutService } from '../services/workout-service';
import { SessionService } from '../services/session-service';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';
import WorkoutSession from '../../../db/models/WorkoutSession';

export interface ProgramWithBlocks {
  program: Program;
  blocks: TrainingBlock[];
}

export function useProgramList() {
  const [programsData, setProgramsData] = useState<ProgramWithBlocks[]>([]);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const { date } = useLocalSearchParams<{ date?: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const active = await SessionService.getActiveSession();
      setActiveSession(active);

      const allPrograms = await WorkoutService.getAllPrograms();
      const loaded: ProgramWithBlocks[] = [];

      for (const p of allPrograms) {
        const blocks = await p.trainingBlocks.fetch();
        loaded.push({ program: p, blocks });
      }

      setProgramsData(loaded);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteProgram = (id: string, name: string) => {
    Alert.alert(
      'Delete Program',
      `Are you sure you want to delete the program "${name}"? All associated workouts and plans will be lost.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await WorkoutService.deleteProgram(id);
              await loadData();
            } catch (err) {
              console.error('Error deleting program:', err);
              Alert.alert('Error', 'Failed to delete program');
            }
          },
        },
      ]
    );
  };

  const startSession = async (programId: string, blockId: string) => {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      const session = await SessionService.startSession(programId, targetDate);
      router.push({
        pathname: '/training/active',
        params: { sessionId: session.id, blockId },
      });
    } catch (err) {
      console.error('Error starting session:', err);
      Alert.alert('Error', 'Failed to start session');
    }
  };

  return {
    programsData,
    activeSession,
    isLoading,
    loadData,
    handleDeleteProgram,
    startSession,
  };
}
