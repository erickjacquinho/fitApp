# Technical Design: Diet Daily Summary Abbreviations (Revision 1)

## 1. Architecture Overview
Revert the color styles of the daily summary labels in `src/features/diet/components/DailyBalance.tsx` to `text-text-secondary`. The text labels will be set to "Prot", "Carb", and "Gord".

## 2. Component Structure and Changes

In `src/features/diet/components/DailyBalance.tsx`:
- **Protein Label**:
  - From: `<Text variant="caption" className="text-protein font-medium">P</Text>`
  - To: `<Text variant="caption" className="text-text-secondary font-medium">Prot</Text>`
- **Carbohydrate Label**:
  - From: `<Text variant="caption" className="text-carbohydrate font-medium">C</Text>`
  - To: `<Text variant="caption" className="text-text-secondary font-medium">Carb</Text>`
- **Fat Label**:
  - From: `<Text variant="caption" className="text-fat font-medium">G</Text>`
  - To: `<Text variant="caption" className="text-text-secondary font-medium">Gord</Text>`

## 3. UI/UX Hierarchy
- `MenuScreen` -> `DailyBalance`

## 4. Design Tokens and Styling
- Uses `text-text-secondary` for all three labels.
- Uses `font-medium` for layout weight consistency.

## 5. Security, Maintainability & Scalability
- **Maintainability:** Restores common secondary color styles to maintain a unified visual hierarchy on the dashboard.
