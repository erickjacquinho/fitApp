import { Model, Relation } from '@nozbe/watermelondb';
import { text, field, relation, readonly, date } from '@nozbe/watermelondb/decorators';
import TrainingBlock from './TrainingBlock';

export default class Exercise extends Model {
  static table = 'exercises';
  static associations = {
    training_blocks: { type: 'belongs_to', key: 'block_id' },
  } as const;

  @text('block_id') blockId!: string;
  @text('name') name!: string;
  @field('sets') sets!: number;
  @field('reps_min') repsMin!: number;
  @field('reps_max') repsMax!: number;
  @text('advanced_technique') advancedTechnique!: string;
  @field('reps_reserve') repsReserve!: number;

  @relation('training_blocks', 'block_id') trainingBlock!: Relation<TrainingBlock>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
