# Requirements - Step 3: Diet Module - UI

## 1. Overview
This step focuses on the user interface of the Diet module, allowing the user to view their menu, manage their food bank, and create new meals.

## 2. User Scenarios
- **Scenario 1: Menu Visualization**
  - The user sees all the day's meals with their caloric totals.
- **Scenario 2: Food Registration**
  - The user fills out a form and sees a calorie preview before saving.
- **Scenario 3: Selecting Items for a Meal**
  - The user opens a modal, searches for food, and defines the quantity for each one.

## 3. Functional Requirements

### 3.1 Flow Screens
- **RF-01:** The system SHALL display the `MenuScreen` with the day's meal list.
- **RF-02:** The system SHALL display the `FoodBankScreen` with search and filters.
- **RF-03:** The system SHALL provide forms for `CreateFood` and `CreateMeal`.

### 3.2 Specific Components
- **RF-04:** The system SHALL implement the `PreviewMacros` component that calculates and displays totals in real-time.
- **RF-05:** The system SHALL implement the `FoodSelectorModal`.

### 3.3 Interactions
- **RF-06:** The system SHALL support item deletion via swipe gesture.
- **RF-07:** The system SHALL support bulk selection in the Food Bank.

## 4. Acceptance Criteria (EARS)
- **WHEN** the user types the macros for a new food item, **THEN** the system SHALL update the calorie calculation instantly.
- **WHEN** the user performs a left swipe on a card, **THEN** the system SHALL reveal the action buttons (Edit/Delete).
- **WHEN** the "+ New Meal" button is pressed, **THEN** the system SHALL navigate to the creation form.

## 5. Success Criteria
- Complete flow from food creation -> meal creation is functional.
- UI is responsive and follows the design system (cards, colors, typography).
- Mathematical calculations for macros and calories are accurate.
