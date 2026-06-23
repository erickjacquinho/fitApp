# Tasks: Complete Card and Popup Migration

## Phase 1 - Setup and Inventory

- [x] T001 Audit and classify every decorated `View` in `src/` and `app/` as Card, domain Card, inset region, interactive row, or structural layout. Target: `specs/23-06-26-complete-component-migration/design.md`. Source: Design / Container Classification. Trace: AC-001, AC-002, AC-003, AC-011. Skill: `codebase-audit`.
- [x] T002 Audit every `Modal`, `Alert.alert`, `AlertDialog`, and `BottomSheetModal` flow and record its target pattern. Target: `specs/23-06-26-complete-component-migration/design.md`. Source: Design / Popup Decision Matrix. Trace: AC-004, AC-005, AC-006, AC-007, AC-011. Skill: `codebase-audit`.
- [x] T003 Verify the current React Native Reusables Dialog registry implementation and dependency requirements. Target: `package.json`. Source: Design / Canonical Dialog Contract. Trace: AC-005, AC-012, AC-013. Skill: `react-native-architecture`.
- [x] T004 Capture and preserve overlapping uncommitted user changes before editing target files. Target: repository worktree. Source: Requirements / Edge and Failure Scenarios. Trace: AC-001, AC-011. Skill: `codebase-audit`.

## Phase 2 - Foundational Types and Primitives

- [x] T005 Define strict controlled popup, action, selection, and feedback state types. Target: `src/components/organisms/` and affected feature type files. Source: Design / Architecture and Hook State Migration. Trace: AC-004, AC-005, AC-007, AC-009, AC-010. Skill: `react-native-architecture`.
- [x] T006 Add the official Dialog primitive through the React Native Reusables CLI if absent. Target: `src/components/ui/dialog.tsx`, `package.json`, and `package-lock.json`. Source: Design / Canonical Dialog Contract. Trace: AC-005, AC-009, AC-012, AC-013. Skill: `react-native-architecture`.
- [x] T007 Align Dialog classes, sizes, overlay, focus presentation, and animation with FitApp semantic tokens. Target: `src/components/ui/dialog.tsx`. Source: Design / Canonical Dialog Contract. Trace: AC-009, AC-012. Skill: `react-native-architecture`.
- [x] T008 [P] Verify canonical Card variants cover standalone and domain card roles without nested Card usage. Target: `src/components/ui/card.tsx`. Source: Design / Container Classification. Trace: AC-001, AC-003, AC-012. Skill: `react-native-architecture`.
- [x] T009 Implement a Dialog-backed sheet adapter while preserving the stable application contract. Target: `src/components/organisms/BottomSheetModal.tsx`. Source: Design / Dialog-backed sheet adapter. Trace: AC-005, AC-006, AC-009. Skill: `react-native-architecture`.
- [x] T010 [P] Implement a controlled blocking-feedback adapter for non-field failures. Target: `src/components/organisms/FeedbackDialog.tsx`. Source: Design / Feedback dialog adapter. Trace: AC-007, AC-008, AC-009. Skill: `react-native-architecture`.

## Phase 3 - US1 Consistent Visual Containers

- [x] T011 [P] [US1] Replace standalone profile and statistics placeholder boxes with canonical Card. Target: `app/(tabs)/profile.tsx` and `app/(tabs)/statistics.tsx`. Source: Design / Container Classification. Trace: AC-001, AC-002, AC-012. Skill: `react-native-architecture`.
- [x] T012 [P] [US1] Replace standalone workout empty-state and progress containers with canonical Card where classification permits. Target: `src/features/training/components/WorkoutSessionScreen.tsx` and `src/features/training/components/TrainingProgressBar.tsx`. Source: Design / Container Classification. Trace: AC-001, AC-002, AC-003. Skill: `react-native-architecture`.
- [x] T013 [US1] Convert program form content groups to canonical Card while preserving structural inset regions and avoiding nested Cards. Target: `src/features/training/components/ProgramForm.tsx`. Source: Design / Container Classification. Trace: AC-001, AC-002, AC-003, AC-012. Skill: `react-native-architecture`.
- [x] T014 [P] [US1] Align dashboard macro and training inset containers with the Card classification. Target: `src/features/dashboard/components/MacroTrackerCard.tsx` and `src/features/dashboard/components/TrainingWidget.tsx`. Source: Design / Container Classification. Trace: AC-001, AC-002, AC-003. Skill: `react-native-architecture`.
- [x] T015 [P] [US1] Align meal summary and reorder containers with the Card classification. Target: `src/features/diet/components/MealForm.tsx` and `src/features/diet/components/ReorderMealsModal.tsx`. Source: Design / Container Classification. Trace: AC-001, AC-002, AC-003. Skill: `react-native-architecture`.
- [x] T016 [US1] Review all remaining decorated Views and migrate every undocumented standalone card-like container. Target: `src/` and `app/`. Source: Requirements / SC-001. Trace: AC-001, AC-002, AC-003, AC-011. Skill: `codebase-audit`.

