# Requirements: Canonical Primitives

## Goal

Define and migrate the canonical FitApp primitive layer to complete Mineral Warm contracts without leaking feature behavior into shared UI.

## Clarifications

### Session 2026-06-23

- React Native Reusables remains the first behavioral source for primitives.
- Public primitive APIs may break internally because every repository consumer will be migrated before legacy contracts are removed.
- Component color must communicate semantic role; color alone cannot communicate status, selection, or macro identity.
- The style guide is the canonical interactive catalog, not an alternate component implementation.

## User Stories

### US1 - Predictable primitive contracts (P1)

As an implementer, I need typed primitive variants and states so that feature code composes UI without visual overrides.

### US2 - Accessible interaction (P1)

As a user, I need controls to remain recognizable, operable, and readable across theme, error, focus, disabled, selected, and loading states.

### US3 - Discoverable documentation (P2)

As a reviewer, I need one interactive catalog showing all supported variants and prohibited combinations.

## Acceptance Criteria

- **P3-AC-001:** WHEN a primitive is modified THEN the system SHALL record whether it uses a direct registry primitive, thin adapter, domain composition, or documented custom implementation.
- **P3-AC-002:** WHEN `Text` is migrated THEN the system SHALL expose semantic typography roles including description and semantic colors without consumer-level size, line-height, weight, or family overrides.
- **P3-AC-003:** WHEN `Button` is migrated THEN the system SHALL expose `appearance` values `filled`, `outline`, `ghost`, and `link` with `tone` values `primary`, `neutral`, `destructive`, `success`, `carbohydrate`, and `fat`.
- **P3-AC-004:** WHEN `Card` is migrated THEN the system SHALL expose `default`, `elevated`, `highlighted`, `selected`, `protein`, `carbohydrate`, `fat`, `success`, and `error` variants.
- **P3-AC-005:** WHEN `Badge` is migrated THEN the system SHALL expose neutral, info, warning, success, error, protein, carbohydrate, and fat tones with soft and strong emphasis.
- **P3-AC-006:** WHEN `Input` or Label renders THEN the system SHALL expose default, focus, error, and disabled behavior with readable messaging and no delayed or lost controlled updates.
- **P3-AC-007:** WHEN interactive primitives render THEN the system SHALL cover pressed, focus, disabled, selected, invalid, loading, and reduced-motion behavior where applicable.
- **P3-AC-008:** WHEN dialogs or alert dialogs render THEN the system SHALL preserve controlled state, portal ownership, focus lifecycle, Android back behavior, destructive safeguards, and accessible title/description contracts.
- **P3-AC-009:** WHEN the style guide is opened THEN the system SHALL display every primitive variant, state, theme role, typography role, macro role, feedback role, and contrast example required by the normative system.
- **P3-AC-010:** WHEN Phase 3 completes THEN the system SHALL contain no registry-generic color classes, raw visual literals, or undocumented custom primitive behavior in `src/components/ui`.

## Failure and Edge Scenarios

- The current registry differs from the locally customized primitive.
- CLI generation attempts to overwrite a customized file or add ranged dependencies.
- A disabled control becomes unreadable or remains interactive.
- Amber uses white text or warning reuses the carbohydrate family.
- Dialog dismissal triggers an action twice.
- A controlled input loses characters during rapid entry.
- Reduced-motion users still receive decorative animation.

## Non-Functional Requirements

- **Security:** Destructive actions require explicit intent and duplicate-execution protection.
- **Maintainability:** Feature-specific props are prohibited in canonical primitives.
- **Scalability:** Variant axes remain orthogonal and typed instead of multiplying one-off variants.
- **Reliability:** Controlled values and callbacks retain existing behavioral timing unless a documented defect is corrected with tests.
- **Performance:** Primitive state changes avoid unnecessary application-tree rerenders.

## Out of Scope

- Migrating feature compositions and route layouts.
- Changing business rules, validation meaning, or persistence.
- Adding primitives without a current system requirement.

## Success Criteria

- 100% of canonical primitives have documented API, variants, states, accessibility, and token usage.
- 100% of primitive state combinations required by the palette have automated coverage.
- Zero generic registry tokens or raw hexadecimal values remain in canonical primitives.
- Zero consumer migration begins before primitive contracts pass their gate.

