# Requirements: Edit Meal Popup

## 1. Overview
Replace the full-screen edit journey for meals (`/diet/edit-meal`) with a direct, in-place edit popup (Modal) on the main diet tab. The popup will only support editing the meal's name and its time. Additionally, when the edit popup is open, the parent component screen must feature a slightly darker background to increase focus on the modal interface.

## 2. Acceptance Criteria (EARS Pattern)

### 2.1 Trigger Edit Popup
- **WHEN** the user selects the "Editar" option inside the meal's dropdown menu **THEN** the system SHALL open an edit popup (Modal) on the same screen instead of navigating to a new route.

### 2.2 Limited Edit Scope
- **WHEN** the edit popup is open **THEN** the system SHALL only present input fields for:
  1. The meal name.
  2. The meal time.

### 2.3 Parent Screen Backdrop Darkening
- **WHEN** the edit popup is open **THEN** the system SHALL apply a darker overlay backdrop (`bg-black-main/20` or similar visual styling) over the parent screen layout.

### 2.4 Save Changes
- **WHEN** the user taps the save button **THEN** the system SHALL update the meal's name and time in the database using the WatermelonDB service and close the popup.

## 3. Failure Scenarios & Edge Cases
- **Empty Meal Name:** If the meal name input is empty, the system SHALL disable the save button to prevent saving invalid records.

## 4. Out of Scope
- Adding or removing food items within the edit popup (this is already handled inline in the `MealCard` or via the food bank redirection).
