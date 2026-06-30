# Tasks: Training Program Summary

**Final Validation Command:**
`npx tsc --noEmit && npx expo-doctor`

## - [ ] 1. Types 
- **Skill:** frontend-developer
- **Target:** `src/features/training/types/index.ts`
- **Source:** Design Step 1
- **Trace:** ACs
- **Action:** Define `Program` and `Workout` interfaces.

## - [ ] 2. DB Queries 
- **Skill:** database-admin
- **Target:** `src/db/queries/program.ts`
- **Source:** Design Step 2
- **Trace:** AC "fetch all workouts"
- **Action:** Create WatermelonDB reactive query to fetch workouts by `programId` sorted by `order`.

## - [ ] 3. State/Hooks 
- **Skill:** frontend-developer
- **Target:** `src/features/training/hooks/useProgramSummary.ts`
- **Source:** Design Step 3
- **Trace:** AC "fetch all workouts", "reorder"
- **Action:** Implement hook to expose WatermelonDB queries to the UI. Implement `reorderWorkouts` function.

## - [ ] 4. UI Components - List Item 
- **Skill:** frontend-developer
- **Target:** `src/features/training/components/WorkoutListItem.tsx`
- **Source:** Design Step 4
- **Trace:** AC "display all workouts"
- **Action:** Build reusable item component for a workout. Apply semantic tokens from tailwind.config.js.

## - [ ] 5. UI Components - Main Screen
- **Skill:** frontend-developer
- **Target:** `src/features/training/components/ProgramSummaryScreen.tsx`
- **Source:** Design Step 4
- **Trace:** AC "display all workouts", "reorder button", "edit button"
- **Action:** Build the main screen layout, integrating empty state, and header actions.

## - [ ] 6. Routing
- **Skill:** frontend-developer
- **Target:** `app/training/program/[id].tsx`
- **Source:** Design Step 5
- **Trace:** AC "navigate to Program Summary"
- **Action:** Create Expo Router dynamic route that passes the `id` to `ProgramSummaryScreen`. Wrap with `<Screen>` component.

