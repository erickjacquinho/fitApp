import { Model, Relation } from '@nozbe/watermelondb';
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators';
import Meal from './Meal';
import Food from './Food';

export default class MealFood extends Model {
  static table = 'meal_foods';
  static associations = {
    meals: { type: 'belongs_to', key: 'meal_id' },
    foods: { type: 'belongs_to', key: 'food_id' },
  } as const;

  @field('meal_id') mealId!: string;
  @field('food_id') foodId!: string;
  @field('quantity_grams') quantityGrams!: number;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @relation('meals', 'meal_id') meal!: Relation<Meal>;
  @relation('foods', 'food_id') food!: Relation<Food>;
}
