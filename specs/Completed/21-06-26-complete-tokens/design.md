# Design: Complete Design Tokens

## Overview
We will create 5 token files in `src/tokens/` following the same `xsmall` to `xxlarge` variation scale.

## Specifications
1. **Spacing (`src/tokens/spacing.ts`)**: 4, 8, 16, 24, 32, 48
2. **Line Height (`src/tokens/line-height.ts`)**: 16, 20, 24, 28, 32, 40
3. **Font Weight (`src/tokens/font-weight.ts`)**: 300, 400, 500, 600, 700, 800
4. **Z-Index (`src/tokens/z-index.ts`)**: 10, 20, 30, 40, 50, 100
5. **Opacity (`src/tokens/opacity.ts`)**: 0.25, 0.5, 0.75, 0.9, 0.95, 1

## Quality & Principles
- **Maintainability:** `as const` object exports.
