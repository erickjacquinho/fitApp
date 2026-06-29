import { database } from '../../../db';
import ExerciseDefinition from '../../../db/models/ExerciseDefinition';
import { capitalizeWords } from '../../../lib/utils';
export class ExerciseDictionaryService {
  private static collection = database.get<ExerciseDefinition>('exercise_definitions');

  static async getExercises(): Promise<ExerciseDefinition[]> {
    return await this.collection.query().fetch();
  }

  static async createExercise(name: string): Promise<ExerciseDefinition> {
    const trimmedName = name.trim();
    if (!trimmedName) throw new Error('Name required');
    
    return await database.write(async () => {
      return await this.collection.create((ex) => {
        ex.name = capitalizeWords(name);
      });
    });
  }
}
