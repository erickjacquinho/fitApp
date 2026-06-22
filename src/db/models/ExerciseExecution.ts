import { Model, Relation } from '@nozbe/watermelondb';
import { text, field, relation, readonly, date } from '@nozbe/watermelondb/decorators';
import WorkoutSession from './WorkoutSession';
import Exercise from './Exercise';

export default class ExerciseExecution extends Model {
  static table = 'exercise_executions';
  static associations = {
    workout_sessions: { type: 'belongs_to', key: 'workout_session_id' },
    exercises: { type: 'belongs_to', key: 'exercise_id' },
  } as const;

  @text('workout_session_id') workoutSessionId!: string;
  @text('exercise_id') exerciseId!: string;
  @field('set_number') setNumber!: number;
  @field('reps_done') repsDone!: number;
  @field('weight') weight!: number;
  @field('reps_reserve_done') repsReserveDone!: number | null;

  @relation('workout_sessions', 'workout_session_id') workoutSession!: Relation<WorkoutSession>;
  @relation('exercises', 'exercise_id') exercise!: Relation<Exercise>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
