# Feature Specification: Regras Estritas de Baixo Contraste Borda x Fundo e Alto Contraste de Texto para Badges

**Feature Path**: `specs/27-07-26-badge-low-contrast-rules`
**Created**: 2026-07-27

## User Need & Business Goal
Garantir que todas as pílulas e badges do FitApp sigam uma regra rígida de design system: a borda de qualquer badge DEVE ter baixo contraste em relação ao seu próprio fundo (evitando contornos escuros dividindo a pílula), enquanto o conteúdo interno (texto e ícone) DEVE ter alto contraste com o fundo para perfeita leitura.

## User Scenarios
- **Cenário 1 (Badges em superfícies normais)**: Ao visualizar tags de programas de treino (ex: "Em andamento" ou badges secundárias), o usuário vê uma pílula onde o fundo e a borda pertencem à mesma família tonal de baixo contraste (ex: `bg-surface-elevated` com `border-border-subtle`), sem linhas escuras de contorno.
- **Cenário 2 (Badges em superfícies azuis de destaque)**: No Hero Card de treino ativo ou telas coloridas, badges sólidas (ex: fundo branco) possuem bordas na mesma cor do fundo (borda branca `border-white`), garantindo transição invisível entre borda e fundo, com o texto interno em azul primário escuro de alto contraste.
- **Cenário 3 (Eliminação de inconsistências)**: Nenhuma badge em nenhuma tela do aplicativo exibe fundo claro (ex: branco) combinado com bordas escuras/pretas desalinhadas.

## Functional Requirements
- **FR-001**: O componente canônico `Badge` (`src/components/ui/badge.tsx`) deve definir variantes onde a cor da borda possui baixo contraste visual (ou tom correspondente) em relação à cor de fundo da própria badge.
- **FR-002**: É proibido que qualquer badge exiba um contorno de alto contraste (ex: fundo branco com borda preta/escura) que divida a geometria da pílula.
- **FR-003**: O alto contraste do elemento deve ficar concentrado integralmente na relação entre o texto/ícone interno e a cor de fundo da badge.
- **FR-004**: Todas as badges na tela de Treino (`ProgramCard`, `WorkoutTimer`, `ActiveSessionHeroCard`, `WorkoutExerciseKanbanScreen`, `style-guide`) devem ser auditadas e ajustadas para respeitar a regra de baixo contraste borda x fundo.

## Key Assumptions & Constraints
- **Assunção 1**: Translucidez permanece estritamente proibida em badges (100% de opacidade sólida).
- **Assunção 2**: A paleta Mineral Warm é a referência única para todos os pares semânticos de cor de fundo e borda.

## Success Criteria
- **SC-001**: 100% das variantes do componente `Badge` possuem paridade tonal de baixo contraste entre borda e fundo.
- **SC-002**: Zero ocorrências de badges com fundo claro e borda preta/escura na tela de Treino e no aplicativo.
- **SC-003**: 100% dos testes estáticos TypeScript (`npx tsc --noEmit`) aprovados sem erros.
