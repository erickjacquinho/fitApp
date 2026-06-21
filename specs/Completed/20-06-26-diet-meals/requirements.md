# Requirements: Diet Meals Refactoring

## 1. Overview
Refactor the diet menu screen to show a unified daily balance and group foods into specific meals, allowing users to add foods directly into these meal containers.

## 2. Acceptance Criteria (Strict EARS Pattern)

### 2.1 Daily Balance
- WHEN the user views the MenuScreen THEN the system SHALL display the daily macronutrient balance in a single line.
- IF the daily balance is shown THEN the system SHALL format it strictly as: `P: [grams]; C: [grams]; G: [grams]; Kcal: [grams]`.

### 2.2 Meal Menu Structure
- WHEN the user opens the diet tab THEN the system SHALL NOT display the standalone `New Meal` and `Food Bank` buttons.
- WHEN a meal is rendered THEN the system SHALL display its assigned foods inside its container.
- WHEN a meal has no foods THEN the system SHALL display an `[+ Adicionar Alimento]` button inside the meal area.
- WHEN the `[+ Adicionar Alimento]` button is tapped THEN the system SHALL navigate the user to the Food Bank.

### 2.3 Food Card
- WHEN a user adds a food to a meal THEN the system SHALL display it as a food card component.
- IF a food card is rendered THEN it SHALL visually resemble `app\diet\food-bank.tsx` but using a newly created component.
- WHEN displaying items inside the meal THEN the system SHALL allow mixing of individual foods or grouped meals depending on user additions.

### 2.4 Meal Macros Summary
- WHEN foods are added to a meal THEN the system SHALL display a macro summary of all foods within that meal.
- IF the meal macros are shown THEN the system SHALL place them at the bottom inside the meal card container.

## 3. Failure Scenarios (Edge/Errors)
1. **Missing Macro Data:** IF a food item has null or undefined macros THEN the system SHALL default that macro value to 0 for aggregation calculations.
2. **Missing Food Reference:** IF a MealItem references a deleted Food THEN the system SHALL gracefully ignore the item during macro aggregation and UI rendering.
3. **Empty Daily Log:** IF there are no meals for the day THEN the system SHALL display an empty state prompting to add a new meal, and daily balance SHALL show 0 for all macros.

## 4. Out-of-Scope Items
- Backend database schema changes (using existing WatermelonDB schema).
- Creating new meals (the scope is only rendering existing meals and adding foods).
- Modifying the actual Food Bank screen functionality.
