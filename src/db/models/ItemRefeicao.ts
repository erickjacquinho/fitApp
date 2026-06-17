import { Model } from '@nozbe/watermelondb';
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators';

export default class ItemRefeicao extends Model {
  static table = 'item_refeicao';
  static associations = {
    refeicoes: { type: 'belongs_to', key: 'refeicao_id' },
    alimentos: { type: 'belongs_to', key: 'alimento_id' },
  } as const;

  @field('refeicao_id') refeicaoId!: string;
  @field('alimento_id') alimentoId!: string;
  @field('quantidade') quantidade!: number;

  @relation('refeicoes', 'refeicao_id') refeicao!: any;
  @relation('alimentos', 'alimento_id') alimento!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
