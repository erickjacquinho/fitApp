# Tasks: Governance and Baseline

## Phase 1 - Setup and Evidence

- [x] T001 Capture `git status --short`, branch identity, and user-owned modified paths in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P1-AC-004, P1-AC-008. Skill: `codebase-audit`.
- [x] T002 Record current automated-command exit codes and timestamps in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P1-AC-003, P1-AC-008. Skill: `code-tester`.

## Phase 2 - US2 Reproducible Baseline

- [x] T003 [US2] Inventory every route and assign its target phase in `implementation/mineral-warm-design-system/inventory.md`. Target: `implementation/mineral-warm-design-system/inventory.md`. Source: Design / Inventory Model. Trace: P1-AC-003. Skill: `codebase-audit`.
- [x] T004 [P] [US2] Inventory every shared primitive/atom/molecule/organism in `implementation/mineral-warm-design-system/inventory.md`. Target: `implementation/mineral-warm-design-system/inventory.md`. Source: Design / Inventory Model. Trace: P1-AC-003. Skill: `component-structure-audit`.
- [x] T005 [P] [US2] Inventory feature UI, token files, raw visual values, aliases, typography overrides, and native popup usages in `implementation/mineral-warm-design-system/inventory.md`. Target: `implementation/mineral-warm-design-system/inventory.md`. Source: Design / Inventory Model. Trace: P1-AC-003. Skill: `codebase-audit`.
- [x] T006 [US2] Compare live code with active design-system SDD claims and record contradictions in `implementation/mineral-warm-design-system/inventory.md`. Target: `implementation/mineral-warm-design-system/inventory.md`. Source: Design / Existing SDD Reconciliation. Trace: P1-AC-005. Skill: `speckit-analyze`.

## Phase 3 - US1 Canonical Documentation

- [x] T007 [P] [US1] Translate primitive scales and semantic precedence into `docs/design-system/mineral-warm.md`. Target: `docs/design-system/mineral-warm.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-001. Skill: `code-documentation-doc-generate`.
- [x] T008 [P] [US1] Translate theme, typography, surfaces, cards, borders, and dividers into `docs/design-system/mineral-warm.md`. Target: `docs/design-system/mineral-warm.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-001. Skill: `code-documentation-doc-generate`.
- [x] T009 [P] [US1] Translate buttons, controls, feedback, links, badges, loading, and motion into `docs/design-system/mineral-warm.md`. Target: `docs/design-system/mineral-warm.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-001. Skill: `code-documentation-doc-generate`.
- [x] T010 [P] [US1] Translate charts, image overlays, contrast, opacity, and test rules into `docs/design-system/mineral-warm.md`. Target: `docs/design-system/mineral-warm.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-001. Skill: `code-documentation-doc-generate`.
- [x] T011 [US1] Reconcile translated sections against the external palette and record section parity in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Verification. Trace: P1-AC-001. Skill: `code-tester`.

## Phase 4 - US1 Governance Alignment

