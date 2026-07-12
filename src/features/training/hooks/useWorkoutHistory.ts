import { useState, useCallback } from 'react';
import { SessionService } from '../services/session-service';
import WorkoutSession from '../../../db/models/WorkoutSession';
import Program from '../../../db/models/Program';
import { database } from '../../../db';
import { Q } from '@nozbe/watermelondb';

export function useWorkoutHistory(programIdFilter: string | null = null) {
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const allHistory = await SessionService.getHistory();
      let completed = allHistory.filter((s) => s.status === 'completed');
      
      if (programIdFilter && programIdFilter !== 'all') {
        completed = completed.filter((s) => s.programId === programIdFilter);
      }
      setHistory(completed);

      // Fetch all programs for the filter dropdown
      const allPrograms = await database.get<Program>('programs').query(Q.sortBy('name', Q.asc)).fetch();
      setPrograms(allPrograms);
    } catch (err) {
      console.error('Error loading training history:', err);
    } finally {
      setIsLoading(false);
    }
  }, [programIdFilter]);

  return {
    history,
    programs,
    isLoading,
    loadHistory,
  };
}
