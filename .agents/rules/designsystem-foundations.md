# Design System Foundations

These rules define FitApp visual foundations. Use them before creating or changing shared UI.

## Token Architecture
Tokens live in two layers:

1. `global.css`: primitive and semantic CSS variables.
2. `tailwind.config.js`: NativeWind utilities that expose those variables.

Components MUST use NativeWind token utilities. Do not use raw hex, raw font sizes, arbitrary spacing, or inline visual values.

## Color System
FitApp uses a warm neutral palette with controlled functional accents.

- Surfaces: `surface-app`, `surface-raised`, `surface-muted`, `surface-subtle`, `surface-strong`.
- Text: `text-main`, `text-muted`, `text-inverse`.
- Borders: `border-soft`, `border-strong`.
- Primary action: `accent-main`, `accent-light`, `accent-soft`, `accent-dark`.
- Error and danger: `tomato-main`, `tomato-light`, `tomato-soft`, `tomato-dark`.
- Success: `success-main`, `success-soft`, `success-dark`.
- Info: `info-main`, `info-soft`, `info-dark`.
- Warning: `warning-main`, `warning-soft`, `warning-dark`.

Use accent for primary actions and progress. Use tomato only for error, danger, destructive actions, and hard limits.

## Typography
Use the canonical `Text` primitive from `src/components/ui/text.tsx`.

- Type scale: `text-display`, `text-title`, `text-subtitle`, `text-text`, `text-highlight`, `text-label`, `text-caption`.
- Font family: `font-sans`.
- Weights: `font-regular`, `font-semibold`, `font-bold`, `font-black`.
- Line heights: `leading-display`, `leading-title`, `leading-subtitle`, `leading-body`, `leading-label`, `leading-caption`.
- Tracking: `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-label`.

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
Borders must be thin and low contrast.

- Default: `border-thin border-soft`.
- Quiet separators: `border-hairline border-soft`.
- Selected or focused structure: `border-thin border-strong`.

Avoid dark borders and `border-2` in normal UI.
Avoid pairing a very bright surface with a much darker border in standard app UI. High-luminance border contrast should be treated as an exception, not the default.

## Radius
Use small radii only.

- `rounded-sm`: buttons, inputs, badges, compact controls.
- `rounded-md`: cards, list containers, panels.
- `rounded-lg`: sheets and larger grouped surfaces.
- `rounded-xl`: rare large feature containers.
- `rounded-2xl`: maximum allowed radius.

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

Current component token groups:
- Button primary.
- Button danger.
- Input.
- Card.

Prefer semantic tokens for feature UI and component tokens for shared atoms/molecules.
In standard app flows, `surface-raised` and `component-card-bg` should stay close to the main warm neutral surfaces instead of using stark white by default.
