import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import migrations from './migrations';
import Food from './models/Food';
import Meal from './models/Meal';
import MealItem from './models/MealItem';
import Program from './models/Program';
import TrainingBlock from './models/TrainingBlock';
import Exercise from './models/Exercise';
import WorkoutSession from './models/WorkoutSession';
import ExerciseExecution from './models/ExerciseExecution';
import ExerciseDefinition from './models/ExerciseDefinition';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'fitapp_db_v3',
  jsi: true, // Habilitado para Dev Build
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Food,
    Meal,
    MealItem,
    Program,
    TrainingBlock,
    Exercise,
    WorkoutSession,
    ExerciseExecution,
    ExerciseDefinition,
  ],
});

export {
  Food,
  Meal,
  MealItem,
  Program,
  TrainingBlock,
  Exercise,
  WorkoutSession,
  ExerciseExecution,
  ExerciseDefinition,
};
