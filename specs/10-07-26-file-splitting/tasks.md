# Tasks: Aggressive File Splitting

## 1. Components Splitting
- `[x]` 1.1 **`SwipeableRow.tsx`**: Criar `useSwipeableRow.ts` e `SwipeableRowActions.tsx`, deixando `SwipeableRow.tsx` apenas como orquestrador.
- `[x]` 1.2 **`dropdown-menu.tsx`**: Criar diretório `dropdown-menu/` e quebrar os subcomponentes primitivos em arquivos isolados (exportados via `index.ts`).
- `[x]` 1.3 **`ProgramForm.tsx`**: Mover `ProgramFormHeader`, `ProgramFormBlockCard` e `ProgramFormActions` para `features/training/components/ProgramForm/`.
- `[x]` 1.4 **`WorkoutSessionScreen.tsx`**: Mover `EmptySessionCard` e `WorkoutSessionListHeader` para `features/training/components/WorkoutSession/`.

## 2. Hooks & State Splitting
- `[x]` 2.1 **`useProgramForm.ts`**: Quebrar a lógica do Zustand/Mutations em `useProgramFormState.ts` e `useProgramFormBlocks.ts`.

## 3. Diet Screens Splitting
- `[x]` 3.1 **`MenuScreen.tsx`**: Extrair seções para `features/diet/components/`.
- `[x]` 3.2 **`FoodBankScreen.tsx`**: Extrair a listagem e os headers.
- `[x]` 3.3 **`CalendarSummaryScreen.tsx`**: Extrair `DateSelector` e `MacroSummaryList` para arquivos independentes.

## 4. Services Splitting
- `[x]` 4.1 **`workout-service.ts`**: Dividir a lógica gigantesca de queries em `program-service.ts`, `training-block-service.ts` e `exercise-service.ts`.

## 5. Audit & Validation
- `[x]` 5.1 Rodar testes de fumaça (build validation) no cliente, garantindo que as quebras não impactaram o funcionamento.
