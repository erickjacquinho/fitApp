# Requirements - Training Refactoring

## 1. Overview
Refactor the Training module to isolate workout lifecycle, session execution, program list, program builder, and history aggregation logic into custom hooks. Remove direct service calls and useEffects from UI presentation files.

## 2. Functional Requirements
- **RF-01:** The system SHALL provide a `useProgramList` hook to fetch training programs, handle deletions, and trigger new session workflows.
- **RF-02:** The system SHALL provide a `useProgramForm` hook to manage building program structures, adding/removing blocks, and batch creating exercises.
- **RF-03:** The system SHALL provide a `useWorkoutSession` hook to orchestrate active sessions, fetch routine exercises, save set logs, delete logs, and compute completions.
- **RF-04:** The system SHALL provide a `useWorkoutHistory` hook to fetch completed sessions list.
- **RF-05:** The system SHALL provide a `useWorkoutDetails` hook to calculate load volume per exercise and global total workload.

## 3. Acceptance Criteria (EARS)
- **WHEN** loading the program list, **THEN** the system SHALL fetch existing routines via the `useProgramList` hook.
- **WHEN** building a program, **THEN** the system SHALL manage routine composition reactively inside the `useProgramForm` hook.
- **WHEN** logging a set, **THEN** the system SHALL save the weight and reps instantly in the DB using the `useWorkoutSession` hook.
- **WHEN** ending a workout session, **THEN** the system SHALL mark the session as completed using the `useWorkoutSession` hook and route to the details page.

## 4. Out of Scope
- Modifying WatermelonDB schemas or associations in `src/db/models/`.
- Changing UI routes in `app/training/`.
