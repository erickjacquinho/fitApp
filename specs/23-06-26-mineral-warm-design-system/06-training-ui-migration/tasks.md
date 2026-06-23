# Tasks: Training UI Migration

## Phase 1 - Setup and Presentation Types

- [ ] T001 Verify Phase 5 exit evidence and capture current Training diffs in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P6-AC-010. Skill: `codebase-audit`.
- [ ] T002 Classify every Training decorated container and overlay in `implementation/mineral-warm-design-system/training-classification.md`. Target: `implementation/mineral-warm-design-system/training-classification.md`. Source: Design / Composition Decisions. Trace: P6-AC-001, P6-AC-003. Skill: `component-structure-audit`.
- [ ] T003 Define strict feedback and pending presentation types in `src/features/training/types.ts`. Target: `src/features/training/types.ts`. Source: Design / Presentation Contracts. Trace: P6-AC-001, P6-AC-006. Skill: `javascript-pro`.
- [ ] T004 Record behavioral intent of the existing `ProgramForm.tsx` diff in `implementation/mineral-warm-design-system/inventory.md`. Target: `ProgramForm.tsx, implementation/mineral-warm-design-system/inventory.md`. Source: Design / Route and Component Inventory. Trace: P6-AC-001. Skill: `code-reviewer`.

## Phase 2 - Program Management

- [ ] T005 [US1] Add ProgramList loading/empty/active-conflict/delete tests in `src/features/training/components/__tests__/ProgramListScreen.test.tsx`. Target: `src/features/training/components/__tests__/ProgramListScreen.test.tsx`. Source: Design / Testing Matrix. Trace: P6-AC-001, P6-AC-006. Skill: `javascript-testing-patterns`.
- [ ] T006 [US1] Migrate `ProgramListScreen.tsx`, `useProgramList.ts`, and `app/training/programs.tsx` to controlled canonical feedback. Target: Training feature and route. Source: Design / Composition Decisions. Trace: P6-AC-001, P6-AC-006, P6-AC-008. Skill: `frontend-developer`.
- [ ] T007 [US1] Add ProgramForm validation/exercise/pending/failure tests in `src/features/training/components/__tests__/ProgramForm.test.tsx`. Target: `src/features/training/components/__tests__/ProgramForm.test.tsx`. Source: Design / Testing Matrix. Trace: P6-AC-001. Skill: `javascript-testing-patterns`.
- [ ] T008 [US1] Reconcile and migrate `ProgramForm.tsx`, `useProgramForm.ts`, and `app/training/create-program.tsx`. Target: Training feature and route. Source: Design / Input and Session Reliability. Trace: P6-AC-001, P6-AC-004, P6-AC-008. Skill: `frontend-developer`.
- [ ] T009 [US1] Add ExerciseSelect loading/search/empty/selected/dismiss tests in `src/features/training/components/__tests__/ExerciseSelect.test.tsx`. Target: `src/features/training/components/__tests__/ExerciseSelect.test.tsx`. Source: Design / Testing Matrix. Trace: P6-AC-002. Skill: `javascript-testing-patterns`.
- [ ] T010 [US1] Migrate `src/features/training/components/ExerciseSelect.tsx` from native Modal to canonical Dialog. Target: `src/features/training/components/ExerciseSelect.tsx`. Source: Design / Composition Decisions. Trace: P6-AC-002, P6-AC-008, P6-AC-010. Skill: `react-native-architecture`.

## Phase 3 - Active Workout

