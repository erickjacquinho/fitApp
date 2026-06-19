# Requirements - Step 5: Training Module - UI

## 1. Overview
This step focuses on the user interface of the Training module, covering everything from program creation to the detailed execution of each training session.

## 2. User Scenarios
- **Scenario 1: Training Builder**
  - The user adds exercises to a block and defines the intended sets and repetitions.
- **Scenario 2: Real-Time Training**
  - The user follows the exercise list and marks each set as done, entering the weight used.
- **Scenario 3: History Query**
  - The user views their past workouts and analyzes the total volume.

## 3. Functional Requirements

### 3.1 Flow Screens
- **RF-01:** The system SHALL display the `ProgramListScreen` with program cards.
- **RF-02:** The system SHALL display the `WorkoutSessionScreen` (active workout).
- **RF-03:** The system SHALL display the `TrainingHistoryScreen` and `SessionDetailsScreen`.

### 3.2 Specific Components
- **RF-04:** The system SHALL implement the `ExpandableBlock` component with height animation and a chevron.
- **RF-05:** The system SHALL implement the `ExecuteExerciseModal` for entering weight and reps per set.

### 3.3 Interactions
- **RF-06:** The system SHALL display visual progress during the workout (e.g., 2/4 exercises completed).
- **RF-07:** The system SHALL request confirmation before finishing a session.

## 4. Acceptance Criteria (EARS)
- **WHEN** the Block header is pressed, **THEN** the system SHALL expand or collapse the exercise list.
- **WHEN** a set is marked as completed, **THEN** the system SHALL save the data instantly in the DB.
- **WHEN** the workout is finished, **THEN** the system SHALL navigate to the Summary/Details screen.

## 5. Success Criteria
- Fluid and intuitive interface for use during physical effort (large buttons, clear inputs).
- Guaranteed persistence even if the app is closed during the workout.
- Frictionless navigation between workout phases (Block 1 -> Block 2).
