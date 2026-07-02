import { useState, useEffect } from 'react';
import { DailySummary } from '../types';
import { DietRawQueriesService } from '../services/diet-raw-queries.service';

export function useCalendarSummary() {
  const [summaries, setSummaries] = useState<DailySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const result = await DietRawQueriesService.fetchDailySummaries();
        setSummaries(result);
      } catch (error) {
        console.error('Error fetching calendar summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  return { summaries, loading };
}
