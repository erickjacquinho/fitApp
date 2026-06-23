# Tasks: Universal Validation Guard Rail

- [x] T001 Define universal scope, baseline policy, and blocking semantics. Target: `.agents/rules/full-validation-gate.md`. Source: Design / Decision and Baseline Decision. Trace: AC-001, AC-003, AC-004, AC-005, AC-006. Skill: `code-documentation-doc-generate`.
- [x] T002 Define task-level validation and mandatory automated gates. Target: `.agents/rules/full-validation-gate.md`. Source: Design / Validation Flow. Trace: AC-002, AC-003, AC-007, AC-012. Skill: `code-tester`.
- [x] T003 Define frontend, accessibility, navigation, and Android runtime gates. Target: `.agents/rules/full-validation-gate.md`. Source: Design / Architecture Coverage. Trace: AC-008, AC-011. Skill: `react-native-architecture`.
- [x] T004 Define service, state, persistence, migration, security, and failure gates. Target: `.agents/rules/full-validation-gate.md`. Source: Design / Architecture Coverage. Trace: AC-006, AC-009, AC-011. Skill: `backend-architect`.
- [x] T005 Define native-impact, APK replacement, and SHA-256 verification gates. Target: `.agents/rules/full-validation-gate.md`. Source: Design / Validation Flow. Trace: AC-010. Skill: `react-native-architecture`.
- [x] T006 Define durable evidence and completion statement requirements. Target: `.agents/rules/full-validation-gate.md`. Source: Design / Validation Flow. Trace: AC-011, AC-012. Skill: `code-documentation-doc-generate`.
- [x] T007 Register the universal mandatory rule. Target: `AGENTS.md`. Source: Design / Files. Trace: AC-001, AC-003. Skill: `code-documentation-doc-generate`.
- [x] T008 Audit requirements, design, tasks, and rule consistency. Target: `specs/23-06-26-universal-validation-guardrail/` and `.agents/rules/full-validation-gate.md`. Source: Design / Validation. Trace: AC-001 through AC-012. Skill: `speckit-analyze`.
- [x] T009 Run the final documentation gate `git diff --check -- AGENTS.md .agents/rules/full-validation-gate.md specs/23-06-26-universal-validation-guardrail`. Target: repository documentation. Source: Design / Validation. Trace: AC-011. Skill: `code-tester`.

## Full Gate

This governance-only change does not modify application behavior. Its final gate validates artifact consistency, mandatory registration, EARS syntax, task traceability, paths, commands, and diff integrity. Application runtime gates are intentionally not triggered.
