# Tasks: Design System Rules

## Phase 1: Structure

- [x] T001 Create `.agents/rules/designsystem-foundations.md`.
  - Target: `.agents/rules/designsystem-foundations.md`
  - Source: design.md / Target Rule Files
  - Trace: AC-001, AC-003
  - Skill: ui-ux-designer

- [x] T002 Create `.agents/rules/layout-guidelines.md`.
  - Target: `.agents/rules/layout-guidelines.md`
  - Source: design.md / layout-guidelines
  - Trace: AC-004, AC-005
  - Skill: ui-ux-designer

- [x] T003 Create `.agents/rules/accessibility-guidelines.md`.
  - Target: `.agents/rules/accessibility-guidelines.md`
  - Source: design.md / accessibility-guidelines
  - Trace: AC-006
  - Skill: ui-ux-designer

- [x] T004 Create `.agents/rules/iconography-guidelines.md`.
  - Target: `.agents/rules/iconography-guidelines.md`
  - Source: design.md / iconography-guidelines
  - Trace: AC-007
  - Skill: ui-ux-designer

- [x] T005 Create `.agents/rules/content-guidelines.md`.
  - Target: `.agents/rules/content-guidelines.md`
  - Source: design.md / content-guidelines
  - Trace: AC-008
  - Skill: copy-editing

## Phase 2: Pattern Rules

- [x] T006 Create `.agents/rules/component-guidelines.md`.
  - Target: `.agents/rules/component-guidelines.md`
  - Source: design.md / component-guidelines
  - Trace: AC-009
  - Skill: frontend-design

- [x] T007 Create `.agents/rules/form-guidelines.md`.
  - Target: `.agents/rules/form-guidelines.md`
  - Source: design.md / form-guidelines
  - Trace: AC-010
  - Skill: frontend-design

- [x] T008 Create `.agents/rules/feedback-guidelines.md`.
  - Target: `.agents/rules/feedback-guidelines.md`
  - Source: design.md / feedback-guidelines
  - Trace: AC-011
  - Skill: frontend-design

- [x] T009 Create `.agents/rules/navigation-guidelines.md`.
  - Target: `.agents/rules/navigation-guidelines.md`
  - Source: design.md / navigation-guidelines
  - Trace: AC-012
  - Skill: frontend-design

- [x] T010 Create `.agents/rules/data-display-guidelines.md`.
  - Target: `.agents/rules/data-display-guidelines.md`
  - Source: design.md / data-display-guidelines
  - Trace: AC-013
  - Skill: ui-ux-designer

## Phase 3: Governance and Cleanup

- [x] T011 Create `.agents/rules/designsystem-governance.md`.
  - Target: `.agents/rules/designsystem-governance.md`
  - Source: design.md / designsystem-governance
  - Trace: AC-014
  - Skill: code-reviewer

- [x] T012 Convert `.agents/rules/designsystem-guide.md` into the index file.
  - Target: `.agents/rules/designsystem-guide.md`
  - Source: design.md / designsystem-guide
  - Trace: AC-002
  - Skill: ui-ux-designer

- [x] T013 Replace outdated `.agents/rules/color-tokens-rules.md`.
  - Target: `.agents/rules/color-tokens-rules.md`
  - Source: design.md / Existing File Decisions
  - Trace: AC-016
  - Skill: ui-ux-designer

- [x] T014 Update `.agents/rules/styling-conventions.md` examples.
  - Target: `.agents/rules/styling-conventions.md`
  - Source: design.md / Existing File Decisions
  - Trace: AC-003
  - Skill: frontend-design

- [x] T015 Update `.agents/rules/page-conventions.md` examples.
  - Target: `.agents/rules/page-conventions.md`
  - Source: design.md / Existing File Decisions
  - Trace: AC-004, AC-012
  - Skill: frontend-design

- [x] T016 Add note that `docs/components.md` is reference only.
  - Target: `docs/components.md`
  - Source: design.md / Existing File Decisions
  - Trace: AC-015
  - Skill: code-documentation-doc-generate

## Phase 4: Audit and Validation

- [x] T017 Search for stale platform references.
  - Target: `.agents/rules/`, `docs/`
  - Source: design.md / Validation Design
  - Trace: AC-005
  - Skill: codebase-audit

- [x] T018 Search for old visual language references.
  - Target: `.agents/rules/`, `docs/`, `src/`, `app/`
  - Source: design.md / Validation Design
  - Trace: AC-016
  - Skill: codebase-audit

- [x] T019 Run TypeScript validation.
  - Target: repository
  - Source: requirements.md / AC-017
  - Trace: AC-017
  - Skill: code-tester
  - Command: `npx tsc --noEmit`

- [x] T020 Run Expo web export validation and cleanup.
  - Target: repository
  - Source: requirements.md / AC-017
  - Trace: AC-017
  - Skill: code-tester
  - Command: `npx expo export --platform web --output-dir dist-check`
  - Cleanup: remove `dist-check/`
