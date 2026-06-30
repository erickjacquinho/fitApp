# Requirements - Diet Meal Dropdown Menu

## 1. Objective
Replace the direct trash delete icon in the `MealCard` component with an `EllipsisVertical` icon that triggers a Dropdown Menu containing two options: "Editar" (Edit) and "Excluir" (Delete).

## 2. Scope
- **In-Scope:**
  - Addition of `@react-native-reusables/cli` dropdown-menu component.
  - Customization of dropdown-menu style using FitApp design tokens (Mineral Warm).
  - Integration of `EllipsisVertical` icon from `lucide-react-native` in `MealCard`.
  - Triggering a dropdown menu on pressing the ellipsis icon.
  - Triggering the delete callback (`onDelete`) when "Excluir" option is selected.
  - Implementing an edit meal feature (routing to `/diet/edit-meal` screen, modifying meal name/details and updating it through `MealService`).
  - Unit/integration testing.
- **Out-of-Scope:**
  - Redesigning other screens or features.
  - Adding reordering actions inside the dropdown menu (reordering has its own mode).

## 3. Acceptance Criteria
- **AC 1 (Visual Interface):**
  - **WHEN** the `MealCard` is rendered in normal mode.
  - **THEN** the trash icon SHALL be replaced by an `EllipsisVertical` icon styled using the design token text color `text-text-primary`.
- **AC 2 (Dropdown Trigger):**
  - **WHEN** the user presses the `EllipsisVertical` icon.
  - **THEN** the system SHALL display an overlay dropdown menu aligned below/beside the trigger.
- **AC 3 (Dropdown Options):**
  - **WHEN** the dropdown menu is displayed.
  - **THEN** it SHALL contain two options: "Editar" and "Excluir" using correct PT-BR text copy.
- **AC 4 (Delete Action):**
  - **WHEN** the user selects the "Excluir" option.
  - **THEN** the system SHALL trigger the delete confirmation modal (via the existing onDelete/delete flow) and dismiss the dropdown.
- **AC 5 (Edit Action Route):**
  - **WHEN** the user selects the "Editar" option.
  - **THEN** the system SHALL navigate to `/diet/edit-meal?mealId=[ID]` routing context to edit the meal name and details.
- **AC 6 (Meal Update Persistence):**
  - **WHEN** the user submits the edited meal details.
  - **THEN** the system SHALL persist the changes to WatermelonDB and navigate back to the previous screen.
