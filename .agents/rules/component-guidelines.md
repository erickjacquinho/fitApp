# Component Guidelines

Shared components live in `src/components/` and follow Atomic Design.

Before creating a component, search existing atoms, molecules, and feature components.

## Typography
- Purpose: render all app text consistently.
- Variants: `display`, `title`, `subtitle`, `text`, `highlight`, `label`, `caption`.
- Colors: `default`, `muted`, `success`, `error`, `inverse`.
- Use for all UI text unless a third-party component prevents it.

## Button
- Purpose: trigger actions.
- Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`.
- Sizes: `sm`, `md`, `lg`.
- Required states: default, pressed, disabled, loading when async.
- Primary is for the main action only.
- Danger is for destructive actions only.

## Input
- Purpose: collect user text or numeric entry.
- Required states: default, focused, error, disabled.
- Must have a visible label through `LabeledInput` unless context is unmistakable.
- Error must include text, not border color only.

## Badge
- Purpose: compact status or category indicator.
- Variants should map to semantic color families: success, warning, info, neutral, error when added.
- Do not use badges as buttons.

## IconButton
- Purpose: compact known actions.
- Must include `accessibilityLabel`.
- Use `icon-md` by default.
- Avoid icon-only for uncommon actions.

## Card
- Purpose: group related content.
- Use `bg-component-card-bg`, `border-component-card-border`, `rounded-md`, and no shadow.
- Do not nest cards inside cards.
- Prefer section layouts over decorative cards.

## ListItem
- Purpose: repeated row content.
- Must support title, optional subtitle, and optional right accessory.
- Use subtle separators or low contrast borders.
- Keep row actions predictable.

## SegmentedControl
- Purpose: switch between related views of the same content.
- Selected state must not rely on color alone.
- Avoid more than 4 options.

## SearchBar
- Purpose: filter or find content.
- Must include search icon and clear action when text exists.
- Placeholder should describe searchable content.

## BottomSheet
- Purpose: focused secondary task without leaving the current screen.
- Use `shadow-floating` only if visual separation is required.
- Must have clear close/dismiss behavior.
- Avoid deep multi-step flows inside a sheet.

## Skeleton
- Purpose: preserve layout during initial loading.
- Must mirror final content structure.
- Do not use spinner-only loading for content-heavy screens.

## EmptyState
- Purpose: explain absence of data.
- Must include title, short description, and CTA when user action can fix the state.
- Avoid illustration-heavy empty states.
