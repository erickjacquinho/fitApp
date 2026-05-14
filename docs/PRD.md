# FitApp Technical PRD

## 1. Objective

Build an offline-first mobile app for fitness and nutrition management using React Native, Expo, Expo Router, TypeScript, Zustand, WatermelonDB, and NativeWind.

The product has three primary surfaces:

- **Dashboard**: unified view of the user's current diet plan and current training plan.
- **Diet**: modular area for daily meals, foods, meal combinations, macros, and calories.
- **Training**: workout logbook for tracking training execution and progression over time.

The MVP must preserve the source idea from `pre-PRD.txt`: simple UX, complete local control, food and workout data stored offline, and a dashboard that makes the current plan measurable.

## 2. Scope

### 2.1 In Scope

- Unified dashboard with current diet and current training summaries.
- App-wide page header showing current navigation context.
- Daily diet menu with meals, foods, macros, and total calories.
- Two diet menu modes: daily custom menu and fixed recurring menu.
- Food database with create, read, update, delete, search, bulk selection, and bulk deletion.
- Meal creation as a reusable combination of foods.
- Food and meal cards with edit/delete actions, preferably via swipe gesture.
- Workout logbook for recording performed workouts.
- Training sheet list ordered by creation date or update date.
- Training sheet builder with workouts inside the sheet.
- Exercise creation inside each workout.
- Exercise fields for name, sets, min/max reps, advanced technique, and target reps in reserve.
- Workout session execution with performed sets, weight, reps, and performed RIR.
- Workout history for progression tracking.
- Local persistence through WatermelonDB.
- Feature-first implementation under `src/features/`.
- Expo Router route orchestration under `app/`.

### 2.2 Out of Scope - MVP

- User authentication.
- Cloud sync.
- Import/export.
- Push notifications.
- Calorie expenditure from cardio or workouts.
- Long-term evolution charts.
- AI coaching.
- Social/sharing features.

### 2.3 Future Scope

- Cardio/workout calorie expenditure.
- Progress charts using `react-native-gifted-charts`.
- Cross-feature analytics, such as calories vs. training volume.
- Cloud sync and backup.

## 3. Architecture Constraints

### 3.1 Required Stack

- **Framework**: React Native with Expo Managed Workflow.
- **Routing**: Expo Router.
- **Language**: TypeScript with strict typing.
- **Persistence**: WatermelonDB as the local source of truth.
- **State**: Zustand only for global UI state or derived cross-feature state.
- **Styling**: NativeWind v4 with tokens from `tailwind.config.js` and `global.css`.
- **UI architecture**: Atomic Design with shared components in `src/components/`.

### 3.2 Code Organization

```text
app/
  (tabs)/
  diet/
  training/

src/
  components/
    atoms/
    molecules/
    organisms/
  db/
    diet/
      schema.ts
      models/
    training/
      schema.ts
      models/
  features/
    dashboard/
    diet/
    training/
```

Pages in `app/` must be slim orchestrators. Business logic, database writes, and reusable UI must live inside `src/features/` or `src/components/`.

### 3.3 Persistence Rules

- Use separate WatermelonDB databases for diet and training.
- The diet database owns foods, meals, and meal items.
- The training database owns training sheets, workouts, exercises, workout sessions, exercise executions, and set executions.
- Dashboard may read from both databases through feature hooks, but must not couple the databases directly.
- Every table must include `created_at` and `updated_at`.
- All writes must happen inside services or model writers.
- UI components must not call `.create()`, `.update()`, or `.destroy()` directly.
- Reactive reads must use WatermelonDB observables or approved reactive hooks.

## 4. Feature Modules

### 4.1 Dashboard

Purpose: show the current diet and training state in one place.

Responsibilities:

- Show today's calorie and macro totals.
- Show current or latest training sheet/session.
- Show basic measurable stats.
- Link to Diet and Training modules.

Recommended files:

```text
src/features/dashboard/
  components/
  hooks/
  types.ts
  index.ts
```

### 4.2 Diet

Purpose: manage foods, meals, and daily menu.

Responsibilities:

- Create and manage foods.
- Create meals as combinations of foods.
- Manage meals by date in daily menu mode.
- Manage a fixed menu that appears every day until changed.
- Mark fixed-menu meals as completed for the current day.
- Show meal macros and calories.
- Show total daily calories and macros.
- Support search and bulk actions in the food database.

