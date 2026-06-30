# Phase 3: Task Planning

- [x] 1. Preparação de Dados e Hooks
- [x] 1.1 Atualizar schema do WatermelonDB e models
  - Adicionar campo order no schema de exercícios e gerar script de migração. Refletir o novo campo no model.
  - Files: `src/db/schema.ts`, `src/db/migrations.ts`, `src/db/models/Exercise.ts`
  - _Requirements: US4_
- [x] 1.2 Criar query e hook para os exercícios
  - Implementar a função de consulta observável para os exercícios e criar um hook que usa essa consulta para as Views.
  - Files: `src/db/queries/program.ts`, `src/features/training/hooks/useBlockExercises.ts`
  - _Requirements: US3, US4_

- [x] 2. Componentes UI do Kanban
- [x] 2.1 Criar componente de card arrastável
  - Criar o componente individual para cada exercício, exibindo título, número de séries e ícone grip esquerdo.
  - Files: `src/features/training/components/ExerciseDraggableItem.tsx`
  - _Requirements: US3_
- [x] 2.2 Criar coluna individual
  - Criar a coluna de treino. Deve usar `DraggableFlatList` e repassar os callbacks para o hook.
  - Files: `src/features/training/components/WorkoutColumnEditor.tsx`
  - _Requirements: US3, US4_
- [x] 2.3 Agrupar colunas com paginação
  - Montar a interface root do Kanban usando `FlatList` em modo paging.
  - Files: `src/features/training/components/ProgramKanbanEditor.tsx`
  - _Requirements: US2_

- [x] 3. Integração na Tela Principal
- [x] 3.1 Adicionar botão toggle
  - Criar o estado local e alterar comportamento do botão de lápis original para alternar modos.
  - Files: `src/features/training/components/ProgramSummaryScreen.tsx`
  - _Requirements: US1_
- [x] 3.2 Lógica de renderização
  - Substituir o display vertical pelas colunas no modo de edição.
  - Files: `src/features/training/components/ProgramSummaryScreen.tsx`
  - _Requirements: US1, US2, US5_
