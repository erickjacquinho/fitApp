import Food from '../../../db/models/Food';

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export function calculateMacros(food: Food, quantity: number): Macros {
  const factor = quantity / (food.preparationWeight || 100);
  return {
    protein: (food.protein || 0) * factor,
    carbs: (food.carbohydrates || 0) * factor,
    fat: (food.fat || 0) * factor,
    calories: (food.calories || 0) * factor,
  };
}

export function aggregateMacros(items: { food: Food; quantity: number }[]): Macros {
  return items.reduce(
    (acc, item) => {
      const macros = calculateMacros(item.food, item.quantity);
      return {
        protein: acc.protein + macros.protein,
        carbs: acc.carbs + macros.carbs,
        fat: acc.fat + macros.fat,
        calories: acc.calories + macros.calories,
      };
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );
}
