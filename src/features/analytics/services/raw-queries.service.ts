import { Q } from '@nozbe/watermelondb';
import { database } from '../../../db';
import Exercise from '../../../db/models/Exercise';
import MealFood from '../../../db/models/MealFood';

export const AnalyticsService = {
  calculateRawTotalVolume: async (startDate: number, endDate: number): Promise<number> => {
    try {
      const exercises = await database
        .get<Exercise>('exercises')
        .query(Q.on('workouts', Q.where('date', Q.between(startDate, endDate))))
        .fetch();

      return exercises.reduce((total, e) => {
        const repsNum = parseFloat(e.reps) || 0;
        return total + e.weight * e.sets * repsNum;
      }, 0);
    } catch (error) {
      console.error('[AnalyticsService] Error calculating total volume:', error);
      return 0;
    }
  },

  calculateRawNutritionSummary: async (startDate: number, endDate: number) => {
    try {
      const mealFoods = await database
        .get<MealFood>('meal_foods')
        .query(
          Q.on('meals', Q.where('date', Q.between(startDate, endDate)))
        )
        .fetch();

      const foods = await Promise.all(mealFoods.map((mf) => mf.food.fetch()));

      let calories = 0, protein = 0, carbs = 0, fat = 0;

      for (let i = 0; i < mealFoods.length; i++) {
        const mf = mealFoods[i];
        const food = foods[i];
        if (!food) continue;
        const factor = mf.quantityGrams / 100;
        calories += food.caloriesPer100g * factor;
        protein += food.proteinPer100g * factor;
        carbs += food.carbsPer100g * factor;
        fat += food.fatPer100g * factor;
      }

      return {
        calories: Math.round(calories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
      };
    } catch (error) {
      console.error('[AnalyticsService] Error calculating nutrition summary:', error);
      return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    }
  },
};
