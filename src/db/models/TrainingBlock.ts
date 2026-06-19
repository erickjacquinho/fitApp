import { Model, Query, Relation } from '@nozbe/watermelondb';
import { field, relation, children, readonly, date } from '@nozbe/watermelondb/decorators';
import Program from './Program';
import Exercise from './Exercise';

export default class TrainingBlock extends Model {
  static table = 'training_blocks';
  static associations = {
    programs: { type: 'belongs_to', key: 'program_id' },
    exercises: { type: 'has_many', foreignKey: 'block_id' },
  } as const;

  @field('program_id') programId!: string;
  @field('name') name!: string;
  @field('order') order!: number;

  @relation('programs', 'program_id') program!: Relation<Program>;
  @children('exercises') exercises!: Query<Exercise>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
