import { database } from '../../../db';
import { Q } from '@nozbe/watermelondb';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';
import Exercise from '../../../db/models/Exercise';
import { ProgramDTO, BlockDTO, ExerciseDTO } from '../types';
import { capitalizeWords } from '../../../lib/utils';
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
        program.name = capitalizeWords(programData.name);
      });

      const blockRecords: TrainingBlock[] = [];
      const exerciseRecords: Exercise[] = [];

      for (const blockData of blocksData) {
        const newBlock = this.trainingBlocksCollection.prepareCreate((block) => {
          block.programId = newProgram.id;
          block.name = capitalizeWords(blockData.name);
          block.order = blockData.order;
        });
        blockRecords.push(newBlock);

        if (blockData.exercises) {
          for (const exerciseData of blockData.exercises) {
            const newExercise = this.exercisesCollection.prepareCreate((exercise) => {
              exercise.blockId = newBlock.id;
              exercise.name = capitalizeWords(exerciseData.name);
              exercise.sets = exerciseData.sets;
              exercise.repsMin = exerciseData.repsMin;
              exercise.repsMax = exerciseData.repsMax;
              exercise.advancedTechnique = exerciseData.advancedTechnique?.trim() || null;
              exercise.repsReserve = exerciseData.repsReserve ?? null;
            });
            exerciseRecords.push(newExercise);
          }
        }
      }

      await database.batch(newProgram, ...blockRecords, ...exerciseRecords);
      return newProgram;
    });
  }

  static async updateProgram(
    programId: string,
    programData: { name: string },
    blocksData: {
      id?: string;
      name: string;
      order: number;
      exercises: {
        id?: string;
        name: string;
        sets: number;
        repsMin: number;
        repsMax: number;
        advancedTechnique?: string;
        repsReserve?: number;
      }[];
    }[]
  ): Promise<Program> {
    if (!programData.name || programData.name.trim() === '') {
      throw new Error('ValidationError: Program name is required');
    }

    return await database.write(async () => {
      const program = await this.programsCollection.find(programId);
      
      const batches: any[] = [];

      // Update program name
      batches.push(
        program.prepareUpdate((p) => {
          p.name = capitalizeWords(programData.name);
        })
      );

      // Fetch current blocks
      const existingBlocks = await program.trainingBlocks.fetch();
      const existingBlocksMap = new Map(existingBlocks.map(b => [b.id, b]));

      const inputBlockIds = new Set(blocksData.map(b => b.id).filter(Boolean));

      // Mark removed blocks (and their exercises) as deleted
      for (const block of existingBlocks) {
        if (!inputBlockIds.has(block.id)) {
          batches.push(block.prepareMarkAsDeleted());
          const blockExercises = await block.exercises.fetch();
          for (const ex of blockExercises) {
            batches.push(ex.prepareMarkAsDeleted());
          }
        }
      }

      for (const blockData of blocksData) {
        let blockRecord: TrainingBlock;

        if (blockData.id && existingBlocksMap.has(blockData.id)) {
          // Update existing block
          blockRecord = existingBlocksMap.get(blockData.id)!;
          batches.push(
            blockRecord.prepareUpdate((b) => {
              b.name = capitalizeWords(blockData.name);
              b.order = blockData.order;
            })
          );
        } else {
          // Create new block
          blockRecord = this.trainingBlocksCollection.prepareCreate((b) => {
            b.programId = program.id;
            b.name = capitalizeWords(blockData.name);
            b.order = blockData.order;
          });
          batches.push(blockRecord);
        }

        // Handle exercises for this block
        const existingExercises = blockData.id && existingBlocksMap.has(blockData.id) 
          ? await blockRecord.exercises.fetch() 
          : [];
        const existingExercisesMap = new Map(existingExercises.map(e => [e.id, e]));

        const inputExerciseIds = new Set(blockData.exercises.map(e => e.id).filter(Boolean));

        // Mark removed exercises as deleted
        for (const ex of existingExercises) {
          if (!inputExerciseIds.has(ex.id)) {
            batches.push(ex.prepareMarkAsDeleted());
          }
        }

        // Create or update exercises
        let exOrder = 0;
        for (const exData of blockData.exercises) {
          if (exData.id && existingExercisesMap.has(exData.id)) {
            const exRecord = existingExercisesMap.get(exData.id)!;
            batches.push(
              exRecord.prepareUpdate((e) => {
                e.name = capitalizeWords(exData.name);
                e.sets = exData.sets;
                e.repsMin = exData.repsMin;
                e.repsMax = exData.repsMax;
                e.advancedTechnique = exData.advancedTechnique?.trim() || null;
                e.repsReserve = exData.repsReserve ?? null;
                e.order = exOrder++;
                e.blockId = blockRecord.id;
              })
            );
          } else {
            const newExercise = this.exercisesCollection.prepareCreate((e) => {
              e.name = capitalizeWords(exData.name);
              e.sets = exData.sets;
              e.repsMin = exData.repsMin;
              e.repsMax = exData.repsMax;
              e.advancedTechnique = exData.advancedTechnique?.trim() || null;
              e.repsReserve = exData.repsReserve ?? null;
              e.order = exOrder++;
              e.blockId = blockRecord.id;
            });
            batches.push(newExercise);
          }
        }
      }

      await database.batch(...batches);
      return program;
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
        exercise.name = capitalizeWords(exerciseData.name);
        exercise.sets = exerciseData.sets;
        exercise.repsMin = exerciseData.repsMin;
        exercise.repsMax = exerciseData.repsMax;
        exercise.advancedTechnique = exerciseData.advancedTechnique?.trim() || null;
        exercise.repsReserve = exerciseData.repsReserve ?? null;
      });
    });
  }

  static async getAllPrograms(): Promise<Program[]> {
    return await this.programsCollection.query().fetch();
  }

  static async getProgram(id: string): Promise<Program> {
    return await this.programsCollection.find(id);
  }

  static async toggleProgramPin(id: string, isPinned: boolean): Promise<Program> {
    return await database.write(async () => {
      const program = await this.programsCollection.find(id);
      
      const batches = [];
      
      if (isPinned) {
        const currentlyPinned = await this.programsCollection.query(Q.where('is_pinned', true)).fetch();
        for (const p of currentlyPinned) {
          if (p.id !== id) {
            batches.push(p.prepareUpdate((record) => {
              record.isPinned = false;
            }));
          }
        }
      }
      
      batches.push(program.prepareUpdate((p) => {
        p.isPinned = isPinned;
      }));
      
      await database.batch(...batches);
      return program;
    });
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
