import { Model, Relation } from '@nozbe/watermelondb';
import { text, field, relation, readonly, date } from '@nozbe/watermelondb/decorators';
import Meal from './Meal';
import Food from './Food';

export default class MealItem extends Model {
  static table = 'meal_items';
  static associations = {
    meals: { type: 'belongs_to', key: 'meal_id' },
    foods: { type: 'belongs_to', key: 'food_id' },
  } as const;

  @text('meal_id') mealId!: string;
  @text('food_id') foodId!: string;
  @field('quantity') quantity!: number;

  @relation('meals', 'meal_id') meal!: Relation<Meal>;
  @relation('foods', 'food_id') food!: Relation<Food>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
