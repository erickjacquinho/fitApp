# Requirements: Minimalist Date Selector & Calendar Summary

## Overview
Replace the horizontal calendar strip with a minimalist date selector featuring left/right arrows for day-by-day navigation. Add a Calendar icon to the header that opens a new Calendar Summary screen, displaying daily macros and calories in a list format.

## Acceptance Criteria (ACs)

- **AC1:** WHEN the user views the Menu Screen, THEN the system SHALL display a minimalist date selector showing the selected date (e.g., "Hoje", "20/06/2026").
- **AC2:** WHEN the user presses the left arrow icon (`ChevronLeft` from `lucide-react-native`), THEN the system SHALL decrement the selected date by 1 day.
- **AC3:** WHEN the user presses the right arrow icon (`ChevronRight`), THEN the system SHALL increment the selected date by 1 day.
- **AC4:** WHEN the user views the Menu Screen header, THEN the system SHALL display a Calendar icon next to the Food Bank icon.
- **AC5:** WHEN the user presses the Calendar icon, THEN the system SHALL navigate to the Calendar Summary Screen.
- **AC6:** WHEN the user views the Calendar Summary Screen, THEN the system SHALL display a list of dates that have logged meals, showing the date, total calories, and total macros (Protein, Carbs, Fat) for each day.
- **AC7:** WHEN the user taps a specific date row in the Calendar Summary Screen, THEN the system SHALL navigate back to the Menu Screen with that date selected.

## Out of Scope
- Infinite scrolling for the Calendar Summary (fetching all historical data is fine for now).
- Complex date pickers (e.g., modal monthly calendars).

## Edge Cases / Failure Scenarios
- WHEN no meals exist for any day, THEN the Calendar Summary SHALL display an empty state message.