Recommended files:

```text
src/features/diet/
  components/
  hooks/
  services/
  types.ts
  index.ts
```

### 4.3 Training

Purpose: act as a workout logbook for tracking progression.

Responsibilities:

- Create training sheets.
- Add workouts inside each training sheet.
- Add exercises inside each workout.
- Store sets, rep ranges, advanced technique, and reps in reserve.
- Start a workout session by pressing play on a workout from a training sheet.
- Record performed sets with weight, reps, and performed RIR.
- Store workout history chronologically.
- Expose progression data per exercise over time.

Recommended files:

```text
src/features/training/
  components/
  hooks/
  services/
  types.ts
  index.ts
```

## 5. Routes

Expo Router must own navigation.

Suggested MVP routes:

```text
app/(tabs)/index.tsx                  # Dashboard
app/(tabs)/diet/index.tsx             # Daily menu
app/(tabs)/training/index.tsx         # Training logbook

app/diet/foods/index.tsx              # Food database
app/diet/foods/new.tsx                # Create food
app/diet/foods/[id]/edit.tsx          # Edit food
app/diet/meals/new.tsx                # Create meal
app/diet/meals/[id]/edit.tsx          # Edit meal

app/training/programs/new.tsx         # Create training sheet
app/training/programs/[id]/edit.tsx   # Edit training sheet
app/training/sessions/new.tsx         # Start workout session from sheet workout
app/training/sessions/[id].tsx        # Active or completed workout session
app/training/history/index.tsx        # Workout history
app/training/history/[id].tsx         # Workout history details
```

## 6. Data Model

Product language:

- `training_programs` = training sheets.
- `training_blocks` = workouts inside a training sheet.
- `exercises` = exercises inside a workout.
- `workout_sessions` = logbook entries created when the user presses play on a workout.

### 6.1 Diet Tables

#### `foods`

Stores user-created foods.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `name` | string | yes | Indexed for search |
| `preparation_weight_g` | number | yes | Must be greater than 0 |
| `description` | string | no | Optional |
| `protein_g` | number | yes | Must be >= 0 |
| `carbs_g` | number | yes | Must be >= 0 |
| `fat_g` | number | yes | Must be >= 0 |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

Calories are derived:

```text
calories = protein_g * 4 + carbs_g * 4 + fat_g * 9
```

#### `meals`

Stores reusable meals/food combinations.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `name` | string | yes | Indexed for search |
| `quantity` | number | yes | Must be greater than 0 |
| `preparation_state` | string | yes | `raw`, `prepared`, or `ready` |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `daily_meals`

Stores meals assigned to a specific day.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `meal_id` | string | yes | Indexed relation to `meals` |
| `date` | number | yes | Indexed day timestamp |
| `is_completed` | boolean | yes | Defaults to false |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `fixed_menu_meals`

Stores reusable meals that appear every day until removed or changed.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `meal_id` | string | yes | Indexed relation to `meals` |
| `sort_order` | number | yes | Display order |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `fixed_menu_completions`

Stores daily completion state for fixed-menu meals.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `fixed_menu_meal_id` | string | yes | Indexed relation to `fixed_menu_meals` |
| `date` | number | yes | Indexed day timestamp |
| `is_completed` | boolean | yes | Defaults to false |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `meal_items`

Stores foods inside a meal.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `meal_id` | string | yes | Indexed relation to `meals` |
| `food_id` | string | yes | Indexed relation to `foods` |
| `quantity_g` | number | yes | Must be greater than 0 |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

### 6.2 Training Tables

#### `training_programs`

Stores user-created training sheets. A training sheet is the full planned routine.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `name` | string | yes | Indexed for search |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `training_blocks`

Stores workouts inside a training sheet. A workout can represent a day, session type, or muscle group.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `program_id` | string | yes | Indexed relation to `training_programs` |
| `name` | string | yes | User-defined |
| `sort_order` | number | yes | Used for visual order |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `exercises`

