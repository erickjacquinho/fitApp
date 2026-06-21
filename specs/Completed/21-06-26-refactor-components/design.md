# Design: Components Refactor & Tokens Extraction

## Overview
Extract foundational design tokens from the `src/components` directory to a new `src/tokens` directory. The primary target is `src/components/atoms/colors.ts`, which violates the Atomic Design pattern by mixing structural components (Atoms) with design constants (Tokens).

## Architecture Changes
- **New Directory:** `src/tokens`
- **File Move:** `src/components/atoms/colors.ts` -> `src/tokens/colors.ts`
- **Dependency Update:** All files importing `COLORS` from the old path must be updated.

## Quality & Principles
- **Maintainability:** Clearly separates design foundations from UI logic.
- **Scalability:** Prepares the structure for future tokens like `spacing.ts` or `typography-tokens.ts`.
- **Security:** No security impact.

## Data & Types
No changes to the actual `COLORS` object structure, only its location and imports.
