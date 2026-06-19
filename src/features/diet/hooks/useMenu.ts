import { useState, useEffect } from 'react';
import { MealService } from '../services/meal-service';
import Meal from '../../../db/models/Meal';

export function useMenu(meals: Meal[]) {
  const [dailyTotalKcal, setDailyTotalKcal] = useState(0);

  useEffect(() => {
    const calcDailyTotal = async () => {
      let total = 0;
      for (const meal of meals) {
        const items = await meal.items.fetch();
        for (const item of items) {
          const food = await item.food.fetch();
          if (food) {
            total += food.calories * (item.quantity / 100);
          }
        }
      }
      setDailyTotalKcal(total);
    };
    calcDailyTotal();
  }, [meals]);

  const deleteMeal = async (id: string) => {
    await MealService.delete(id);
  };

  return {
    dailyTotalKcal,
    deleteMeal,
  };
}
