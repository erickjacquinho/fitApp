# Requirements: Universal Validation Guard Rail

## Goal

Establish one mandatory, risk-based validation rule for every future FitApp implementation so that frontend, state, service, persistence, security, configuration, and native regressions are detected before completion.

## Acceptance Criteria

- **AC-001:** WHEN any future implementation begins THEN the system SHALL classify every affected layer and define its required validation before code changes.
- **AC-002:** WHEN an implementation task changes behavior THEN the system SHALL require automated tests and task-level evidence before the task is complete.
- **AC-003:** WHEN all implementation tasks are complete THEN the system SHALL execute one blocking Full Gate across every affected layer.
- **AC-004:** WHEN a new failure or regression is detected THEN the system SHALL block completion until it is corrected and the complete gate is rerun.
- **AC-005:** WHEN a pre-existing non-critical failure remains unchanged THEN the system SHALL permit an evidence-backed exception with a follow-up action.
- **AC-006:** WHEN a pre-existing issue risks security, authorization, data integrity, startup, or an affected user journey THEN the system SHALL block completion regardless of baseline status.
- **AC-007:** WHEN required lint, test, or runtime validation tooling is absent THEN the system SHALL block behavior-changing work until a compatible mechanism exists.
- **AC-008:** WHEN frontend behavior changes THEN the system SHALL require automated state coverage and a real Android runtime journey.
- **AC-009:** WHEN services or persistence change THEN the system SHALL require boundary, failure, transaction, migration, offline, and restart validation as applicable.
- **AC-010:** WHEN native compatibility can change THEN the system SHALL require an APK rebuild, SHA-256 verification, and runtime validation.
- **AC-011:** WHEN validation completes THEN the system SHALL persist reproducible commands, exit results, test scenarios, runtime evidence, and accepted baseline exceptions.
- **AC-012:** WHEN any executable file changes after validation THEN the system SHALL invalidate the result and rerun the affected checks plus the complete Full Gate.

## Failure Scenarios

- WHEN a task-specific checklist omits a universal gate THEN the system SHALL apply the universal gate without weakening it.
- WHEN validation can pass only through suppression, forced dependency changes, skipped tests, or weaker compiler settings THEN the system SHALL treat the implementation as failed.
- WHEN unrelated user changes exist THEN the system SHALL preserve them and exclude them from implementation claims.
- WHEN documentation changes executable commands or contracts THEN the system SHALL validate those commands or contracts as implementation changes.

## Out of Scope

- Guaranteeing defect-free software or claiming a literal defect-prevention percentage.
- Choosing feature-specific business acceptance criteria.
- Automatically fixing pre-existing non-critical repository debt.
- Replacing focused security, design-system, migration, or component rules.

## Success Criteria

- Every future implementation references and follows the same universal validation rule.
- No implementation can be completed with an untested changed behavior or new failing gate.
- Frontend and backend-relevant changes receive layer-specific validation plus full integration evidence.
- Every completion claim is reproducible from a durable validation record.

