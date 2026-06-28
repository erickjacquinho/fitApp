# Design: Training Program Summary

## 1. Types (`src/features/training/types/index.ts`)
```typescript
export interface Program {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workout {
  id: string;
  programId: string;
  name: string;
  order: number;
}
```

## 2. Services / DB Layer (`src/db/queries/program.ts`)
- Use WatermelonDB for fetching program and related workouts ordered by `order`.

## 3. Hooks (`src/features/training/hooks/useProgramSummary.ts`)
- `useProgramSummary(programId: string)`: Fetches program details and workouts. Returns data, loading, and error states.
- `useReorderWorkouts()`: Handles updating the `order` field of workouts in WatermelonDB.

## 4. Components (`src/features/training/components/`)
- `ProgramSummaryScreen`: The main screen component wrapping everything in `<Screen>` at the route level.
- `WorkoutList`: FlatList rendering the workouts. Uses drag-and-drop mechanism for reordering if Reorder mode is active.
- `WorkoutListItem`: Item representing a single workout.
- `ProgramSummaryHeader`: Header containing the "Reorder" and "Edit" buttons.

## 5. Routing (`app/training/program/[id].tsx`)
- Dynamic route accepting `id` parameter. Implements the root `<Screen>` wrapper.

## Core Pillars
- **Security:** Input validation for reordering (ensure indices are within bounds).
- **Maintainability:** Separation of state (Zustand/Hooks) from UI components. Reusable list items.
- **Scalability:** Optimized FlatList for potentially long lists of workouts. WatermelonDB reactive queries for performance.
