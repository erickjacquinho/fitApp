import { Model, Query } from '@nozbe/watermelondb';
import { field, date, text, children, readonly } from '@nozbe/watermelondb/decorators';
import MealFood from './MealFood';

export default class Meal extends Model {
  static table = 'meals';
  static associations = {
    meal_foods: { type: 'has_many', foreignKey: 'meal_id' },
  } as const;

  @date('date') date!: Date;
  @field('name') name!: string;
  @text('notes') notes?: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @children('meal_foods') mealFoods!: Query<MealFood>;
}
