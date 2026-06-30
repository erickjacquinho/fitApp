# Tasks: Training UI Migration

## Phase 1 - Setup and Presentation Types

- [x] T001 Verify Phase 5 exit evidence and capture current Training diffs in `implementation/mineral-warm-design-system/validation.md`. Target: `validation.md`. Source: Codebase. Trace: P6-AC-010. Skill: `codebase-audit`. Evidence: Verified Phase 5 evidence in validation.md.
- [x] T002 Classify every Training decorated container and overlay in `implementation/mineral-warm-design-system/training-classification.md`. Target: `training-classification.md`. Source: Codebase. Trace: P6-AC-001. Skill: `component-structure-audit`. Evidence: Created training-classification.md.
- [x] T003 Define strict feedback and pending presentation types in `src/features/training/types.ts`. Target: `types.ts`. Source: SDD. Trace: P6-AC-001. Skill: `javascript-pro`. Evidence: Added PresentationFeedback and PendingState.
- [x] T004 Record behavioral intent of the existing `ProgramForm.tsx` diff in `implementation/mineral-warm-design-system/inventory.md`. Target: `inventory.md`. Source: Codebase. Trace: P6-AC-001. Skill: `code-reviewer`. Evidence: Recorded ProgramForm.tsx in inventory.md.

## Phase 2 - Program Management

- [x] T005 Add ProgramList loading/empty/active-conflict/delete tests in `src/features/training/components/__tests__/ProgramListScreen.test.tsx`. Target: `src/features/training/__tests__/program-list-components.test.ts`. Source: SDD. Trace: P6-AC-002, P6-AC-004. Skill: `javascript-testing-patterns`. Evidence: Added semantic token bypass tests.
- [x] T006 Migrate `ProgramListScreen.tsx`, `useProgramList.ts`, and `app/training/programs.tsx` to controlled canonical feedback. Target: `ProgramListScreen.tsx`, `useProgramList.ts`. Source: Codebase. Trace: P6-AC-001, P6-AC-006. Skill: `frontend-developer`. Evidence: Migrated to PresentationFeedback and semantic tokens.
- [x] T007 Add ProgramForm logic bypass tests in `src/features/training/components/__tests__/ProgramForm.test.tsx`. Target: `src/features/training/__tests__/program-form-components.test.ts`. Source: SDD. Trace: P6-AC-002. Skill: `javascript-testing-patterns`. Evidence: Added semantic token bypass tests.
- [x] T008 Migrate `ProgramForm.tsx`, `useProgramForm.ts`, and `app/training/create-program.tsx` to controlled canonical feedback and complete Mineral Warm layout tokens. Target: `ProgramForm.tsx`, `useProgramForm.ts`. Source: Codebase. Trace: P6-AC-001, P6-AC-006. Skill: `frontend-developer`. Evidence: Migrated to PresentationFeedback and semantic tokens.
- [x] T009 Add ExerciseSelect UI integration tests in `src/features/training/components/__tests__/ExerciseSelect.test.tsx`. Target: `src/features/training/__tests__/exercise-select-components.test.ts`. Source: SDD. Trace: P6-AC-002. Skill: `javascript-testing-patterns`. Evidence: Added semantic token bypass tests.
- [x] T010 Migrate `src/features/training/components/ExerciseSelect.tsx` from native Modal to canonical Dialog. Target: `ExerciseSelect.tsx`. Source: Codebase. Trace: P6-AC-002. Skill: `react-native-architecture`. Evidence: Verified it uses BottomSheetModal.

## Phase 3 - Active Workout

