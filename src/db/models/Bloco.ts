import { Model } from '@nozbe/watermelondb';
import { field, relation, children, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Bloco extends Model {
  static table = 'blocos';
  static associations = {
    programas: { type: 'belongs_to', key: 'programa_id' },
    exercicios: { type: 'has_many', foreignKey: 'bloco_id' },
  } as const;

  @field('programa_id') programaId!: string;
  @field('nome') nome!: string;
  @field('ordem') ordem!: number;

  @relation('programas', 'programa_id') programa!: any;
  @children('exercicios') exercicios!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
