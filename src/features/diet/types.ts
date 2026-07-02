export interface FoodDTO {
  name: string;
  preparationWeight: number;
  description?: string;
  protein: number;
  carbohydrates: number;
  fat: number;
  calories: number;
}

export interface MealDTO {
  name: string;
  quantity: number;
  preparationState: string;
}

export interface ItemDTO {
  foodId: string;
  quantity: number;
}

export interface DailySummary {
  date: string;
  mealCount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
