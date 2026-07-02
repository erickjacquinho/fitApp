# Phase 1: Requirements Gathering

## User Stories
- **US1:** Como usuário, ao acessar a tela "Resumo do programa", quero um botão para editar o plano de treino que alterna a visualização para um modo de edição (Kanban).
- **US2:** Como usuário no Modo de Edição, quero ver meus treinos como colunas em um Kanban horizontal, podendo navegar entre eles usando gestos horizontais (swipe).
- **US3:** Como usuário no Modo de Edição (dentro de uma coluna de treino), quero ver a lista de exercícios na ordem correta com seu título, número de séries e um ícone de "grip" à esquerda.
- **US4:** Como usuário no Modo de Edição, quero poder usar drag and drop no ícone de "grip" para reordenar os exercícios dentro do treino, e essa ordem deve ser salva no banco de dados.
- **US5:** Como usuário no Modo de Visualização, quero continuar vendo os treinos em uma lista vertical, onde clicar em um treino me leva à página de detalhes daquele treino específico.

## Acceptance Criteria
1. WHEN o usuário clica no botão "Editar plano de treino" THEN o sistema SHALL alternar a tela para o `Edit Mode`.
2. IF o sistema está no `Edit Mode` THEN o sistema SHALL exibir um Kanban horizontal paginado, onde cada coluna representa um Bloco de Treino.
3. WHEN no `Edit Mode` THEN o usuário SHALL poder navegar entre colunas por gestos de scroll horizontal.
4. IF o sistema está no `Edit Mode` THEN o interior de cada coluna SHALL exibir uma lista de exercícios contendo: ícone de drag (esquerda), título do exercício e número de séries.
5. WHEN o usuário arrasta e solta (drag and drop) um exercício usando o ícone de drag THEN o sistema SHALL atualizar a propriedade de ordem (order) dos exercícios no WatermelonDB.
6. IF o sistema está no `View Mode` THEN o sistema SHALL exibir uma lista vertical padrão de blocos de treino.
