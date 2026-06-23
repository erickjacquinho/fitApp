# Requirements: Complete Card and Popup Migration

## Goal

Complete the unfinished component migration by replacing standalone visual boxes with the canonical Card primitive and replacing native or custom popup infrastructure with React Native Reusables primitives or thin primitive-backed adapters.

## User Stories

### US1 - Consistent visual containers (P1)

As a FitApp user, I need visually equivalent content groups to share one Card contract so that spacing, borders, surfaces, and accessibility remain consistent.

### US2 - Consistent popup behavior (P1)

As a FitApp user, I need confirmations, selections, errors, and modal tasks to use consistent accessible overlay behavior so that dismissal, focus, and actions are predictable.

### US3 - Verifiable migration completion (P1)

As a FitApp maintainer, I need objective migration checks so that raw card-like containers and native popup APIs cannot remain unnoticed.

## Acceptance Criteria

- **AC-001:** WHEN a standalone container uses a surface, border, radius, and internal padding to group related content THEN the system SHALL render it through the canonical `Card` primitive.
- **AC-002:** WHEN a `View` provides layout only and does not establish a visual content boundary THEN the system SHALL remain a structural `View`.
- **AC-003:** WHEN content already appears inside a Card THEN the system SHALL avoid nested Cards and SHALL use structural layout or a documented inset composition.
- **AC-004:** WHEN a component needs confirmation or an explicit blocking decision THEN the system SHALL use the canonical `AlertDialog` primitive directly or through a thin adapter.
- **AC-005:** WHEN a component needs modal selection or a focused secondary task THEN the system SHALL use the canonical `Dialog` primitive directly or through a thin adapter.
- **AC-006:** WHEN a modal task requires bottom-aligned or sheet-like presentation THEN the system SHALL use a thin registry-primitive-backed adapter that preserves keyboard, dismissal, gesture, and Android back behavior without importing React Native `Modal` in feature code.
- **AC-007:** WHEN existing code invokes `Alert.alert` for validation, error, success, selection, or confirmation THEN the system SHALL route that interaction through the appropriate canonical feedback pattern.
- **AC-008:** WHEN success feedback does not require a decision THEN the system SHALL remain non-blocking and SHALL not use a blocking confirmation dialog.
- **AC-009:** WHEN a popup opens THEN the system SHALL expose an accessible title, description when required, deterministic initial focus, explicit dismissal behavior, and accessible action labels.
- **AC-010:** WHEN a destructive popup action is displayed THEN the system SHALL name the destructive operation, use the destructive semantic variant, and prevent accidental duplicate execution.
- **AC-011:** WHEN the migration is complete THEN the system SHALL contain zero feature imports of React Native `Modal`, zero application calls to `Alert.alert`, and zero undocumented standalone card-like `View` containers.
- **AC-012:** WHEN canonical primitives or adapters are modified THEN the system SHALL use FitApp semantic tokens without generic registry classes or raw visual values.
- **AC-013:** WHEN dependency metadata changes THEN the system SHALL retain exact versions and SHALL NOT update existing stack versions.
- **AC-014:** WHEN validation runs THEN the system SHALL complete TypeScript, dependency compatibility, Expo diagnostics, migration searches, accessibility checks, and web export or document a pre-existing external blocker.
- **AC-015:** WHEN the implementation affects native dependencies, Expo plugins, native configuration, Android files, or dev-client compatibility THEN the system SHALL rebuild and hash-verify the development APK.

## Edge and Failure Scenarios

- WHEN a registry primitive cannot preserve a specialized drag, keyboard, focus, or dismissal behavior THEN the system SHALL implement that behavior in a thin primitive-backed adapter and document the gap instead of retaining feature-level native popup infrastructure.
- WHEN a popup action is asynchronous THEN the system SHALL disable repeated submission until the operation settles.
- WHEN an overlay is dismissed through Android back, backdrop press, or an explicit close action THEN the system SHALL converge on the same controlled open-state transition.
- WHEN a selection dialog has no results THEN the system SHALL keep the dialog usable and show an actionable empty state.
- WHEN a form validation error can be corrected in place THEN the system SHALL prefer inline error feedback over a blocking dialog.
- WHEN a raw visual container is nested inside a Card THEN the system SHALL evaluate its semantic role before conversion and SHALL not create decorative nested Cards.
- WHEN current uncommitted user changes overlap target files THEN the system SHALL preserve them and limit edits to the migration scope.

## Assumptions

- The canonical `Card` and `AlertDialog` implementations already exist in `src/components/ui/`.
- The React Native Reusables registry provides the canonical Dialog behavior required for modal selection and focused tasks.
- A thin shared sheet adapter may control placement and keyboard composition while delegating overlay, portal, focus, and dismissal behavior to registry primitives.
- Business rules, persistence, navigation destinations, and data contracts remain unchanged.
- Brazilian Portuguese remains the language for visible UI copy.

## Out of Scope

- Redesigning screen information architecture.
- Replacing structural Views, list rows, swipe gestures, charts, calendars, or drag-and-drop behavior.
- Updating Expo, React Native, NativeWind, WatermelonDB, or other existing stack versions.
- Changing domain services, persistence rules, or navigation outcomes beyond the minimum state wiring required by popup presentation.
- Adding tablet, desktop, or responsive web layouts.

## Success Criteria

- **SC-001:** 100% of standalone card-like containers use the canonical Card primitive.
- **SC-002:** 100% of application popup flows use canonical registry primitives or thin primitive-backed adapters.
- **SC-003:** Feature and route code contains zero React Native `Modal` imports and zero `Alert.alert` calls.
- **SC-004:** 100% of migrated popup actions preserve their existing outcome and controlled open state.
- **SC-005:** 100% of affected components use semantic design tokens and required accessibility metadata.
- **SC-006:** All applicable validation gates complete without migration-caused errors.