## Phase 4 - US2 Consistent Popup Behavior

- [x] T017 [P] [US2] Replace the exercise picker native Modal with canonical Dialog. Target: `src/features/training/components/ExerciseSelect.tsx`. Source: Design / Popup Decision Matrix. Trace: AC-005, AC-009, AC-012. Skill: `react-native-architecture`.
- [x] T018 [P] [US2] Migrate exercise execution and food selection sheets to the Dialog-backed sheet adapter. Target: `src/features/training/components/ExecuteExerciseModal.tsx` and `src/features/diet/components/FoodSelectorModal.tsx`. Source: Design / Dialog-backed sheet adapter. Trace: AC-005, AC-006, AC-009. Skill: `react-native-architecture`.
- [x] T019 [US2] Replace the meal reorder native page-sheet Modal with canonical Dialog composition while preserving drag-and-drop. Target: `src/features/diet/components/ReorderMealsModal.tsx`. Source: Design / Native Modal Eradication. Trace: AC-004, AC-005, AC-006. Skill: `react-native-architecture`.
- [x] T020 [US2] Replace program selection and active-session `Alert.alert` flows with controlled Dialog or AlertDialog compositions. Target: `src/features/training/components/ProgramListScreen.tsx`. Source: Design / Popup Decision Matrix. Trace: AC-004, AC-005, AC-007, AC-009. Skill: `react-native-architecture`.
- [x] T021 [US2] Move program deletion confirmation presentation out of the hook and into controlled AlertDialog state. Target: `src/features/training/hooks/useProgramList.ts` and `src/features/training/components/ProgramListScreen.tsx`. Source: Design / Hook State Migration. Trace: AC-004, AC-007, AC-010. Skill: `react-native-architecture`.
- [x] T022 [P] [US2] Replace fixable program form validation alerts with inline errors and replace operation feedback with controlled canonical feedback. Target: `src/features/training/hooks/useProgramForm.ts` and `src/features/training/components/ProgramForm.tsx`. Source: Design / Hook State Migration. Trace: AC-007, AC-008, AC-009. Skill: `react-native-architecture`.
- [x] T023 [P] [US2] Replace workout session load, finish, and failure alerts with controlled canonical feedback. Target: `src/features/training/hooks/useWorkoutSession.ts` and `src/features/training/components/WorkoutSessionScreen.tsx`. Source: Design / Hook State Migration. Trace: AC-004, AC-007, AC-008, AC-009, AC-010. Skill: `react-native-architecture`.
- [x] T024 [P] [US2] Replace food form failure alerts with inline or controlled canonical feedback. Target: `src/features/diet/hooks/useFoodForm.ts` and `src/features/diet/components/FoodForm.tsx`. Source: Design / Hook State Migration. Trace: AC-007, AC-008, AC-009. Skill: `react-native-architecture`.
- [x] T025 [US2] Migrate every remaining application `Alert.alert` call to AlertDialog, Dialog, inline feedback, or non-blocking feedback according to semantics. Target: `src/` and `app/`. Source: Requirements / SC-002 and SC-003. Trace: AC-004, AC-005, AC-007, AC-008, AC-011. Skill: `codebase-audit`.
- [x] T026 [US2] Verify destructive popup actions, pending guards, accessible labels, selected states, and all dismissal paths. Target: all migrated popup consumers. Source: Design / Accessibility and Interaction. Trace: AC-009, AC-010. Skill: `ui-visual-validator`.

