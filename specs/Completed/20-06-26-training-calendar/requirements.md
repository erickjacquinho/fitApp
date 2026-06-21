# Requirements: Training Calendar System

## Overview
Adapt the existing training system to use the same modular date-tracking system implemented for the diet module. This allows users to view, plan, and track their workouts on specific dates.

## Acceptance Criteria (ACs)
- **AC1:** WHEN the schema is updated, THEN the `workout_sessions` table SHALL include a `target_date` string column.
- **AC2:** WHEN viewing the Training Tab, THEN the system SHALL display the `DateSelector` at the top.
- **AC3:** WHEN viewing the Training Tab, THEN the system SHALL display only the `WorkoutSession`s associated with the selected date.
- **AC4:** WHEN no workout exists for the selected date, THEN the Training Tab SHALL display an empty state and a "Iniciar Treino" (Start Workout) button.
- **AC5:** WHEN pressing "Iniciar Treino", THEN the system SHALL present the `ProgramListScreen` to select a program.
- **AC6:** WHEN a program is selected, THEN the newly created `WorkoutSession` SHALL be assigned the currently selected `target_date`.
- **AC7:** WHEN the app loads for the first time after the update, THEN any existing `WorkoutSession` with a `null` `target_date` SHALL be migrated to the current date.

## Edge Cases
- Past workouts might not align perfectly with the target_date if started at midnight. We rely strictly on `target_date` for categorization.
