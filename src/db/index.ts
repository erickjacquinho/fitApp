import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import User from './models/User';
import Workout from './models/Workout';
import Exercise from './models/Exercise';
import Food from './models/Food';
import Meal from './models/Meal';
import MealFood from './models/MealFood';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [User, Workout, Exercise, Food, Meal, MealFood],
});

export {
  User,
  Workout,
  Exercise,
  Food,
  Meal,
  MealFood
};
