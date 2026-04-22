import { database } from '../../../db';
import Workout from '../../../db/models/Workout';
import Exercise from '../../../db/models/Exercise';

export class WorkoutService {
  /**
   * Adiciona um novo treino.
   */
  static async addWorkout(date: Date, notes?: string): Promise<Workout> {
    return await database.write(async () => {
      const workoutCollection = database.get<Workout>('workouts');
      const workout = await workoutCollection.create((w) => {
        w.date = date;
        w.notes = notes;
      });
      return workout;
    });
  }

  /**
   * Adiciona um exercício a um treino existente.
   */
  static async addExercise(
    workout: Workout,
    name: string,
    sets: number,
    reps: string,
    weight: number,
    notes?: string
  ): Promise<Exercise> {
    return await database.write(async () => {
      const exerciseCollection = database.get<Exercise>('exercises');
      const exercise = await exerciseCollection.create((e) => {
        e.workout.set(workout);
        e.name = name;
        e.sets = sets;
        e.reps = reps;
        e.weight = weight;
        e.notes = notes;
      });
      return exercise;
    });
  }
}
