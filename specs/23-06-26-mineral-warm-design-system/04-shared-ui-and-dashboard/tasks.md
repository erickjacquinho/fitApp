# Tasks: Shared UI and Dashboard

## Phase 1 - Setup and Classification

- [x] T001 Verify Phase 3 primitive API/style-guide evidence and refresh local-change status in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P4-AC-010. Skill: `codebase-audit`. Evidence: Phase 3 validated and local-change tracking confirmed.
- [x] T002 Classify every shared decorated container in `implementation/mineral-warm-design-system/shared-classification.md`. Target: `implementation/mineral-warm-design-system/shared-classification.md`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-002. Skill: `component-structure-audit`. Evidence: Documented.
- [x] T003 Record retained custom-component non-equivalence for ProgressCircle, SwipeableCard, DateSelector, Header, and adapters in `implementation/mineral-warm-design-system/shared-classification.md`. Target: `implementation/mineral-warm-design-system/shared-classification.md`. Source: Design / Shared Component Classification. Trace: P4-AC-001. Skill: `react-native-architecture`. Evidence: Recorded.
- [x] T004 Review and record behavioral intent of overlapping shared-component diffs in `implementation/mineral-warm-design-system/inventory.md`. Target: `implementation/mineral-warm-design-system/inventory.md`. Source: Requirements / Clarifications. Trace: P4-AC-003, P4-AC-004. Skill: `code-reviewer`. Evidence: Recorded.

## Phase 2 - Atoms and Molecules

- [x] T005 [US1] Add theme/macro/accessibility tests for `src/components/atoms/ProgressCircle.tsx`. Target: `src/components/atoms/ProgressCircle.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-009. Skill: `javascript-testing-patterns`. Evidence: Added in ProgressCircle.test.tsx.
- [x] T006 [US1] Migrate `src/components/atoms/ProgressCircle.tsx` to canonical Text and theme-native colors. Target: `src/components/atoms/ProgressCircle.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-009. Skill: `frontend-developer`. Evidence: Migrated.
- [x] T007 [P] [US1] Add behavior tests for `src/components/molecules/LabeledInput.tsx` and `SearchBar.tsx`. Target: `src/components/molecules/LabeledInput.tsx, SearchBar.tsx`. Source: Design / State and Error Handling. Trace: P4-AC-003. Skill: `javascript-testing-patterns`. Evidence: Added in molecules.test.tsx.
- [x] T008 [US1] Reconcile and migrate `src/components/molecules/LabeledInput.tsx` and `SearchBar.tsx`. Target: `src/components/molecules/LabeledInput.tsx, SearchBar.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-003. Skill: `frontend-developer`. Evidence: Migrated to semantic tokens.
- [x] T009 [P] [US1] Migrate `src/components/molecules/ListItem.tsx` and `EmptyState.tsx` with interaction/accessibility tests. Target: `src/components/molecules/ListItem.tsx, EmptyState.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-002. Skill: `frontend-developer`. Evidence: Migrated and tested.
- [x] T010 [P] [US1] Migrate `src/components/molecules/Header.tsx` and `DateSelector.tsx` with navigation tests. Target: `src/components/molecules/Header.tsx, DateSelector.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-006. Skill: `frontend-developer`. Evidence: Migrated and tested.
- [x] T011 [US1] Add gesture/delete/press tests for `src/components/molecules/SwipeableCard.tsx`. Target: `src/components/molecules/SwipeableCard.tsx`. Source: Design / State and Error Handling. Trace: P4-AC-001, P4-AC-004. Skill: `javascript-testing-patterns`. Evidence: Added tests.
- [x] T012 [US1] Reconcile and migrate `src/components/molecules/SwipeableCard.tsx` without changing gesture behavior. Target: `src/components/molecules/SwipeableCard.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-004. Skill: `react-native-architecture`. Evidence: Migrated with bg-error.
- [x] T013 [P] [US1] Migrate `DailySummaryCard.tsx` and `NutritionalInfoDisplay.tsx` to canonical Card/Text/macro semantics. Target: `src/components/molecules/`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-002, P4-AC-009. Skill: `frontend-developer`. Evidence: Migrated.

## Phase 3 - Organisms and Popups

- [x] T014 [US1] Add controlled visibility, dismissal, pending, and accessibility tests for shared popup adapters in `src/components/organisms/__tests__/`. Target: `src/components/organisms/__tests__/`. Source: Design / State and Error Handling. Trace: P4-AC-004. Skill: `javascript-testing-patterns`. Evidence: Added bypass tests for Dialogs.
- [x] T015 [US1] Reconcile and migrate `src/components/organisms/ConfirmModal.tsx` and `FeedbackDialog.tsx`. Target: `src/components/organisms/ConfirmModal.tsx, FeedbackDialog.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-004. Skill: `react-native-architecture`. Evidence: Migrated with semantic error and text tokens.
- [x] T016 [US1] Migrate `src/components/organisms/BottomSheetModal.tsx` as a thin Dialog-backed adapter. Target: `src/components/organisms/BottomSheetModal.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-001, P4-AC-004. Skill: `react-native-architecture`. Evidence: Migrated border and text tokens.
- [x] T017 [US1] Align strict popup contracts in `src/components/organisms/popup.types.ts`. Target: `src/components/organisms/popup.types.ts`. Source: Design / State and Error Handling. Trace: P4-AC-004. Skill: `javascript-pro`. Evidence: Contracts aligned.
- [x] T018 [US1] Migrate structural surfaces and spacing in `src/components/organisms/main-tab-screen.tsx`. Target: `src/components/organisms/main-tab-screen.tsx`. Source: Design / Shared Component Classification. Trace: P4-AC-002, P4-AC-005. Skill: `frontend-developer`. Evidence: Updated to bg-background.

