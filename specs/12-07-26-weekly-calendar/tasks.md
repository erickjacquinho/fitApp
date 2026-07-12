# Tasks: Weekly Calendar

## Phase 1: Setup & Primitives
- [ ] T001 [US1] Create the UI component `src/components/ui/weekly-calendar.tsx` with basic layout (Month selector, Today button, and empty grid area).
- [ ] T002 [US1] Implement date manipulation logic (using `date-fns`) to generate the array of days for the current selected week/month.
- [ ] T003 [US1] Build the individual day card component (internal to `weekly-calendar.tsx`) featuring active/inactive styling using `NativeWind` tokens (`bg-primary`, `bg-surface-elevated`).

## Phase 2: Interactivity & Motion
- [ ] T004 [US2] Implement `GestureDetector` Pan gesture in `weekly-calendar.tsx` for horizontal scrolling of the days.
- [ ] T005 [US2] Add momentum projection, snap-to-day/week bounds, and rubber-banding to the Pan gesture using Reanimated `withSpring` and `withDecay`.
- [ ] T006 [US3] Implement the "Hoje" jump-to-today functionality, ensuring the Reanimated shared value animates back to `0` or the correct offset seamlessly, interrupting any ongoing gesture.
- [ ] T007 [US4] Implement the Month Selector `<` and `>` buttons to gracefully switch the loaded dataset and animate the calendar grid.

## Phase 3: Integration
- [ ] T008 [US5] Create `src/features/dashboard/components/dashboard-calendar.tsx` to wrap the UI component and manage the selected date state.
- [ ] T009 [US5] Integrate `DashboardCalendar` into the dashboard screen `app/(tabs)/index.tsx`.
- [ ] T010 [US5] Validate strict adherence to `[AGENTS.md]` rules (No hardcoded styles, accessible touch targets, correct semantic tokens).
