# Design: Training Calendar System

## 1. Database & Models
- **Migration v5:** Add `target_date` (string, optional, indexed) to `workout_sessions`.
- **Model:** Add `@field('target_date') targetDate!: string;` to `WorkoutSession.ts`.
- **Service:** Update `WorkoutSessionService.createSession` to accept `targetDate` and save it.

## 2. UI Architecture
- **`app/(tabs)/training.tsx`**: 
  - Manage `selectedDate` state.
  - Read `date` from `useLocalSearchParams()`.
  - Pass `selectedDate` to `DailyTrainingScreen`.
- **`DailyTrainingScreen.tsx`**:
  - Replaces `ProgramListScreen` as the root training view.
  - Receives `selectedDate`.
  - Displays `DateSelector`.
  - Renders a list of `workout_sessions` for that `target_date` using `withObservables`.
  - If empty, renders a prompt to start a workout (which navigates to a new `/training/programs` route).
- **`app/training/programs.tsx`**:
  - New Expo Router route to display `ProgramListScreen`. Needs to read `date` param and pass it to the session creation.

## 3. Data Migration
- In `DailyTrainingScreen.tsx` `useEffect`, find all `workout_sessions` where `target_date` is `null` and update them to the current system date.
