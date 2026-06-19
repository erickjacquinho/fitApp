import { Model, Query } from '@nozbe/watermelondb';
import { field, children, readonly, date } from '@nozbe/watermelondb/decorators';
import TrainingBlock from './TrainingBlock';

export default class Program extends Model {
  static table = 'programs';
  static associations = {
    training_blocks: { type: 'has_many', foreignKey: 'program_id' },
  } as const;

  @field('name') name!: string;

  @children('training_blocks') trainingBlocks!: Query<TrainingBlock>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
