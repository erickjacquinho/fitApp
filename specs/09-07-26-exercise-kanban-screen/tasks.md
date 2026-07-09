# Tasks: Kanban Screen para Registro de Séries

- [ ] **Tarefa 1: Criar Rota da Nova View (Skill recomendada: `frontend-developer`)**
  - Adicionar arquivo `app/training/exercise-kanban.tsx`.
  - Configurar passagem de parâmetros (`sessionId`, `initialExerciseIndex` ou `initialExerciseId`).
  - Utilizar `<Screen>` sem barras padrões do React Navigation.

- [ ] **Tarefa 2: Criar Organismo Kanban (Skill recomendada: `frontend-developer`)**
  - Criar `src/features/training/components/WorkoutExerciseKanbanScreen.tsx`.
  - Importar `PaginationDots` e centralizar no topo.
  - Adicionar um `<FlatList horizontal pagingEnabled>` que escute `onViewableItemsChanged` para atualizar a prop `currentIndex` do `PaginationDots`.
  - Fazer fetch da lista de exercícios usando `sessionId`.
  - Usar `initialScrollIndex` no `FlatList` para scrollar para o exercício que foi clicado.

- [ ] **Tarefa 3: Construir UI do Exercício Individual (Micro View) (Skill recomendada: `ui-ux-pro-max` + `frontend-design`)**
  - Criar `src/features/training/components/WorkoutExerciseCard.tsx`.
  - Este componente deve ocupar a largura exata da tela (usar `Dimensions.get('window').width` se necessário, ou `w-screen`).
  - Desenhar o cabeçalho (Nome do exercício, botão substituir).
  - Desenhar a lista de séries (Headers: Set, Kg, Reps, Check).

- [ ] **Tarefa 4: Conectar Botões da Macro View com a Rota (Skill recomendada: `frontend-developer`)**
  - Modificar `WorkoutSessionScreen.tsx` para passar um `onPress` no `SwipeableRow` (ou no wrapper do card de exercício).
  - O `onPress` deve dar `router.push` pra a rota criada na Tarefa 1.
