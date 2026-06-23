# Design: Minimalist Date Selector & Calendar Summary

## 1. Components

### `DateSelector` (src/components/molecules/DateSelector.tsx)
- Replaces `CalendarStrip`.
- Props: `selectedDate: string`, `onSelectDate: (date: string) => void`.
- Internals: Uses `ChevronLeft` and `ChevronRight` from `lucide-react-native`. Displays the formatted date. Handles +/- 1 day logic natively or via helper.

### `CalendarSummaryScreen` (src/features/diet/components/CalendarSummaryScreen.tsx)
- Displays a `FlatList` of days with aggregated macros.
- Row items show: Date, Calories, Protein, Carbs, Fat.
- Tapping a row routes back to `/(tabs)/diet` and sets the `selectedDate`. (Can pass via `router.push` params or global state. Since `diet.tsx` holds state, we might need to sync via query params or a simple global Zustand store, or just use `router.push({ pathname: '/(tabs)/diet', params: { date } })` and have `diet.tsx` read `useLocalSearchParams`).

### `app/diet/calendar-summary.tsx`
- Expo Router page wrapping `CalendarSummaryScreen`.

## 2. Integration & State

### `app/(tabs)/diet.tsx`
- Update `DietTab` to read `date` from `useLocalSearchParams()`. If provided, use it as the initial `selectedDate` state.

### `MenuScreen` (src/features/diet/components/MenuScreen.tsx)
- Replace `<CalendarStrip />` with `<DateSelector />`.
- Add `Calendar` icon to `headerRight`.
- Remove `CalendarStrip` import.

## 3. Services / Hooks

### `useCalendarSummary` (src/features/diet/hooks/useCalendarSummary.ts)
- Fetches all meals and items, groups them by `target_date`, and calculates `Macros` per day using `aggregateMacros`.
- Returns an array: `[{ date: string, macros: Macros }]` sorted by date descending.
- *Note: For scalability, we process this in JS since WatermelonDB doesn't support complex GROUP BY queries easily, which is acceptable for local client DBs.*

## 4. Cleanup
- Delete `src/components/molecules/CalendarStrip.tsx`.
