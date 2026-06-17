import { Model } from '@nozbe/watermelondb';
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators';

export default class MealItem extends Model {
  static table = 'meal_items';
  static associations = {
    meals: { type: 'belongs_to', key: 'meal_id' },
    foods: { type: 'belongs_to', key: 'food_id' },
  } as const;

  @field('meal_id') mealId!: string;
  @field('food_id') foodId!: string;
  @field('quantity') quantity!: number;

  @relation('meals', 'meal_id') meal!: any;
  @relation('foods', 'food_id') food!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
