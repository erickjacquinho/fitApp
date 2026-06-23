# Tasks: Final Migration and Validation

## Phase 1 - Entry Audit and Residual Inventory

- [ ] T001 [US3] Verify exit evidence and closed implementation tasks for Phases 1-6 in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P7-AC-010. Skill: `speckit-analyze`.
- [ ] T002 [US1] Generate the repository-wide residual route/component/token report in `implementation/mineral-warm-design-system/residuals.md`. Target: `implementation/mineral-warm-design-system/residuals.md`. Source: Design / Residual Scope. Trace: P7-AC-001, P7-AC-002. Skill: `codebase-audit`.
- [ ] T003 [US1] Map every legacy alias and obsolete primitive API to exact remaining consumers in `implementation/mineral-warm-design-system/residuals.md`. Target: `implementation/mineral-warm-design-system/residuals.md`. Source: Design / Cleanup Contract. Trace: P7-AC-002, P7-AC-003. Skill: `codebase-audit`.
- [ ] T004 [US3] Confirm current native inputs and APK build identity in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Native and APK Decision. Trace: P7-AC-009. Skill: `react-native-architecture`.

## Phase 2 - Residual Route Migration

- [ ] T005 [US1] Add light/dark/render tests for `app/(tabs)/profile.tsx`. Target: `app/(tabs)/profile.tsx`. Source: Design / Residual Scope. Trace: P7-AC-001. Skill: `javascript-testing-patterns`.
- [ ] T006 [US1] Migrate `app/(tabs)/profile.tsx` to canonical Mineral Warm contracts. Target: `app/(tabs)/profile.tsx`. Source: Design / Residual Scope. Trace: P7-AC-001. Skill: `frontend-developer`.
- [ ] T007 [P] [US1] Add light/dark/render tests for `app/(tabs)/statistics.tsx`. Target: `app/(tabs)/statistics.tsx`. Source: Design / Residual Scope. Trace: P7-AC-001. Skill: `javascript-testing-patterns`.
- [ ] T008 [US1] Migrate `app/(tabs)/statistics.tsx` to canonical Mineral Warm contracts. Target: `app/(tabs)/statistics.tsx`. Source: Design / Residual Scope. Trace: P7-AC-001. Skill: `frontend-developer`.
- [ ] T009 [US1] Resolve every unassigned route/component from `implementation/mineral-warm-design-system/residuals.md`. Target: exact residual paths. Source: Design / Residual Scope. Trace: P7-AC-001, P7-AC-002. Skill: `frontend-developer`.
- [ ] T010 [US1] Reconcile final catalog examples and remove deprecated examples in `app/style-guide.tsx`. Target: `app/style-guide.tsx`. Source: Design / Residual Scope. Trace: P7-AC-001, P7-AC-002. Skill: `code-documentation-doc-generate`.

## Phase 3 - Compatibility Removal

- [ ] T011 [US1] Prove zero consumers for each deprecated CSS/Tailwind alias and record commands in `implementation/mineral-warm-design-system/residuals.md`. Target: `implementation/mineral-warm-design-system/residuals.md`. Source: Design / Cleanup Contract. Trace: P7-AC-002, P7-AC-003. Skill: `codebase-audit`.
- [ ] T012 [US1] Remove zero-consumer legacy aliases from `global.css`. Target: `global.css`. Source: Design / Cleanup Contract. Trace: P7-AC-003. Skill: `code-refactoring-refactor-clean`.
- [ ] T013 [US1] Remove zero-consumer legacy utilities from `tailwind.config.js`. Target: `tailwind.config.js`. Source: Design / Cleanup Contract. Trace: P7-AC-003. Skill: `code-refactoring-refactor-clean`.
- [ ] T014 [US1] Remove obsolete static/legacy exports from `src/tokens/`. Target: `src/tokens/`. Source: Design / Cleanup Contract. Trace: P7-AC-003. Skill: `code-refactoring-refactor-clean`.
- [ ] T015 [US1] Remove obsolete primitive props, imports, adapters, and duplicate components from `src/` and `app/`. Target: `src/, app/`. Source: Design / Cleanup Contract. Trace: P7-AC-002, P7-AC-003. Skill: `code-refactoring-refactor-clean`.
- [ ] T016 [US1] Update design-system rules and component documentation to contain only final contracts in `.agents/rules/` and `docs/`. Target: `.agents/rules/, docs/`. Source: Design / Cleanup Contract. Trace: P7-AC-002, P7-AC-003. Skill: `code-documentation-doc-generate`.

## Phase 4 - Automated Accessibility Evidence

- [ ] T017 [US2] Define complete contrast evidence cases in `src/tokens/__tests__/contrast-cases.ts`. Target: `src/tokens/__tests__/contrast-cases.ts`. Source: Design / Contrast and Visual Evidence. Trace: P7-AC-004. Skill: `ui-visual-validator`.
- [ ] T018 [US2] Produce foreground/background/composition/ratio assertions in `src/tokens/__tests__/contrast.test.ts`. Target: `src/tokens/__tests__/contrast.test.ts`. Source: Design / Contrast and Visual Evidence. Trace: P7-AC-004. Skill: `javascript-testing-patterns`.
- [ ] T019 [US2] Add chart-series transform fixtures for protanopia, deuteranopia, and grayscale in `src/tokens/__tests__/chart-accessibility.test.ts`. Target: `src/tokens/__tests__/chart-accessibility.test.ts`. Source: Design / Contrast and Visual Evidence. Trace: P7-AC-005. Skill: `ui-visual-validator`.
- [ ] T020 [US2] Record comparable transformed chart screenshots and label/marker review in `implementation/mineral-warm-design-system/visual-validation.md`. Target: `implementation/mineral-warm-design-system/visual-validation.md`. Source: Design / Contrast and Visual Evidence. Trace: P7-AC-005. Skill: `ui-visual-validator`.
- [ ] T021 [US1] Run repository-wide static scans for every prohibited legacy/raw/generic/native-popup pattern and record zero results in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Cleanup Contract. Trace: P7-AC-002, P7-AC-003. Skill: `codebase-audit`.

