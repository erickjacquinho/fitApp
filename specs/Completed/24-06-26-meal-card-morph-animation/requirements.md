# Requirements: Meal Card Morph Animation

## 1. Context and Problem Statement
Currently, during inline meal reordering, the system abruptly swaps the standard `MealCard` component with a minimized `ReorderMealRow` component. Although the layout height animates via `LayoutAnimation`, the content swap lacks visual continuity. The goal is to unify these two states into a single component and use Reanimated to create a smooth "morph" animation where the content fades out and the container smoothly collapses around the persistent meal title.

## 2. EARS Requirements

- **RU1 (Trigger-based):** WHEN the user initiates the inline reordering mode, the system SHALL smoothly collapse the `MealCard` into a minimized drag-handle view.
- **RU2 (State-driven):** WHILE the system is in reordering mode, the `MealCard` body content (macro bar, food items, add button) SHALL be hidden using a graceful fade-out animation.
- **RU3 (State-driven):** WHILE the system is in reordering mode, the system SHALL hide the deletion and time icons in the header and SHALL display a drag handle (`GripVertical`) via a fade-in animation.
- **RU4 (Trigger-based):** WHEN the user confirms or cancels the reordering mode, the system SHALL smoothly expand the `MealCard` and fade its inner content back in.
- **RU5 (Event-driven):** IF the `MealCard` is being actively dragged (`isActive`), the system SHALL apply a visual active state (e.g., slight opacity/elevation change).

## 3. Out of Scope
- Changing the underlying data structures or WatermelonDB schemas.
- Changing how the `DraggableFlatList` operates internally.
- Complex shared element transitions across different screens (this applies only to inline reordering within `MenuScreen`).
