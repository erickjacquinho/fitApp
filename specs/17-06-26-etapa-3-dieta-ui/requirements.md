# Requirements - Etapa 3: Módulo Dieta - UI

## 1. Visão Geral
Esta etapa foca na interface de usuário do módulo de Dieta, permitindo que o usuário visualize seu cardápio, gerencie seu banco de alimentos e crie novas refeições.

## 2. Cenários de Usuário
- **Cenário 1: Visualização do Cardápio**
  - O usuário vê todas as refeições do dia com seus totais calóricos.
- **Cenário 2: Cadastro de Alimento**
  - O usuário preenche um formulário e vê a prévia das calorias antes de salvar.
- **Cenário 3: Seleção de Itens para Refeição**
  - O usuário abre um modal, busca alimentos e define a quantidade de cada um.

## 3. Requisitos Funcionais

### 3.1 Telas de Fluxo
- **RF-01:** O sistema SHALL exibir a tela `CardapioScreen` com a lista de refeições do dia.
- **RF-02:** O sistema SHALL exibir a tela `BancoAlimentosScreen` com busca e filtros.
- **RF-03:** O sistema SHALL fornecer formulários para `CriarAlimento` e `CriarRefeicao`.

### 3.2 Componentes Específicos
- **RF-04:** O sistema SHALL implementar o componente `PreviewMacros` que calcula e exibe totais em tempo real.
- **RF-05:** O sistema SHALL implementar o `SeletorAlimentosModal`.

### 3.3 Interações
- **RF-06:** O sistema SHALL suportar exclusão de itens via gesto de swipe.
- **RF-07:** O sistema SHALL suportar seleção em massa no Banco de Alimentos.

## 4. Critérios de Aceite (EARS)
- **WHEN** o usuário digitar os macros de um novo alimento, **THEN** o sistema SHALL atualizar o cálculo de calorias instantaneamente.
- **WHEN** o usuário realizar um swipe para a esquerda em um card, **THEN** o sistema SHALL revelar os botões de ação (Editar/Excluir).
- **WHEN** o botão "+ Nova Refeição" for pressionado, **THEN** o sistema SHALL navegar para o formulário de criação.

## 5. Critérios de Sucesso
- Fluxo completo de criação de alimento -> criação de refeição funcional.
- UI responsiva e seguindo o design system (cards, cores, tipografia).
- Cálculos matemáticos precisos para macros e calorias.