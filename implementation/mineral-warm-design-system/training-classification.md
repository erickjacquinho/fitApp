# Training Components Classification (Phase 6)

## Screens & Main Views
- `DailyTrainingScreen.tsx`: Tab root container (`bg-surface`, lists active program, history shortcut).
- `ProgramListScreen.tsx`: Screen (`bg-surface`, list of all programs, header/actions).
- `ProgramForm.tsx`: Complex dynamic input screen (`bg-surface`, dynamic `Card` blocks for sets).
- `WorkoutSessionScreen.tsx`: Active training screen (`bg-surface`, header tracking, exercise list items).
- `HistoryScreen.tsx`: List of past workouts (`bg-surface`, empty state).
- `SessionDetailsScreen.tsx`: View past workout data (`bg-surface`, summary view).

## Overlay & Containers
- `ExecuteExerciseModal.tsx`: Uses `BottomSheetModal`. Handles active set logging (weight, reps, tracking).
- `ExerciseSelect.tsx`: Uses `BottomSheetModal`. Searchable dictionary dropdown.
- `SetInputRow.tsx`: Micro-container for `ExecuteExerciseModal` representing an individual set.
- `ExerciseListItem.tsx`: Container card inside a program or active session, presenting set summary, completion status, and actions.
- `TrainingProgressBar.tsx`: Visual progress tracking container, native animated view.

## Legacy Color Usage
- Shared overlay containers already utilize `BottomSheetModal` but use legacy semantic tokens: `bg-surface-app`, `border-soft`, `text-text-main`, `text-tomato-main`, `color="muted"`, `text-accent-main`.
- Need full sweep to replace these with Mineral Warm tokens: `bg-surface`, `border-border-subtle`, `text-text-primary`, `text-error`, `className="text-text-secondary"`, `text-primary`.
