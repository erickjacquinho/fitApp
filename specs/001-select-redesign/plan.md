# Implementation Plan: Select Component Redesign

## Technical Context
The `Select` component in `src/components/ui/select.tsx` acts as a foundation for all selection interfaces across the application. It relies on the `@rn-primitives/select` library. The current implementation correctly delegates structure but needs aesthetic refinement to meet the "Mineral Warm (Blue-First)" design system criteria.

## Constitution Check
- **Speed over Slop**: The changes will remove redundant classes, streamlining the component's styling.
- **Data Density with Dignity**: The touch targets remain accessible (48px via `h-12`) without wasting screen space.
- **Uncompromising Autonomy**: The component uses pure Tailwind tokens, making it self-contained and system-aware.

## Phase 0: Research
- **Design Tokens**: Verified against `.agents/rules/03-ui-foundations.md`. `text-primary`, `bg-surface`, `border-control` are all canonical tokens.
- **Touch Target Verification**: Removing `min-h-[44px]` in favor of the implicit `h-12` (48px) and `py-3` (padding) ensures the touch targets comfortably exceed the WCAG 2.1 AA 44px minimum requirement.

## Phase 1: Technical Design

### Visual Design & Token Mapping (Trinca Design)
- **Palette**: The component strictly uses semantic tokens (`bg-surface`, `bg-selected`, `border-control`, `text-primary`, `text-secondary`).
- **Typography**: Inherits standard sizing (`text-base`, `text-sm`). No display fonts are applied.
- **Layout & Sizing**: The overall container uses `h-12` (48px) aligning with a 4px grid. Redundant `min-h-[44px]` classes will be stripped out.

### Proposed File Changes
#### `src/components/ui/select.tsx`
- **SelectTrigger**: Remove the redundant `min-h-[44px]` class. The `h-12` class correctly establishes a 48px height.
- **SelectItem**: Remove the redundant `min-h-[44px]` class. The standard flex box model with `py-3` correctly handles the height.
- **Review Web Fallbacks**: Maintain the `focus:ring` equivalent using safe native web styles that do not break RN.

## Implementation Steps
1. Audit `select.tsx` and identify all non-standard and redundant sizing utility classes.
2. Remove `min-h-[44px]` from `SelectTrigger` and `SelectItem`.
3. Validate typography and color tokens against the "Mineral Warm" palette.
4. Run standard linters and TypeScript compilation checks.
