import { Model } from '@nozbe/watermelondb';
import { field, relation, children, readonly, date } from '@nozbe/watermelondb/decorators';

export default class SessaoTreino extends Model {
  static table = 'sessao_treino';
  static associations = {
    programas: { type: 'belongs_to', key: 'programa_id' },
    execucao_exercicio: { type: 'has_many', foreignKey: 'sessao_treino_id' },
  } as const;

  @field('programa_id') programaId!: string;
  @field('data_inicio') dataInicio!: number;
  @field('data_fim') dataFim?: number;
  @field('status') status!: string;

  @relation('programas', 'programa_id') programa!: any;
  @children('execucao_exercicio') execucoes!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