Stores exercises inside workouts.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `block_id` | string | yes | Indexed relation to `training_blocks` |
| `name` | string | yes | User-defined |
| `sets` | number | yes | Must be >= 1 |
| `min_reps` | number | yes | Must be >= 1 |
| `max_reps` | number | yes | Must be >= `min_reps` |
| `advanced_technique` | string | no | Optional |
| `target_rir` | number | no | Reps in reserve |
| `sort_order` | number | yes | Used for visual order |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `advanced_techniques`

Stores default and user-created advanced technique options.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `name` | string | yes | Indexed for dropdown search |
| `is_default` | boolean | yes | Defaults to false for user-created options |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `workout_sessions`

Stores each performed workout session created when the user presses play on a workout from a training sheet.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `program_id` | string | yes | Indexed relation to `training_programs` |
| `block_id` | string | yes | Indexed relation to the selected workout in `training_blocks` |
| `started_at` | number | yes | Timestamp |
| `finished_at` | number | no | Timestamp |
| `status` | string | yes | `in_progress`, `completed`, or `cancelled` |
| `notes` | string | no | Optional session notes |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `exercise_executions`

Stores each exercise performed inside a workout session.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `session_id` | string | yes | Indexed relation to `workout_sessions` |
| `exercise_id` | string | yes | Indexed relation to `exercises` |
| `sort_order` | number | yes | Execution order |
| `notes` | string | no | Optional exercise notes |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

#### `set_executions`

Stores performed set data used for progression tracking.

| Column | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | WatermelonDB ID |
| `exercise_execution_id` | string | yes | Indexed relation to `exercise_executions` |
| `set_number` | number | yes | Must be >= 1 |
| `weight_kg` | number | yes | Must be >= 0 |
| `reps` | number | yes | Must be >= 1 |
| `rir` | number | no | Performed reps in reserve |
| `is_completed` | boolean | yes | Defaults to false |
| `created_at` | number | yes | Timestamp |
| `updated_at` | number | yes | Timestamp |

These tables are mandatory for the training module because the module is a logbook built from repeated sessions of workouts in a training sheet.

## 7. Services and Hooks

### 7.1 Diet Services

```text
src/features/diet/services/food.service.ts
src/features/diet/services/meal.service.ts
```

Required service operations:

- `createFood`
- `updateFood`
- `deleteFood`
- `deleteFoods`
- `createMeal`
- `updateMeal`
- `deleteMeal`
- `assignMealToDate`
- `addMealToFixedMenu`
- `markFixedMenuMealCompleted`
- `calculateFoodCalories`
- `calculateMealMacros`

### 7.2 Diet Hooks

```text
src/features/diet/hooks/use-foods.ts
src/features/diet/hooks/use-meals.ts
src/features/diet/hooks/use-daily-macros.ts
```

Hooks must expose reactive data and derived state without duplicating WatermelonDB records in Zustand.

### 7.3 Training Services

```text
src/features/training/services/program.service.ts
src/features/training/services/exercise.service.ts
src/features/training/services/workout-log.service.ts
```

Required service operations:

- `createTrainingProgram`
- `updateTrainingProgram`
- `deleteTrainingProgram`
- `createTrainingBlock`
- `updateTrainingBlock`
- `deleteTrainingBlock`
- `createExercise`
- `updateExercise`
- `deleteExercise`
- `createAdvancedTechnique`
- `listAdvancedTechniques`
- `startWorkoutSession`
- `recordSetExecution`
- `updateSetExecution`
- `completeWorkoutSession`
- `cancelWorkoutSession`
- `calculateExerciseProgression`

### 7.4 Training Hooks

```text
src/features/training/hooks/use-training-programs.ts
src/features/training/hooks/use-training-program.ts
src/features/training/hooks/use-active-workout-session.ts
src/features/training/hooks/use-workout-history.ts
src/features/training/hooks/use-exercise-progression.ts
```

## 8. Functional Requirements

### FR-001: Dashboard

Priority: P0

Acceptance criteria:

- Shows current daily diet summary.
- Shows today's total calories and macros.
- Shows current or latest training sheet/session.
- Provides navigation to Diet and Training.
- Uses reactive data from feature hooks.
- Shows loading and empty states.

### FR-002: App Header

Priority: P0

Acceptance criteria:

- Every screen shows a page title.
- Screens deeper than a tab root expose a back action.
- Header is reusable and implemented through shared UI or Expo Router options.

