import { database } from '../../../db';
import { Q } from '@nozbe/watermelondb';
import Program from '../../../db/models/Program';
import Exercise from '../../../db/models/Exercise';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { ProgramDTO, BlockDTO } from '../types';
import { capitalizeWords } from '../../../lib/utils';
import { TrainingBlockService } from './training-block-service';
import { ExerciseService } from './exercise-service';

export class ProgramService {
  private static programsCollection = database.get<Program>('programs');

  static async createProgram(programData: ProgramDTO, blocksData: BlockDTO[]): Promise<Program> {
    if (!programData.name || programData.name.trim() === '') {
      throw new Error('ValidationError: Program name is required');
    }
    
    return await database.write(async () => {
      const newProgram = this.programsCollection.prepareCreate((program) => {
        program.name = capitalizeWords(programData.name);
      });

      const batches: any[] = [newProgram];

      for (const blockData of blocksData) {
        const newBlock = TrainingBlockService.prepareCreate(newProgram.id, blockData);
        batches.push(newBlock);

        if (blockData.exercises) {
          let exOrder = 0;
          for (const exerciseData of blockData.exercises) {
            const newExercise = ExerciseService.prepareCreate(newBlock.id, exerciseData as any, exOrder++);
            batches.push(newExercise);
          }
        }
      }

      await database.batch(...batches);
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
          batches.push(TrainingBlockService.prepareDelete(block));
          const blockExercises = await block.exercises.fetch();
          for (const ex of blockExercises) {
            batches.push(ExerciseService.prepareDelete(ex));
          }
        }
      }

      for (const blockData of blocksData) {
        let blockRecord: TrainingBlock;

        if (blockData.id && existingBlocksMap.has(blockData.id)) {
          // Update existing block
          blockRecord = existingBlocksMap.get(blockData.id)!;
          batches.push(TrainingBlockService.prepareUpdate(blockRecord, blockData));
        } else {
          // Create new block
          blockRecord = TrainingBlockService.prepareCreate(program.id, blockData);
          batches.push(blockRecord);
        }

        // Handle exercises for this block
        const existingExercises = blockData.id && existingBlocksMap.has(blockData.id) 
          ? await blockRecord.exercises.fetch() 
          : [];
        const existingExercisesMap = new Map<string, Exercise>(existingExercises.map((e: Exercise) => [e.id, e]));

        const inputExerciseIds = new Set(blockData.exercises.map(e => e.id).filter(Boolean));

        // Mark removed exercises as deleted
        for (const ex of existingExercises) {
          if (!inputExerciseIds.has(ex.id)) {
            batches.push(ExerciseService.prepareDelete(ex));
          }
        }

        // Create or update exercises
        let exOrder = 0;
        for (const exData of blockData.exercises) {
          if (exData.id && existingExercisesMap.has(exData.id)) {
            const exRecord = existingExercisesMap.get(exData.id)!;
            batches.push(ExerciseService.prepareUpdate(exRecord, blockRecord.id, exData as any, exOrder++));
          } else {
            const newExercise = ExerciseService.prepareCreate(blockRecord.id, exData as any, exOrder++);
            batches.push(newExercise);
          }
        }
      }

      await database.batch(...batches);
      return program;
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
        ...blocks.map(b => TrainingBlockService.prepareDelete(b)),
        ...exercisesToDelete.map(e => ExerciseService.prepareDelete(e))
      );
    });
  }
}
