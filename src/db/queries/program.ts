import { database } from '../index';
import Program from '../models/Program';
import TrainingBlock from '../models/TrainingBlock';
import { Q } from '@nozbe/watermelondb';

export const observeProgram = (programId: string) => {
  return database.collections.get<Program>('programs').findAndObserve(programId);
};

export const observeProgramBlocks = (programId: string) => {
  return database.collections
    .get<TrainingBlock>('training_blocks')
    .query(Q.where('program_id', programId), Q.sortBy('order', Q.asc))
    .observeWithColumns(['order', 'name']);
};
