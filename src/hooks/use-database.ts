import { useDatabase } from '@nozbe/watermelondb/hooks';
import { database } from '../db';

export const useAppDatabase = () => {
  return useDatabase() || database;
};
