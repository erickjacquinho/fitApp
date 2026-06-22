# Requirements: Shadcn Component and Design System Alignment

## Goal

Standardize FitApp UI on React Native Reusables components wherever a behaviorally equivalent registry component exists, align every affected component with the FitApp design system, close missing governance rules, and document the mandatory component creation workflow.

## User Stories

### US1 - Consistent shared components (P1)

As a FitApp user, I need common controls and feedback patterns to behave consistently so that every screen is predictable and accessible.

### US2 - Token-compliant feature UI (P1)

As a FitApp maintainer, I need feature components to use the shared design system so that visual changes remain safe and centralized.

### US3 - Enforced component workflow (P2)

As a FitApp contributor, I need an explicit component creation workflow so that new custom components are not introduced when an approved reusable exists.

## Acceptance Criteria

- **AC-001:** WHEN a custom shared component has a behaviorally equivalent React Native Reusables component THEN the system SHALL replace its implementation with the registry component while preserving required application behavior.
- **AC-002:** WHEN no behaviorally equivalent registry component exists THEN the system SHALL retain the FitApp component and document why it remains custom.
- **AC-003:** WHEN a registry component is added or modified THEN the system SHALL replace generic visual utilities with FitApp semantic tokens.
- **AC-004:** WHEN an affected component renders text, colors, spacing, radius, borders, sizes, or icons THEN the system SHALL use the established FitApp design tokens and shared primitives.
- **AC-005:** WHEN a component exposes interaction THEN the system SHALL provide the required role, accessible label, disabled behavior, selected state, and minimum touch target defined by focused design-system rules.
- **AC-006:** WHEN a feature screen needs a common control THEN the system SHALL consume the canonical shared component instead of recreating its visuals or behavior locally.
- **AC-007:** WHEN the existing rules do not define Shadcn adoption, equivalence, customization, or validation THEN the system SHALL add explicit, testable rules for those decisions.
- **AC-008:** WHEN a contributor creates or changes a component THEN the system SHALL provide in `AGENTS.md` the required discovery, installation, token review, integration, and validation flow.
- **AC-009:** WHEN the migration is complete THEN the system SHALL have no obsolete imports from replaced custom components.
- **AC-010:** WHEN the migration is complete THEN the system SHALL document a non-equivalence reason or domain-specific responsibility for every retained custom shared component.
- **AC-011:** WHEN validation runs THEN the system SHALL complete TypeScript compilation, dependency compatibility checks, Expo diagnostics, the moderate dependency audit, and a web export or expose a documented external blocker.
- **AC-012:** WHEN temporary validation artifacts are created THEN the system SHALL remove them before completion.
- **AC-013:** WHEN dependency metadata changes THEN the system SHALL retain an exact version for every dependency declaration.

## Edge and Failure Scenarios

- WHEN a registry component changes the existing public contract THEN the system SHALL use a thin adapter only when it prevents broad feature coupling and does not duplicate registry behavior.
- WHEN a registry component requires an incompatible dependency or stack upgrade THEN the system SHALL preserve the current component and record the incompatibility instead of changing stack versions.
- WHEN a third-party native component cannot consume NativeWind classes THEN the system SHALL use centralized semantic token values and document the exception.
- WHEN a dynamic visual value is required for progress or safe-area layout THEN the system SHALL keep only the runtime-calculated style and source all static values from tokens.
- WHEN current uncommitted user changes overlap the migration THEN the system SHALL preserve those changes and avoid unrelated rewrites.

## Assumptions

- Behavioral equivalence is required; visual similarity alone is insufficient.
- Thin FitApp adapters are allowed for stable application contracts, accessibility defaults, or domain composition.
- React Native Reusables registry source remains the primary source for general-purpose UI primitives.
- Android phone behavior is the primary runtime target, with iOS compatibility preserved.

## Out of Scope

- Changing domain behavior, persistence, navigation flows, or business rules.
- Updating existing framework or stack versions.
- Adding components that have no current application use.
- Replacing specialized swipe, drag-and-drop, calendar, chart, or bottom-sheet behavior without a behaviorally equivalent registry primitive.
- Tablet, desktop, or responsive web redesign.

## Success Criteria

- **SC-001:** 100% of identified behaviorally equivalent custom shared components use registry implementations or approved thin adapters.
- **SC-002:** 100% of affected static visual values use existing semantic design tokens.
- **SC-003:** 100% of replaced components have zero remaining obsolete imports.
- **SC-004:** Every retained custom shared component has a recorded responsibility that is not provided by the registry.
- **SC-005:** The component workflow can be followed from `AGENTS.md` without consulting undocumented conventions.
- **SC-006:** All applicable validation gates complete with no migration-caused errors.
