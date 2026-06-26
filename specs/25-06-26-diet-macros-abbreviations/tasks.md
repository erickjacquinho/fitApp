# Tasks: Diet Daily Summary Abbreviations (Revision 1)

## Task 1: Revert DailyBalance component labels and colors
- **Target:** `src/features/diet/components/DailyBalance.tsx`
- **Source:** `design.md` (Revision 1)
- **Trace:** Requirements 2.1, 2.2, 2.3
- **Skill:** `frontend-developer`
- **Description:** Edit `DailyBalance.tsx` to restore original classes and set new labels:
  - Change protein label to "Prot" and class to `text-text-secondary font-medium`.
  - Change carbs label to "Carb" and class to `text-text-secondary font-medium`.
  - Change fat label to "Gord" and class to `text-text-secondary font-medium`.

## Task 2: Update unit tests
- **Target:** `src/features/diet/__tests__/diet-components.test.ts`
- **Source:** N/A
- **Trace:** General validation gate
- **Skill:** `frontend-developer`
- **Description:** Update test assertions in `diet-components.test.ts` to expect `text-text-secondary font-medium` along with "Prot", "Carb", and "Gord".

## Task 3: Validate implementation
- **Target:** Validation
- **Source:** N/A
- **Trace:** General validation gate
- **Skill:** `frontend-developer`
- **Description:** Run TypeScript checks and Jest tests.

**Final Validation Command:**
`npx.cmd tsc --noEmit && npm.cmd test src/features/diet`
