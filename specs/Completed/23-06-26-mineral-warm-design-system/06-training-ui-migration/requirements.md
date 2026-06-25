# Requirements: Training UI Migration

## Goal

Migrate every Training route and composition to Mineral Warm while preserving program creation, exercise selection, session execution, set entry, progress, history, and persistence behavior.

## Clarifications

### Session 2026-06-23

- Generic active/progress emphasis is primary blue; success green appears only for explicit completion.
- Program, session, exercise, and set domain behavior remains unchanged.
- Destructive and session-ending actions remain controlled and duplicate-safe.
- Existing local changes in `ProgramForm` are preserved and reconciled before migration.

## User Stories

### US1 - Manage training programs (P1)

As a user, I need to create, select, inspect, and delete programs with consistent forms, feedback, and destructive safeguards.

### US2 - Execute a workout reliably (P1)

As a user, I need exercise, set, progress, completion, and recovery states to remain clear and stable throughout an active session.

### US3 - Review training history (P2)

As a user, I need completed sessions and details to remain readable and navigable across both themes.

## Acceptance Criteria

- **P6-AC-001:** WHEN program lists or forms render THEN the system SHALL preserve program/block/exercise structure, validation, selection, create, delete, cancel, save, and failure behavior.
- **P6-AC-002:** WHEN exercise selection opens THEN the system SHALL preserve loading, search, empty results, selection, creation navigation, keyboard, dismissal, and accessible selected state.
- **P6-AC-003:** WHEN an active workout renders THEN the system SHALL preserve session identity, current exercise, set values, saved state, progress calculation, finish action, navigation guards, and observable updates.
- **P6-AC-004:** WHEN set inputs receive edits THEN the system SHALL preserve rapid controlled input, units, validation, save state, keyboard traversal, and prevention of duplicate saves.
- **P6-AC-005:** WHEN training progress renders THEN the system SHALL use primary blue for generic progress and moss only for explicit completed status with text or icon confirmation.
- **P6-AC-006:** WHEN a destructive or session-ending action is requested THEN the system SHALL require explicit confirmation, disable duplicate execution while pending, and recover visibly from failure.
- **P6-AC-007:** WHEN history or details are loading, empty, populated, or failed THEN the system SHALL provide an accessible state and preserve existing navigation and retry behavior.
- **P6-AC-008:** WHEN theme changes during a form, picker, or active session THEN the system SHALL preserve unsaved input, controlled overlay state, current exercise, saved sets, and route position.
- **P6-AC-009:** WHEN a Training component uses native color properties THEN the system SHALL resolve them through the centralized theme contract.
- **P6-AC-010:** WHEN Phase 6 completes THEN the system SHALL leave no legacy visual token, obsolete primitive prop, raw visual literal, native Modal, Alert call, or undocumented exception in Training scope.

## Failure and Edge Scenarios

- Program or session data fails to load, is empty, stale, or changes during observation.
- An active session exists when another program is selected.
- Rapid set entry or repeated save/finish taps occur.
- Exercise search returns no result or fails.
- Android back is pressed with unsaved or active-session state.
- Theme changes while the keyboard or execution overlay is open.
- Completion is communicated only through green color.

## Non-Functional Requirements

- **Security:** Destructive actions and session completion require explicit intent and duplicate guards; evidence excludes private workout contents.
- **Maintainability:** Presentation state remains in components/hooks and domain persistence remains in existing services.
- **Scalability:** Program and history lists retain virtualization and bounded render work.
- **Reliability:** No migration task may alter session transitions, set persistence, calculations, or recovery behavior.
- **Performance:** Set entry, list scrolling, progress updates, and overlay transitions remain responsive on Android.

## Out of Scope

- Changing training domain models, exercise dictionary, calculations, schema, or services.
- Adding workout features, analytics, or new navigation destinations.
- Redesigning product workflows beyond the approved visual system.

## Success Criteria

- 100% of Training routes and feature UI are migrated and validated in both themes.
- 100% of destructive and session-ending actions retain confirmation and pending guards.
- Zero Training persistence, calculation, navigation, input, or session regression is observed.
- Zero scoped legacy visual or native-popup use remains.

