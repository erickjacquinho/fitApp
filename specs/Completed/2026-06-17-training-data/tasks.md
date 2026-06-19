# Tasks - Step 4: Training Module - Data

## Phase 1: Models (Training)
- [x] T001 [US1] Implement `src/db/models/Program.ts`
- [x] T002 [US1] Implement `src/db/models/Block.ts`
- [x] T003 [US1] Implement `src/db/models/Exercise.ts`
- [x] T004 [US1] Implement `src/db/models/WorkoutSession.ts`
- [x] T005 [US1] Implement `src/db/models/ExerciseExecution.ts`

## Phase 2: Services (Training logic)
- [x] T006 [US1] Create DTO types in `src/features/training/types.ts`
- [x] T007 [US1] Implement `src/features/training/services/workout-service.ts` (Program CRUD)
- [x] T008 [US1] Implement `src/features/training/services/session-service.ts` (Workout execution)
- [x] T009 [US1] Export services and types in `src/features/training/index.ts`

## Phase 3: Validation
- [x] T010 Validate model hierarchy in WatermelonDB
- [x] T011 [P] Create script test to validate creation of a complex program (multiple blocks/exercises)
- [x] T012 Run `npx tsc` to validate training module types
