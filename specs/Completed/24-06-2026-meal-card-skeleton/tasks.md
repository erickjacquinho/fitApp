# Tasks: Meal Card Skeleton (Revised)

- [x] 1. Update `useMenu.ts` to accept `selectedDate`. Implement `isReady` state that resets on date change and becomes `true` after deep fetch completes.
  - **Target:** `src/features/diet/hooks/useMenu.ts`
  - **Source:** Design Architecture Updates
  - **Trace:** Requirements AC1, AC3
  - **Skill:** frontend-developer

- [x] 2. Update `MenuScreen.tsx` to conditionally render EVERYTHING (except DateSelector) as skeletons when `!isReady` or `meals.length === 0`.
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Source:** Design Architecture Updates
  - **Trace:** Requirements AC1, AC2
  - **Skill:** frontend-developer

- [x] 3. Validate changes with TypeScript compiler (`tsc --noEmit`).
  - **Target:** Terminal
  - **Source:** Quality Audit
  - **Trace:** Project Guidelines
  - **Skill:** codebase-audit

