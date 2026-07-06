# Tasks: Refatoração do Header & Swipeable Atalho

- [x] **1. Data Layer** (Skill: `frontend-developer`)
  - [x] `src/db/queries/program.ts`: Criar `observeProgramCompletedSessions(programId)`.
  - [x] `src/features/training/hooks/useProgramSummary.ts`: Adicionar `completedSessionsCount` consumindo a nova query.

- [x] **2. UI Layer: WorkoutListItem (Swipeable)** (Skill: `frontend-developer`)
  - [x] Modificar `WorkoutListItem.tsx` para incluir o componente `Swipeable`.
  - [x] Implementar `renderLeftActions` exibindo cor verde/primária e ícone de play.
  - [x] Receber e disparar `onStartWorkout` ao completar o Swipe.

- [x] **3. UI Layer: Refatoração do Container `ProgramSummaryScreen`** (Skill: `frontend-developer`)
  - [x] Remover chamadas de hooks (estado subido).
  - [x] Passar nova lógica de props para componente (ex: `onStartSession` para os itens).
  - [x] Limpar layout antigo: Remover `Card` superior (Action Card), botão de hold para iniciar, e estados ociosos.

- [x] **4. UI Layer: O Novo Header em `[id].tsx`** (Skill: `frontend-developer`)
  - [x] Em `[id].tsx`, consumir `useProgramSummary(id)`.
  - [x] Tratar `handleStartSession` aqui (usando o `SessionService`).
  - [x] Atualizar o `<Header>` injetado no `<Screen>` para conter `customTitle` (Nome, Iniciado em, Sessões Completas) e `headerRight` (Botão de Editar).

- [x] **5. Revisão e Ajustes** (Skill: `code-reviewer`)
  - [x] Verificar bugs na tipagem.
  - [x] Garantir que o swipe funciona fluidamente dentro da `DraggableFlatList`.