### FR-003: Daily Diet Menu

Priority: P0

Acceptance criteria:

- Lists meals for the current day or current menu context.
- Supports daily custom menu mode, where meals are assigned to a specific date.
- Supports fixed menu mode, where configured meals appear every day.
- In fixed menu mode, user can mark each meal as completed for the current day.
- Shows calories and macros per meal.
- Shows total calories and macros at the top.
- Provides actions to create food, create meal, and open food database.
- Handles empty, loading, and error states.

### FR-004: Food CRUD

Priority: P0

Acceptance criteria:

- User can create, edit, and delete foods.
- Required fields: name, preparation weight, protein, carbs, fat.
- Optional field: description.
- Calories are calculated from macros using 4/4/9.
- Invalid numeric fields block save.
- Save operations use WatermelonDB service writes.

### FR-005: Food Database

Priority: P0

Acceptance criteria:

- Lists all foods ordered by name or creation date.
- Search filters by food name.
- User can select multiple foods.
- User can bulk delete selected foods after confirmation.
- Food rows/cards expose edit and delete actions.

### FR-006: Meal CRUD

Priority: P0

Acceptance criteria:

- User can create, edit, and delete meals.
- Required fields: name, quantity, preparation state.
- User can add one or more foods to a meal.
- User can define quantity in grams for each selected food.
- Meal macros and calories are derived from selected foods.
- Preview updates before save.
- User can assign a meal to a specific day or add it to the fixed menu.

### FR-007: Swipe Actions

Priority: P1

Acceptance criteria:

- Food, meal, and exercise cards can expose edit/delete actions via swipe where practical.
- Delete always requires confirmation.
- Edit opens a form with existing values.
- Swipe implementation must not block accessibility alternatives.

### FR-008: Workout Logbook Home

Priority: P0

Acceptance criteria:

- Shows active workout session when one exists.
- Shows recent completed workouts.
- Lists training sheets in chronological order.
- User can create a new training sheet.
- User can add workouts inside a training sheet.
- User can start a workout session by pressing play on a workout.
- Training sheet cards can expand to show workouts.
- Empty state includes a create-training-sheet CTA.

### FR-009: Training Sheet Builder

Priority: P0

Acceptance criteria:

- User can create and edit a training sheet name.
- User can add, edit, delete, and reorder workouts inside the sheet.
- Workouts are expandable with chevron interaction.
- User can add exercises inside each workout.

### FR-010: Exercise CRUD

Priority: P0

Acceptance criteria:

- User can create, edit, and delete exercises.
- Required fields: name, sets, min reps, max reps.
- Optional fields: advanced technique, target reps in reserve.
- Advanced technique is selected from a dropdown.
- User can add custom advanced technique options to the dropdown.
- `max_reps` must be greater than or equal to `min_reps`.
- Exercises are shown as cards inside expanded workouts.

### FR-011: Workout Execution Log

Priority: P0

Acceptance criteria:

- User can start a workout session by pressing play on a workout from a training sheet.
- The session is generated from the selected workout's exercises.
- The session stores start time and status.
- User can record performed sets for each exercise.
- Each set stores weight, reps, performed RIR, set number, and completion state.
- User can complete or cancel a session.
- Completed sessions appear in workout history.

### FR-012: Progression Tracking

Priority: P0

Acceptance criteria:

- User can review previous executions of the same exercise.
- Progression data includes weight, reps, RIR, and date.
- History is ordered from newest to oldest.
- The system can calculate best set and latest set per exercise.

### FR-013: Local Persistence

Priority: P0

Acceptance criteria:

- Foods persist after app restart.
- Meals and meal items persist after app restart.
- Daily meal assignments, fixed menu meals, and fixed menu completions persist after app restart.
- Training sheets, workouts, exercises, sessions, exercise executions, and set executions persist after app restart.
- Relations remain valid after update and delete operations.

## 9. Non-Functional Requirements

### NFR-001: Performance

- Initial food list render should complete in less than 500ms for 500 local foods.
- Search feedback should feel instant for 500 local foods.
- Macro calculation should complete in less than 50ms for a meal with up to 30 items.
- Block expand/collapse should respond in less than 100ms.

