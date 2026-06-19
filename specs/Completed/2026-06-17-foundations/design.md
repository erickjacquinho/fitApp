# Design - Step 1: Foundations and Infrastructure

## 1. Data Architecture (WatermelonDB)

### 1.1 Initial Schema
Location: `src/db/schema.ts`

- **Table: Foods**
  - id, name, preparation_weight (number), description (string), protein (number), carbohydrate (number), fat (number), calories (number), created_at, updated_at.
- **Table: Meals**
  - id, name, quantity (number), preparation_state (string), created_at, updated_at.
- **Table: MealItem**
  - id, meal_id (relation), food_id (relation), quantity (number), created_at, updated_at.
- **Table: Programs**
  - id, name, created_at, updated_at.
- **Table: Blocks**
  - id, program_id (relation), name, order (number), created_at, updated_at.
- **Table: Exercises**
  - id, block_id (relation), name, sets (number), min_repetitions (number), max_repetitions (number), advanced_technique (string), reps_in_reserve (number), created_at, updated_at.
- **Table: WorkoutSession**
  - id, program_id (relation), start_time (number), end_time (number), status (string), created_at, updated_at.
- **Table: ExerciseExecution**
  - id, workout_session_id (relation), exercise_id (relation), set_number (number), reps_done (number), weight (number), reps_in_reserve_done (number), created_at, updated_at.

### 1.2 Modeling
- Model classes in `src/db/models/`.
- Model registration in the `Database` at `src/db/index.ts`.

## 2. Navigation Structure (Expo Router)
Location: `app/`

- `app/_layout.tsx`: Root Provider (WatermelonDB, Safe Area, Theme).
- `app/(tabs)/_layout.tsx`: Bottom Tab Navigator configuration.
- `app/(tabs)/index.tsx`: Dashboard.
- `app/(tabs)/diet.tsx`: Diet Module.
- `app/(tabs)/training.tsx`: Training Module.
- `app/(tabs)/profile.tsx`: Profile/Settings.

## 3. Design System (Base Components)

### 3.1 Atoms (`src/components/atoms/`)
- **Button.tsx**: Props: `variant` (primary, secondary, destructive), `size`, `label`, `onPress`, `icon`.
- **Typography.tsx**: Centralization of text styles (H1, H2, Body, Caption).
- **Input.tsx**: Text/number support, simple visual validation.
- **Card.tsx**: Base container with rounded corners and shadow (Tailwind: `bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm`).

### 3.2 Molecules (`src/components/molecules/`)
- **Header.tsx**: Centralized title, "Back" button on the left (conditional).
- **SwipeableCard.tsx**: `Card` wrapper using `react-native-gesture-handler` and `Reanimated` for side actions.

### 3.3 Organisms (`src/components/organisms/`)
- **ConfirmModal.tsx**: Generic modal for deletion confirmation or critical actions.

## 4. Layer Mapping
1. **Types**: `src/types/navigation.ts`, `src/db/types.ts`.
2. **Database**: `src/db/schema.ts`, `src/db/index.ts`.
3. **Hooks**: `src/hooks/use-database.ts` (shortcut for `useDatabase`).
4. **Components**: Visual implementation using NativeWind.
5. **Routes**: Expo Router integration.

## 5. Security and Performance
- **Security**: Numeric input validation to avoid NaN in DB.
- **Maintainability**: Strict use of atomic components.
- **Scalability**: Expandable schema for cardio and supplementation (future Phase 2).
- **Performance**: Indexing of foreign keys (`program_id`, `block_id`, etc.).
