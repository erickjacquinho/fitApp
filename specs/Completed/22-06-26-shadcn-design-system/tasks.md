# Tasks: Shadcn Component and Design System Alignment

## Phase 1 - Setup and Inventory

- [x] T001 Record the registry equivalence matrix and retained custom decisions in `specs/22-06-26-shadcn-design-system/design.md`. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-002, AC-010. Skill: `codebase-audit`.
- [x] T002 Verify current React Native Reusables registry names and dependency requirements against official sources. Target: `package.json`. Source: Design / Registry Integration. Trace: AC-001, AC-013. Skill: `react-native-architecture`.
- [x] T003 Capture the pre-change worktree and preserve overlapping user changes. Target: repository worktree. Source: Requirements / Edge and Failure Scenarios. Trace: AC-001. Skill: `codebase-audit`.

## Phase 2 - Foundational Registry Primitives

- [x] T004 Add only the required registry components through the official CLI. Target: `src/components/ui/` and dependency manifests. Source: Design / Registry Integration. Trace: AC-001, AC-013. Skill: `react-native-architecture`.
- [x] T005 [P] Align the canonical text primitive with FitApp typography and semantic colors in `src/components/ui/text.tsx`. Source: Design / Component Contracts. Trace: AC-003, AC-004. Skill: `react-native-architecture`.
- [x] T006 [P] Align the canonical icon primitive with Lucide and FitApp semantic classes in `src/components/ui/icon.tsx`. Source: Design / Component Contracts. Trace: AC-003, AC-004, AC-005. Skill: `react-native-architecture`.
- [x] T007 [P] Align generated badge, switch, separator, label, accordion, tabs, alert-dialog, and progress primitives with FitApp tokens in `src/components/ui/`. Source: Design / Registry Integration. Trace: AC-003, AC-004, AC-005. Skill: `react-native-architecture`.
- [x] T008 [P] Correct generic or arbitrary token usage in existing `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, and `src/components/ui/input.tsx`. Source: Design / Registry Integration. Trace: AC-003, AC-004. Skill: `react-native-architecture`.

## Phase 3 - US1 Consistent Shared Components

- [x] T009 [US1] Replace `Typography` consumption with canonical `Text` and remove `src/components/atoms/Typography.tsx`. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-009. Skill: `react-native-architecture`.
- [x] T010 [US1] Replace dynamic custom icon consumption with canonical `Icon` and remove `src/components/atoms/Icon.tsx`. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-004, AC-009. Skill: `react-native-architecture`.
- [x] T011 [P] [US1] Remove the duplicate Badge atom and migrate domain badges to `src/components/ui/badge.tsx`. Source: Design / Component Contracts. Trace: AC-001, AC-003, AC-005. Skill: `react-native-architecture`.
- [x] T012 [P] [US1] Replace `src/components/atoms/Switch.tsx` with the canonical switch export. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-003, AC-005. Skill: `react-native-architecture`.
- [x] T013 [P] [US1] Replace `src/components/atoms/Divider.tsx` with the canonical separator export. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-003. Skill: `react-native-architecture`.
- [x] T014 [P] [US1] Remove the duplicate Accordion molecule and retain `src/components/ui/accordion.tsx` as canonical. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-005. Skill: `react-native-architecture`.
- [x] T015 [P] [US1] Remove the duplicate SegmentedControl molecule and retain `src/components/ui/tabs.tsx` as canonical. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-005. Skill: `react-native-architecture`.
- [x] T016 [P] [US1] Replace `IconButton` usages with canonical Button and Icon composition and remove `src/components/molecules/IconButton.tsx`. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-005, AC-009. Skill: `react-native-architecture`.
- [x] T017 [P] [US1] Reimplement `src/components/organisms/ConfirmModal.tsx` with canonical alert-dialog primitives. Source: Design / Inventory Decision Matrix. Trace: AC-001, AC-005. Skill: `react-native-architecture`.
- [x] T018 [P] [US1] Compose `src/components/molecules/LabeledInput.tsx` with canonical Label and Input primitives. Source: Design / Inventory Decision Matrix. Trace: AC-003, AC-005. Skill: `react-native-architecture`.
- [x] T019 [P] [US1] Compose `src/components/molecules/SearchBar.tsx` with canonical Input, Button, and Icon primitives. Source: Design / Inventory Decision Matrix. Trace: AC-003, AC-005. Skill: `react-native-architecture`.
- [x] T020 [P] [US1] Compose `src/features/training/components/TrainingProgressBar.tsx` with canonical Progress. Source: Design / Inventory Decision Matrix. Trace: AC-003, AC-004. Skill: `react-native-architecture`.

## Phase 4 - US2 Token-Compliant Feature UI

- [x] T021 [US2] Migrate dashboard components to canonical primitives and semantic tokens in `src/features/dashboard/components/`. Source: Design / Component Contracts. Trace: AC-004, AC-006. Skill: `react-native-architecture`.
- [x] T022 [US2] Migrate diet components to canonical primitives and semantic tokens in `src/features/diet/components/`. Source: Design / Component Contracts. Trace: AC-004, AC-006. Skill: `react-native-architecture`.
- [x] T023 [US2] Migrate training components to canonical primitives and semantic tokens in `src/features/training/components/`. Source: Design / Component Contracts. Trace: AC-004, AC-006. Skill: `react-native-architecture`.
- [x] T024 [P] [US2] Migrate shared retained components to canonical composition and semantic tokens in `src/components/`. Source: Design / Inventory Decision Matrix. Trace: AC-002, AC-004, AC-010. Skill: `react-native-architecture`.
- [x] T025 [P] [US2] Migrate route-level UI to canonical components and semantic token values in `app/`. Source: Requirements / US2. Trace: AC-004, AC-006. Skill: `react-native-architecture`.
- [x] T026 [US2] Remove obsolete imports, unused duplicate files, raw visual literals, and generic registry tokens from `src/` and `app/`. Source: Requirements / Success Criteria. Trace: AC-003, AC-004, AC-009. Skill: `codebase-audit`.

## Phase 5 - US3 Governance

- [x] T027 [P] [US3] Add registry-first equivalence, adapter, token-review, and evidence rules to `.agents/rules/designsystem-governance.md`. Source: Design / Design-System Rule Changes. Trace: AC-007, AC-010. Skill: `code-documentation-doc-generate`.
- [x] T028 [P] [US3] Define canonical primitive ownership and composition boundaries in `.agents/rules/component-guidelines.md`. Source: Design / Design-System Rule Changes. Trace: AC-006, AC-007. Skill: `code-documentation-doc-generate`.
- [x] T029 [US3] Add the end-to-end component creation and modification workflow to `AGENTS.md`. Source: Design / AGENTS.md Workflow. Trace: AC-008. Skill: `code-documentation-doc-generate`.

## Final Phase - Audit and Validation

- [x] T030 Audit every custom shared component against the final registry and record retained exceptions in `specs/22-06-26-shadcn-design-system/design.md`. Source: Requirements / SC-001 and SC-004. Trace: AC-001, AC-002, AC-010. Skill: `codebase-audit`.
- [x] T031 Validate obsolete imports, generic tokens, raw colors, arbitrary static values, accessibility labels, and exact dependency versions across `src/`, `app/`, and `package.json`. Source: Design / Validation. Trace: AC-003, AC-004, AC-005, AC-009, AC-013. Skill: `code-tester`.
- [x] T032 Run `npx tsc --noEmit`, `npx expo install --check`, `npx expo-doctor`, and `npm audit --audit-level=moderate`. Target: repository. Source: Design / Validation. Trace: AC-011. Skill: `code-tester`.
- [x] T033 Run `npx expo export --platform web --output-dir dist-check` and remove `dist-check/`. Target: repository. Source: Design / Validation. Trace: AC-011, AC-012. Skill: `code-tester`.
- [x] T034 Run the final gate `npx tsc --noEmit && npm run lint` and record any repository-level missing-script blocker. Target: repository. Source: SDD quality gate. Trace: AC-011. Skill: `code-tester`.
- [x] T035 Rebuild and hash-verify `fitApp-dev.apk` only if the native-impact assessment requires it. Target: `fitApp-dev.apk`. Source: Design / Validation. Trace: AC-011. Skill: `code-tester`.

## Dependencies

- Phase 2 depends on Phase 1.
- US1 depends on the canonical primitives in Phase 2.
- US2 depends on US1 canonical contracts.
- US3 can proceed after the inventory decision matrix is stable.
- Final validation depends on all implementation and governance tasks.

## Independent Test Criteria

- **US1:** Shared controls render and interact through canonical registry behavior without obsolete duplicate imports.
- **US2:** Feature and route UI contains no migration-target raw visual literals or generic registry tokens.
- **US3:** A contributor can determine direct use, adapter, composition, or custom implementation using only repository rules.
