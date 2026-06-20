# Requirements: Diet Header and Macros Redesign

## Description
Redesign the Diet screen top section to remove redundant texts, introduce header actions (Reorder on the left, Food Bank on the right), and reorganize the daily macros summary into a 2x2 grid.

## Acceptance Criteria
- **AC1:** WHEN the user views the Diet tab, THEN the header SHALL display a "Reorder" icon on the left and a "Food Bank" icon on the right.
- **AC2:** WHEN the user taps the left "Reorder" icon, THEN the system SHALL open the `ReorderMealsModal`.
- **AC3:** WHEN the user taps the right "Food Bank" icon, THEN the system SHALL navigate to the generic Food Bank screen.
- **AC4:** WHEN the user views the Diet tab, THEN the descriptive texts ("Minha Dieta", "Track your caloric intake...") SHALL NOT be visible.
- **AC5:** WHEN the `DailyBalance` component is rendered, THEN it SHALL display the macros (Protein, Carbs, Fat) and Calories in four equal quadrants (2x2 grid).

## Out of Scope
- Changing the functionality of the Food Bank or Reorder Modal itself.
- Modifying other tabs' headers.
