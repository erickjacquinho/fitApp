# Requirements - Component Modules (Molecular Refactoring)

## 1. Overview
Extract and modularize hardcoded UI elements in the Dashboard, Diet, and Training screens into reusable molecular components. Ensure strictly consistent color tokens, typography, and standard layout variables, preventing styling code repetition.

## 2. Functional Requirements
- **RF-01:** The system SHALL provide a shared `ProgressCircle` component to represent percentage-based circular progress.
- **RF-02:** The system SHALL provide a `MacroTrackerCard` widget to render macronutrient values, goals, and color themes.
- **RF-03:** The system SHALL provide an `ExerciseListItem` component to unify routine exercise cards.
- **RF-04:** The system SHALL provide a `SetInputRow` component to encapsulate weight and rep input fields for sets logging.

## 3. Acceptance Criteria (EARS)
- **WHEN** displaying the Diet widget on the dashboard, **THEN** the system SHALL render macro metrics using individual `MacroTrackerCard` instances.
- **WHEN** showing progress on the dashboard, **THEN** the system SHALL display percentage completions using the `ProgressCircle` component.
- **WHEN** executing a workout session, **THEN** the system SHALL present routine items using `ExerciseListItem` components.
- **WHEN** entering weight and reps for a set, **THEN** the system SHALL load a dedicated `SetInputRow` component inside the modal.

## 4. Out of Scope
- Adding new business features, database services, or tables.
- Modifying Expo Router navigation files in `app/`.
