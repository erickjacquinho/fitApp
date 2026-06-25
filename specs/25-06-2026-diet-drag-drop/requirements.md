# Requirements: Diet Meal Drag & Drop

## Goal
Implement a visual-only, instant drag-and-drop reordering system for daily meals on the menu screen. The cards should not change morphia (i.e. keep items and macros visible) and must reorder instantly without animation flickering.

## Acceptance Criteria (EARS Format)
1. **Long Press Activation:** WHEN the user performs a long press on any `MealCard`, THEN the system SHALL activate the dragging state and disable vertical scrolling of the main container.
2. **Morphia Preservation:** WHEN a `MealCard` is actively being dragged, THEN the system SHALL preserve its full visual structure (morphia), displaying its name, macros, foods list, and options.
3. **Instant Reordering:** WHEN the user drags a meal card over another meal's boundary, THEN the system SHALL instantly swap their visual positions on the screen without using transition spring animations.
4. **Flicker-free Persistence:** WHEN the user drops a meal card, THEN the system SHALL update the meal ordering indexes in the WatermelonDB database and end the drag-and-drop mode, rendering the final sorted state immediately without flickering or reverting to the previous state.
5. **Vibration Feedback:** WHEN the long press gesture is successfully recognized, THEN the system SHALL trigger a short haptic vibration feedback.

## Out of Scope
- Expand/collapse animation during reordering.
- Scale down decorator or opacity transitions on non-dragged elements.
