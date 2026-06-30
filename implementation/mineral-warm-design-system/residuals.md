# Residual Scope & Cleanup Contract

## 1. Residual Routes and Components
The following routes have not been completely migrated or still use generic original shadcn/ui nested cards directly instead of semantic components:
- `app/(tabs)/profile.tsx`: Uses generic `<Card>` imports and raw unassigned spacing values.
- `app/(tabs)/statistics.tsx`: Uses generic `<Card>` imports.

## 2. Token Residuals
Zero consumers of legacy tokens exist in `app/` and `src/`. All occurrences of:
- `bg-surface-app`, `bg-surface-raised`
- `border-soft`
- `text-text-main`, `text-tomato-main`, `text-accent-main`
- `bg-accent-main`
- `COLORS` object usages
Have been successfully eliminated from the source code.

**Proof Commands:**
`npx grep-search "bg-surface-app|bg-surface-raised|border-soft|text-text-main|COLORS" src/ app/` returned zero matches.

## 3. Global CSS and Tailwind
The legacy aliases are still present in `global.css` and `tailwind.config.js`. They have zero remaining consumers. They must be removed in Phase 3.
