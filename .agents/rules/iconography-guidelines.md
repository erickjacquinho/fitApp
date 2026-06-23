# Iconography Guidelines

Lucide is the default icon library for FitApp.

## Sizes
- `icon-sm` / 16px: dense metadata, inline supporting icons.
- `icon-md` / 20px: default UI icon size.
- `icon-lg` / 24px: primary actions, navigation, and empty states.

## Stroke
- Use Lucide default stroke unless a component contract defines another value.
- Do not mix filled icons with Lucide outline icons in the same control group.

## Color
- Default icon color should follow text color.
- Muted icons use `text-muted`.
- Primary action icons use `blue-500` (Mineral Warm blue-first rule) when action emphasis is needed.
- Error/destructive icons use `tomato-700` (icon-weight per `mineral-warm.md` section 10).
- Warning icons use `mustard-700` (per `mineral-warm.md` section 10).
- Success icons use `moss-700` (per `mineral-warm.md` section 12).

## Usage
- Icon-only buttons are allowed for common actions: back, close, search, clear, edit, delete.
- Uncommon icon-only actions require an `accessibilityLabel` and preferably visible text elsewhere.
- Use icon + text when the action is not obvious.
- Avoid decorative icons in dense functional UI.
