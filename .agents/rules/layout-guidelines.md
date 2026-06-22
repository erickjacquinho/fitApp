# Layout Guidelines

FitApp targets phone screens only. Android is validated first; iOS support follows after Android validation.

## Screen Structure
- Use safe-area handling from the app or navigation layer.
- Default screen padding: `px-screen-x py-screen-y`.
- Comfortable vertical padding: `py-screen-y-comfortable`.
- Avoid edge-to-edge content except intentional navigation surfaces, charts, or full-width media.
- Main scrollable content should use `gap-content-gap`.
- Major sections should use `gap-section-gap` or `mb-section-gap`.
- Page-level groups may use `gap-page-gap` when vertical room allows.
- Use `pb-content-bottom` for tab content clearance, `pb-overlay-action` for fixed overlay actions, and `pb-form-bottom` or `pb-long-form-bottom` for keyboard-aware forms.

## Conceptual Grid
Use a 4-column conceptual grid for phone layouts.

- Screen margin: `px-screen-x`.
- Grid gutter: `gap-grid-gutter`.
- Cards and forms should span all 4 columns.
- Two-column layouts are allowed for compact comparable content, such as stats or quick actions.
- Three-column layouts are allowed only for very short numeric stats.
- Do not use dense multi-column grids on phone screens.

## Layout Patterns
- Screen: safe area + scrollable content when overflow is possible.
- Section: header/title followed by `mt-title-content`.
- Card group: `gap-2` for compact repeated items, `gap-3` for richer rows.
- Dashboard stats: 2 columns by default.
- Forms: single column only.
- Primary action: one main action per screen section.
- Destructive actions: visually separate from primary flows.

## Platform Rules
- Android and iOS share the same spacing and grid tokens.
- Do not create platform-specific spacing unless a native requirement demands it.
- Do not add non-phone layout rules unless product scope changes.
- Avoid fixed screen heights. Prefer flex, scroll, and content-driven layout.
