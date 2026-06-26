# Requirements: Header Long Press Reorder

## Goal
Enable activating the daily meals reordering mode via a long press gesture on the screen's header (specifically the date selector).

## Acceptance Criteria (EARS Format)
1. **Long Press Activation:** WHEN the user performs a long press gesture on the `DateSelector` inside the screen header, THEN the system SHALL trigger the `startReorder` routine.
2. **Haptic Feedback:** WHEN the long press gesture is successfully recognized, THEN the system SHALL trigger a light haptic vibration feedback.
3. **Normal Interactivity Preservation:** WHEN the user performs normal clicks (onPress) on the date selection buttons or text, THEN the system SHALL continue to change dates or open the date selector normally.

## Out of Scope
- Custom long press gestures on other header icons.
