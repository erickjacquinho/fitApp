import { useState, useEffect } from 'react';
import { MealService } from '../services/meal-service';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import Food from '../../../db/models/Food';
import { aggregateMacros, Macros } from '../utils/macro-utils';
import { database } from '../../../db';
import { Q } from '@nozbe/watermelondb';

export function useMenu(meals: Meal[], selectedDate: string) {
  const [dailyMacros, setDailyMacros] = useState<Macros>({ protein: 0, carbs: 0, fat: 0, calories: 0 });
  const [readyDate, setReadyDate] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    let subscription: any;

    const observeItems = () => {
      const mealIds = meals.map(m => m.id);
      if (mealIds.length === 0) {
        if (isMounted) {
          setDailyMacros({ protein: 0, carbs: 0, fat: 0, calories: 0 });
          setReadyDate(selectedDate);
        }
        return;
      }
      
      const observable = database.get<MealItem>('meal_items').query(
        Q.where('meal_id', Q.oneOf(mealIds))
      ).observeWithColumns(['quantity', 'food_id']);

      subscription = observable.subscribe(async (items) => {
        const uniqueFoodIds = Array.from(new Set(items.map(i => i.foodId).filter(Boolean)));
        let validItems: { food: Food; quantity: number }[] = [];
        
        if (uniqueFoodIds.length > 0) {
          try {
            const foods = await database.get<Food>('foods').query(
              Q.where('id', Q.oneOf(uniqueFoodIds))
            ).fetch();
            const foodMap = new Map(foods.map(f => [f.id, f]));
            validItems = items
              .map(item => ({
                food: foodMap.get(item.foodId) || null,
                quantity: item.quantity
              }))
              .filter((i): i is { food: Food; quantity: number } => i.food !== null);
          } catch (err) {
            console.error('Failed to batch fetch foods in useMenu:', err);
          }
        }
        
        if (isMounted) {
          setDailyMacros(aggregateMacros(validItems));
          setTimeout(() => {
            if (isMounted) {
              setReadyDate(selectedDate);
            }
          }, 50);
        }
      });
    };
    
    observeItems();
    
    return () => {
      isMounted = false;
      if (subscription) subscription.unsubscribe();
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
