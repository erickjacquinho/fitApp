# Design: New Design Tokens

## Overview
Based on `tokens-guide.md`, we will create three token files in `src/tokens/` to represent our design foundations.

## Specifications
Variations for all tokens: `xsmall`, `small`, `default`, `large`, `xlarge`, `xxlarge`.

1. **Border (`src/tokens/border.ts`)**
Values: 0.5, 1, 1.5, 2, 2.5, 3

2. **Rounded (`src/tokens/rounded.ts`)**
Values: 2, 4, 6, 8, 16, 24

3. **Typography (`src/tokens/typography.ts`)**
Values: 8, 10, 12, 18, 22, 24

## Quality & Principles
- **Maintainability:** Export as strongly typed objects using `as const`.
- **Scalability:** The keys are consistent across all tokens.
