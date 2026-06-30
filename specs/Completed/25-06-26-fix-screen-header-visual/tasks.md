# Tasks: Screen Header and StatusBar Bug Fix

## Status
- **Date**: 2026-06-25
- **Slug**: `25-06-26-fix-screen-header-visual`

## Implementation Tasks

### Phase 1: Foundational / Primitives (3-5 mins)
- [x] **T001: Update `ScreenProps` Documentation**
  - **Target:** `src/components/ui/screen.tsx`
  - **Source:** `design.md` -> Component Design Changes
  - **Trace:** REQ-004
  - **Skill:** `frontend-developer`
  - **Details:** Update the JSDoc comment for `safeAreaEdges` to document the new dynamic default behavior.

- [x] **T002: Implement Dynamic Safe Area Edges and Flush Content in `Screen`**
  - **Target:** `src/components/ui/screen.tsx`
  - **Source:** `design.md` -> Component Design Changes
  - **Trace:** REQ-001, REQ-002, REQ-004, REQ-005, REQ-006
  - **Skill:** `frontend-developer`
  - **Details:** Remove the default value of `safeAreaEdges` from arguments. Calculate `resolvedEdges` inside the body: `safeAreaEdges ?? (header ? [] : ['top'])`. Ensure no vertical paddings/margins exist in the `Screen` wrapper content container to keep content flush with the header and bottom navbar.

### Phase 2: Integration & Verification (5-10 mins)
- [x] **T003: Verify TypeScript Compilation**
  - **Target:** Root Shell
  - **Source:** `design.md` -> Component Design Changes
  - **Trace:** REQ-001
  - **Skill:** `react-native-architecture`
  - **Details:** Execute `npx.cmd tsc --noEmit` to verify that no TypeScript compilation errors were introduced.

- [x] **T004: Verify Linter Guidelines**
  - **Target:** Root Shell
  - **Source:** `design.md` -> Component Design Changes
  - **Trace:** REQ-001
  - **Skill:** `react-native-architecture`
  - **Details:** Execute `npm.cmd run lint` to ensure code changes adhere to project conventions.

- [x] **T005: Execute Unit Tests**
  - **Target:** Root Shell
  - **Source:** `design.md` -> Component Design Changes
  - **Trace:** REQ-001, REQ-002
  - **Skill:** `javascript-testing-patterns`
  - **Details:** Run `npm.cmd test` to ensure existing tests pass. Add/update tests if needed.

- [x] **T006: Generate Validation Evidence**
  - **Target:** `specs/25-06-26-fix-screen-header-visual/validation.md`
  - **Source:** `.agents/rules/full-validation-gate.md`
  - **Trace:** Full Validation Gate Authority
  - **Skill:** `react-native-architecture`
  - **Details:** Run full gate diagnostics, gather output evidence, evaluate the runtime impact on Android (no native rebuild required), and save results to the validation log.
