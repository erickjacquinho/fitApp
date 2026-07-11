import { database } from '../../../db';
import Exercise from '../../../db/models/Exercise';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { ExerciseDTO } from '../types';
import { capitalizeWords } from '../../../lib/utils';

export class ExerciseService {
  private static collection = database.get<Exercise>('exercises');
  private static trainingBlocksCollection = database.get<TrainingBlock>('training_blocks');

  static prepareCreate(blockId: string, exerciseData: ExerciseDTO, order: number): Exercise {
    return this.collection.prepareCreate((exercise) => {
      exercise.blockId = blockId;
      exercise.name = capitalizeWords(exerciseData.name);
      exercise.sets = exerciseData.sets;
      exercise.repsMin = exerciseData.repsMin;
      exercise.repsMax = exerciseData.repsMax;
      exercise.advancedTechnique = exerciseData.advancedTechnique?.trim() || null;
      exercise.repsReserve = exerciseData.repsReserve ?? null;
      exercise.order = order;
    });
  }

  static prepareUpdate(exerciseRecord: Exercise, blockId: string, exerciseData: ExerciseDTO, order: number): Exercise {
    return exerciseRecord.prepareUpdate((e) => {
      e.name = capitalizeWords(exerciseData.name);
      e.sets = exerciseData.sets;
      e.repsMin = exerciseData.repsMin;
      e.repsMax = exerciseData.repsMax;
      e.advancedTechnique = exerciseData.advancedTechnique?.trim() || null;
      e.repsReserve = exerciseData.repsReserve ?? null;
      e.order = order;
      e.blockId = blockId;
    });
  }

  static prepareDelete(exerciseRecord: Exercise): Exercise {
    return exerciseRecord.prepareMarkAsDeleted();
  }

  static async addExerciseToBlock(blockId: string, exerciseData: ExerciseDTO): Promise<Exercise> {
    if (!exerciseData.name || exerciseData.name.trim() === '') {
      throw new Error('ValidationError: Exercise name is required');
    }

    return await database.write(async () => {
      const block = await this.trainingBlocksCollection.find(blockId);
      if (!block) {
        throw new Error('Block not found');
      }

      // Default to 0 order, since it's just added directly. In reality we might want the max order + 1, 
      // but to keep it compatible with existing code, we just pass 0 or let it default.
      // The original code didn't set order in addExerciseToBlock, so it defaulted.
      return await this.collection.create((exercise) => {
        exercise.blockId = block.id;
        exercise.name = capitalizeWords(exerciseData.name);
        exercise.sets = exerciseData.sets;
        exercise.repsMin = exerciseData.repsMin;
        exercise.repsMax = exerciseData.repsMax;
        exercise.advancedTechnique = exerciseData.advancedTechnique?.trim() || null;
        exercise.repsReserve = exerciseData.repsReserve ?? null;
      });
    });
  }
}
