# Requirements: Inline Meal Reordering

## Context
The user wants to replace the current `ReorderMealsModal` with an inline reordering experience directly on the `MenuScreen`. Reordering will be triggered via a long press on any meal header, transforming the UI into a smooth, minimized drag-and-drop list with confirmation actions.

## Core Pillars
1. **Security**: Ensure order persistence only happens upon explicit confirmation.
2. **Maintainability**: Reuse existing primitive components (`LongPressable`, `Button`, `Icon`) and `DraggableFlatList`. Keep state logic encapsulated in `MenuScreen`.
3. **Scalability**: Layout animations and inline drag-and-drop should perform efficiently without unmounting the whole screen context unnecessarily.

## Acceptance Criteria (EARS Pattern)
- **WHEN** the user long-presses on the header of any `MealCard` in the `MenuScreen`, **THEN** the system SHALL activate "Reorder Mode".
- **WHEN** "Reorder Mode" is activated, **THEN** the system SHALL smoothly transition the meal list into a minimized drag-enabled view, displaying only a drag handle (Grip icon) and the meal name for each item.
- **WHEN** "Reorder Mode" is active, **THEN** the system SHALL display two action buttons above the meal list: "Confirmar" (Primary) and "Cancelar" (Secondary).
- **WHEN** the user drags a minimized meal row, **THEN** the system SHALL reorder it visually in the list.
- **WHEN** the user presses "Confirmar", **THEN** the system SHALL persist the new order to the database via `MealService.updateMealOrder` and exit "Reorder Mode".
- **WHEN** the user presses "Cancelar", **THEN** the system SHALL discard any order changes, restore the original order from the database, and exit "Reorder Mode".
- **WHEN** the implementation is complete, **THEN** the `ReorderMealsModal` component SHALL be completely removed from the project.

## Edge Cases & Failure Scenarios
- **DB Persistence Failure**: If `MealService.updateMealOrder` fails, the system SHALL show an error message, exit Reorder Mode, and revert to the previous database order to prevent UI mismatch.
- **Empty List**: If there are no meals or only 1 meal, the Reorder action should not be triggered or have any effect.

## Out of Scope
- Reordering items *inside* a meal.
- Editing meal names or items while in Reorder Mode.
