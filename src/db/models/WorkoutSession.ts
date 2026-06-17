import { Model } from '@nozbe/watermelondb';
import { field, relation, children, readonly, date } from '@nozbe/watermelondb/decorators';

export default class WorkoutSession extends Model {
  static table = 'workout_sessions';
  static associations = {
    programs: { type: 'belongs_to', key: 'program_id' },
    exercise_executions: { type: 'has_many', foreignKey: 'workout_session_id' },
  } as const;

  @field('program_id') programId!: string;
  @field('start_date') startDate!: number;
  @field('end_date') endDate?: number;
  @field('status') status!: string;

  @relation('programs', 'program_id') program!: any;
  @children('exercise_executions') executions!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
