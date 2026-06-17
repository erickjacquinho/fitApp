import { Model } from '@nozbe/watermelondb';
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Exercise extends Model {
  static table = 'exercises';
  static associations = {
    training_blocks: { type: 'belongs_to', key: 'block_id' },
  } as const;

  @field('block_id') blockId!: string;
  @field('name') name!: string;
  @field('sets') sets!: number;
  @field('reps_min') repsMin!: number;
  @field('reps_max') repsMax!: number;
  @field('advanced_technique') advancedTechnique?: string;
  @field('reps_reserve') repsReserve?: number;

  @relation('training_blocks', 'block_id') trainingBlock!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
