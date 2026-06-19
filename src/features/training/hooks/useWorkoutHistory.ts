import { useState, useCallback } from 'react';
import { SessionService } from '../services/session-service';
import WorkoutSession from '../../../db/models/WorkoutSession';

export function useWorkoutHistory() {
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const allHistory = await SessionService.getHistory();
      const completed = allHistory.filter((s) => s.status === 'completed');
      setHistory(completed);
    } catch (err) {
      console.error('Error loading training history:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    history,
    isLoading,
    loadHistory,
  };
}
