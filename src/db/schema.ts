import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'workouts',
      columns: [
        { name: 'date', type: 'number', isIndexed: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'exercises',
      columns: [
        { name: 'workout_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'sets', type: 'number' },
        { name: 'reps', type: 'string' }, // e.g. '8-12' or 'to failure'
        { name: 'weight', type: 'number' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'foods',
      columns: [
        { name: 'name', type: 'string', isIndexed: true },
        { name: 'calories_per_100g', type: 'number' },
        { name: 'protein_per_100g', type: 'number' },
        { name: 'carbs_per_100g', type: 'number' },
        { name: 'fat_per_100g', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'meals',
      columns: [
        { name: 'date', type: 'number', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'meal_foods',
      columns: [
        { name: 'meal_id', type: 'string', isIndexed: true },
        { name: 'food_id', type: 'string', isIndexed: true },
        { name: 'quantity_grams', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
