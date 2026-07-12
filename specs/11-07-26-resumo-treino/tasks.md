# Tasks: Workout Summary Screen Redesign

## Requirements & Scope

This task list covers the implementation of the Workout Summary Screen redesign according to `spec.md` and `plan.md`.

## Execution Plan

- [x] **1. Scaffold UI Components**
  - Create `src/features/workouts/components/WorkoutSummaryHeader.tsx` to display basic info (date, title).
  - Create `src/features/workouts/components/WorkoutSummaryMetrics.tsx` to display total duration, volume, and PR highlights.
  - Create `src/features/workouts/components/WorkoutSummaryExerciseList.tsx` for the exercise breakdown.
- [x] **2. Assemble Main Screen**
  - Update `app/training/details/[id].tsx` to use the `<Screen>` wrapper and compose the new components.
  - Fetch WatermelonDB data using `@nozbe/with-observables` and pass it to the components.
- [x] **3. Polish & Styling (Zero Slop)**
  - Ensure all tokens use the Mineral Warm palette.
  - Apply strict typography scaling and layout grids.
  - Test the screen to guarantee perfect alignment, contrast, and spacing.
- [x] **4. Final Audit**
  - Run `speckit-analyze` (or perform manual consistency check).
  - Run linting and type checking (`npm run lint`, `npx tsc --noEmit`).
  - Verify WCAG touch targets.