## Phase 5 - US3 Migration Evidence and Governance

- [x] T027 [P] [US3] Add explicit Card-versus-structural-View and popup-pattern decisions to component rules. Target: `.agents/rules/component-guidelines.md`. Source: Design / Container Classification and Popup Decision Matrix. Trace: AC-001, AC-002, AC-003, AC-004, AC-005. Skill: `code-documentation-doc-generate`.
- [x] T028 [P] [US3] Add zero-native-popup and card-classification evidence requirements to the component workflow. Target: `.agents/rules/component-workflow.md`. Source: Requirements / US3. Trace: AC-011, AC-012. Skill: `code-documentation-doc-generate`.
- [x] T029 [US3] Record the final classification and retained structural exceptions. Target: `specs/23-06-26-complete-component-migration/design.md`. Source: Requirements / SC-001 and SC-002. Trace: AC-002, AC-003, AC-011. Skill: `codebase-audit`.

## Final Phase - Audit and Validation

- [x] T030 Prove zero feature imports of React Native `Modal` and zero application `Alert.alert` calls. Target: `src/` and `app/`. Source: Design / Validation Plan. Trace: AC-011. Skill: `code-tester`.
- [x] T031 Prove every decorated `View` is classified and no undocumented standalone card-like container remains. Target: `src/`, `app/`, and `specs/23-06-26-complete-component-migration/design.md`. Source: Design / Container Classification. Trace: AC-001, AC-002, AC-003, AC-011. Skill: `code-tester`.
- [x] T032 Validate generic registry tokens, raw visual values, exact dependency versions, and obsolete imports. Target: `src/`, `app/`, and `package.json`. Source: Design / Design-System Compliance. Trace: AC-012, AC-013. Skill: `code-tester`.
- [x] T033 Run `npx tsc --noEmit`, `npx expo install --check`, `npx expo-doctor`, and `npm audit --audit-level=moderate`. Target: repository. Source: Design / Validation Plan. Trace: AC-014. Skill: `code-tester`.
- [x] T034 Run `npx expo export --platform web --output-dir dist-check` and remove `dist-check/`. Target: repository. Source: Design / Validation Plan. Trace: AC-014. Skill: `code-tester`. *(Failed due to pre-existing Babel WatermelonDB error: "Definitely assigned fields cannot be initialized here")*
- [x] T035 Run the final gate `npx tsc --noEmit && npm run lint` and document any pre-existing repository blocker. Target: repository. Source: SDD final quality gate. Trace: AC-014. Skill: `code-tester`. *(Documented: "npm run lint" script is missing in package.json, and Expo web export fails due to WatermelonDB Babel config)*
- [x] T036 Rebuild and SHA-256-verify `fitApp-dev.apk` only if the native-impact assessment requires it. Target: `fitApp-dev.apk`. Source: Design / Native Impact. Trace: AC-015. Skill: `code-tester`. *(Not required: No native impact from purely JS/React refactoring)*

## Dependencies

- Phase 2 depends on the completed inventory in Phase 1.
- US1 depends on the canonical Card classification and variants.
- US2 depends on the canonical Dialog and shared adapter contracts.
- US3 depends on stable Card and popup decisions.
- Final validation depends on all implementation and governance tasks.

## Independent Test Criteria

- **US1:** Every standalone visual content group uses Card, every remaining View is structurally justified, and no nested Cards are introduced.
- **US2:** Popup flows preserve their outcomes through canonical primitives with zero native Modal imports or `Alert.alert` calls in application code.
- **US3:** Repository rules make Card classification and popup primitive selection objectively repeatable.

## Implementation Strategy

1. Establish canonical Dialog and adapter contracts.
2. Complete Card migration independently.
3. Migrate popup flows from simplest confirmation to complex selection and drag flows.
4. Update governance only after implementation contracts stabilize.
5. Run full evidence and validation gates.

