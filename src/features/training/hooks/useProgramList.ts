import { useState, useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { WorkoutService } from '../services/workout-service';
import { SessionService } from '../services/session-service';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';
import WorkoutSession from '../../../db/models/WorkoutSession';
import { PresentationFeedback } from '../types';

export interface ProgramWithBlocks {
  program: Program;
  blocks: TrainingBlock[];
}

export function useProgramList() {
  const [programsData, setProgramsData] = useState<ProgramWithBlocks[]>([]);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const { date } = useLocalSearchParams<{ date?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<PresentationFeedback | null>(null);

  const clearFeedback = () => setFeedback(null);

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

  const deleteProgram = async (id: string) => {
    try {
      await WorkoutService.deleteProgram(id);
      await loadData();
    } catch (err) {
      console.error('Error deleting program:', err);
      setFeedback({ type: 'error', title: 'Erro ao excluir', message: 'Não foi possível excluir o programa.' });
    }
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
      setFeedback({ type: 'error', title: 'Erro', message: 'Não foi possível iniciar a sessão.' });
    }
  };

  return {
    programsData,
    activeSession,
    isLoading,
    loadData,
    deleteProgram,
    startSession,
    feedback,
    setFeedback,
    clearFeedback,
  };
}
