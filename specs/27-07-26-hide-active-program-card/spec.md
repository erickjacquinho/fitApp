# Feature Specification: Dynamic Active Program Card Filtering (Hide Active Program Card)

**Feature Path**: `specs/27-07-26-hide-active-program-card`
**Created**: 2026-07-27

## User Need & Business Goal
Eliminar a duplicação visual e o conflito cognitivo na `TrainingHomeScreen` ao garantir que, quando um programa de treino possui uma sessão ativa em andamento no `ActiveSessionHeroCard`, o card desse mesmo programa (`ProgramCard`) seja ocultado da lista de programas fixados e outros planos abaixo.

## User Scenarios
- **Cenário 1 (Treino em andamento para o Programa A)**: O usuário possui o "Programa A" em andamento. O `ActiveSessionHeroCard` é exibido no topo da tela com o estado vivo do treino. Na lista de "Programas Ativos" ou "Outros Planos" abaixo, o "Programa A" é ocultado para evitar duplicação.
- **Cenário 2 (Existência de outros programas)**: Se o "Programa B" também estiver fixado ou listado, ele continua sendo exibido normalmente na lista abaixo do Hero Card.
- **Cenário 3 (Finalização/Cancelamento do treino)**: Quando o treino é concluído ou encerrado, o `ActiveSessionHeroCard` desaparece e o "Programa A" retorna imediatamente para a sua posição normal na lista de programas.

## Functional Requirements
- **FR-001**: A `TrainingHomeScreen.tsx` deve filtrar as listas `pinnedPrograms` e `otherPrograms` para excluir qualquer programa cujo `program.id` seja igual a `activeSession.programId`.
- **FR-002**: Se todos os programas fixados pertencerem à sessão ativa atual, o título da seção "Programas Ativos" deve ser ocultado para evitar seções vazias.
- **FR-003**: Quando `activeSession` for nulo (`null`), todos os programas fixados e outros planos devem ser renderizados normalmente em suas respectivas seções.

## Key Assumptions & Constraints
- **Assunção 1**: O banco de dados WatermelonDB permite no máximo uma sessão de treino ativa por vez.
- **Assunção 2**: O `ActiveSessionHeroCard` já provê o ponto de entrada primário ("Continuar Treino") para a sessão ativa.

## Success Criteria
- **SC-001**: Zero ocorrências de cards duplicados do mesmo programa na `TrainingHomeScreen` quando um treino estiver ativo.
- **SC-002**: Retorno imediato do card do programa para a lista após o encerramento do treino.
- **SC-003**: 100% de aprovação na compilação do TypeScript (`npx tsc --noEmit`).
