import { useState, useEffect } from 'react';
import { MealService } from '../services/meal-service';
import Meal from '../../../db/models/Meal';
import { aggregateMacros, Macros } from '../utils/macro-utils';

export function useMenu(meals: Meal[]) {
  const [dailyMacros, setDailyMacros] = useState<Macros>({ protein: 0, carbs: 0, fat: 0, calories: 0 });

  useEffect(() => {
    const calcDailyTotal = async () => {
      const allItems = [];
      for (const meal of meals) {
        const items = await meal.items.fetch();
        for (const item of items) {
          const food = await item.food.fetch();
          if (food) {
            allItems.push({ food, quantity: item.quantity });
          }
        }
      }
      setDailyMacros(aggregateMacros(allItems));
    };
    calcDailyTotal();
  }, [meals]);

  const deleteMeal = async (id: string) => {
    await MealService.delete(id);
  };

  return {
    dailyMacros,
    deleteMeal,
  };
}