- [x] T012 [US1] Update the canonical-source index and phase routing in `.agents/rules/designsystem-guide.md`. Target: `.agents/rules/designsystem-guide.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-002, P1-AC-009. Skill: `code-documentation-doc-generate`.
- [x] T013 [US1] Replace conflicting olive/color/typography guidance in `.agents/rules/designsystem-foundations.md`. Target: `.agents/rules/designsystem-foundations.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-002, P1-AC-009. Skill: `code-documentation-doc-generate`.
- [x] T014 [US1] Replace conflicting semantic and compatibility guidance in `.agents/rules/color-tokens-rules.md`. Target: `.agents/rules/color-tokens-rules.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-002, P1-AC-009. Skill: `code-documentation-doc-generate`.
- [x] T015 [P] [US1] Add deprecation, no-new-legacy-use, and exception ownership rules to `.agents/rules/designsystem-governance.md`. Target: `.agents/rules/designsystem-governance.md`. Source: Design / Existing SDD Reconciliation. Trace: P1-AC-009. Skill: `code-documentation-doc-generate`.
- [x] T016 [P] [US1] Align registry token-review mappings with Mineral Warm in `.agents/rules/component-workflow.md`. Target: `.agents/rules/component-workflow.md`. Source: Design / Canonical Documentation Contract. Trace: P1-AC-002, P1-AC-009. Skill: `code-documentation-doc-generate`.
- [x] T017 [US1] Verify focused accessibility/styling/component rules contain no conflicting normative statement and update only conflicts in `.agents/rules/`. Target: `.agents/rules/`. Source: Design / Verification. Trace: P1-AC-002. Skill: `codebase-audit`.

## Phase 5 - US3 Validation Readiness

- [x] T018 [US3] Add exact lint/test dev dependencies to `package.json` and refresh `package-lock.json` without stack upgrades. Target: `package.json, package-lock.json`. Source: Design / Validation Tooling Decision. Trace: P1-AC-006. Skill: `javascript-testing-patterns`.
- [x] T019 [US3] Add `lint` and deterministic `test` scripts to `package.json`. Target: `package.json`. Source: Design / Validation Tooling Decision. Trace: P1-AC-006. Skill: `javascript-testing-patterns`.
- [x] T020 [US3] Add minimal Expo-compatible ESLint configuration in `eslint.config.js`. Target: `eslint.config.js`. Source: Design / Validation Tooling Decision. Trace: P1-AC-006. Skill: `cc-skill-coding-standards`.
- [x] T021 [US3] Add Jest Expo configuration and shared setup in `jest.config.js` and `jest.setup.ts`. Target: `jest.config.js, jest.setup.ts`. Source: Design / Validation Tooling Decision. Trace: P1-AC-006. Skill: `javascript-testing-patterns`.
- [x] T022 [US3] Apply scoped `shell-quote@1.8.4` override in `package.json`; `ws` override reverted — ws@7.5.11 breaks Metro WebSocketServer API (verified incompatibility, recorded in validation.md). Target: `package.json`. Source: Design / Validation Tooling Decision. Trace: P1-AC-007. Skill: `dependency-auditor`.
- [x] T023 [US3] Record unchanged eligible moderate findings and follow-up ownership in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Validation Tooling Decision. Trace: P1-AC-007, P1-AC-008. Skill: `dependency-auditor`.

## Final Phase - Audit and Gate

- [x] T024 Validate inventory uniqueness, path existence, source translation completeness, and rule-link integrity. Target: `docs/design-system/mineral-warm.md`, `.agents/rules/`, and `implementation/mineral-warm-design-system/`. Source: Design / Verification. Trace: P1-AC-001, P1-AC-002, P1-AC-003, P1-AC-004, P1-AC-005. Skill: `speckit-analyze`. Evidence: All 20 sections from paleta-mineral-quente.md translated; 30 parity checks pass; all rule files updated; conflicts in iconography-guidelines.md and data-display-guidelines.md resolved.
- [x] T025 Prove no application route, persistence, or feature behavior changed in the Phase 1 diff. Target: repository diff. Source: Requirements / Out of Scope. Trace: P1-AC-010. Skill: `code-reviewer`. Evidence: Only documentation, configuration, and package.json were changed. No `app/`, `src/features/`, `src/components/`, `src/db/`, or route files were modified.
- [x] T026 Run `npx.cmd tsc --noEmit && npm.cmd run lint`, `npm.cmd test`, Expo checks, audit, and web export; record exit codes and remove `dist-check/`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Verification. Trace: P1-AC-006, P1-AC-007, P1-AC-008, P1-AC-010. Skill: `code-tester`. Evidence: tsc=0, expo-check=0, expo-doctor=18/18, audit-high=0, test=0. Lint and web-export have pre-existing baseline blockers documented in validation.md (6 lint errors in pre-Phase-1 training feature files; WatermelonDB decorator incompatibility with Metro web bundler).

## Dependencies and Exit Gate

- T001-T006 precede documentation and tooling changes.
- T007-T010 may run in parallel, then T011 blocks governance updates.
- T018-T023 run after governance contracts are stable.
- Phase 1 exits only after T024-T026 pass and all P1 acceptance criteria have evidence.

## Phase 1 Completion Status: ✅ DONE (2026-06-23T17:01:28Z)

All tasks completed. Baseline blockers are pre-existing and documented with ownership in `implementation/mineral-warm-design-system/validation.md`. No application behavior was changed. Phase 2 (Theme and Typography Foundations) is unblocked.

