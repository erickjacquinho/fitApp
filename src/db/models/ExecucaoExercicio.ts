import { Model } from '@nozbe/watermelondb';
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators';

export default class ExecucaoExercicio extends Model {
  static table = 'execucao_exercicio';
  static associations = {
    sessao_treino: { type: 'belongs_to', key: 'sessao_treino_id' },
    exercicios: { type: 'belongs_to', key: 'exercicio_id' },
  } as const;

  @field('sessao_treino_id') sessaoTreinoId!: string;
  @field('exercicio_id') exercicioId!: string;
  @field('serie_numero') serieNumero!: number;
  @field('reps_feitas') repsFeitas!: number;
  @field('quilagem') quilagem!: number;
  @field('reps_reserva_feitas') repsReservaFeitas?: number;

  @relation('sessao_treino', 'sessao_treino_id') sessao!: any;
  @relation('exercicios', 'exercicio_id') exercicio!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