## Phase 5 - Android Journey Matrix

- [ ] T022 [US3] Record device/emulator, Android version, system-theme controls, client identity, and fixture state in `implementation/mineral-warm-design-system/visual-validation.md`. Target: `implementation/mineral-warm-design-system/visual-validation.md`. Source: Design / Android Journey Matrix. Trace: P7-AC-007, P7-AC-008. Skill: `ui-visual-validator`.
- [ ] T023 [US1] Validate and capture Dashboard, Profile, Statistics, shell, and navigation journeys in both themes. Target: `implementation/mineral-warm-design-system/visual-validation.md`. Source: Design / Android Journey Matrix. Trace: P7-AC-001, P7-AC-007, P7-AC-008. Skill: `ui-visual-validator`.
- [ ] T024 [US3] Validate and capture all Diet routes and applicable state/keyboard/overlay/gesture/recovery cases in both themes. Target: `implementation/mineral-warm-design-system/visual-validation.md`. Source: Design / Android Journey Matrix. Trace: P7-AC-007, P7-AC-008. Skill: `ui-visual-validator`.
- [ ] T025 [US3] Validate and capture all Training routes and applicable state/keyboard/overlay/destructive/recovery cases in both themes. Target: `implementation/mineral-warm-design-system/visual-validation.md`. Source: Design / Android Journey Matrix. Trace: P7-AC-007, P7-AC-008. Skill: `ui-visual-validator`.
- [ ] T026 [US3] Review runtime logs for red screens, uncaught rejections, render/key warnings, console errors, and state loss; record sanitized findings in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Android Journey Matrix. Trace: P7-AC-008. Skill: `error-detective`.

## Phase 6 - Full Gate and APK

- [ ] T027 Run repository diff integrity commands and resolve every unintended or temporary file. Target: repository and validation record. Source: Design / Automated Full Gate. Trace: P7-AC-006, P7-AC-010. Skill: `code-reviewer`.
- [ ] T028 Run `npx.cmd tsc --noEmit && npm.cmd run lint` and `npm.cmd test`; record exit codes. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Automated Full Gate. Trace: P7-AC-006. Skill: `code-tester`.
- [ ] T029 Run Expo install check, Expo Doctor, moderate audit, and web export; record exit codes and remove `dist-check/`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Automated Full Gate. Trace: P7-AC-006. Skill: `code-tester`.
- [ ] T030 Resolve or formally classify unchanged eligible moderate audit findings; block every high/critical finding. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Blocking and Rollback. Trace: P7-AC-006, P7-AC-010. Skill: `dependency-auditor`.
- [ ] T031 Rebuild the Android development client when required by the native-impact decision. Target: `android/app/build/outputs/apk/debug/app-debug.apk`. Source: Design / Native and APK Decision. Trace: P7-AC-009. Skill: `react-native-architecture`.
- [ ] T032 Copy the generated APK to `fitApp-dev.apk`, calculate both SHA-256 hashes, and prove equality. Target: APK paths and validation record. Source: Design / Native and APK Decision. Trace: P7-AC-009. Skill: `code-tester`.
- [ ] T033 Install/launch the verified client and rerun the complete affected Android smoke after the final code change. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Native and APK Decision. Trace: P7-AC-007, P7-AC-008, P7-AC-009. Skill: `code-tester`.

## Final Phase - Cross-SDD Audit and Handoff

- [ ] T034 Map every acceptance criterion from all seven requirements files to completed task and evidence IDs in `implementation/mineral-warm-design-system/traceability.md`. Target: `implementation/mineral-warm-design-system/traceability.md`. Source: Design / Final Handoff. Trace: P7-AC-010. Skill: `speckit-analyze`.
- [ ] T035 Run a read-only cross-artifact duplication, ambiguity, consistency, and coverage audit across the parent and seven child SDDs. Target: `specs/23-06-26-mineral-warm-design-system/`. Source: Requirements / Success Criteria. Trace: P7-AC-010. Skill: `speckit-analyze`.
- [ ] T036 Resolve all critical/high audit findings in the owning SDD artifact, then rerun T034-T035. Target: owning SDD files. Source: Design / Blocking and Rollback. Trace: P7-AC-010. Skill: `sdd`.
- [ ] T037 Produce the final completion statement with scope, gates, tests, journeys, native decision, audit exceptions, and evidence paths in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Final Handoff. Trace: P7-AC-006 through P7-AC-010. Skill: `code-documentation-doc-generate`.

## Dependencies and Exit Gate

- All prior SDDs must pass before T001.
- Residual migration precedes compatibility removal; zero-consumer proof precedes every deletion.
- Automated evidence precedes Android matrix; the final full gate follows all fixes.
- Package completion requires T034-T037, 100% coverage, zero critical/high findings, and no open task in any child SDD.





