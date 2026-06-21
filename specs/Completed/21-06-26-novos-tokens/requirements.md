# Requirements: New Design Tokens

## Goal
Implement new design tokens for border width, border radius (rounded), and font size (typography) based on the provided `tokens-guide.md`.

## Acceptance Criteria
- **AC1:** WHEN the implementation is complete, THEN `src/tokens/border.ts` SHALL exist with 6 variations.
- **AC2:** WHEN the implementation is complete, THEN `src/tokens/rounded.ts` SHALL exist with 6 variations.
- **AC3:** WHEN the implementation is complete, THEN `src/tokens/typography.ts` SHALL exist with 6 variations.
- **AC4:** WHEN evaluating the types, THEN strict TypeScript (`as const` or interfaces) SHALL be enforced.

## Edge/Error Scenarios
- **Failure 1:** Typos in variation names might cause mismatch with Tailwind configuration later.

## Out-of-Scope
- Updating `tailwind.config.js` to consume these tokens (will be done in a separate task or SDD if requested).
