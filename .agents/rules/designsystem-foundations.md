# Design System Foundations

These rules define FitApp visual foundations. Use them before creating or changing shared UI.

**Normative source:** `docs/design-system/mineral-warm.md`. All primitive values, semantic mappings, contrast evidence, and usage rules come from that document. This file provides the NativeWind/token interface; it does not override the canonical spec.

## Token Architecture

Tokens live in two layers:

1. `global.css`: primitive and semantic CSS variables.
2. `tailwind.config.js`: NativeWind utilities that expose those variables.

Components MUST use NativeWind token utilities. Do not use raw hex, raw font sizes, arbitrary spacing, or inline visual values.

## Color System

FitApp uses the Mineral Warm palette. The primary accent is **blue**, not olive.

> See `docs/design-system/mineral-warm.md` sections 1–3 for all primitive hex values, semantic token mappings, and light/dark theme values.

Current NativeWind semantic families (after Phase 2 migration):

- **Surface**: `surface-app` (`neutral-100`), `surface-raised` (`neutral-50`), `surface-elevated` (`neutral-0`).
- **Text**: `text-main` (`neutral-900`), `text-muted` (`neutral-500` on surface, `neutral-600` on background), `text-inverse` (`neutral-0`).
- **Border**: `border-subtle` (`neutral-200`), `border-strong` (`neutral-300`), `border-control` (`neutral-500`).
- **Primary / blue**: `primary-500`, `primary-600`, `primary-700`, `primary-50`, `primary-100`, `primary-200`, `primary-900`.
- **Protein**: maps to blue family.
- **Carbohydrate / amber**: `amber-500`, `amber-200`, `amber-50`, `amber-900`.
- **Fat / orange**: `orange-500`, `orange-200`, `orange-50`, `orange-900`.
- **Moss / success**: `moss-500`, `moss-200`, `moss-50`, `moss-900`.
- **Tomato / error**: `tomato-500`, `tomato-200`, `tomato-50`, `tomato-900`.
- **Mustard / warning**: `mustard-500`, `mustard-200`, `mustard-50`, `mustard-900`.
- **Neutral**: `neutral-0` through `neutral-950`.

**Do not use olive, accent-olive, or the legacy `primary`/`accent`/`secondary` groups for new components.**
Legacy groups remain in `tailwind.config.js` only for backwards compatibility with existing code during the migration window (Phases 2–7). After Phase 7 they are removed.

### Blue-First Rule

Every generic highlighted element uses blue as the first choice. This includes: primary CTA, selection, active item, focus, link, progress indicator, and emphasized data. See `mineral-warm.md` section 2 for the complete rule.

## Typography

Use the canonical `Text` primitive from `src/components/ui/text.tsx`.

- Type scale: `text-display`, `text-title`, `text-subtitle`, `text-text`, `text-highlight`, `text-label`, `text-caption`.
- Font family: `font-sans` (resolves to Helvetica Now after Phase 2; fallback Helvetica → Arial → sans-serif).
- Weights: `font-regular` (400), `font-semibold` (600), `font-bold` (700). Weight `font-black` (900) is for display only.
- Line heights: `leading-display`, `leading-title`, `leading-subtitle`, `leading-body`, `leading-label`, `leading-caption`.
- Tracking: `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-label`.

> See `mineral-warm.md` section 4 for the full typography hierarchy table with colors, sizes, and line heights.

Do not override font size, line height, or letter spacing inside feature components unless a new token is first added.

## Spacing

The spacing system is based on a 4px grid.

Primary scale:
- `1` / `micro`: 4px.
- `2` / `compact`: 8px.
- `3` / `title-content`: 12px.
- `4` / `screen`: 16px.
- `6` / `related`: 24px.

Extended scale:
- `8` / `category`: 32px.
- `10` / `page`: 40px.
- `12` / `empty-state`: 48px.

Avoid arbitrary spacing. Prefer `gap-*` over manual margins when composing groups.

## Borders

> See `mineral-warm.md` section 6 for the full border and divider table.

- Card and grouping border: `border-thin border-subtle` (`neutral-200`).
- Highlighted card: `border-thin border-strong` (`neutral-300`).
- Input and control default: `border-thin border-control` (`neutral-500`).
- Control hover: `border-control-hover` (`neutral-600`).
- Selection: `border-2 border-primary-500` (`blue-500`, 2px).
- Focus: `border-2 border-primary-500` + `3px blue-100` halo.
- Error: `border-tomato-500`.
- Disabled: `border-neutral-300`.

Avoid dark borders and arbitrary border widths in normal UI.

## Radius

Use small radii only.

- `rounded-sm`: buttons, inputs, badges, compact controls.
- `rounded-md`: cards, list containers, panels.
- `rounded-lg`: sheets and larger grouped surfaces.
- `rounded-xl`: rare large feature containers.
- `rounded-2xl`: maximum allowed radius.

Cards use `12–16px` radius (`rounded-lg` or `rounded-xl`). Use the same radius in equivalent cards.
Avoid `rounded-full` unless the element is inherently circular, such as an avatar or progress dot.

## Shadows

Shadows are disabled by default.

Use `shadow-floating` only for floating UI: bottom sheets, menus, popovers, or temporary overlays.

## Size Tokens

Use fixed size tokens for repeated UI dimensions.

- Icons: `w-icon-sm h-icon-sm`, `w-icon-md h-icon-md`, `w-icon-lg h-icon-lg`.
- Touch target: `min-h-touch-target`.
- Controls: `h-control-sm`, `h-control-md`, `h-control-lg`.
- Inputs: `h-input-md`.
- Avatars: `w-avatar-sm h-avatar-sm`, `w-avatar-md h-avatar-md`, `w-avatar-lg h-avatar-lg`.
- Tab bar: `h-tabbar`.
- Selection sheet: `h-selection-sheet`; bottom sheet: `max-h-sheet`.

## Motion

Motion must be subtle and functional.

- Durations: `duration-fast`, `duration-base`, `duration-slow`.
- Easing: `ease-standard`, `ease-emphasized`.

Prefer pressed states over decorative animation.

## Component Tokens

Component tokens are allowed when a value belongs to a shared component contract.

Current component token groups (values updated in Phase 2):
- Button primary (blue).
- Button danger (tomato).
- Input.
- Card.

Prefer semantic tokens for feature UI and component tokens for shared atoms/molecules.
