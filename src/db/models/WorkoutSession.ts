import { Model, Query, Relation } from '@nozbe/watermelondb';
import { text, field, relation, children, readonly, date } from '@nozbe/watermelondb/decorators';
import Program from './Program';
import ExerciseExecution from './ExerciseExecution';

export default class WorkoutSession extends Model {
  static table = 'workout_sessions';
  static associations = {
    programs: { type: 'belongs_to', key: 'program_id' },
    exercise_executions: { type: 'has_many', foreignKey: 'workout_session_id' },
  } as const;

  @text('program_id') programId!: string;
  @field('start_date') startDate!: number;
  @field('end_date') endDate!: number | null;
  @text('status') status!: string;
  @text('target_date') targetDate!: string | null;

  @relation('programs', 'program_id') program!: Relation<Program>;
  @children('exercise_executions') executions!: Query<ExerciseExecution>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
