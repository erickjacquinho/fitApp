# Technical Design: ListItem Refactor and Integration

## Unidirectional Layer Mapping

1. **Types**: Use standard `PressableProps`. Ensure `rightAccessory` and `leftAccessory` are typed as `React.ReactNode`.
2. **Components**:
   - `ListItem`: Refactor to use `@react-native-reusables` where applicable. Remove any "viagem" (hallucinated code). We will use `Separator` from `@/components/ui/separator` for the divider, or strict `border-b` with `border-border-subtle` if standard. Wait, the user said "substitua o que for viagem nele por reusables". If `ListItem` is entirely custom, we will rebuild it using `Button` or standard `Pressable` with `Separator`.
   - `FoodBankScreen`: Replace `SwipeableCard` (for normal items) with `ListItem`. Wait, `SwipeableCard` provides swipe-to-delete. If we replace it with `ListItem`, we might need to make `ListItem` swipeable or put `ListItem` inside `SwipeableCard`? The user said "substitua o componente em lista de alimentos no foodlist", so we replace the card with `ListItem`. If it loses swipe to delete, maybe `SwipeableCard` is still needed but wrapping a `ListItem`? Actually, looking at `SwipeableCard.tsx`, it probably wraps its children. We can wrap `ListItem` with `SwipeableCard` instead of putting a raw view inside `SwipeableCard`. Or maybe we replace the list item entirely if swipe is not needed? No, swipe is needed for delete. The user said "substitua o componente em lista... por reusables". We will use `ListItem` inside `SwipeableCard`.
   - `CalendarSummaryScreen`: Replace `DailySummaryCard` with `ListItem`. `DailySummaryCard` is just a pressable card. We will map its data to `ListItem` (`title` = date, `subtitle` = macros).

## Core Pillars
1. **Security**: Ensure data displayed in lists is properly sanitized if needed (standard RN Text handles this).
2. **Maintainability**: Using a single `ListItem` component across multiple screens improves maintainability and reduces duplicate card components.
3. **Scalability**: Standardized list items are easier to render in long `FlatList`s with less styling overhead.
