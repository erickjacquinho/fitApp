import { database } from '../../../db';
import { DailySummary } from '../types';
import { Q } from '@nozbe/watermelondb';

export class DietRawQueriesService {
  static async fetchDailySummaries(): Promise<DailySummary[]> {
    const sql = `
      SELECT 
        m.target_date as date,
        COUNT(distinct m.id) as mealCount,
        SUM(f.calories * mi.quantity / 100.0) as calories,
        SUM(f.protein * mi.quantity / 100.0) as protein,
        SUM(f.carbohydrates * mi.quantity / 100.0) as carbs,
        SUM(f.fat * mi.quantity / 100.0) as fat
      FROM meals m
      LEFT JOIN meal_items mi ON mi.meal_id = m.id
      LEFT JOIN foods f ON f.id = mi.food_id
      WHERE m.target_date IS NOT NULL
      GROUP BY m.target_date
      ORDER BY m.target_date DESC
    `;

    try {
      const rawResult = await database.get('meals').query(
        Q.unsafeSqlQuery(sql, [])
      ).unsafeFetchRaw();

      return rawResult.map((row: any) => ({
        date: row.date,
        mealCount: Number(row.mealCount || 0),
        calories: Math.round(Number(row.calories || 0)),
        protein: Math.round(Number(row.protein || 0)),
        carbs: Math.round(Number(row.carbs || 0)),
        fat: Math.round(Number(row.fat || 0)),
      }));
    } catch (error) {
      console.error('Error fetching raw daily summaries:', error);
      throw error;
    }
  }
}
