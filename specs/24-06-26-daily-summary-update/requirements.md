# Requirements: DailyBalance Improvements

## Feature Description
Refactor the DailyBalance component to provide a better visual summary of daily calories and macros.

## Acceptance Criteria
- WHEN viewing the daily summary THEN macro values (g) and calorie totals SHALL be bold.
- WHEN viewing the daily summary THEN labels SHALL be strictly "Proteína", "Carboidrato", "Gordura", and "Calorias" (no all caps).
- WHEN viewing the daily summary THEN macro percentages SHALL be colored according to their respective macronutrient (e.g., protein percentage uses protein color).
- WHEN viewing the daily summary THEN the radial chart SHALL be a segmented donut chart that visually represents the proportion of protein, carbs, and fat, rather than a generic single-value circle.

## Edge Cases
- IF all macros are 0 THEN the radial chart SHALL display an empty background circle.
