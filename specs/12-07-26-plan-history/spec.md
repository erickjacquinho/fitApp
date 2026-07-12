# Feature Specification: Workout Plan History

**Feature Branch**: `[12-07-26-plan-history]`

**Created**: 2026-07-12

**Status**: Draft

**Input**: User description: "dentro da tela do plano de treino, é preciso adicionar um botao para acesasr o historico DESTE plano de treino especifico. deve ser uma tela 'igual' a tela de historico geral, mas adaptada ao plano de treino especifico. adicione o botao no header ao lado do botao editar."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acessar o Histórico do Plano (Priority: P1)

Como usuário, quero acessar o histórico de sessões finalizadas de um plano de treino específico, para que eu possa acompanhar minha progressão e desempenho apenas daquele treino.

**Why this priority**: É a funcionalidade principal solicitada, permitindo o isolamento da visualização do histórico.

**Independent Test**: Can be fully tested by clicking the "history" icon in the header of the workout plan screen and seeing the list of past completed sessions for that plan.

**Acceptance Scenarios**:

1. **Given** estou na tela de um plano de treino específico, **When** eu clico no ícone de histórico no cabeçalho (ao lado do botão de editar), **Then** eu sou redirecionado para a tela de histórico específica daquele plano.
2. **Given** estou na tela de histórico de um plano, **When** eu observo a lista, **Then** apenas as sessões concluídas relacionadas àquele plano de treino são exibidas.
3. **Given** estou na tela de histórico de um plano, **When** não há nenhuma sessão concluída para ele, **Then** vejo um estado vazio (empty state) informando que não há histórico.

---

### Edge Cases

- O que acontece se o plano de treino tiver sido recém-criado e não houver histórico? O sistema deve exibir um empty state educativo.
- O que acontece se o usuário clicar no histórico de uma sessão listada? Ele deve navegar para os detalhes da sessão, da mesma forma que na tela de histórico geral.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir um ícone de histórico no cabeçalho da tela de detalhes do plano de treino, adjacente ao botão de editar.
- **FR-002**: O sistema DEVE ter uma rota específica para o histórico de um plano de treino (`/workout/[id]/history` ou equivalente).
- **FR-003**: A tela de histórico do plano DEVE utilizar os mesmos padrões visuais (grouped box pattern) da tela de histórico geral.
- **FR-004**: A tela DEVE filtrar as sessões exibidas para conter apenas as sessões onde a referência do plano seja o atual.
- **FR-005**: O sistema DEVE exibir um empty state quando não houverem treinos registrados.

### Key Entities

- **WorkoutPlan (Plano de Treino)**: A entidade pai. O histórico é derivado desta entidade.
- **WorkoutSession (Sessão de Treino / Histórico)**: As entidades filhas que serão listadas e filtradas com base no `WorkoutPlan`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuários conseguem navegar para a tela de histórico do plano com um único toque.
- **SC-002**: A tela carrega de forma rápida e fluida e mantém a performance mesmo com dezenas de sessões.
- **SC-003**: As sessões listadas refletem apenas os dados do plano específico, validados com precisão através do banco de dados local.

## Assumptions

- O padrão de Empty States já existe no projeto e pode ser reutilizado.
- O componente de listagem (history session card / grouped box) já existe e suporta renderização externa baseada nos dados passados.
- O botão do cabeçalho suporta navegação direta passando o ID do plano atual.
