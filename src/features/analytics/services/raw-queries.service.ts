import { Q } from '@nozbe/watermelondb';
import { database } from '../../../db';

/**
 * Service for high-performance analytical queries using Raw SQL.
 * Use this for large datasets or complex aggregations where JS processing would be slow.
 */
export const AnalyticsService = {
  /**
   * Calculates the total training volume (sets * reps * weight) for a given period.
   * Note: This is an estimation as 'reps' can be a string (e.g., '8-12').
   * For this Raw SQL, we assume numeric reps or handle basic parsing.
   */
  calculateRawTotalVolume: async (startDate: number, endDate: number): Promise<number> => {
    try {
      // In SQLite, we can use SUM and arithmetic directly.
      // We cast weight as REAL to ensure numeric calculation.
      // Since reps is a string, we attempt to cast it. For non-numeric reps, SQLite returns 0.
      const result = await database.adapter.query({
        table: 'exercises',
        sql: `
          SELECT SUM(CAST(weight AS REAL) * CAST(sets AS REAL) * CAST(reps AS REAL)) as total_volume 
          FROM exercises 
          WHERE created_at BETWEEN ? AND ?
        `,
        args: [startDate, endDate],
      }) as any[];

      return result?.[0]?.total_volume || 0;
    } catch (error) {
      console.error('[AnalyticsService] Error calculating total volume:', error);
      return 0;
    }
  },

  /**
   * Calculates total calories and macros consumed in a given period.
   */
  calculateRawNutritionSummary: async (startDate: number, endDate: number) => {
    try {
      const sql = `
        SELECT 
          SUM((f.calories_per_100g * mf.quantity_grams) / 100) as total_calories,
          SUM((f.protein_per_100g * mf.quantity_grams) / 100) as total_protein,
          SUM((f.carbs_per_100g * mf.quantity_grams) / 100) as total_carbs,
          SUM((f.fat_per_100g * mf.quantity_grams) / 100) as total_fat
        FROM meal_foods mf
        JOIN foods f ON mf.food_id = f.id
        JOIN meals m ON mf.meal_id = m.id
        WHERE m.date BETWEEN ? AND ?
      `;

      const result = await database.adapter.query({
        table: 'meal_foods',
        sql,
        args: [startDate, endDate],
      }) as any[];

      return {
        calories: Math.round(result?.[0]?.total_calories || 0),
        protein: Math.round(result?.[0]?.total_protein || 0),
        carbs: Math.round(result?.[0]?.total_carbs || 0),
        fat: Math.round(result?.[0]?.total_fat || 0),
      };
    } catch (error) {
      console.error('[AnalyticsService] Error calculating nutrition summary:', error);
      return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    }
  },
};
