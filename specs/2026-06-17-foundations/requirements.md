# Requirements - Step 1: Foundations and Infrastructure

## 1. Overview
This step establishes the technical foundation of fitApp, including the offline persistence layer with WatermelonDB, the navigation structure, and fundamental interface components that will be reused throughout the application.

## 2. User Scenarios
- **Scenario 1: Initial Navigation**
  - The user opens the app and is directed to the Dashboard (initially empty).
  - The user can switch between the Dashboard, Diet, and Training tabs.
- **Scenario 2: Visual Consistency**
  - The user navigates between different screens and notices a consistent Header with the screen title and functional back button.

## 3. Functional Requirements

### 3.1 Data Infrastructure (WatermelonDB)
- **RF-01:** The system SHALL configure the WatermelonDB instance in the application.
- **RF-02:** The system SHALL define the initial schemas for Diet (Food, Meal, MealItem) and Training (Program, Block, Exercise, WorkoutSession, ExerciseExecution).
- **RF-03:** The system SHALL provide a Database Provider for access throughout the component tree.

### 3.2 Base Interface Components
- **RF-04:** The system SHALL implement a reusable `Header` component supporting title, back button, and Safe Area.
- **RF-05:** The system SHALL implement atomic components: `Card`, `Button` (primary, secondary, destructive), `Input` (text/number with validation), and a confirmation `Modal`.
- **RF-06:** The system SHALL implement the `SwipeableCard` component to support side gestures.

### 3.3 Navigation
- **RF-07:** The system SHALL configure the `Bottom Tab Navigator` for the main screens (Dashboard, Diet, Training).
- **RF-08:** The system SHALL configure `Stack Navigators` for each module to allow deep navigation.

## 4. Acceptance Criteria (EARS)
- **WHEN** the application is started, **THEN** the system SHALL load the WatermelonDB instance without errors.
- **WHEN** the user taps a tab on the bottom bar, **THEN** the system SHALL navigate to the corresponding screen.
- **WHEN** a sub-level screen is opened, **THEN** the system SHALL display the "Back" button in the Header.
- **WHEN** the "Back" button is pressed, **THEN** the system SHALL return to the previous screen.

## 5. Success Criteria
- Application initializes and navigates between 3 main tabs without failures.
- Base components (Buttons, Cards) are visible and functional in the style guide screen (optional).
- Database Provider is injected and accessible (verified via logs or unit test).

## 6. Assumptions and Constraints
- The application uses Expo and React Native.
- Persistence is strictly local (Offline First).
- The design follows the rules defined in `.agents/rules/`.
