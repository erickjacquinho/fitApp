# Tasks: Shared UI and Dashboard

## Phase 1 - Setup and Classification

- [ ] T001 Verify Phase 3 primitive API/style-guide evidence and refresh local-change status in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P4-AC-010. Skill: `codebase-audit`.
- [ ] T002 Classify every shared decorated container in `implementation/mineral-warm-design-system/shared-classification.md`. Target: `implementation/mineral-warm-design-system/shared-classification.md`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-002. Skill: `component-structure-audit`.
- [ ] T003 Record retained custom-component non-equivalence for ProgressCircle, SwipeableCard, DateSelector, Header, and adapters in `implementation/mineral-warm-design-system/shared-classification.md`. Target: `implementation/mineral-warm-design-system/shared-classification.md`. Source: Design / Shared Component Classification. Trace: P4-AC-001. Skill: `react-native-architecture`.
- [ ] T004 Review and record behavioral intent of overlapping shared-component diffs in `implementation/mineral-warm-design-system/inventory.md`. Target: `implementation/mineral-warm-design-system/inventory.md`. Source: Requirements / Clarifications. Trace: P4-AC-003, P4-AC-004. Skill: `code-reviewer`.

## Phase 2 - Atoms and Molecules

- [ ] T005 [US1] Add theme/macro/accessibility tests for `src/components/atoms/ProgressCircle.tsx`. Target: `src/components/atoms/ProgressCircle.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-009. Skill: `javascript-testing-patterns`.
- [ ] T006 [US1] Migrate `src/components/atoms/ProgressCircle.tsx` to canonical Text and theme-native colors. Target: `src/components/atoms/ProgressCircle.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-009. Skill: `frontend-developer`.
- [ ] T007 [P] [US1] Add behavior tests for `src/components/molecules/LabeledInput.tsx` and `SearchBar.tsx`. Target: `src/components/molecules/LabeledInput.tsx, SearchBar.tsx`. Source: Design / State and Error Handling. Trace: P4-AC-003. Skill: `javascript-testing-patterns`.
- [ ] T008 [US1] Reconcile and migrate `src/components/molecules/LabeledInput.tsx` and `SearchBar.tsx`. Target: `src/components/molecules/LabeledInput.tsx, SearchBar.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-003. Skill: `frontend-developer`.
- [ ] T009 [P] [US1] Migrate `src/components/molecules/ListItem.tsx` and `EmptyState.tsx` with interaction/accessibility tests. Target: `src/components/molecules/ListItem.tsx, EmptyState.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-002. Skill: `frontend-developer`.
- [ ] T010 [P] [US1] Migrate `src/components/molecules/Header.tsx` and `DateSelector.tsx` with navigation tests. Target: `src/components/molecules/Header.tsx, DateSelector.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-006. Skill: `frontend-developer`.
- [ ] T011 [US1] Add gesture/delete/press tests for `src/components/molecules/SwipeableCard.tsx`. Target: `src/components/molecules/SwipeableCard.tsx`. Source: Design / State and Error Handling. Trace: P4-AC-001, P4-AC-004. Skill: `javascript-testing-patterns`.
- [ ] T012 [US1] Reconcile and migrate `src/components/molecules/SwipeableCard.tsx` without changing gesture behavior. Target: `src/components/molecules/SwipeableCard.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-004. Skill: `react-native-architecture`.
- [ ] T013 [P] [US1] Migrate `DailySummaryCard.tsx` and `NutritionalInfoDisplay.tsx` to canonical Card/Text/macro semantics. Target: `src/components/molecules/`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-002, P4-AC-009. Skill: `frontend-developer`.

## Phase 3 - Organisms and Popups

