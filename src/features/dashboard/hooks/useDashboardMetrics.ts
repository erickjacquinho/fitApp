import { useState, useCallback } from 'react';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import Program from '../../../db/models/Program';
import WorkoutSession from '../../../db/models/WorkoutSession';
import { Q } from '@nozbe/watermelondb';

export interface DashboardMetrics {
  caloriesConsumed: number;
  caloriesGoal: number;
  proteinConsumed: number;
  proteinGoal: number;
  carbsConsumed: number;
  carbsGoal: number;
  fatConsumed: number;
  fatGoal: number;
  activeProgramName: string | null;
  activeProgramId: string | null;
  hasTrainedToday: boolean;
  weeklyWorkoutsCount: number;
  weeklyWorkoutsGoal: number;
  lastSessionVolume: number;
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get today range
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Fetch all meals and filter by date
      const allMeals = await database.get<Meal>('meals').query().fetch();
      const todayMeals = allMeals.filter((meal) => {
        const mealDate = new Date(meal.createdAt);
        return mealDate >= startOfDay && mealDate <= endOfDay;
      });

      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;

      for (const meal of todayMeals) {
        const items = await meal.items.fetch();
        for (const item of items) {
          const food = await item.food.fetch();
          if (food) {
            const factor = item.quantity / 100;
            calories += food.calories * factor;
            protein += food.protein * factor;
            carbs += food.carbohydrates * factor;
            fat += food.fat * factor;
          }
        }
      }

      // Fetch programs
      const programs = await database.get<Program>('programs').query().fetch();
      const activeProgram = programs.length > 0 ? programs[0] : null;

      // Fetch completed sessions in the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const allSessions = await database
        .get<WorkoutSession>('workout_sessions')
        .query(Q.where('status', 'completed'))
        .fetch();

      const weeklySessions = allSessions.filter((session) => {
        const sessionDate = new Date(session.startDate);
        return sessionDate >= sevenDaysAgo;
      });

      // Check if trained today
      const today = new Date();
      const trainedToday = allSessions.some((session) => {
        const sessionDate = new Date(session.startDate);
        return (
          sessionDate.getDate() === today.getDate() &&
          sessionDate.getMonth() === today.getMonth() &&
          sessionDate.getFullYear() === today.getFullYear()
        );
      });

      // Get last session volume
      let lastVolume = 0;
      if (allSessions.length > 0) {
        // Sort sessions by start_date descending
        const sortedSessions = [...allSessions].sort(
          (a, b) => b.startDate - a.startDate
        );
        const lastSession = sortedSessions[0];
        const executions = await lastSession.executions.fetch();
        for (const exec of executions) {
          lastVolume += exec.weight * exec.repsDone;
        }
      }

      setMetrics({
        caloriesConsumed: Math.round(calories),
        caloriesGoal: 2200,
        proteinConsumed: Math.round(protein),
        proteinGoal: 150,
        carbsConsumed: Math.round(carbs),
        carbsGoal: 250,
        fatConsumed: Math.round(fat),
        fatGoal: 70,
        activeProgramName: activeProgram ? activeProgram.name : null,
        activeProgramId: activeProgram ? activeProgram.id : null,
        hasTrainedToday: trainedToday,
        weeklyWorkoutsCount: weeklySessions.length,
        weeklyWorkoutsGoal: 4,
        lastSessionVolume: lastVolume,
      });
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { metrics, isLoading, refetch: fetchMetrics };
}
