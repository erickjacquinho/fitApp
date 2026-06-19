# Color Token Rules

FitApp uses a warm neutral palette with controlled functional accents.

This file exists for color-specific guidance. Full foundation rules live in `designsystem-foundations.md`.

## Palette Intent

- Warm, calm, natural, and practical.
- Off-white and beige surfaces carry most of the interface.
- Olive is the primary action/progress accent.
- Tomato is reserved for error, danger, destructive actions, and hard limits.

## Semantic Families

- **Surface**: app backgrounds, raised surfaces, muted surfaces, subtle surfaces.
- **Text**: primary text, muted text, inverse text.
- **Border**: low-contrast structure and selected/focused structure.
- **Accent**: primary action, active state, progress.
- **Tomato**: error, danger, destructive action, hard limit.
- **Success**: completed state and positive confirmation.
- **Info**: neutral guidance and contextual information.
- **Warning**: attention and near-limit state.

## Usage Rules

- Use semantic tokens, not raw hex values.
- Use accent for primary actions only.
- Use tomato only when the state is negative, destructive, or blocked.
- Use warning for attention without failure.
- Use success for completion, not for primary action.
- Use info for neutral guidance.
- Keep borders low contrast.
- Do not introduce new color families without adding tokens first.

## Compatibility

Legacy groups `primary`, `secondary`, `white`, `black`, and `gray` remain available for existing code. New components should prefer semantic groups: `surface`, `text`, `border`, `accent`, `tomato`, `success`, `info`, and `warning`.
