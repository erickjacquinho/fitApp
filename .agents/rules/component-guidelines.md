# Component Guidelines

Shared components live in `src/components/` and follow Atomic Design.

Before creating a component, search existing atoms, molecules, and feature components.

## Canonical Primitive Ownership

- General-purpose primitives MUST live in `src/components/ui/` and originate from the React Native Reusables registry when an equivalent exists.
- Feature code MUST import canonical primitives from `@/components/ui/*`; it MUST NOT import `@rn-primitives/*` directly.
- A shared atom or molecule may wrap a canonical primitive only to provide a stable FitApp contract, accessibility defaults, or reusable composition.
- A wrapper MUST NOT duplicate primitive state, focus, overlay, selection, or press behavior.
- Domain cards, summaries, screen shells, swipe gestures, calendars, charts, and bottom sheets remain custom only when the registry has no behaviorally equivalent primitive.
- The complete decision and validation flow lives in `component-workflow.md`.

## Typography
- Canonical source: `src/components/ui/text.tsx`.
- Purpose: render all app text consistently.
- Variants: `display`, `title`, `subtitle`, `text`, `highlight`, `label`, `caption`.
- Colors: `default`, `muted`, `success`, `error`, `inverse`.
- Use for all UI text unless a third-party component prevents it.

## Button
- Canonical source: `src/components/ui/button.tsx`.
- Purpose: trigger actions.
- Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`.
- Sizes: `sm`, `md`, `lg`.
- Required states: default, pressed, disabled, loading when async.
- Primary is for the main action only.
- Danger is for destructive actions only.

## Input
- Canonical source: `src/components/ui/input.tsx`.
- Purpose: collect user text or numeric entry.
- Required states: default, focused, error, disabled.
- Must have a visible label through `LabeledInput` unless context is unmistakable.
- Error must include text, not border color only.

## Badge
- Canonical source: `src/components/ui/badge.tsx`.
- Purpose: compact status or category indicator.
- Variants should map to semantic color families: success, warning, info, neutral, error when added.
- Do not use badges as buttons.

## Icon
- Canonical source: `src/components/ui/icon.tsx`.
- Use Lucide icons through the `as` prop and semantic color classes.
- Use `icon-sm`, `icon-md`, or `icon-lg`; raw colors are forbidden.

## Label
- Canonical source: `src/components/ui/label.tsx`.
- Compose with `Input` and connect the accessible label identifier.
- Error labels use tomato tokens and remain readable text.

## Switch
- Canonical source: `src/components/ui/switch.tsx`.
- Use for binary state only and keep a visible label.
- Preserve a 44px effective touch target and expose checked and disabled states.

## Separator
- Canonical source: `src/components/ui/separator.tsx`.
- Use for standalone horizontal or vertical separation.
- Use hairline soft borders; do not recreate standalone dividers with ad hoc views.

## IconButton
- Canonical source: `Button` with `size="icon"` and the canonical `Icon`.
- Purpose: compact known actions.
- Must include `accessibilityLabel`.
- Use `icon-md` by default.
- Avoid icon-only for uncommon actions.

## Card
- Canonical source: `src/components/ui/card.tsx`.
- Purpose: group related content.
- Use `bg-component-card-bg`, `border-component-card-border`, `rounded-md`, and no shadow.
- Do not nest cards inside cards.
- Prefer section layouts over decorative cards.

## ListItem
- Purpose: repeated row content.
- Must support title, optional subtitle, and optional right accessory.
- Use subtle separators or low contrast borders.
- Keep row actions predictable.

## Tabs
- Canonical source: `src/components/ui/tabs.tsx`.
- Purpose: switch between related views of the same content.
- Selected state must not rely on color alone.
- Avoid more than 4 options.

## Accordion
- Canonical source: `src/components/ui/accordion.tsx`.
- Use for collapsible supporting content, not primary navigation.
- The trigger must retain a touch target, expanded state, and visible chevron change.

## AlertDialog
- Canonical source: `src/components/ui/alert-dialog.tsx`.
- Use for confirmations that require an explicit decision.
- Destructive actions use the destructive button variant and name the affected action.
- Render through the root `PortalHost`; do not recreate confirmation overlays with `Modal`.

## Progress
- Canonical source: `src/components/ui/progress.tsx`.
- Use for linear progress and always pair it with a readable numeric value or label.
- Use semantic indicator colors and clamp values from 0 to 100.

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
