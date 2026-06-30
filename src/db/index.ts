import { Database } from '@nozbe/watermelondb';
import { adapter } from './adapter';

import Food from './models/Food';
import Meal from './models/Meal';
import MealItem from './models/MealItem';
import Program from './models/Program';
import TrainingBlock from './models/TrainingBlock';
import Exercise from './models/Exercise';
import WorkoutSession from './models/WorkoutSession';
import ExerciseExecution from './models/ExerciseExecution';
import ExerciseDefinition from './models/ExerciseDefinition';



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
