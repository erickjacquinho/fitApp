import { Model } from '@nozbe/watermelondb';
import { field, children, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Meal extends Model {
  static table = 'meals';
  static associations = {
    meal_items: { type: 'has_many', foreignKey: 'meal_id' },
  } as const;

  @field('name') name!: string;
  @field('quantity') quantity!: number;
  @field('preparation_state') preparationState!: string;
  @field('order_index') orderIndex!: number;

  @children('meal_items') items!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
