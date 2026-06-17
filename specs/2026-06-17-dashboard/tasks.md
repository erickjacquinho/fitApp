# Tasks - Step 6: Dashboard

## Phase 1: Dashboard Widgets
- [ ] T001 [US1] Implement `src/features/dashboard/components/DietWidget.tsx`
- [ ] T002 [US1] Implement `src/features/dashboard/components/TrainingWidget.tsx`
- [ ] T003 [US1] Create `src/features/dashboard/components/DashboardScreen.tsx` and organize layout

## Phase 2: Data Hooks
- [ ] T004 [US1] Implement `src/features/dashboard/hooks/useDashboardMetrics.ts` for aggregated data querying
- [ ] T005 [US1] Integrate observables for real-time updates on the Dashboard

## Phase 3: Final Integration
- [ ] T006 [US1] Configure initial route in `app/(tabs)/index.tsx` to display the Dashboard
- [ ] T007 [US1] Ensure functional deep navigation from all widgets
- [ ] T008 [US1] Implement Empty States for when no data is registered

## Phase 4: Validation
- [ ] T009 Validate Dashboard update after adding a food item
- [ ] T010 Validate Dashboard update after completing a workout
- [ ] T011 Test "end-to-end" navigation (Dashboard -> Diet -> Dashboard)
- [ ] T012 Run final validation of types and linting throughout the project
