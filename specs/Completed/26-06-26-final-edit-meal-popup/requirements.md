# Requirements: Final Edit Meal Popup

## 1. Objective
Replace the full-screen edit journey for meals (`/diet/edit-meal`) with an in-place modal edit popup directly on the main diet tab (`MenuScreen.tsx`). The popup will only support editing the meal's name and its time (preparation state). The route `/diet/edit-meal` must be completely removed. The edit dialog popup must have a width of exactly 80% (`w-4/5 max-w-[400px]`), a dark background overlay (`bg-black-main/20`) when active, and localized cancel/save buttons with correct text formatting.

## 2. Scope
- **In-Scope:**
  - Removing the `app/diet/edit-meal.tsx` route entirely.
  - Adding the edit dialog popup modal inside `src/features/diet/components/MenuScreen.tsx`.
  - Adding the `onEdit` callback prop to `MealCard.tsx` and triggering it from the dropdown "Editar" menu option.
  - Sizing the edit popup to `w-4/5 max-w-[400px]` with no inline styles.
  - Escurishing the background overlay during dialog display.
  - Displaying localized buttons "Cancelar" and "Salvar" with correct styling and text wrapping.
  - Persisting basic meal updates to WatermelonDB using `MealService.updateBasicInfo`.
- **Out-of-Scope:**
  - Modifying food search or creation details.
  - Modifying meal item reordering or summary structures.

## 3. Acceptance Criteria (EARS Pattern)

### 3.1 Dialog Trigger on Main Diet Screen
- **WHEN** the user selects the "Editar" option inside a meal's dropdown menu on the main diet tab.
- **THEN** the system SHALL open the edit popup modal directly on the `MenuScreen.tsx` instead of navigating to a new route.

### 3.2 Modal Popup Sizing & Backdrop
- **WHEN** the edit popup is active.
- **THEN** the system SHALL:
  1. Constraint the dialog width to exactly 80% (`w-4/5` and `max-w-[400px]`).
  2. Darken the background viewport using an overlay container styled with `bg-black-main/20`.
  3. Prepopulate name and time fields.
  4. Ensure text copies inside Cancel/Save buttons render without truncation.

### 3.3 Database Update
- **WHEN** the user submits the changes in the popup.
- **THEN** the system SHALL update the meal's name and preparation state (time) in WatermelonDB and close the modal dialog.

### 3.4 Elimination of Edit Route
- **WHEN** the system compiles route layout definitions.
- **THEN** the route `/diet/edit-meal` SHALL NOT exist.

## 4. Failure Scenarios & Edge Cases
- **Validation:** Disable the "Salvar" button inside the modal dialog whenever the Name field is empty.
- **Flicker:** Ensure the dialog transitions smoothly without clipping text elements.
