# Tasks - Component Modules (Molecular Refactoring)

## Phase 1: Shared UI Component (ProgressCircle)
- [x] T001 [US1] Create shared component `src/components/atoms/ProgressCircle.tsx` (resolves RF-01, Trace: requirements.md#RF-01, design.md#2.1)

## Phase 2: Feature-Specific Molecular Components
- [x] T002 [US1] Create `src/features/dashboard/components/MacroTrackerCard.tsx` (resolves RF-02, Trace: requirements.md#RF-02, design.md#2.2)
- [x] T003 [US1] Create `src/features/training/components/SetInputRow.tsx` (resolves RF-04, Trace: requirements.md#RF-04, design.md#2.3)
- [x] T004 [US1] Create `src/features/training/components/ExerciseListItem.tsx` (resolves RF-03, Trace: requirements.md#RF-03, design.md#2.4)

## Phase 3: Screen Refactoring
- [x] T005 [US1] Refactor `DietWidget.tsx` to consume `ProgressCircle` and `MacroTrackerCard`
- [x] T006 [US1] Refactor `WorkoutSessionScreen.tsx` to consume `ExerciseListItem`
- [x] T007 [US1] Refactor `ExecuteExerciseModal.tsx` to consume `SetInputRow`

## Phase 4: Verification & Validation
- [x] T008 Run `npx tsc --noEmit` to validate TypeScript compilation
- [x] T009 Run `npx expo-doctor` to ensure overall project health
