import { useState, useEffect } from 'react';
import { DailySummary } from '../types';
import { DietRawQueriesService } from '../services/diet-raw-queries.service';

export function useCalendarSummary() {
  const [summaries, setSummaries] = useState<DailySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        setError(null);
        const result = await DietRawQueriesService.fetchDailySummaries();
        setSummaries(result);
      } catch (err: any) {
        console.error('Error fetching calendar summaries:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  return { summaries, loading, error };
}
