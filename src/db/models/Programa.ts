import { Model } from '@nozbe/watermelondb';
import { field, children, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Programa extends Model {
  static table = 'programas';
  static associations = {
    blocos: { type: 'has_many', foreignKey: 'programa_id' },
  } as const;

  @field('nome') nome!: string;

  @children('blocos') blocos!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
