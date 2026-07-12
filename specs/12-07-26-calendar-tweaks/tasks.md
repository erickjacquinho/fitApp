# Tasks: Calendar Item Styling & Container Wrapper

## Phase 1: Modify Weekly Calendar
- `[ ]` 1.1 In `src/components/ui/weekly-calendar.tsx`, locate the `Pressable` component used for mapping `daysInMonth`.
- `[ ]` 1.2 Change the dynamic `className` logic from `isSelected ? 'bg-primary border-primary' : 'bg-surface-elevated border-border-subtle'` to `isSelected ? 'bg-primary border-primary' : 'bg-transparent border-transparent'`.

## Phase 2: Wrap with Card
- `[ ]` 2.1 In `src/features/dashboard/components/DashboardCalendar.tsx`, wrap the `<WeeklyCalendar />` invocation with a `<Card>` from the design system.
- `[ ]` 2.2 Adjust paddings or margins so the `Card` sits cleanly within the layout grid without breaking the horizontal scroll boundaries.
- `[ ]` 2.3 Verify if `HistoryScreen.tsx` also requires a card wrapper for its calendar instance, and apply it similarly.
