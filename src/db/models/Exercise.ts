import { Model, Relation } from '@nozbe/watermelondb';
import { field, text, relation, readonly, date } from '@nozbe/watermelondb/decorators';
import Workout from './Workout';

export default class Exercise extends Model {
  static table = 'exercises';
  static associations = {
    workouts: { type: 'belongs_to', key: 'workout_id' },
  } as const;

  @field('workout_id') workoutId!: string;
  @field('name') name!: string;
  @field('sets') sets!: number;
  @field('reps') reps!: string;
  @field('weight') weight!: number;
  @text('notes') notes?: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @relation('workouts', 'workout_id') workout!: Relation<Workout>;
}
