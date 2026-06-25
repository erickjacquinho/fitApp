# Requirements: Diet Performance Optimizations

## Goal
Optimize render cycles and callback stability in `MenuScreen` and `MealCard` to eliminate unnecessary re-renders during interactions.

## Scope
- Avoid state duplication of macros in `MealCard` by using `useMemo`.
- Stabilize the `onDelete` callback in `MenuScreen` by using `useCallback` and passing it to `MealCard`.

## Acceptance Criteria
- **AC 1 (Macros Recalculation):** WHEN the list of food items in a `MealCard` updates, THEN the system SHALL automatically recalculate aggregated macros on the fly using `useMemo` instead of firing a separate state update.
- **AC 2 (Callback Stability):** WHEN `MenuScreen` renders `MealCard` items in the list, THEN the system SHALL supply a stable reference callback for deleting meals to prevent component re-renders.

## Out of Scope
- Rebuilding the Android APK.
- Changes to database schema or WatermelonDB models.
