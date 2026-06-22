import { Model } from '@nozbe/watermelondb';
import { text, field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Food extends Model {
  static table = 'foods';

  @text('name') name!: string;
  @field('preparation_weight') preparationWeight!: number;
  @text('description') description!: string | null;
  @field('protein') protein!: number;
  @field('carbohydrates') carbohydrates!: number;
  @field('fat') fat!: number;
  @field('calories') calories!: number;
  
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
