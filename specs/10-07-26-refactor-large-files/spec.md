# Feature Specification: Refatoração de Arquivos Grandes

**Feature Branch**: `[refactor-large-files]`

**Created**: 2026-07-10

**Status**: Draft

**Input**: User description: "crie um /sdd de refatoraçao dos arquivos que aparecem nessa tabela. meta: codebase minima possivel, seguindo apenas padrao ouro e sem quebrar codigo ou causar crashes. importante: ignore completamente arquivos .md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Refatoração do Dropdown e SwipeableRow (Priority: P1)

Como desenvolvedor, quero que os componentes base (`dropdown-menu.tsx` e `SwipeableRow.tsx`) sejam refatorados para serem concisos e sigam o padrão ouro.

**Why this priority**: Esses são os maiores arquivos TSX não-feature da lista e componentes base impactam todo o sistema.

**Independent Test**: Pode ser testado navegando nas telas que utilizam dropdowns e swipeables para garantir que nenhuma regressão ocorreu (não quebra código).

**Acceptance Scenarios**:
1. **Given** um arquivo `SwipeableRow.tsx` refatorado, **When** rodando a aplicação, **Then** as animações de swipe funcionam perfeitamente e sem crashes.

### User Story 2 - Refatoração dos Formulários e Telas de Treino (Priority: P2)

Como desenvolvedor, quero que os formulários de treino (`ProgramForm.tsx`, `useProgramForm.ts`, `WorkoutSessionScreen.tsx`, etc) sejam divididos ou refatorados para reduzir a complexidade e tamanho.

**Why this priority**: Representam a lógica central de domínio da aplicação.

**Independent Test**: Testar criação, edição e execução de programas de treino no app.

**Acceptance Scenarios**:
1. **Given** formulários e hooks refatorados, **When** um usuário salva um programa, **Then** o formulário não apresenta crashes.

### User Story 3 - Refatoração das Telas de Dieta (Priority: P3)

Como desenvolvedor, quero que as telas de dieta (`MenuScreen.tsx`, `FoodBankScreen.tsx`, `CalendarSummaryScreen.tsx`, `MealCard.tsx`) sejam otimizadas para uma base de código menor e mais legível.

**Why this priority**: Melhorar a manutenção e a performance da seção de dietas.

**Independent Test**: Navegar nas telas de menu e calendário.

### User Story 4 - Refatoração de Serviços e Configurações (Priority: P4)

Como desenvolvedor, quero que `workout-service.ts`, `session-service.ts`, `migrations.ts`, `tailwind.config.js` e `global.css` sigam os padrões ouro, removendo repetições e otimizando código.

**Why this priority**: Reduz a base global e otimiza a performance.

**Independent Test**: Rodar linting e builds de forma automatizada.

### Edge Cases

- O que acontece quando componentes refatorados recebem props antigas que não foram tipadas corretamente? A refatoração deve manter retrocompatibilidade restrita para evitar crashes.
- Em refatorações do WatermelonDB (migrations e services), a consistência dos dados do usuário offline não pode ser perdida.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O código DEVE ser o menor e mais eficiente possível (código mínimo).
- **FR-002**: A refatoração DEVE seguir estritamente os padrões ouro do FitApp.
- **FR-003**: A aplicação NÃO DEVE sofrer nenhuma regressão funcional (nenhum código quebrado).
- **FR-004**: O processo de refatoração NÃO DEVE gerar crashes em tempo de execução.
- **FR-005**: Arquivos `.md` (documentações) e `.json` (`package-lock.json`) DEVEM ser completamente ignorados.

### Key Entities

- **Componentes React**: Subdivisão de componentes monolíticos (telas) em partes menores.
- **Hooks React**: Extração de lógica pesada de telas para hooks isolados.
- **Serviços WatermelonDB**: Otimização de queries pesadas em `workout-service.ts`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Redução significativa no número de linhas ou simplificação da complexidade ciclomática de cada um dos arquivos `.ts`/`.tsx` da lista.
- **SC-002**: Cobertura de build e linting 100% livre de novos erros.
- **SC-003**: 0 crashes reportados ao rodar os fluxos afetados.

## Assumptions

- O projeto possui um conjunto de padrões ouro bem estabelecidos (Regras do FitApp/AGENTS.md).
- Os arquivos não listados não precisam ser mexidos de forma proativa.
