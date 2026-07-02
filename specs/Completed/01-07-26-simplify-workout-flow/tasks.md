# Phase 3: Task Planning

Checklist of actionable steps to implement the simplified workout plan flow.

## 1. Database & Services
- [x] 1.1 Implement update method in `WorkoutService`
  - Implement `updateProgram(programId, programData, blocksData)` in `src/features/training/services/workout-service.ts` using `database.write` and `database.batch`.
  - Handle adding new blocks/exercises, updating existing ones, and removing deleted ones.
  - _Skill: backend-architect_
  - _Requirements: AC7_

## 2. Form Refactoring (Hooks & Components)
- [x] 2.1 Refactor hook `useProgramForm` to support editing
  - Accept optional `programId` parameter in `src/features/training/hooks/useProgramForm.ts`.
  - Fetch existing program, block, and exercise records on mount using `useEffect` if `programId` is provided.
  - Initialise state with fetched values.
  - Update `handleSave` to trigger `WorkoutService.updateProgram` when `programId` is present.
  - _Skill: react-state-management_
  - _Requirements: AC6_

- [x] 2.2 Update component `ProgramForm` to display edit text
  - Update `src/features/training/components/ProgramForm.tsx` to accept `programId` prop.
  - Conditionally render save button labels: "Salvar alterações" / "Salvando..." in edit mode.
  - _Skill: frontend-developer_
  - _Requirements: AC6_

## 3. Routing & Screens
- [x] 3.1 Create Edit Program Route
  - Create `app/training/edit-program/[id].tsx` rendering `<Screen>` wrapper and `<ProgramForm programId={id} />`.
  - _Skill: frontend-developer_
  - _Requirements: AC5, AC6_

- [x] 3.2 Update Program Summary Route
  - In `app/training/program/[id].tsx`, update `onEditProgram` callback to navigate to `router.push('/training/edit-program/' + id)`.
  - _Skill: frontend-developer_
  - _Requirements: AC5_

## 4. UI Layout & Entry Points
- [x] 4.1 Update `ProgramCard` to simplify list item
  - In `src/features/training/components/ProgramCard.tsx`, remove the nested "Iniciar treino" button.
  - Adjust card padding, click handler, and layouts. Ensure `Pin` and `Trash` buttons have comfortable hit boxes and no background styling on ghost variant.
  - _Skill: ui-ux-pro-max_
  - _Requirements: AC1, AC2_

- [x] 4.2 Add Bifurcation Actions to `ProgramSummaryScreen`
  - In `src/features/training/components/ProgramSummaryScreen.tsx`, render a beautiful action block at the top with:
    - **Iniciar Treino** (vibrant primary style button, play icon). Wires up the block selection dialog.
    - **Editar Plano** (outline style button, edit icon). Navigates to `/training/edit-program/[id]`.
  - Clean up header actions.
  - _Skill: ui-ux-pro-max_
  - _Requirements: AC3, AC4_

## 5. Verification & Testing
- [x] 5.1 Run project validation commands
  - Execute `npx tsc --noEmit` and `npm run lint` and `npm test` to verify no breaking changes are introduced.
  - _Skill: code-tester_
  - _Requirements: AC1-AC7_
