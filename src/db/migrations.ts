import { schemaMigrations, createTable, addColumns } from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'foods',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'preparation_weight', type: 'number' },
            { name: 'description', type: 'string', isOptional: true },
            { name: 'protein', type: 'number' },
            { name: 'carbohydrates', type: 'number' },
            { name: 'fat', type: 'number' },
            { name: 'calories', type: 'number' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'meals',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'quantity', type: 'number' },
            { name: 'preparation_state', type: 'string' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'meal_items',
          columns: [
            { name: 'meal_id', type: 'string', isIndexed: true },
            { name: 'food_id', type: 'string', isIndexed: true },
            { name: 'quantity', type: 'number' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'programs',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'training_blocks',
          columns: [
            { name: 'program_id', type: 'string', isIndexed: true },
            { name: 'name', type: 'string' },
            { name: 'order', type: 'number' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'exercises',
          columns: [
            { name: 'block_id', type: 'string', isIndexed: true },
            { name: 'name', type: 'string' },
            { name: 'sets', type: 'number' },
            { name: 'reps_min', type: 'number' },
            { name: 'reps_max', type: 'number' },
            { name: 'advanced_technique', type: 'string', isOptional: true },
            { name: 'reps_reserve', type: 'number', isOptional: true },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'workout_sessions',
          columns: [
            { name: 'program_id', type: 'string', isIndexed: true },
            { name: 'start_date', type: 'number' },
            { name: 'end_date', type: 'number', isOptional: true },
            { name: 'status', type: 'string' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'exercise_executions',
          columns: [
            { name: 'workout_session_id', type: 'string', isIndexed: true },
            { name: 'exercise_id', type: 'string', isIndexed: true },
            { name: 'set_number', type: 'number' },
            { name: 'reps_done', type: 'number' },
            { name: 'weight', type: 'number' },
            { name: 'reps_reserve_done', type: 'number', isOptional: true },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
      ],
    },
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: 'meals',
          columns: [
            { name: 'order_index', type: 'number', isOptional: true },
          ],
        }),
      ],
    },
    {
      toVersion: 4,
      steps: [
        addColumns({
          table: 'meals',
          columns: [
            { name: 'target_date', type: 'string', isOptional: true },
          ],
        }),
      ],
    },
    {
      toVersion: 5,
      steps: [
        addColumns({
          table: 'workout_sessions',
          columns: [
            { name: 'target_date', type: 'string', isIndexed: true, isOptional: true },
          ],
        }),
      ],
    },
    {
      toVersion: 6,
      steps: [
        createTable({
          name: 'exercise_definitions',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
      ],
    },
    {
      toVersion: 7,
      steps: [
        addColumns({
          table: 'programs',
          columns: [
            { name: 'is_pinned', type: 'boolean', isOptional: true },
          ],
        }),
      ],
    },
    {
      toVersion: 8,
      steps: [
        addColumns({
          table: 'exercises',
          columns: [
            { name: 'order', type: 'number' },
          ],
        }),
      ],
    },
    {
      toVersion: 9,
      steps: [
        addColumns({
          table: 'foods',
          columns: [
            { name: 'is_favorite', type: 'boolean', isOptional: true },
          ],
        }),
      ],
    },
  ],
});
