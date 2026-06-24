import { useState, useEffect } from 'react';
import { MealService } from '../services/meal-service';
import Meal from '../../../db/models/Meal';
import { aggregateMacros, Macros } from '../utils/macro-utils';

export function useMenu(meals: Meal[], selectedDate: string) {
  const [dailyMacros, setDailyMacros] = useState<Macros>({ protein: 0, carbs: 0, fat: 0, calories: 0 });
  const [readyDate, setReadyDate] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

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
      
      if (isMounted) {
        setDailyMacros(aggregateMacros(allItems));
        // Pequeno delay para garantir que o cache do WatermelonDB esteja pronto
        // para o MealCard ler os dados sincronicamente sem flicker.
        setTimeout(() => {
          if (isMounted) {
            setReadyDate(selectedDate);
          }
        }, 50);
      }
    };
    
    calcDailyTotal();
    
    return () => {
      isMounted = false;
    };
  }, [meals, selectedDate]);

  const deleteMeal = async (id: string) => {
    await MealService.delete(id);
  };

  const isReady = readyDate === selectedDate;

  return {
    dailyMacros,
    deleteMeal,
    isReady,
  };
}
