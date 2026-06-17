import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Alimento extends Model {
  static table = 'alimentos';

  @field('nome') nome!: string;
  @field('peso_preparo') pesoPreparo!: number;
  @field('descricao') descricao?: string;
  @field('proteina') proteina!: number;
  @field('carboidrato') carboidrato!: number;
  @field('gordura') gordura!: number;
  @field('calorias') calorias!: number;
  
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
