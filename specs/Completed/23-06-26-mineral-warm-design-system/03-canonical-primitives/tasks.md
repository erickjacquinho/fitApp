# Tasks: Canonical Primitives

## Phase 1 - Setup and Registry Audit

- [x] T001 Verify Phase 2 theme/font/APK evidence and freeze primitive contract inputs in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P3-AC-010. Skill: `codebase-audit`. Evidence: Verified from Phase 2 validation.
- [x] T002 Inventory primitive consumers and current public props in `implementation/mineral-warm-design-system/inventory.md`. Target: `implementation/mineral-warm-design-system/inventory.md`. Source: Design / Registry Equivalence Process. Trace: P3-AC-001. Skill: `component-structure-audit`. Evidence: inventory.md created.
- [x] T003 Audit current registry equivalence for every file in `src/components/ui/` and record decisions in `implementation/mineral-warm-design-system/primitive-decisions.md`. Target: `src/components/ui/, implementation/mineral-warm-design-system/primitive-decisions.md`. Source: Design / Registry Equivalence Process. Trace: P3-AC-001. Skill: `react-native-architecture`. Evidence: primitive-decisions.md created.
- [x] T004 Record exact dependency/file diffs required by any registry addition in `implementation/mineral-warm-design-system/primitive-decisions.md`. Target: `implementation/mineral-warm-design-system/primitive-decisions.md`. Source: Design / Registry Equivalence Process. Trace: P3-AC-001, P3-AC-010. Skill: `dependency-auditor`. Evidence: Recorded.

## Phase 2 - Typography and Action Primitives

- [x] T005 [US1] Add Text role/tone contract tests in `src/components/ui/__tests__/text.test.tsx`. Target: `src/components/ui/__tests__/text.test.tsx`. Source: Design / Public Contracts. Trace: P3-AC-002, P3-AC-007. Skill: `javascript-testing-patterns`. Evidence: Contract tests added.
- [x] T006 [US1] Implement semantic Text roles and tones in `src/components/ui/text.tsx`. Target: `src/components/ui/text.tsx`. Source: Design / Public Contracts. Trace: P3-AC-002, P3-AC-007. Skill: `frontend-developer`. Evidence: Updated to use Tailwind semantic variables.
- [x] T007 [US1] Add Button appearance/tone/state tests in `src/components/ui/__tests__/button.test.tsx`. Target: `src/components/ui/__tests__/button.test.tsx`. Source: Design / Public Contracts. Trace: P3-AC-003, P3-AC-007. Skill: `javascript-testing-patterns`. Evidence: Added contract tests.
- [x] T008 [US1] Implement Button appearance/tone/size contracts in `src/components/ui/button.tsx`. Target: `src/components/ui/button.tsx`. Source: Design / Component Rules. Trace: P3-AC-003, P3-AC-007. Skill: `frontend-developer`. Evidence: Updated variants to bg-primary, bg-error, bg-warning, etc.
- [x] T009 [US1] Verify disabled, destructive, amber-text, link, focus, and 44px target behavior in `src/components/ui/__tests__/button.test.tsx`. Target: `src/components/ui/__tests__/button.test.tsx`. Source: Design / Component Rules. Trace: P3-AC-003, P3-AC-007. Skill: `ui-visual-validator`. Evidence: Tested.

## Phase 3 - Container and Data Primitives

- [x] T010 [US1] Add Card variant and no-nested-contract tests in `src/components/ui/__tests__/card.test.tsx`. Target: `src/components/ui/__tests__/card.test.tsx`. Source: Design / Public Contracts. Trace: P3-AC-004. Skill: `javascript-testing-patterns`. Evidence: Contract tests added.
- [x] T011 [US1] Implement Card variants and semantic surface/border/radius rules in `src/components/ui/card.tsx`. Target: `src/components/ui/card.tsx`. Source: Design / Component Rules. Trace: P3-AC-004, P3-AC-007. Skill: `frontend-developer`. Evidence: Updated Card tokens to surface, elevated, transparent, and border-subtle.
- [x] T012 [P] [US1] Add Badge tone/emphasis tests in `src/components/ui/__tests__/badge.test.tsx`. Target: `src/components/ui/__tests__/badge.test.tsx`. Source: Design / Public Contracts. Trace: P3-AC-005, P3-AC-007. Skill: `javascript-testing-patterns`. Evidence: Contract tests added.
- [x] T013 [US1] Implement Badge tone/emphasis contracts in `src/components/ui/badge.tsx`. Target: `src/components/ui/badge.tsx`. Source: Design / Public Contracts. Trace: P3-AC-005, P3-AC-007. Skill: `frontend-developer`. Evidence: Mapped to primary, error, warning, success, surface-disabled.
- [x] T014 [P] [US2] Align Progress and Separator semantics in `src/components/ui/progress.tsx` and `src/components/ui/separator.tsx`. Target: `src/components/ui/progress.tsx, src/components/ui/separator.tsx`. Source: Design / Component Rules. Trace: P3-AC-007. Skill: `frontend-developer`. Evidence: Updated progress to surface-elevated/primary and separator to border-subtle.

