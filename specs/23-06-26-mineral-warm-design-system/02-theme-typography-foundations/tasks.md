# Tasks: Theme and Typography Foundations

## Phase 1 - Setup and Contracts

- [ ] T001 Verify Phase 1 exit evidence and refresh overlapping-work status in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P2-AC-010. Skill: `codebase-audit`.
- [ ] T002 Hash and record the four approved source fonts from `C:/Users/Jacques/Desktop/font` in `implementation/mineral-warm-design-system/validation.md`. Target: `C:/Users/Jacques/Desktop/font, implementation/mineral-warm-design-system/validation.md`. Source: Design / Font Contract. Trace: P2-AC-006. Skill: `env-secrets-manager`.
- [ ] T003 Define primitive color and theme TypeScript contracts in `src/tokens/theme.ts`. Target: `src/tokens/theme.ts`. Source: Design / Color Contract. Trace: P2-AC-001, P2-AC-002, P2-AC-005. Skill: `javascript-pro`.
- [ ] T004 Define parity and contrast test fixtures in `src/tokens/__tests__/theme.test.ts`. Target: `src/tokens/__tests__/theme.test.ts`. Source: Design / Verification. Trace: P2-AC-001, P2-AC-002. Skill: `javascript-testing-patterns`.

## Phase 2 - Primitive and Semantic Tokens

- [ ] T005 [P] [US1] Add neutral primitive values to `global.css`. Target: `global.css`. Source: Design / Color Contract. Trace: P2-AC-001. Skill: `frontend-developer`.
- [ ] T006 [P] [US1] Add blue, amber, orange, moss, and tomato primitive values to `global.css`. Target: `global.css`. Source: Design / Color Contract. Trace: P2-AC-001. Skill: `frontend-developer`.
- [ ] T007 [P] [US1] Add mustard, teal, and plum primitive values to `global.css`. Target: `global.css`. Source: Design / Color Contract. Trace: P2-AC-001. Skill: `frontend-developer`.
- [ ] T008 [US1] Add complete light semantic aliases to `global.css`. Target: `global.css`. Source: Design / Color Contract. Trace: P2-AC-002, P2-AC-003. Skill: `frontend-developer`.
- [ ] T009 [US1] Add complete dark semantic aliases and explicit dark surfaces to `global.css`. Target: `global.css`. Source: Design / Color Contract. Trace: P2-AC-002, P2-AC-004. Skill: `frontend-developer`.
- [ ] T010 [US1] Replace static native color exports with strict primitives and theme maps in `src/tokens/colors.ts` and `src/tokens/theme.ts`. Target: `src/tokens/colors.ts, src/tokens/theme.ts`. Source: Design / Target Structure. Trace: P2-AC-001, P2-AC-002, P2-AC-005. Skill: `javascript-pro`.
- [ ] T011 [US1] Expose semantic color and typography utilities without duplicate values in `tailwind.config.js`. Target: `tailwind.config.js`. Source: Design / Target Structure. Trace: P2-AC-002, P2-AC-007, P2-AC-008. Skill: `frontend-developer`.
- [ ] T012 [US3] Add temporary deprecated legacy mappings and no-new-use comments in `global.css` and `tailwind.config.js`. Target: `global.css, tailwind.config.js`. Source: Design / Compatibility and Rollback. Trace: P2-AC-010. Skill: `code-refactoring-refactor-clean`.

## Phase 3 - Theme Access and Fonts

- [ ] T013 [US1] Implement stable system-scheme resolution in `src/hooks/use-theme-colors.ts`. Target: `src/hooks/use-theme-colors.ts`. Source: Design / Theme Resolution. Trace: P2-AC-004, P2-AC-005. Skill: `react-native-architecture`.
- [ ] T014 [US1] Add hook tests for light, dark, system changes, and stable map identity in `src/hooks/__tests__/use-theme-colors.test.tsx`. Target: `src/hooks/__tests__/use-theme-colors.test.tsx`. Source: Design / Verification. Trace: P2-AC-004, P2-AC-005. Skill: `javascript-testing-patterns`.
- [ ] T015 [P] [US2] Copy and normalize the four approved OTF files into `assets/fonts/`. Target: `assets/fonts/`. Source: Design / Font Contract. Trace: P2-AC-006. Skill: `frontend-developer`.
- [ ] T016 [US2] Add exact `expo-font@14.0.12` dependency and lockfile changes in `package.json` and `package-lock.json`. Target: `package.json, package-lock.json`. Source: Design / Font Contract. Trace: P2-AC-006, P2-AC-009. Skill: `react-native-architecture`.
- [ ] T017 [US1] Configure automatic interface style and embedded font families in `app.json`. Target: `app.json`. Source: Design / Target Structure. Trace: P2-AC-004, P2-AC-006, P2-AC-009. Skill: `react-native-architecture`.
- [ ] T018 [US1] Implement bounded font readiness, themed root surface, and failure handling in `app/_layout.tsx`. Target: `app/_layout.tsx`. Source: Design / Target Structure. Trace: P2-AC-004, P2-AC-006, P2-AC-010. Skill: `react-native-architecture`.
- [ ] T019 [US2] Replace generic font-weight token exports with safe semantic family references in `src/tokens/font-weight.ts` and `src/tokens/typography.ts`. Target: `src/tokens/font-weight.ts, src/tokens/typography.ts`. Source: Design / Typography Mapping. Trace: P2-AC-007, P2-AC-008. Skill: `frontend-developer`.

## Phase 4 - Foundation Verification

- [ ] T020 [US1] Complete CSS/native parity and semantic precedence assertions in `src/tokens/__tests__/theme.test.ts`. Target: `src/tokens/__tests__/theme.test.ts`. Source: Design / Verification. Trace: P2-AC-001, P2-AC-002, P2-AC-003. Skill: `code-tester`.
- [ ] T021 [US1] Add all normative contrast assertions to `src/tokens/__tests__/contrast.test.ts`. Target: `src/tokens/__tests__/contrast.test.ts`. Source: Requirements / Success Criteria. Trace: P2-AC-002. Skill: `ui-visual-validator`.
- [ ] T022 [US2] Add typography-role and unsafe-weight regression tests in `src/tokens/__tests__/typography.test.ts`. Target: `src/tokens/__tests__/typography.test.ts`. Source: Design / Typography Mapping. Trace: P2-AC-007, P2-AC-008. Skill: `javascript-testing-patterns`.
- [ ] T023 [US3] Scan migrated foundation files for raw duplicate values and new legacy usage. Target: `global.css`, `tailwind.config.js`, `src/tokens/`, `src/hooks/`. Source: Design / Compatibility and Rollback. Trace: P2-AC-010. Skill: `codebase-audit`.
- [ ] T024 [US1] Run `npx.cmd tsc --noEmit && npm.cmd run lint`, tests, Expo checks, audit, and web export; record and clean outputs. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Verification. Trace: P2-AC-001 through P2-AC-010. Skill: `code-tester`.
- [ ] T025 [US1] Rebuild the Android development client, copy `app-debug.apk` to `fitApp-dev.apk`, compare SHA-256, install, launch, and test font/theme switching. Target: Android build outputs and `implementation/mineral-warm-design-system/validation.md`. Source: Design / Verification. Trace: P2-AC-004, P2-AC-006, P2-AC-008, P2-AC-009. Skill: `react-native-architecture`.

## Dependencies and Exit Gate

- Phase 1 SDD must pass before T001.
- T003 blocks token maps; T005-T007 may run in parallel; T008-T012 are ordered.
- T015-T019 require stable semantic and typography names.
- Phase 2 exits only after T020-T025 pass with a verified native client.




