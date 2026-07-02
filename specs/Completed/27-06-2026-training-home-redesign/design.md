# Design: Training Home Redesign

## 1. UI Components
- **Header**: Use the existing `Header` component but with `leftIcon` (History) and `rightIcon` (Plus) actions instead of a generic back button.
- **Pinned Programs Section**: A list/card view for programs marked as pinned.
- **Treino Rápido Button**: A prominent primary/secondary button in the center.
- **Other Programs Section**: The existing `ProgramListScreen` logic mapped to render unpinned programs.

## 2. State & Data
- Update `TrainingProgram` model to include a `is_pinned` (boolean) field.
- Update `useProgramList` hook to separate programs into `pinnedPrograms` and `otherPrograms`.
- Add a function in `useProgramList` to toggle pin status.

## 3. Architecture
- **Component**: `src/features/training/components/TrainingHomeScreen.tsx` (replaces/adapts `ProgramListScreen.tsx`).
- **Route**: `app/(tabs)/training.tsx` uses `TrainingHomeScreen`.
- **Database**: Add `is_pinned` to `training_programs` table.
