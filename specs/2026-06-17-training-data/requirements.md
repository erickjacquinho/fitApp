# Requirements - Step 4: Training Module - Data

## 1. Overview
This step focuses on data persistence and logic for the Training module, including structuring training programs, blocks, and capturing active workout sessions.

## 2. User Scenarios
- **Scenario 1: Training Planning**
  - The user creates a program and defines blocks (e.g., Workout A, Workout B).
- **Scenario 2: Session Logging**
  - The user starts a workout, and the system saves the start and end of the session.
- **Scenario 3: Performance Logging**
  - The user saves weight and repetitions for each set of each exercise.

## 3. Functional Requirements

### 3.1 Data Models (WatermelonDB)
- **RF-01:** The system SHALL implement the Models: `Program`, `Block`, `Exercise`.
- **RF-02:** The system SHALL implement the execution Models: `WorkoutSession` and `ExerciseExecution`.

### 3.2 Repositories (Services)
- **RF-03:** The system SHALL provide the `TrainingService` to manage program and block creation.
- **RF-04:** The system SHALL provide the `SessionService` to record the start, progress, and completion of a workout.

### 3.3 Business Rules
- **RF-05:** The system SHALL automatically calculate the total load volume (kg * reps) upon finishing a session (optional at this stage, mandatory in the UI).

## 4. Acceptance Criteria (EARS)
- **WHEN** a program is deleted, **THEN** the system SHALL cascade delete all associated blocks and exercises.
- **WHEN** a training session is finished, **THEN** the system SHALL update the status to "completed" and save the final timestamp.
- **WHEN** adding an exercise execution, **THEN** the system SHALL correctly link it to the session and the original exercise.

## 5. Success Criteria
- Hierarchical structure (Program -> Block -> Exercise) working in the DB.
- Session history being persisted correctly.
- Query performance optimized to load the complete program with its exercises.
