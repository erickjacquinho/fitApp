# Tasks - Step 2: Diet Module - Data

## Phase 1: Models
- [X] T001 [US1] Finalize implementation of `src/db/models/Food.ts` with decorators
- [X] T002 [US1] Implement `src/db/models/Meal.ts` with `@children` relationship
- [X] T003 [US1] Implement `src/db/models/MealItem.ts` with `@relation` relationships

## Phase 2: Services (CRUD)
- [X] T004 [US1] Create DTO types in `src/features/diet/types.ts`
- [X] T005 [US1] Implement `src/features/diet/services/food-service.ts` with CRUD methods
- [X] T006 [US1] Implement `src/features/diet/services/meal-service.ts` with batching logic for items
- [X] T007 [US1] Export services and types in `src/features/diet/index.ts`

## Phase 3: Validation
- [X] T008 Validate models in WatermelonDB (verify if tables are created correctly)
- [ ] T009 [P] Create a simple test script or use the console to validate `create` and `getAll` for foods
- [X] T010 Run `npx tsc` to validate diet module types
