# Accessibility Guidelines

FitApp accessibility should be practical and WCAG AA-aligned where feasible.

## Touch Targets
- Interactive elements must use at least `min-h-touch-target` (`44px`) when possible.
- Icon-only controls must keep the same touch target even if the icon is smaller.
- Dense lists may reduce visual padding only when the touch area remains sufficient.

## Contrast
- Primary text must have strong contrast against surfaces.
- Muted text is allowed only for secondary information.
- Do not rely on color alone for error, success, selected, or disabled states.
- Avoid low contrast text on `surface-muted` and `surface-subtle`.

## Roles and Labels
- Every interactive element needs an appropriate `accessibilityRole`.
- Icon-only actions need a clear `accessibilityLabel`.
- Inputs need labels through visible text or accessible props.
- Destructive actions must communicate their impact.

## State Communication
- Disabled state must be visually clear and non-interactive.
- Selected state must include more than color when possible: border, weight, icon, or layout change.
- Loading state must prevent duplicate submission for async actions.
- Error state must include readable text near the affected field or section.

## Screen Reader Behavior
- Error messages should be specific and actionable.
- Empty states should explain what is missing and what the user can do next.
- Success feedback should be short and not interrupt repeated data entry.
