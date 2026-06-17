import { Model } from '@nozbe/watermelondb';
import { field, children, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Refeicao extends Model {
  static table = 'refeicoes';
  static associations = {
    item_refeicao: { type: 'has_many', foreignKey: 'refeicao_id' },
  } as const;

  @field('nome') nome!: string;
  @field('quantidade') quantidade!: number;
  @field('estado_preparo') estadoPreparo!: string;

  @children('item_refeicao') itens!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
