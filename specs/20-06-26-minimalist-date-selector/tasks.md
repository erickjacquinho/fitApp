# Tasks: Minimalist Date Selector

## 1. Types & Services (Hooks)
- [x] 1.1 Create `useCalendarSummary` Hook
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/hooks/useCalendarSummary.ts`
  - **Source:** `design.md` -> Services / Hooks
  - **Trace:** AC6
  - **Details:** Fetch all `meals`, pre-fetch `items` and `food`, group by `targetDate` (ignoring nulls, which should be migrated), and return `[{ date: string, macros: Macros }]` sorted by date descending.

## 2. Components
- [x] 2.1 Create `DateSelector` Component
  - **Skill:** `frontend-developer`
  - **Target:** `src/components/molecules/DateSelector.tsx`
  - **Source:** `design.md` -> Components -> DateSelector
  - **Trace:** AC1, AC2, AC3
  - **Details:** Use `ChevronLeft` and `ChevronRight` from `lucide-react-native`. Add/subtract 1 day from `selectedDate` on press. 

- [x] 2.2 Create `CalendarSummaryScreen` Component
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/components/CalendarSummaryScreen.tsx`
  - **Source:** `design.md` -> Components -> CalendarSummaryScreen
  - **Trace:** AC5, AC6, AC7
  - **Details:** Use `useCalendarSummary`. Render FlatList. On press row, `router.push({ pathname: '/(tabs)/diet', params: { date: item.date } })`.

- [x] 2.3 Create Expo Router Page
  - **Skill:** `frontend-developer`
  - **Target:** `app/diet/calendar-summary.tsx`
  - **Source:** `design.md` -> app/diet/calendar-summary.tsx
  - **Trace:** AC5
  - **Details:** Wrap `CalendarSummaryScreen` with a `Header` (title="Histórico", showBackButton=true).

## 3. Integration
- [x] 3.1 Refactor `DietTab` State
  - **Skill:** `frontend-developer`
  - **Target:** `app/(tabs)/diet.tsx`
  - **Source:** `design.md` -> Integration -> app/(tabs)/diet.tsx
  - **Trace:** AC7
  - **Details:** Read `date` from `useLocalSearchParams<{ date?: string }>()`. If `date` exists, update `selectedDate` via a `useEffect`.

- [x] 3.2 Update `MenuScreen` Component
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Source:** `design.md` -> Integration -> MenuScreen
  - **Trace:** AC1, AC4
  - **Details:** Replace `CalendarStrip` with `DateSelector`. Add `CalendarDays` icon from `lucide-react-native` to `headerRight` next to the `Apple` icon (wrap in a `View` with `flex-row gap-4`). Navigate to `/diet/calendar-summary` on press.

## 4. Cleanup & Validation
- [x] 4.1 Delete `CalendarStrip`
  - **Skill:** `frontend-developer`
  - **Target:** `src/components/molecules/CalendarStrip.tsx`
  - **Details:** Delete file.

- [x] 4.2 Type check and lint
  - **Skill:** `code-reviewer`
  - **Target:** Terminal
  - **Command:** `npx tsc --noEmit`
