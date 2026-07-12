# Feature Specification: Weekly Calendar

## 1. Overview
A weekly calendar component (7-day view) to summarize activities, designed to be included in the dashboard. It allows users to filter dashboard data by selecting specific days, seamlessly navigate across the current month via horizontal dragging, and quickly return to the current day.

## 2. User Scenarios
- **Navigate Days:** User swipes horizontally on the 7-day grid to see previous or upcoming days. The motion is smooth, fluid, carries momentum, and is fully interruptible mid-flight.
- **Select Day:** User taps a specific day to filter the dashboard content. The selected day highlights.
- **Change Month:** User taps the left/right arrows on the month selector to jump to the previous or next month.
- **Jump to Today:** User taps the "Hoje" (Today) button. The calendar automatically snaps back to the current day, selects it, and updates the dashboard data.

## 3. Functional Requirements
- **Month Selector:** Displays `[Month], [Year]` (e.g., `Aug, 2023`) with `<` and `>` icon buttons.
- **Today Button:** A subtle, link-styled button ("Hoje") positioned above the grid, aligned to the right. Clicking it resets the selected date to today and smoothly animates the calendar to bring today into view.
- **7-Day Grid:** Displays 7 days at a time as discrete selectable cards.
- **Selection State:** The selected day must be highlighted using the `primary` semantic token (`blue-500`), distinguishing it clearly from unselected days (`surface-elevated` or similar).
- **Gesture Navigation (Apple Design):** 
  - Horizontal drag must be interruptible.
  - Supports velocity handoff (flick to scroll).
  - Rubber-banding at the boundaries (start of month / end of month).
  - Uses `react-native-gesture-handler` and `react-native-reanimated`.

## 4. Success Criteria
- The calendar renders correctly and strictly follows the visual aesthetics provided in the references.
- Horizontal dragging feels natural, physical, and respects the 60fps frame rate without dropped frames.
- "Hoje" button accurately resets the state and view without layout jumps.
- Month selector seamlessly changes the visible days.
