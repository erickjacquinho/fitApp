# Product Requirements Document (PRD) - fitApp

## 1. Visão Geral
O fitApp é um aplicativo modular de gestão de saúde com foco em duas frentes principais: Dieta e Treino. O aplicativo unifica essas duas frentes em um Dashboard central para fornecer uma visão mensurável do progresso do usuário. A arquitetura é totalmente modular e orientada a funcionamento offline (utilizando WatermelonDB).

## 2. Escopo do Produto

### 2.1 Módulo de Dieta
Um sistema simples, porém completo, para acompanhamento nutricional.
- **Cardápio Diário:** Tela principal com as refeições do dia. Exibe os macronutrientes e calorias de cada refeição, além do total consumido no dia.
- **Gestão de Alimentos:** Criação e edição de alimentos contendo: nome, peso de preparo, descrição opcional, macros (proteína, carboidrato, gordura) e calorias calculadas.
- **Combos/Refeições:** Criação de refeições salvas (combos) agrupando múltiplos alimentos e suas respectivas quantidades, com indicação do estado de preparo.
- **Banco de Alimentos:** Um diretório listando todos os itens cadastrados. Permite busca, criação, edição, seleção em massa e exclusão em massa (com pop-up de confirmação).
- **Interações UI:** Gestos de *swipe* lateral nos cards para revelar ações rápidas (editar/excluir).

### 2.2 Módulo de Treino
Sistema avançado para organização e execução de treinos de musculação.
- **Programas de Treino:** Listagem cronológica de programas criados.
- **Estrutura em Blocos:** O treino é dividido em "blocos" (dias ou divisões específicas). Na interface, são caixas retráteis (com *chevrons*) que revelam os exercícios.
- **Exercícios:** Cada exercício cadastrado contém: nome, número de séries, range de repetições (mínimas e máximas), repetições na reserva (RIR) e um seletor de técnica avançada.
- **Sessão Ativa:** Interface para execução do treino. Permite registrar a quilagem (carga), repetições feitas e repetições na reserva executadas série a série.
- **Histórico:** Registro de todas as sessões concluídas e detalhamento do volume executado (total de séries, reps e carga).

### 2.3 Dashboard
A visão inicial que integra os dois mundos.
- **Integração:** Une a dieta atual e o treino atual.
- **Estatísticas:** Apresenta dados mensuráveis, resumo calórico consumido vs meta, e o status do plano de treino em andamento.

---

## 3. Etapas de Implementação

A construção está dividida em 6 etapas, organizadas por dependências:

### Etapa 1: Fundamentos e Infraestrutura
- Setup inicial do banco de dados (WatermelonDB) e esquemas de dados.
- Criação do Header padrão para navegação (título e botão voltar).
- Implementação de componentes base da UI (Cards, Inputs, Botões, SwipeableCard, Modais).
- Configuração das rotas de navegação (Tab e Stack).

### Etapa 2: Módulo Dieta - Dados
- Modelagem dos Schemas: Alimento, Refeicao, e ItemRefeicao (WatermelonDB).
- Criação dos repositórios com funções CRUD (Create, Read, Update, Delete) para gestão dos dados alimentares.

### Etapa 3: Módulo Dieta - UI
- Desenvolvimento da Tela de Cardápio (leitura e resumo do dia).
- Criação dos formulários: Criar/Editar Alimento e Criar/Editar Refeição.
- Desenvolvimento da tela Banco de Alimentos e implementação das lógicas de gestão em massa.
- Implementação da lógica em tempo real de pré-visualização de macros.

### Etapa 4: Módulo Treino - Dados
- Modelagem dos Schemas: Programa, Bloco, Exercicio, SessaoTreino e ExecucaoExercicio.
- Criação dos repositórios e lógicas CRUD para estruturação de treinos e salvamento de histórico de sessões.

### Etapa 5: Módulo Treino - UI
- Desenvolvimento das telas de Listagem e Criação de Programas de Treino.
- Construção do componente UI de "Bloco Expandível" com chevrons.
- Desenvolvimento da interface de Sessão de Treino (treino ativo) com inputs por série.
- Criação das telas de Histórico e Detalhamento da sessão executada.

### Etapa 6: Dashboard
- Criação da Tela Principal do app.
- Desenvolvimento dos Widgets de Resumo de Dieta (calorias, barra de progresso).
- Desenvolvimento dos Widgets de Resumo de Treino (programa ativo, treinos da semana).
- Finalização da navegação integrada conectando todos os fluxos.

---

## 4. Requisitos Não Funcionais
- **Header Global:** Todas as páginas devem possuir um header indicando o contexto atual.
- **Navegação Inteligente:** Fluxos modulares, onde dieta e treino funcionam de forma independente.
- **Performance:** Cálculos de macros devem usar hooks adequados (ex: `useMemo`) para feedback instantâneo.
- **Persistência Local:** Garantir que o aplicativo funcione primariamente offline usando as lógicas do WatermelonDB.