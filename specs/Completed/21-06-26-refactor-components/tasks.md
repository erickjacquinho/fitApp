# Tasks: Components Refactor & Tokens Extraction

## Validation Command
`npx tsc --noEmit`

## Task List

- [x] **Task 1: Create Tokens Directory and Move File**
  - **Skill:** `frontend-developer`
  - **Target:** `src/tokens/colors.ts`
  - **Trace:** AC1
  - **Description:** Create the `src/tokens` directory and move `colors.ts` from `src/components/atoms/` into it.

- [x] **Task 2: Update Imports in Components and Features**
  - **Skill:** `frontend-developer`
  - **Target:** All `.ts` and `.tsx` files importing `colors`
  - **Trace:** AC2, AC3
  - **Description:** Run a search and replace to update `import { COLORS } from '.../atoms/colors'` to point to `.../tokens/colors` across the entire project.

- [x] **Task 3: Run Validation**
  - **Skill:** `frontend-developer`
  - **Target:** Entire Project
  - **Trace:** AC4
  - **Description:** Run `npx tsc --noEmit` to ensure no import errors were missed.