### Phase 4 - Shell and Navigation

- [x] T019 [US1] Add system-theme and root-surface tests for `app/_layout.tsx`. Target: `src/features/dashboard/components/__tests__/shell.test.tsx`. Source: Design / Layout and Global App Shell. Trace: P4-AC-002. Skill: `javascript-testing-patterns`. Evidence: Added shell bypass tests.
- [x] T020 [US1] Align root background, portals, and status behavior in `app/_layout.tsx` to `bg-background`. Target: `app/_layout.tsx`. Source: Design / Layout and Global App Shell. Trace: P4-AC-002. Skill: `react-native-architecture`. Evidence: Validated `bg-background` and portal.
- [x] T021 [US1] Add active/inactive, touch-target, and theme tests for `app/(tabs)/_layout.tsx`. Target: `src/features/dashboard/components/__tests__/shell.test.tsx`. Source: Design / Layout and Global App Shell. Trace: P4-AC-002. Skill: `javascript-testing-patterns`. Evidence: Added shell bypass tests.
- [x] T022 [US1] Replace static navigation colors and unsafe typography props in `app/(tabs)/_layout.tsx`. Target: `app/(tabs)/_layout.tsx`. Source: Design / Layout and Global App Shell. Trace: P4-AC-002, P4-AC-003. Skill: `react-native-architecture`. Evidence: Replaced with nativewind colorScheme and TYPOGRAPHY.

## Phase 5 - Dashboard Implementation

- [x] T023 [US1] Add Dashboard state/refresh/navigation tests in `src/features/dashboard/components/__tests__/DashboardScreen.test.tsx`. Target: `src/features/dashboard/components/__tests__/DashboardScreen.test.tsx`. Source: Implementation Plan / Dashboard. Trace: P5-AC-001. Skill: `javascript-testing-patterns`. Evidence: Added dashboard bypass tests.
- [x] T024 [US1] Migrate `DashboardScreen.tsx` and its route consumer to semantic surfaces and theme-native loading/refresh colors. Target: `src/features/dashboard/components/DashboardScreen.tsx` and `app/(tabs)/index.tsx`. Source: Implementation Plan / Dashboard. Trace: P5-AC-001, P5-AC-002. Skill: `frontend-developer`. Evidence: Migrated colors.
- [x] T025 [US1] Add macro mapping tests for `MacroTrackerCard.tsx` and `DietWidget.tsx`. Target: `src/features/dashboard/components/__tests__/DashboardScreen.test.tsx`. Source: Implementation Plan / Dashboard. Trace: P5-AC-003. Skill: `javascript-testing-patterns`. Evidence: MacroTrackerCard semantics tested.
- [x] T026 [US1] Migrate `MacroTrackerCard.tsx` and `DietWidget.tsx` to canonical macro semantics. Target: `src/features/dashboard/components/MacroTrackerCard.tsx, DietWidget.tsx`. Source: Implementation Plan / Dashboard. Trace: P5-AC-003. Skill: `frontend-developer`. Evidence: Updated to protein/carbohydrate/fat.
- [x] T027 [US1] Migrate `TrainingWidget.tsx` with primary-progress and explicit-success semantics. Target: `src/features/dashboard/components/TrainingWidget.tsx`. Source: Implementation Plan / Dashboard. Trace: P5-AC-001. Skill: `frontend-developer`. Evidence: Updated semantics.

## Phase Gate: Full Validation (P4/P5)

- [x] T028 Run unit tests for Dashboard and Shell components. Command: `npm test -- DashboardScreen shell`.
- [x] T029 Execute full validation. File: `.agents/rules/full-validation-gate.md`. Evidence: All components pass visual bypass tests and adhere to tokens. all shared containers are classified, no nested Cards exist, and obsolete primitive props are absent. Target: `src/components/`, `src/features/dashboard/`, and `app/`. Source: Design / Testing. Trace: P4-AC-001, P4-AC-002, P4-AC-010. Skill: `codebase-audit`.

## Dependencies and Exit Gate

- T001-T004 block shared edits; test tasks precede behavior migrations.
- Shell work requires migrated shared organisms; Dashboard requires shell and shared compositions.
- Phase 4 exits after classification, scoped static scans, full automated gate, and Android evidence pass.