- [ ] T014 [US1] Add controlled visibility, dismissal, pending, and accessibility tests for shared popup adapters in `src/components/organisms/__tests__/`. Target: `src/components/organisms/__tests__/`. Source: Design / State and Error Handling. Trace: P4-AC-004. Skill: `javascript-testing-patterns`.
- [ ] T015 [US1] Reconcile and migrate `src/components/organisms/ConfirmModal.tsx` and `FeedbackDialog.tsx`. Target: `src/components/organisms/ConfirmModal.tsx, FeedbackDialog.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-004. Skill: `react-native-architecture`.
- [ ] T016 [US1] Migrate `src/components/organisms/BottomSheetModal.tsx` as a thin Dialog-backed adapter. Target: `src/components/organisms/BottomSheetModal.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-004. Skill: `react-native-architecture`.
- [ ] T017 [US1] Align strict popup contracts in `src/components/organisms/popup.types.ts`. Target: `src/components/organisms/popup.types.ts`. Source: Design / State and Error Handling. Trace: P4-AC-004. Skill: `javascript-pro`.
- [ ] T018 [US1] Migrate structural surfaces and spacing in `src/components/organisms/main-tab-screen.tsx`. Target: `src/components/organisms/main-tab-screen.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-002, P4-AC-005. Skill: `frontend-developer`.

## Phase 4 - Shell and Navigation

- [ ] T019 [US2] Add system-theme/root-surface tests for `app/_layout.tsx`. Target: `app/_layout.tsx`. Source: Design / Shell and Navigation. Trace: P4-AC-005. Skill: `javascript-testing-patterns`.
- [ ] T020 [US2] Align root background, portals, and status behavior in `app/_layout.tsx`. Target: `app/_layout.tsx`. Source: Design / Shell and Navigation. Trace: P4-AC-005. Skill: `react-native-architecture`.
- [ ] T021 [US2] Add active/inactive/touch-target/theme tests for `app/(tabs)/_layout.tsx`. Target: `app/(tabs)/_layout.tsx`. Source: Design / Shell and Navigation. Trace: P4-AC-005, P4-AC-006, P4-AC-009. Skill: `javascript-testing-patterns`.
- [ ] T022 [US2] Replace static navigation colors and unsafe typography props in `app/(tabs)/_layout.tsx`. Target: `app/(tabs)/_layout.tsx`. Source: Design / Shell and Navigation. Trace: P4-AC-005, P4-AC-006, P4-AC-009. Skill: `react-native-architecture`.

## Phase 5 - Dashboard

- [ ] T023 [US3] Add Dashboard state/refresh/navigation tests in `src/features/dashboard/components/__tests__/DashboardScreen.test.tsx`. Target: `src/features/dashboard/components/__tests__/DashboardScreen.test.tsx`. Source: Design / Dashboard Mapping. Trace: P4-AC-008. Skill: `javascript-testing-patterns`.
- [ ] T024 [US2] Migrate `DashboardScreen.tsx` and its route consumer to semantic surfaces and theme-native loading/refresh colors. Target: `src/features/dashboard/components/DashboardScreen.tsx` and `app/(tabs)/index.tsx`. Source: Design / Dashboard Mapping. Trace: P4-AC-005, P4-AC-008, P4-AC-009. Skill: `frontend-developer`.
- [ ] T025 [P] [US3] Add macro mapping tests for `MacroTrackerCard.tsx` and `DietWidget.tsx`. Target: `src/features/dashboard/components/__tests__/`. Source: Design / Dashboard Mapping. Trace: P4-AC-007. Skill: `javascript-testing-patterns`.
- [ ] T026 [US3] Migrate `MacroTrackerCard.tsx` and `DietWidget.tsx` to canonical macro semantics. Target: `src/features/dashboard/components/`. Source: Design / Dashboard Mapping. Trace: P4-AC-007, P4-AC-009. Skill: `frontend-developer`.
- [ ] T027 [US3] Migrate `TrainingWidget.tsx` with primary-progress and explicit-success semantics. Target: `src/features/dashboard/components/TrainingWidget.tsx`. Source: Design / Dashboard Mapping. Trace: P4-AC-007, P4-AC-008. Skill: `frontend-developer`.

## Final Phase - Gate

- [ ] T028 Prove all shared containers are classified, no nested Cards exist, and obsolete primitive props are absent. Target: `src/components/`, `src/features/dashboard/`, and `app/`. Source: Design / Testing. Trace: P4-AC-001, P4-AC-002, P4-AC-010. Skill: `codebase-audit`.
- [ ] T029 Run `npx.cmd tsc --noEmit && npm.cmd run lint`, tests, Expo checks, audit, web export, and Android shell/Dashboard journeys in both themes. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Testing. Trace: P4-AC-001 through P4-AC-010. Skill: `code-tester`.

## Dependencies and Exit Gate

- T001-T004 block shared edits; test tasks precede behavior migrations.
- Shell work requires migrated shared organisms; Dashboard requires shell and shared compositions.
- Phase 4 exits after classification, scoped static scans, full automated gate, and Android evidence pass.





