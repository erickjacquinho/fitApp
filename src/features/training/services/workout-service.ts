import { database } from '../../../db';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';
import Exercise from '../../../db/models/Exercise';
import { ProgramDTO, BlockDTO, ExerciseDTO } from '../types';

export class WorkoutService {
  private static programsCollection = database.get<Program>('programs');
  private static trainingBlocksCollection = database.get<TrainingBlock>('training_blocks');
  private static exercisesCollection = database.get<Exercise>('exercises');

  static async createProgram(programData: ProgramDTO, blocksData: BlockDTO[]): Promise<Program> {
    if (!programData.name || programData.name.trim() === '') {
      throw new Error('ValidationError: Program name is required');
    }
    
    return await database.write(async () => {
      const newProgram = this.programsCollection.prepareCreate((program) => {
        program.name = programData.name.trim();
      });

      const blockRecords: TrainingBlock[] = [];
      const exerciseRecords: Exercise[] = [];

      for (const blockData of blocksData) {
        const newBlock = this.trainingBlocksCollection.prepareCreate((block) => {
          block.programId = newProgram.id;
          block.name = blockData.name.trim();
          block.order = blockData.order;
        });
        blockRecords.push(newBlock);

        if (blockData.exercises) {
          for (const exerciseData of blockData.exercises) {
            const newExercise = this.exercisesCollection.prepareCreate((exercise) => {
              exercise.blockId = newBlock.id;
              exercise.name = exerciseData.name.trim();
              exercise.sets = exerciseData.sets;
              exercise.repsMin = exerciseData.repsMin;
              exercise.repsMax = exerciseData.repsMax;
              exercise.advancedTechnique = exerciseData.advancedTechnique;
              exercise.repsReserve = exerciseData.repsReserve;
            });
            exerciseRecords.push(newExercise);
          }
        }
      }

      await database.batch(newProgram, ...blockRecords, ...exerciseRecords);
      return newProgram;
    });
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

      return await this.exercisesCollection.create((exercise) => {
        exercise.blockId = block.id;
        exercise.name = exerciseData.name.trim();
        exercise.sets = exerciseData.sets;
        exercise.repsMin = exerciseData.repsMin;
        exercise.repsMax = exerciseData.repsMax;
        exercise.advancedTechnique = exerciseData.advancedTechnique;
        exercise.repsReserve = exerciseData.repsReserve;
      });
    });
  }

  static async getAllPrograms(): Promise<Program[]> {
    return await this.programsCollection.query().fetch();
  }

  static async getProgram(id: string): Promise<Program> {
    return await this.programsCollection.find(id);
  }

  static async deleteProgram(id: string): Promise<void> {
    const program = await this.programsCollection.find(id);
    const blocks = await program.trainingBlocks.fetch();
    
    const exercisesToDelete: Exercise[] = [];
    for (const block of blocks) {
      const blockExercises = await block.exercises.fetch();
      exercisesToDelete.push(...blockExercises);
    }

    await database.write(async () => {
      await database.batch(
        program.prepareMarkAsDeleted(),
        ...blocks.map(b => b.prepareMarkAsDeleted()),
        ...exercisesToDelete.map(e => e.prepareMarkAsDeleted())
      );
    });
  }
}
