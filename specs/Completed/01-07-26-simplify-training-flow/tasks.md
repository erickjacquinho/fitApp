# Tasks: Simplified Training Flow & Connected Active Session Tab

Implementation tasks for the simplified training flow and connected tab.

- [x] 1. **[UI/Gesture]** Refactor the play/pause/resume action button in `ProgramSummaryScreen.tsx` to use the 1.5s hold-to-trigger gesture.
  - Path: `src/features/training/components/ProgramSummaryScreen.tsx`
  - Details: Implement `progress` shared value, `animatedProgressStyle`, `handleHoldStart`, and `handleHoldEnd` handlers. Wrap in `Pressable` with absolute animated overlay.
  - Skill: `ui-ux-pro-max`

- [x] 2. **[UI/Refactor]** Remove the top banner from `TrainingHomeScreen.tsx` and pass `hasActiveSession` to `ProgramCard`.
  - Path: `src/features/training/components/TrainingHomeScreen.tsx`
  - Details: Delete the top `Card` with the text "Sessão de treino em andamento" and the "Retomar" button. Propagate active session status to matching program cards.
  - Skill: `frontend-developer`

- [x] 3. **[UI/Component]** Implement the connected active session button tab variant in `ProgramCard.tsx`.
  - Path: `src/features/training/components/ProgramCard.tsx`
  - Details: Add `hasActiveSession` prop. Style card to sit flush on top (`rounded-b-none border-b-0`) and append the connected tab underneath it (`rounded-b-md bg-primary-soft border-x border-b`).
  - Skill: `ui-ux-pro-max`

- [x] 4. **[Validation]** Verify the build and run code analysis tools.
  - Commands:
    ```bash
    npx tsc --noEmit
    npm run lint
    npm test
    ```
  - Skill: `code-tester`