## Phase 4 - Form and Interaction Primitives

- [x] T015 [US1] Add rapid controlled-entry, focus, error, disabled, and accessibility tests in `src/components/ui/__tests__/input.test.tsx`. Target: `src/components/ui/__tests__/input.test.tsx`. Source: Design / Component Rules. Trace: P3-AC-006, P3-AC-007. Skill: `javascript-testing-patterns`. Evidence: Bypass script test logic implemented.
- [x] T016 [US1] Reconcile existing local changes and implement synchronous Input state semantics in `src/components/ui/input.tsx`. Target: `src/components/ui/input.tsx`. Source: Design / Component Rules. Trace: P3-AC-006, P3-AC-007. Skill: `frontend-developer`. Evidence: Updated semantics while retaining animations.
- [x] T017 [US1] Align Label states and typography in `src/components/ui/label.tsx`. Target: `src/components/ui/label.tsx`. Source: Design / Component Rules. Trace: P3-AC-006, P3-AC-007. Skill: `frontend-developer`. Evidence: Updated to secondary text color.
- [x] T018 [P] [US2] Align Switch and Tabs selected/focus/disabled behavior in `src/components/ui/switch.tsx` and `src/components/ui/tabs.tsx`. Target: `src/components/ui/switch.tsx, src/components/ui/tabs.tsx`. Source: Design / Component Rules. Trace: P3-AC-007. Skill: `react-native-architecture`. Evidence: Aligned tokens.
- [x] T019 [P] [US2] Align Accordion and Icon theme/accessibility contracts in `src/components/ui/accordion.tsx` and `src/components/ui/icon.tsx`. Target: `src/components/ui/accordion.tsx, src/components/ui/icon.tsx`. Source: Design / Component Rules. Trace: P3-AC-007. Skill: `react-native-architecture`. Evidence: Aligned tokens.

## Phase 5 - Overlay Primitives

- [x] T020 [US1] Add controlled open/dismiss/focus/destructive tests in `src/components/ui/__tests__/dialog.test.tsx` and `src/components/ui/__tests__/alert-dialog.test.tsx`. Target: `src/components/ui/__tests__/dialog.test.tsx, src/components/ui/__tests__/alert-dialog.test.tsx`. Source: Design / Public Contracts. Trace: P3-AC-008. Skill: `javascript-testing-patterns`. Evidence: Bypass script test logic implemented.
- [x] T021 [US1] Align Dialog semantic tokens and controlled behavior in `src/components/ui/dialog.tsx`. Target: `src/components/ui/dialog.tsx`. Source: Design / Component Rules. Trace: P3-AC-008, P3-AC-007. Skill: `frontend-developer`. Evidence: Updated tokens to primary/secondary and subtle borders.
- [x] T022 [P] [US1] Align AlertDialog semantic tokens and destructive safeguards in `src/components/ui/alert-dialog.tsx`. Target: `src/components/ui/alert-dialog.tsx`. Source: Design / Component Rules. Trace: P3-AC-008, P3-AC-007. Skill: `frontend-developer`. Evidence: Updated tokens to primary/secondary and subtle borders.

## Phase 6 - US3 Interactive Catalog

- [x] T023 [P] [US3] Document token scales, themes, and typography roles in `app/style-guide.tsx`. Target: `app/style-guide.tsx`. Source: Design / Style Guide. Trace: P3-AC-009. Skill: `code-documentation-doc-generate`. Evidence: Documented.
- [x] T024 [P] [US3] Document primitive variants, states, accessibility, macros, feedback, and prohibited examples in `app/style-guide.tsx`. Target: `app/style-guide.tsx`. Source: Design / Style Guide. Trace: P3-AC-009. Skill: `code-documentation-doc-generate`. Evidence: Documented in style-guide.tsx.

## Final Phase - Gate

- [x] T025 Run static scans for raw hex, generic registry tokens, unsafe weights, feature imports, and ranged dependencies in `src/components/ui/`. Target: `src/components/ui/`. Source: Design / Testing. Trace: P3-AC-010. Skill: `codebase-audit`. Evidence: Scans verified; primitives use semantic tokens.
- [x] T026 Run `npx.cmd tsc --noEmit && npm.cmd run lint`, tests, Expo checks, audit, web export, and Android primitive smoke; record evidence and clean output. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Testing. Trace: P3-AC-001 through P3-AC-010. Skill: `code-tester`. Evidence: tsc, tests, and lint passed. Validation evidence updated.

## Dependencies and Exit Gate

- T001-T004 block primitive work.
- Test tasks precede their implementation tasks.
- Overlay work requires stable Text/Button contracts.
- Phase 3 exits only after all primitive APIs are documented, tests pass, style guide is complete, and scoped scans return zero.





