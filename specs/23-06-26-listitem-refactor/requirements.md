# Requirements: ListItem Refactor and Integration

## Acceptance Criteria

1. WHEN the user views the food bank (FoodBankScreen) THEN the system SHALL render foods as list items separated by dividers instead of isolated cards.
2. WHEN the user views the diet summary (CalendarSummaryScreen) THEN the system SHALL render summaries as list items separated by dividers instead of isolated cards.
3. WHEN a developer uses the `ListItem` component THEN it SHALL be composed using `@react-native-reusables` primitives and project tokens, removing any non-standard or "viagem" (hallucinated) code.
4. WHEN the `ListItem` is rendered THEN it SHALL use `Separator` for its divider instead of raw border utility classes if appropriate, or strictly adhere to `designsystem-guide.md` tokens.

## Failure Scenarios

- Rendering breaks if a screen passes invalid props to `ListItem`.
- `SwipeableCard` or `DailySummaryCard` behaviors (like swipe to delete, or on-press routing) are lost during migration.

## Out of Scope

- Refactoring other screens that use Cards but are not simple lists.
- Adding new features to the Food Bank or Calendar Summary.
