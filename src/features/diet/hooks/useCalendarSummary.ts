import { useState, useEffect } from 'react';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import Meal from '../../../db/models/Meal';
import { aggregateMacros, Macros } from '../utils/macro-utils';

export interface DailySummary {
  date: string;
  macros: Macros;
}

export function useCalendarSummary() {
  const [summaries, setSummaries] = useState<DailySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const meals = await database.get<Meal>('meals').query().fetch();
        const grouped: Record<string, Array<{ food: Food; quantity: number }>> = {};

        for (const meal of meals) {
          if (!meal.targetDate) continue;
          if (!grouped[meal.targetDate]) {
            grouped[meal.targetDate] = [];
          }
          const items = await meal.items.fetch();
          for (const item of items) {
            const food = await item.food.fetch();
            if (food) {
              grouped[meal.targetDate].push({ food, quantity: item.quantity });
            }
          }
        }

        const result: DailySummary[] = Object.keys(grouped).map((date) => ({
          date,
          macros: aggregateMacros(grouped[date]),
        })).sort((a, b) => b.date.localeCompare(a.date));

        setSummaries(result);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  return { summaries, loading };
}
