# Requirements: Governance and Baseline

## Goal

Establish an authoritative, auditable starting point for the Mineral Warm migration before any visual runtime change begins.

## Clarifications

### Session 2026-06-23

- The external Mineral Warm document is the normative visual source.
- Existing local modifications must be preserved and incorporated.
- Existing SDDs are historical inputs and must not be archived or treated as implementation proof.
- This phase may plan validation tooling and governance changes but must not change product behavior.

## User Stories

### US1 - Authoritative design guidance (P1)

As an implementer, I need one English canonical specification so that later phases cannot reinterpret colors, typography, states, or accessibility differently.

### US2 - Reproducible baseline (P1)

As a reviewer, I need a measured repository baseline and overlap inventory so that regressions and user-owned changes remain distinguishable.

### US3 - Enforceable validation readiness (P2)

As a maintainer, I need executable validation requirements so that later visual work cannot be completed using inspection alone.

## Acceptance Criteria

- **P1-AC-001:** WHEN Phase 1 documentation is implemented THEN the system SHALL contain one English canonical Mineral Warm specification that preserves every primitive, semantic, theme, contrast, typography, component-state, chart, opacity, and usage rule from the normative source.
- **P1-AC-002:** WHEN design-system rule files are reviewed THEN the system SHALL identify every statement that conflicts with the Mineral Warm specification and define its replacement without leaving olive as the generic primary accent.
- **P1-AC-003:** WHEN the repository baseline is captured THEN the system SHALL record current routes, shared components, feature UI, token files, raw visual values, legacy aliases, native popup usages, dependency status, validation results, and active SDD overlap.
- **P1-AC-004:** WHEN local modifications exist THEN the system SHALL record their file paths and preserve them as user-owned work throughout all later phases.
- **P1-AC-005:** WHEN prior SDD tasks claim completion THEN the system SHALL verify current code and runtime evidence instead of accepting checked boxes as proof.
- **P1-AC-006:** WHEN validation tooling is specified THEN the system SHALL provide exact dependency versions, `lint` and `test` commands, component-test strategy, contrast-test strategy, and a non-destructive migration path.
- **P1-AC-007:** WHEN the dependency audit reports findings THEN the system SHALL distinguish blocking high/critical findings from eligible unchanged moderate baseline findings and prohibit forced stack upgrades.
- **P1-AC-008:** WHEN a phase implementation begins THEN the system SHALL require an initialized validation record with impact classification, baseline evidence, test plan, runtime plan, and native-impact decision.
- **P1-AC-009:** WHEN governance is finalized THEN the system SHALL define semantic naming, registry-first decisions, exception documentation, deprecation policy, and no-new-legacy-use enforcement.
- **P1-AC-010:** WHEN Phase 1 completes THEN the system SHALL change no application flow, persisted data, visible feature behavior, or navigation contract.

## Failure and Edge Scenarios

- The external document is unavailable or changes after the baseline is recorded.
- A rule translation drops a contrast restriction or changes a semantic meaning.
- A previous SDD conflicts with live files or current project rules.
- Baseline commands fail because required scripts are missing.
- An audit remediation would require an unrequested Expo or React Native upgrade.
- Uncommitted work changes while the inventory is being produced.

## Non-Functional Requirements

- **Security:** Evidence must not contain secrets, private user records, or full sensitive logs.
- **Maintainability:** Every normative rule has one canonical owner and linked focused rules.
- **Scalability:** Governance must support future primitives and features without adding visual aliases for individual screens.
- **Reliability:** Baseline commands include exit codes and timestamps.
- **Performance:** This documentation/tooling phase introduces no runtime work.

## Out of Scope

- Applying the palette to runtime tokens or components.
- Copying font files into the repository.
- Changing Expo, React Native, database, navigation, or feature behavior.
- Archiving, deleting, or rewriting prior SDD packages.

## Success Criteria

- 100% of identified visual-rule conflicts have an explicit target rule.
- 100% of current routes and shared UI files are included in the migration inventory.
- 100% of Phase 1 acceptance criteria map to one or more tasks.
- Zero unresolved clarification markers remain.

