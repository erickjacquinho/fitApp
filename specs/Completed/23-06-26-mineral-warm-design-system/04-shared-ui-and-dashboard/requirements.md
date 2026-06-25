# Requirements: Shared UI and Dashboard

## Goal

Migrate shared compositions, application shell, navigation, and Dashboard to canonical Mineral Warm primitives while preserving their domain behavior.

## Clarifications

### Session 2026-06-23

- Existing atoms, molecules, and organisms remain custom only when no registry primitive preserves their behavior.
- Every decorated container is classified before migration; nested Cards are prohibited.
- Dashboard metric meaning and navigation destinations remain unchanged.
- Existing local modifications in shared components remain user-owned and must be reconciled, not discarded.

## User Stories

### US1 - Consistent shared composition (P1)

As a user, I need repeated controls, headers, cards, empty states, summaries, and overlays to behave and look consistently throughout the app.

### US2 - Stable application shell (P1)

As a user, I need navigation, safe areas, active tabs, system bars, and screen surfaces to remain readable in both themes.

### US3 - Meaningful Dashboard (P2)

As a user, I need Dashboard nutrition and training summaries to use correct semantic colors without changing their data or actions.

## Acceptance Criteria

- **P4-AC-001:** WHEN a shared component is migrated THEN the system SHALL compose canonical primitives and document any retained custom behavior or third-party boundary.
- **P4-AC-002:** WHEN a decorated container is reviewed THEN the system SHALL classify it as canonical Card, structural View, interactive row, inset region, or domain wrapper and SHALL not introduce nested Cards.
- **P4-AC-003:** WHEN shared input and search compositions render THEN the system SHALL preserve controlled value flow, clear action, validation, keyboard, focus, and accessibility behavior.
- **P4-AC-004:** WHEN shared popup adapters render THEN the system SHALL preserve controlled visibility, dismissal, keyboard avoidance, focus ownership, pending guards, and destructive semantics.
- **P4-AC-005:** WHEN the application shell renders THEN the system SHALL apply theme-aware backgrounds, status-bar content, safe areas, headers, and tab navigation without a light-theme flash.
- **P4-AC-006:** WHEN a tab is active THEN the system SHALL use primary blue plus a non-color selected-state signal and retain at least a 44px touch target.
- **P4-AC-007:** WHEN Dashboard macro data renders THEN the system SHALL map protein to blue, carbohydrate to amber, fat to orange, and calories/general emphasis to primary or neutral semantics as documented.
- **P4-AC-008:** WHEN Dashboard loading, empty, populated, error, and refresh states occur THEN the system SHALL remain accessible and preserve existing retry and navigation behavior.
- **P4-AC-009:** WHEN shared UI contains native-property colors THEN the system SHALL resolve them through the Phase 2 theme contract.
- **P4-AC-010:** WHEN Phase 4 completes THEN the system SHALL leave no consumer of obsolete primitive props within shared UI, shell, or Dashboard.

## Failure and Edge Scenarios

- A shared component has undocumented behavior used by multiple features.
- A structural View is incorrectly converted to Card.
- A popup closes while a pending action resolves.
- Theme changes while a tab or modal is active.
- Dashboard data is absent, stale, malformed, or refreshing.
- Long Brazilian Portuguese copy truncates actions or accessible labels.

## Non-Functional Requirements

- **Security:** Shared destructive flows cannot execute from backdrop dismissal or repeated taps.
- **Maintainability:** Domain behavior stays in the feature; shared adapters remain thin.
- **Scalability:** Shared composition contracts support Diet and Training without feature flags or feature-specific props.
- **Reliability:** Navigation and controlled state survive background/foreground and route return.
- **Performance:** Dashboard and tab-theme updates avoid list-wide or route-wide unnecessary rerenders.

## Out of Scope

- Diet and Training feature-screen migration.
- Changing metric calculations, WatermelonDB queries, or navigation destinations.
- Introducing new product flows.

## Success Criteria

- 100% of shared compositions have a recorded primitive/composition classification.
- 100% of shell and Dashboard states pass light/dark Android validation.
- Zero nested Cards or obsolete primitive APIs remain in scope.
- Existing Dashboard outputs and destinations remain behaviorally identical.

