# Requirements: Diet UI Migration

## Goal

Migrate every Diet route and composition to Mineral Warm while preserving food, meal, macro, calendar, quantity, selection, reorder, and persistence behavior.

## Clarifications

### Session 2026-06-23

- Protein is blue, carbohydrate is amber, and fat is orange in every Diet representation.
- Warning remains mustard and must never reuse carbohydrate amber.
- Macronutrients always include text, icon, position, or pattern identification; color is supplementary.
- Diet services, WatermelonDB schema, calculations, and visible Portuguese copy are unchanged unless a visual migration exposes an existing tested defect.
- Current uncommitted Diet work is preserved and reconciled before editing overlapping files.

## User Stories

### US1 - Understand daily nutrition (P1)

As a user, I need daily balance, meals, food entries, and macro summaries to communicate nutrition consistently in either theme.

### US2 - Manage food and meals safely (P1)

As a user, I need forms, selection, edit, delete, and reorder interactions to retain their data and feedback behavior during the visual migration.

### US3 - Review historical nutrition (P2)

As a user, I need calendar summaries and historical cards to remain readable, navigable, and distinguishable without relying on color alone.

## Acceptance Criteria

- **P5-AC-001:** WHEN any Diet macro value renders THEN the system SHALL use the approved protein, carbohydrate, and fat semantic roles with a persistent non-color identifier.
- **P5-AC-002:** WHEN the Diet menu renders THEN the system SHALL preserve date selection, meal ordering, add actions, calendar navigation, food-bank navigation, and observable refresh behavior.
- **P5-AC-003:** WHEN meal or food cards render THEN the system SHALL use canonical Card and text contracts while preserving press, swipe, selection, delete, quantity, and navigation behavior.
- **P5-AC-004:** WHEN a Diet form renders THEN the system SHALL preserve controlled values, units, validation timing, inline errors, keyboard behavior, pending guards, cancel, save, and failure recovery.
- **P5-AC-005:** WHEN food selection or meal reorder UI opens THEN the system SHALL preserve search, quantities, selection, drag behavior, save/cancel, Android back, backdrop rules, and accessible state.
- **P5-AC-006:** WHEN calendar or daily summary data is loading, empty, populated, or failed THEN the system SHALL show an accessible state and retain existing recovery/navigation behavior.
- **P5-AC-007:** WHEN an error is recoverable in context THEN the system SHALL use tomato-soft feedback with readable text and an explicit recovery action instead of color-only indication.
- **P5-AC-008:** WHEN a Diet component uses a native color property THEN the system SHALL resolve it through the centralized theme contract.
- **P5-AC-009:** WHEN theme changes while a Diet flow is active THEN the system SHALL preserve unsaved form state, selections, quantities, open overlays, and route position.
- **P5-AC-010:** WHEN Phase 5 completes THEN the system SHALL leave no legacy visual token, obsolete primitive prop, raw visual literal, or undocumented component exception in Diet routes or components.

## Failure and Edge Scenarios

- Food or meal records are empty, delayed, deleted concurrently, or fail observation.
- Quantity input receives invalid, localized, zero, or extreme values.
- Search returns no results while selections already exist.
- Reorder is cancelled, interrupted, or receives a stale list.
- A destructive action is tapped repeatedly.
- Theme changes with keyboard or bottom sheet open.
- Amber text/background pairing fails contrast.

## Non-Functional Requirements

- **Security:** Destructive Diet actions require explicit confirmation and pending guards; error evidence contains no private food records.
- **Maintainability:** Macro semantics are centralized and feature compositions use canonical primitives.
- **Scalability:** Lists and observable updates retain current virtualization and do not introduce per-item theme subscriptions unnecessarily.
- **Reliability:** No migration task may change saved quantities, calculations, ordering, or database transactions.
- **Performance:** Scrolling, typing, drag, and theme changes remain responsive on the Android validation device.

## Out of Scope

- Changing food or meal business rules, calculations, schema, migrations, or services.
- Adding nutrition features or new chart types.
- Rewriting Portuguese copy beyond accessibility-required corrections.

## Success Criteria

- 100% of Diet routes and feature UI are migrated and validated in both themes.
- 100% of macro presentations retain correct semantic family plus non-color identification.
- Zero Diet persistence, calculation, navigation, gesture, or form regression is observed.
- Zero scoped legacy visual use remains.

