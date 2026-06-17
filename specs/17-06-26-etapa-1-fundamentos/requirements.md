# Requirements - Etapa 1: Fundamentos e Infraestrutura

## 1. Visão Geral
Esta etapa estabelece a base técnica do fitApp, incluindo a camada de persistência offline com WatermelonDB, a estrutura de navegação e os componentes fundamentais de interface que serão reutilizados em todo o aplicativo.

## 2. Cenários de Usuário
- **Cenário 1: Navegação Inicial**
  - O usuário abre o app e é direcionado para a Dashboard (vazia inicialmente).
  - O usuário consegue alternar entre as abas de Dashboard, Dieta e Treino.
- **Cenário 2: Consistência Visual**
  - O usuário navega entre diferentes telas e percebe um cabeçalho (Header) consistente com o título da tela e botão de voltar funcional.

## 3. Requisitos Funcionais

### 3.1 Infraestrutura de Dados (WatermelonDB)
- **RF-01:** O sistema SHALL configurar a instância do WatermelonDB no aplicativo.
- **RF-02:** O sistema SHALL definir os esquemas iniciais para Dieta (Alimento, Refeicao, ItemRefeicao) e Treino (Programa, Bloco, Exercicio, SessaoTreino, ExecucaoExercicio).
- **RF-03:** O sistema SHALL fornecer um Database Provider para acesso em toda a árvore de componentes.

### 3.2 Componentes de Interface Base
- **RF-04:** O sistema SHALL implementar um componente `Header` reutilizável com suporte a título, botão voltar e área segura (Safe Area).
- **RF-05:** O sistema SHALL implementar componentes atômicos: `Card`, `Button` (primário, secundário, destrutivo), `Input` (texto/número com validação) e `Modal` de confirmação.
- **RF-06:** O sistema SHALL implementar o componente `SwipeableCard` para suportar gestos laterais.

### 3.3 Navegação
- **RF-07:** O sistema SHALL configurar o `Bottom Tab Navigator` para as telas principais (Dashboard, Dieta, Treino).
- **RF-08:** O sistema SHALL configurar `Stack Navigators` para cada módulo para permitir navegação profunda.

## 4. Critérios de Aceite (EARS)
- **WHEN** o aplicativo for iniciado, **THEN** o sistema SHALL carregar a instância do WatermelonDB sem erros.
- **WHEN** o usuário tocar em uma aba da barra inferior, **THEN** o sistema SHALL navegar para a tela correspondente.
- **WHEN** uma tela de subnível for aberta, **THEN** o sistema SHALL exibir o botão "Voltar" no Header.
- **WHEN** o botão "Voltar" for pressionado, **THEN** o sistema SHALL retornar à tela anterior.

## 5. Critérios de Sucesso
- Aplicativo inicializa e navega entre 3 abas principais sem falhas.
- Componentes base (Botões, Cards) estão visíveis e funcionais na tela de guia de estilo (opcional).
- Database Provider está injetado e acessível (verificado via logs ou teste unitário).

## 6. Premissas e Restrições
- O aplicativo utiliza Expo e React Native.
- A persistência é estritamente local (Offline First).
- O design segue as regras definidas em `.agents/rules/`.