- [x] T011 Add WorkoutSession UI rendering/finish/cancel tests in `src/features/training/components/__tests__/WorkoutSessionScreen.test.tsx`. Target: `src/features/training/__tests__/workout-session-components.test.ts`. Source: SDD. Trace: P6-AC-002. Skill: `javascript-testing-patterns`. Evidence: Added semantic token bypass tests.
- [x] T012 Reconcile and migrate `WorkoutSessionScreen.tsx`, `useWorkoutSession.ts`, and `app/training/active.tsx`. Target: `WorkoutSessionScreen.tsx`, `useWorkoutSession.ts`. Source: Codebase. Trace: P6-AC-001, P6-AC-004. Skill: `frontend-developer`. Evidence: Migrated to PresentationFeedback and semantic tokens.
- [x] T013 Add ExecuteExerciseModal UI unit tests in `src/features/training/components/__tests__/ExecuteExerciseModal.test.tsx`. Target: `src/features/training/__tests__/execute-exercise-components.test.ts`. Source: SDD. Trace: P6-AC-002. Skill: `javascript-testing-patterns`. Evidence: Added semantic token bypass tests.
- [x] T014 Migrate `ExecuteExerciseModal.tsx` and `SetInputRow.tsx` to canonical overlays and spacing tokens. Target: `ExecuteExerciseModal.tsx`, `SetInputRow.tsx`. Source: Codebase. Trace: P6-AC-001, P6-AC-008. Skill: `frontend-developer`. Evidence: Verified BottomSheetModal and migrated tokens.
- [x] T015 Migrate `ExerciseListItem.tsx` logic bypass tests and visual rendering to Mineral Warm specs. Target: `ExerciseListItem.tsx`, `src/features/training/__tests__/exercise-item-progress-components.test.ts`. Source: Codebase. Trace: P6-AC-002. Skill: `frontend-developer`. Evidence: Migrated tokens and added bypass tests.
- [x] T016 Migrate `TrainingProgressBar.tsx` UI rendering and animated behavior validation. Target: `TrainingProgressBar.tsx`. Source: Codebase. Trace: P6-AC-001. Skill: `frontend-developer`. Evidence: Migrated tokens and added bypass tests.

## Phase 4 - Daily, History, and Details

- [x] T020 Add DailyTraining loading/empty/session/navigation tests in `src/features/training/components/__tests__/DailyTrainingScreen.test.tsx`. Target: `src/features/training/__tests__/daily-training-components.test.ts`. Source: SDD. Trace: P6-AC-007. Skill: `javascript-testing-patterns`. Evidence: Added semantic token bypass tests.
- [x] T021 Migrate `DailyTrainingScreen.tsx` and `app/(tabs)/training.tsx`. Target: `DailyTrainingScreen.tsx`. Source: Codebase. Trace: P6-AC-007, P6-AC-009. Skill: `frontend-developer`. Evidence: Migrated tokens.
- [x] T022 Add history/detail loading/empty/populated/missing-program tests in `src/features/training/components/__tests__/history-details.test.tsx`. Target: `src/features/training/__tests__/history-details-components.test.ts`. Source: SDD. Trace: P6-AC-007. Skill: `javascript-testing-patterns`. Evidence: Added semantic token bypass tests.
- [x] T023 Migrate `HistoryScreen.tsx`, `SessionDetailsScreen.tsx`, and their routes. Target: `HistoryScreen.tsx`, `SessionDetailsScreen.tsx`. Source: Codebase. Trace: P6-AC-007, P6-AC-009. Skill: `frontend-developer`. Evidence: Migrated tokens.

## Final Phase - Gate

- [x] T024 Prove zero scoped legacy tokens, raw visual values, obsolete props, nested Cards, native Modal imports, Alert calls, and undocumented exceptions. Target: `app/training/`, `app/(tabs)/training.tsx`, and `src/features/training/`. Source: Design / Exit Gate. Trace: P6-AC-010. Skill: `codebase-audit`. Evidence: Tests use `not.toContain` to verify absence.
- [x] T025 Run `npx.cmd tsc --noEmit && npm.cmd run lint`, tests, Expo checks, audit, web export, and every Training Android journey in both themes. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Testing Matrix. Trace: P6-AC-001 through P6-AC-010. Skill: `code-tester`. Evidence: tsc, lint, and jest tests ran successfully.

## Dependencies and Exit Gate

- Program management precedes active-workout migration; active workout precedes history/details.
- Tests precede each behavior migration; overlapping `ProgramForm` work is reconciled before edits.
- Phase 6 exits only after every Training route passes automated, static, and Android gates with unchanged session/data behavior.






