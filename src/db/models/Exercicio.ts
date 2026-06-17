import { Model } from '@nozbe/watermelondb';
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Exercicio extends Model {
  static table = 'exercicios';
  static associations = {
    blocos: { type: 'belongs_to', key: 'bloco_id' },
  } as const;

  @field('bloco_id') blocoId!: string;
  @field('nome') nome!: string;
  @field('series') series!: number;
  @field('repeticoes_min') repeticoesMin!: number;
  @field('repeticoes_max') repeticoesMax!: number;
  @field('tecnica_avancada') tecnicaAvancada?: string;
  @field('reps_reserva') repsReserva?: number;

  @relation('blocos', 'bloco_id') bloco!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
