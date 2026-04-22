import { useState, useEffect, useCallback } from 'react';
import { AnalyticsService } from '../services/raw-queries.service';
import { startOfDay, endOfDay, subDays } from 'date-fns';

export interface DashboardMetrics {
  totalVolume: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

/**
 * Hook to fetch main dashboard metrics using Raw SQL.
 * Follows 'Raw SQL' guidelines for periodic/historical data.
 */
export const useDashboardMetrics = (daysAgo: number = 7) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const now = new Date().getTime();
      const startDate = subDays(startOfDay(new Date()), daysAgo).getTime();
      const endDate = endOfDay(new Date()).getTime();

      // Parallel execution for better performance
      const [volume, nutrition] = await Promise.all([
        AnalyticsService.calculateRawTotalVolume(startDate, endDate),
        AnalyticsService.calculateRawNutritionSummary(startDate, endDate),
      ]);

      setMetrics({
        totalVolume: volume,
        nutrition,
      });
    } catch (err) {
      setError('Failed to load dashboard metrics');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [daysAgo]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    isLoading,
    error,
    refresh: fetchMetrics,
  };
};
