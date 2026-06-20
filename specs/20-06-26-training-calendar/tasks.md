# Tasks: Training Calendar System

## 1. Database & Services
- [x] 1.1 Add `target_date` to DB Schema
  - **Skill:** `backend-developer`
  - **Target:** `src/db/schema.ts`, `src/db/migrations.ts`
  - **Trace:** AC1
- [x] 1.2 Update `WorkoutSession` Model
  - **Skill:** `backend-developer`
  - **Target:** `src/db/models/WorkoutSession.ts`
  - **Trace:** AC1
- [x] 1.3 Update `WorkoutSessionService`
  - **Skill:** `backend-developer`
  - **Target:** `src/features/training/services/workout-session.ts` (or equivalent)
  - **Details:** Accept `targetDate` in `createSession`.
  - **Trace:** AC6

## 2. Components & UI
- [x] 2.1 Create `DailyTrainingScreen`
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/training/components/DailyTrainingScreen.tsx`
  - **Trace:** AC2, AC3, AC4, AC7
  - **Details:** Include `DateSelector`. Run migration for null `target_date`. Use `withObservables` to list `WorkoutSession`s matching `selectedDate`.
- [x] 2.2 Refactor `TrainingTab`
  - **Skill:** `frontend-developer`
  - **Target:** `app/(tabs)/training.tsx`
  - **Trace:** AC2
  - **Details:** Manage `selectedDate` state. Render `DailyTrainingScreen`.
- [x] 2.3 Refactor Program List Integration
  - **Skill:** `frontend-developer`
  - **Target:** `app/training/programs.tsx` and `ProgramListScreen.tsx`
  - **Trace:** AC5, AC6
  - **Details:** Route for selecting program. Pass `date` param.

## 3. Cleanup & Validation
- [x] 3.1 Type check and lint
  - **Skill:** `code-reviewer`
  - **Target:** Terminal
  - **Command:** `npx tsc --noEmit`
