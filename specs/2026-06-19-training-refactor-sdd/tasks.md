# Tasks - Training Refactoring

## Phase 1: Custom Hooks Setup (Logic Isolation)
- [ ] T001 [US1] Create directory `src/features/training/hooks/`
- [ ] T002 [US1] Implement `src/features/training/hooks/useProgramList.ts` (resolves RF-01, Trace: requirements.md#RF-01, design.md#2.1)
- [ ] T003 [US1] Implement `src/features/training/hooks/useProgramForm.ts` (resolves RF-02, Trace: requirements.md#RF-02, design.md#2.2)
- [ ] T004 [US1] Implement `src/features/training/hooks/useWorkoutSession.ts` (resolves RF-03, Trace: requirements.md#RF-03, design.md#2.3)
- [ ] T005 [US1] Implement `src/features/training/hooks/useWorkoutHistory.ts` (resolves RF-04, Trace: requirements.md#RF-04, design.md#2.4)
- [ ] T006 [US1] Implement `src/features/training/hooks/useWorkoutDetails.ts` (resolves RF-05, Trace: requirements.md#RF-05, design.md#2.5)

## Phase 2: Component Refactoring (Clean UI)
- [ ] T007 [US1] Refactor `src/features/training/components/ProgramListScreen.tsx` to consume `useProgramList` hook
- [ ] T008 [US1] Refactor `src/features/training/components/ProgramForm.tsx` to consume `useProgramForm` hook
- [ ] T009 [US1] Refactor `src/features/training/components/WorkoutSessionScreen.tsx` to consume `useWorkoutSession` hook
- [ ] T010 [US1] Refactor `src/features/training/components/HistoryScreen.tsx` to consume `useWorkoutHistory` hook
- [ ] T011 [US1] Refactor `src/features/training/components/SessionDetailsScreen.tsx` to consume `useWorkoutDetails` hook

## Phase 3: Integration & Validation
- [ ] T012 Export hooks inside `src/features/training/index.ts`
- [ ] T013 Run `npx tsc --noEmit` to validate TypeScript compilation
- [ ] T014 Run `npx expo-doctor` to ensure overall project health
