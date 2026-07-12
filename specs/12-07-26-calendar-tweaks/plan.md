# Technical Design & UI Plan: Calendar Item Styling & Container Wrapper

## Architecture & Approach
The feature relies on modifying the existing `WeeklyCalendar` component to align with the refined design request.

### UI Changes
1. **Unselected Days**: Remove `bg-surface-elevated` and `border-border-subtle`. Apply a transparent background.
2. **Container**: Wrap the `WeeklyCalendar` (or the usage of it inside `DashboardCalendar.tsx` / `HistoryScreen.tsx`) in the canonical `Card` component from the `src/components/ui/card.tsx` so that it has the standard `rounded-xl`, background, and border styling expected by the design system.

### Component Modifications
- **`WeeklyCalendar.tsx`**:
  - Update the `className` logic in the `Pressable` for `daysInMonth.map`.
  - From: `isSelected ? 'bg-primary border-primary' : 'bg-surface-elevated border-border-subtle'`
  - To: `isSelected ? 'bg-primary border-primary' : 'bg-transparent border-transparent'`
- **`DashboardCalendar.tsx`** (or wherever the calendar is used):
  - Ensure the calendar is wrapped inside a `<Card className="p-4">...</Card>` to provide the rounded box behavior.

## Dependencies
- `src/components/ui/card.tsx`

## Verification Plan
1. Ensure the calendar items that are not selected have no background/border.
2. Ensure the whole calendar lives inside a visually distinct card wrapper.
3. Ensure the swipe animations still perform correctly within the new padding boundaries.
