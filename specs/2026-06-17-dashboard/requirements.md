# Requirements - Step 6: Dashboard

## 1. Overview
The Dashboard is the control center of fitApp, unifying diet and training data to provide a quick view of the user's daily and weekly progress.

## 2. User Scenarios
- **Scenario 1: Daily Overview**
  - The user opens the app and sees how many calories they can still consume for the day.
- **Scenario 2: Next Workout**
  - The user sees what the next workout of their active program is and if they have already trained today.
- **Scenario 3: Quick Shortcuts**
  - The user taps a widget and is taken directly to the corresponding module.

## 3. Functional Requirements

### 3.1 Summary Widgets
- **RF-01:** The system SHALL display a `DietWidget` with: calories consumed, daily goal, and progress bar.
- **RF-02:** The system SHALL display a `TrainingWidget` with: current program name, weekly summary (workouts done/pending), and a link to start a session.

### 3.2 Statistics
- **RF-03:** The system SHALL display basic statistics (e.g., average weight, total weekly volume) if data is available.

### 3.3 Integrated Navigation
- **RF-04:** The system SHALL provide deep navigation links from the widgets to the main screens of each module.

## 4. Acceptance Criteria (EARS)
- **WHEN** diet data changes, **THEN** the `DietWidget` on the Dashboard SHALL be updated automatically.
- **WHEN** the user taps the `TrainingWidget`, **THEN** the system SHALL navigate to the Training screen.
- **WHEN** there is no data (first use), **THEN** the system SHALL display friendly empty states with action buttons (e.g., "Create Diet").

## 5. Success Criteria
- Dashboard centralizes the most important information with visual clarity.
- Dashboard loading time is minimal (efficient use of WatermelonDB queries).
- Fluid navigation between Dashboard and modules.
