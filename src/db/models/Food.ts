import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Food extends Model {
  static table = 'foods';

  @field('name') name!: string;
  @field('calories_per_100g') caloriesPer100g!: number;
  @field('protein_per_100g') proteinPer100g!: number;
  @field('carbs_per_100g') carbsPer100g!: number;
  @field('fat_per_100g') fatPer100g!: number;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
