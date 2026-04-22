import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import User from './models/User';
import Workout from './models/Workout';
import Exercise from './models/Exercise';
import Food from './models/Food';
import Meal from './models/Meal';
import MealFood from './models/MealFood';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (Optional) Use asynchronous mode for better performance.
  // Not supported in Safari for now, but generally good for native apps.
  jsi: true, // For Expo/React Native, this enables JSI for better performance
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or something
    console.error('WatermelonDB setup error', error);
  },
});

// Then, make a WatermelonDB database with it!
export const database = new Database({
  adapter,
  modelClasses: [User, Workout, Exercise, Food, Meal, MealFood],
});

// Exporte os modelos para fácil acesso
export {
  User,
  Workout,
  Exercise,
  Food,
  Meal,
  MealFood
};
