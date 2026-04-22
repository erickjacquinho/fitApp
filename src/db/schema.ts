import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema';

export default appSchema({
  version: 1, // Versão inicial do esquema
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
        { name: 'date', type: 'number', isIndexed: true }, // timestamp para a data do treino
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'exercises',
      columns: [
        { name: 'workout_id', type: 'string', isIndexed: true }, // Foreign key para workouts
        { name: 'name', type: 'string' },
        { name: 'sets', type: 'number' },
        { name: 'reps', type: 'string' }, // Pode ser '8-12', ou 'até a falha'
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
        { name: 'date', type: 'number', isIndexed: true }, // timestamp para a data da refeição
        { name: 'name', type: 'string' }, // Ex: 'Café da Manhã', 'Almoço'
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'meal_foods', // Tabela de junção para refeições e alimentos
      columns: [
        { name: 'meal_id', type: 'string', isIndexed: true }, // Foreign key para meals
        { name: 'food_id', type: 'string', isIndexed: true }, // Foreign key para foods
        { name: 'quantity_grams', type: 'number' }, // Quantidade do alimento na refeição
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
