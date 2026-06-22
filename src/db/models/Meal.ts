import { Model, Query } from '@nozbe/watermelondb';
import { text, field, children, readonly, date } from '@nozbe/watermelondb/decorators';
import MealItem from './MealItem';

export default class Meal extends Model {
  static table = 'meals';
  static associations = {
    meal_items: { type: 'has_many', foreignKey: 'meal_id' },
  } as const;

  @text('name') name!: string;
  @field('quantity') quantity!: number;
  @text('preparation_state') preparationState!: string;
  @field('order_index') orderIndex!: number;
  @text('target_date') targetDate!: string;

  @children('meal_items') items!: Query<MealItem>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
