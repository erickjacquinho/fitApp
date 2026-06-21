# Requirements: Daily Diet Log & Reusable Calendar

## Description
Transform the Diet screen into a daily log system. Meals will be tied to specific dates, allowing users to view history and plan future meals. A reusable horizontal Calendar Strip component will be created, designed to be easily integrated into the future Training module.

## Acceptance Criteria
- **AC1:** WHEN the user views the Diet tab, THEN the system SHALL display a horizontal, scrollable Calendar Strip below the header.
- **AC2:** WHEN the user taps a specific date on the Calendar Strip, THEN the system SHALL filter and display only the meals scheduled for that date.
- **AC3:** WHEN the user taps "Adicionar Refeição", THEN the system SHALL create the new meal assigned to the currently selected date.
- **AC4:** WHEN the `DailyBalance` calculates the macros, THEN it SHALL only sum the macros of the meals for the currently selected date.
- **AC5:** WHEN the database migrates, THEN all existing meals SHALL be assigned to the current date to prevent data loss.
- **AC6:** WHEN the Calendar Strip component is built, THEN it SHALL accept a selected date state and a change handler, making it entirely reusable for future modules (like Training).

## Failure Scenarios & Edge Cases
- **No Meals on Selected Date:** The screen should gracefully handle empty states without breaking the UI.
- **Timezone Shifts:** The `target_date` should be stored as a localized string (e.g., `YYYY-MM-DD`) to avoid timezone shift issues (where 23:00 in one timezone becomes the next day in UTC).

## Out of Scope
- Implementing the Calendar in the Training module (only building the reusable component is in scope).
- "Copy previous day's plan" feature (to be done in a separate ticket).
