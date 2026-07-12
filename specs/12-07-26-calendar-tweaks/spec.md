# Feature Specification: Calendar Item Styling & Container Wrapper

## Overview
The goal of this feature is to refine the visual hierarchy of the weekly calendar component. Specifically, non-selected days will have their backgrounds and borders removed to reduce visual noise. The selected day will remain styled as a distinct card. Finally, the entire calendar component will be wrapped in a standard rounded box container to group the elements cohesively.

## User Scenarios & Testing
- **Scenario 1:** The user views the dashboard and sees the weekly calendar. The container groups the entire calendar nicely. Only the currently selected day looks like a distinct elevated card.
- **Scenario 2:** The user taps on an unselected day. The newly selected day gains the background and border styling, while the previously selected day loses them and blends into the background.

## Functional Requirements
1. **Unselected Day Styling:** Unselected days in the calendar must have transparent backgrounds and no borders.
2. **Selected Day Styling:** The selected day must retain its distinct background and border (primary brand styling).
3. **Container Wrapping:** The entire weekly calendar component must be wrapped inside a rounded box container component, visually grouping the header, days list, and any internal padding.

## Non-Functional Requirements
- The visual modifications must not break the existing horizontal scroll physics or alignment calculations.
- Touch targets must remain accessible (minimum 44px height/width).

## Success Criteria
- The calendar interface feels lighter with less visual noise from unselected borders.
- The calendar visually acts as a cohesive singular card within the dashboard via the wrapper.
- All selection logic remains perfectly functional.
