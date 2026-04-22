import { Model, Query } from '@nozbe/watermelondb';
import { field, date, text, children, readonly } from '@nozbe/watermelondb/decorators';
import Exercise from './Exercise';

export default class Workout extends Model {
  static table = 'workouts';
  static associations = {
    exercises: { type: 'has_many', foreignKey: 'workout_id' },
  } as const;

  @date('date') date!: Date;
  @text('notes') notes?: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @children('exercises') exercises!: Query<Exercise>;
}
