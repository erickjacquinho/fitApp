# Requirements: Complete Design Tokens

## Goal
Implement remaining recommended design tokens for a complete design system, excluding shadows, using the standard variation scale (`xsmall`, `small`, `default`, `large`, `xlarge`, `xxlarge`).

## Acceptance Criteria
- **AC1:** `src/tokens/spacing.ts` SHALL be created with 6 variations.
- **AC2:** `src/tokens/line-height.ts` SHALL be created with 6 variations.
- **AC3:** `src/tokens/font-weight.ts` SHALL be created with 6 variations.
- **AC4:** `src/tokens/z-index.ts` SHALL be created with 6 variations.
- **AC5:** `src/tokens/opacity.ts` SHALL be created with 6 variations.
- **AC6:** All tokens SHALL use strict TypeScript (`as const`).

## Out-of-Scope
- Shadows tokens.
- Updating existing `tailwind.config.js` to use these automatically (unless specified later).
