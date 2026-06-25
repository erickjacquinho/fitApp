# Requirements: Meal Card Skeleton (Revised)

## 1. Acceptance Criteria
- WHEN the user changes the date in the diet tab, THEN the system SHALL NOT render ANY content (neither `DailyBalance` nor `MealCard`s).
- INSTEAD, the system SHALL display a full-page Skeleton layout (including placeholders for `DailyBalance` and `MealCard`s).
- WHEN ALL meals AND their corresponding food items are fully fetched from the database, THEN the system SHALL reveal the complete UI simultaneously, eliminating all progressive loading flickers.
- The `DateSelector` MUST remain visible at all times.

## 2. Out of Scope
- Modifying WatermelonDB models.
- Changing `DateSelector` behavior.

## 3. Edge Cases
- Rapid date switching.
- Empty meal list creating a default meal.
