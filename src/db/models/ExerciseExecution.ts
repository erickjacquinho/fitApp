import { Model } from '@nozbe/watermelondb';
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators';

export default class ExerciseExecution extends Model {
  static table = 'exercise_executions';
  static associations = {
    workout_sessions: { type: 'belongs_to', key: 'workout_session_id' },
    exercises: { type: 'belongs_to', key: 'exercise_id' },
  } as const;

  @field('workout_session_id') workoutSessionId!: string;
  @field('exercise_id') exerciseId!: string;
  @field('set_number') setNumber!: number;
  @field('reps_done') repsDone!: number;
  @field('weight') weight!: number;
  @field('reps_reserve_done') repsReserveDone?: number;

  @relation('workout_sessions', 'workout_session_id') workoutSession!: any;
  @relation('exercises', 'exercise_id') exercise!: any;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
