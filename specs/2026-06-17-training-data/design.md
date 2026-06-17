# Design - Step 4: Training Module - Data

## 1. Entity Mapping
Location: `src/db/models/`

- **Program.ts**: `@children('blocks') blocks!: Query<Block>`
- **Block.ts**: `@relation('programs', 'program_id') program!: Relation<Program>`, `@children('exercises') exercises!: Query<Exercise>`
- **Exercise.ts**: `@relation('blocks', 'block_id') block!: Relation<Block>`
- **WorkoutSession.ts**: `@relation('programs', 'program_id') program!: Relation<Program>`, `@children('exercise_executions') executions!: Query<ExerciseExecution>`
- **ExerciseExecution.ts**: `@relation('workout_sessions', 'workout_session_id') session!: Relation<WorkoutSession>`, `@relation('exercises', 'exercise_id') exercise!: Relation<Exercise>`

## 2. Service Layer
Location: `src/features/training/services/`

- **workout-service.ts**:
  - `createProgram(data: ProgramDTO, blocks: BlockDTO[])`
  - `addExerciseToBlock(blockId: string, exerciseData: ExerciseDTO)`
- **session-service.ts**:
  - `startSession(programId: string)`
  - `logSet(sessionId: string, exerciseId: string, data: ExecutionDTO)`
  - `finishSession(sessionId: string)`

## 3. Types
Location: `src/features/training/types.ts`

- `ProgramDTO`, `BlockDTO`, `ExerciseDTO`, `ExecutionDTO`.

## 4. Performance
- Use of `Q.sortBy('order', Q.asc)` to list blocks and exercises.
- Batching in `createProgram` to avoid multiple transactions in the DB.
