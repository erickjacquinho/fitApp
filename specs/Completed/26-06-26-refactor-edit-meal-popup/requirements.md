# Requirements: Refactor Edit Meal Header Popup

## 1. Objective
Refactor the meal editing page (`/diet/edit-meal` route, known as "dietmeal") to support in-place editing of its name and preparation state (acting as the time) via an edit popup triggered directly from the screen's Header. Remove name/time inputs from the screen body (`MealForm`) to eliminate redundancy, structure the route to conform to the `Screen` primitive guidelines, and style the modal dialog to meet dynamic visual standards.

## 2. Scope
- **In-Scope:**
  - Migrating `app/diet/edit-meal.tsx` to use the custom `Screen` primitive.
  - Fetching the meal details inside the route wrapper (`app/diet/edit-meal.tsx`) to show its name and preparation state (time) in the Screen header.
  - Adding an edit icon button inside the header of `/diet/edit-meal` next to the title/time.
  - Implementing an edit popup (Modal Dialog) inside `app/diet/edit-meal.tsx` to edit the meal's name and time.
  - Styling the dialog with semantic tokens (`w-4/5 max-w-[400px]`, `bg-surface`, `bg-black-main/20` overlay, and localized buttons "Cancelar" / "Salvar").
  - Persisting updates to the meal's name and preparation state using `MealService.updateBasicInfo` in WatermelonDB.
  - Removing the basic details card (Name and Preparation State fields) from `src/features/diet/components/MealForm.tsx`.
- **Out-of-Scope:**
  - Modifying any core food search or food item quantity editing flows.
  - Modifying reordering logic or main summary widgets on the parent `MenuScreen`.

## 3. Acceptance Criteria (EARS Pattern)

### 3.1 Screen Primitive and Dynamic Header
- **WHEN** the user navigates to the `/diet/edit-meal?mealId=[ID]` route.
- **THEN** the system SHALL render the screen using the `Screen` component wrapper and display the meal's name and time (e.g. "Almoço - 12:00") in the header.

### 3.2 Edit Header Trigger
- **WHEN** the user views the header on the edit meal screen.
- **THEN** the system SHALL display an Edit button (using the `Edit` icon from `lucide-react-native`) inside the header right area.

### 3.3 Dialog Popup Layout & Styling
- **WHEN** the user presses the header Edit button.
- **THEN** the system SHALL open a Dialog modal centered on the screen with:
  1. Width set to exactly 80% (`w-4/5` and `max-w-[400px]`).
  2. Background dark overlay (`bg-black-main/20`).
  3. Prepopulated input fields for "Nome da refeição" and "Horário".
  4. Non-empty validation on the meal name (disabling the save button if empty).
  5. Action buttons labeled "Cancelar" and "Salvar".

### 3.4 Save & Persistence
- **WHEN** the user modifies the inputs in the dialog and presses "Salvar".
- **THEN** the system SHALL persist the changes (name and time) to WatermelonDB, update the header text immediately without reloading, and dismiss the dialog.

### 3.5 MealForm Cleanup
- **WHEN** the edit meal screen renders the form body.
- **THEN** the system SHALL display only the food items list, the total macro summaries card, and the save/cancel actions, having removed the name and preparation state details card.

## 4. Failure Scenarios & Edge Cases
- **Database Fetch Error:** If the `mealId` is invalid or not found, the system SHALL display a fallback empty or error state and log the exception.
- **Save Validation:** The "Salvar" button inside the modal dialog SHALL remain disabled whenever the Name input contains only whitespace characters.

## 5. Security & Performance
- **Atomic Operations:** Database updates must run atomically to ensure UI/data synchronization.
- **Overlay Rendering:** The dialog must render correctly over all layout elements without layout flicker or visual cutoffs on both Android and iOS devices.