### NFR-002: Offline-First

- All MVP data must be usable without network access.
- No MVP flow may depend on remote APIs.
- WatermelonDB is the source of truth for persistent domain data.

### NFR-003: Usability

- Destructive actions require confirmation.
- Interactive elements must have pressed/disabled states.
- Touch targets must be at least 44x44px.
- List screens must include loading, empty, and error states.

### NFR-004: Accessibility

- Interactive elements must include `accessibilityRole` and `accessibilityLabel`.
- Swipe-only actions must have a non-swipe alternative.
- Text contrast must follow the project color token rules.

### NFR-005: Maintainability

- No `any`.
- No direct database writes inside UI components.
- No inline styles unless technically unavoidable.
- Components above 250 lines must be split.
- Shared UI must reuse existing atoms/molecules before creating new components.

## 10. Validation Rules

### Food

- `name`: required, trimmed, non-empty.
- `preparation_weight_g`: required, number, greater than 0.
- `protein_g`: required, number, greater than or equal to 0.
- `carbs_g`: required, number, greater than or equal to 0.
- `fat_g`: required, number, greater than or equal to 0.

### Meal

- `name`: required, trimmed, non-empty.
- `quantity`: required, number, greater than 0.
- `preparation_state`: required enum.
- At least one food item is required before save.
- Each `meal_items.quantity_g` must be greater than 0.

### Daily Meal

- `meal_id`: required.
- `date`: required day timestamp.
- `is_completed`: boolean.

### Fixed Menu Meal

- `meal_id`: required.
- `sort_order`: required.

### Advanced Technique

- `name`: required, trimmed, non-empty.
- Custom option names must be unique case-insensitively.

### Training Sheet

- `name`: required, trimmed, non-empty.

### Workout

- `name`: required, trimmed, non-empty.
- `sort_order`: required.

### Exercise

- `name`: required, trimmed, non-empty.
- `sets`: integer, greater than or equal to 1.
- `min_reps`: integer, greater than or equal to 1.
- `max_reps`: integer, greater than or equal to `min_reps`.
- `advanced_technique`: optional dropdown value from `advanced_techniques`.
- `target_rir`: optional integer, greater than or equal to 0.

### Workout Session

- `program_id`: required.
- `block_id`: required.
- `started_at`: required timestamp.
- `status`: required enum.
- `finished_at`: required only when status is `completed` or `cancelled`.

### Set Execution

- `set_number`: integer, greater than or equal to 1.
- `weight_kg`: number, greater than or equal to 0.
- `reps`: integer, greater than or equal to 1.
- `rir`: optional integer, greater than or equal to 0.

## 11. Offline and Data Integrity Rules

- Deleting a meal must delete related `meal_items`.
- Deleting a food removes it from meal definitions and from the current day's diet after explicit confirmation.
- Deleting a food must not mutate past registered days.
- If the food exists in the current day's diet, deletion must show a confirmation popup before removing it from current-day meals.
- Deleting a training sheet must delete its workouts, exercises, and unstarted template data after explicit confirmation.
- Completed workout log records must preserve historical performed values even if the source exercise template changes later.
- Deleting a workout from a training sheet must delete its exercises after explicit confirmation.
- Cancelling an in-progress workout session must require confirmation.
- Bulk delete must run in a WatermelonDB batch.
- Frequently filtered columns must be indexed.

## 12. Acceptance Criteria

- User can open the dashboard and navigate to Diet or Training.
- User can create a food and see calculated calories.
- User can edit and delete a food.
- User can search foods.
- User can bulk delete foods after confirmation.
- User can create a meal from existing foods.
- User can build a diet by day.
- User can configure a fixed menu that appears every day.
- User can mark fixed-menu meals as completed for the current day.
- User can see meal macro and calorie preview before saving.
- User can create a training sheet.
- User can add expandable workouts to a training sheet.
- User can add exercises with sets, rep ranges, advanced technique, and target RIR.
- User can press play on a workout and start a workout session.
- User can log performed sets with weight, reps, and RIR.
- User can view workout history for progression tracking.
- All MVP domain data persists after app restart.
- No screen writes directly to WatermelonDB.

## 13. Open Questions

- Should current training sheet be manually selected or inferred from latest updated sheet?