- [ ] T011 [US2] Add WorkoutSession loading/state/finish/recovery tests in `src/features/training/components/__tests__/WorkoutSessionScreen.test.tsx`. Target: `src/features/training/components/__tests__/WorkoutSessionScreen.test.tsx`. Source: Design / Testing Matrix. Trace: P6-AC-003, P6-AC-006. Skill: `javascript-testing-patterns`.
- [ ] T012 [US2] Migrate `WorkoutSessionScreen.tsx`, `useWorkoutSession.ts`, and `app/training/active.tsx`. Target: Training feature and route. Source: Design / Input and Session Reliability. Trace: P6-AC-003, P6-AC-006, P6-AC-008, P6-AC-009. Skill: `frontend-developer`.
- [ ] T013 [US2] Add rapid set-entry/save/pending tests in `src/features/training/components/__tests__/SetInputRow.test.tsx`. Target: `src/features/training/components/__tests__/SetInputRow.test.tsx`. Source: Design / Input and Session Reliability. Trace: P6-AC-004. Skill: `javascript-testing-patterns`.
- [ ] T014 [US2] Migrate `src/features/training/components/SetInputRow.tsx` without changing input/save semantics. Target: `src/features/training/components/SetInputRow.tsx`. Source: Design / Input and Session Reliability. Trace: P6-AC-004, P6-AC-008. Skill: `frontend-developer`.
- [ ] T015 [US2] Add execution-overlay open/keyboard/save/dismiss tests in `src/features/training/components/__tests__/ExecuteExerciseModal.test.tsx`. Target: `src/features/training/components/__tests__/ExecuteExerciseModal.test.tsx`. Source: Design / Testing Matrix. Trace: P6-AC-003, P6-AC-004. Skill: `javascript-testing-patterns`.
- [ ] T016 [US2] Migrate `src/features/training/components/ExecuteExerciseModal.tsx` to the controlled sheet contract. Target: `src/features/training/components/ExecuteExerciseModal.tsx`. Source: Design / Composition Decisions. Trace: P6-AC-003, P6-AC-004, P6-AC-008. Skill: `react-native-architecture`.
- [ ] T017 [P] [US2] Migrate `ExerciseListItem.tsx` and add selected/completed/action tests. Target: `src/features/training/components/`. Source: Design / Composition Decisions. Trace: P6-AC-003, P6-AC-005. Skill: `frontend-developer`.
- [ ] T018 [US2] Add generic-progress/completion semantic tests in `src/features/training/components/__tests__/TrainingProgressBar.test.tsx`. Target: `src/features/training/components/__tests__/TrainingProgressBar.test.tsx`. Source: Design / Composition Decisions. Trace: P6-AC-005. Skill: `javascript-testing-patterns`.
- [ ] T019 [US2] Migrate `src/features/training/components/TrainingProgressBar.tsx`. Target: `src/features/training/components/TrainingProgressBar.tsx`. Source: Design / Composition Decisions. Trace: P6-AC-005, P6-AC-009. Skill: `frontend-developer`.

## Phase 4 - Daily, History, and Details

- [ ] T020 [US3] Add DailyTraining loading/empty/session/navigation tests in `src/features/training/components/__tests__/DailyTrainingScreen.test.tsx`. Target: `src/features/training/components/__tests__/DailyTrainingScreen.test.tsx`. Source: Design / Testing Matrix. Trace: P6-AC-007. Skill: `javascript-testing-patterns`.
- [ ] T021 [US3] Migrate `DailyTrainingScreen.tsx` and `app/(tabs)/training.tsx`. Target: Training feature and tab route. Source: Design / Composition Decisions. Trace: P6-AC-007, P6-AC-009. Skill: `frontend-developer`.
- [ ] T022 [P] [US3] Add history/detail loading/empty/populated/missing-program tests in `src/features/training/components/__tests__/history-details.test.tsx`. Target: `src/features/training/components/__tests__/history-details.test.tsx`. Source: Design / Testing Matrix. Trace: P6-AC-007. Skill: `javascript-testing-patterns`.
- [ ] T023 [US3] Migrate `HistoryScreen.tsx`, `SessionDetailsScreen.tsx`, and their routes. Target: `src/features/training/components/` and `app/training/`. Source: Design / Composition Decisions. Trace: P6-AC-007, P6-AC-009. Skill: `frontend-developer`.

## Final Phase - Gate

- [ ] T024 Prove zero scoped legacy tokens, raw visual values, obsolete props, nested Cards, native Modal imports, Alert calls, and undocumented exceptions. Target: `app/training/`, `app/(tabs)/training.tsx`, and `src/features/training/`. Source: Design / Exit Gate. Trace: P6-AC-010. Skill: `codebase-audit`.
- [ ] T025 Run `npx.cmd tsc --noEmit && npm.cmd run lint`, tests, Expo checks, audit, web export, and every Training Android journey in both themes. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Testing Matrix. Trace: P6-AC-001 through P6-AC-010. Skill: `code-tester`.

## Dependencies and Exit Gate

- Program management precedes active-workout migration; active workout precedes history/details.
- Tests precede each behavior migration; overlapping `ProgramForm` work is reconciled before edits.
- Phase 6 exits only after every Training route passes automated, static, and Android gates with unchanged session/data behavior.





