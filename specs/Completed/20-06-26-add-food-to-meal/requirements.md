# Requirements: Add Food To Meal Screen

## Description
A new screen that allows the user to view the nutritional information of a selected food and specify the exact quantity before adding it to a specific meal.

## Acceptance Criteria
- **AC1:** WHEN a user taps a food in the Food Bank while `mealId` is present, THEN the system SHALL navigate to the Add Food To Meal screen passing `mealId` and `foodId`.
- **AC2:** WHEN the Add Food To Meal screen is mounted, THEN the system SHALL fetch the `Food` details using `foodId` and display its base nutritional values.
- **AC3:** WHEN the user inputs a new quantity (in grams), THEN the system SHALL dynamically recalculate and display the macros (Protein, Carbs, Fat) and Calories scaled to that quantity `(inputQuantity / 100 * baseValue)`.
- **AC4:** WHEN the user taps the "Adicionar à Refeição" button with a valid quantity > 0, THEN the system SHALL save the new `MealItem` to the database and navigate back to the `MenuScreen`.
- **AC5:** WHEN the user attempts to add with quantity 0 or empty, THEN the system SHALL disable the submit button or show a validation error.
- **AC6:** WHEN the `Food` cannot be found by the provided `foodId`, THEN the system SHALL display an error message and allow the user to go back.

## Out of Scope
- Editing an existing `MealItem` that is already in a meal (this is a separate feature).
- Bulk adding multiple foods at once with different quantities.
