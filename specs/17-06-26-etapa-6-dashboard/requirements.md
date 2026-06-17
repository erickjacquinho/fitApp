# Requirements - Etapa 6: Dashboard

## 1. Visão Geral
A Dashboard é o centro de controle do fitApp, unificando os dados de dieta e treino para fornecer uma visão rápida do progresso diário e semanal do usuário.

## 2. Cenários de Usuário
- **Cenário 1: Visão Geral Diária**
  - O usuário abre o app e vê quantas calorias ainda pode consumir no dia.
- **Cenário 2: Próximo Treino**
  - O usuário vê qual é o próximo treino do seu programa ativo e se já treinou hoje.
- **Cenário 3: Atalhos Rápidos**
  - O usuário toca em um widget e é levado diretamente para o módulo correspondente.

## 3. Requisitos Funcionais

### 3.1 Widgets de Resumo
- **RF-01:** O sistema SHALL exibir um `WidgetDieta` com: calorias consumidas, meta diária e barra de progresso.
- **RF-02:** O sistema SHALL exibir um `WidgetTreino` com: nome do programa atual, resumo da semana (treinos feitos/pendentes) e link para iniciar sessão.

### 3.2 Estatísticas
- **RF-03:** O sistema SHALL exibir estatísticas básicas (ex: peso médio, volume total da semana) se houver dados disponíveis.

### 3.3 Navegação Integrada
- **RF-04:** O sistema SHALL fornecer links de navegação profunda a partir dos widgets para as telas principais de cada módulo.

## 4. Critérios de Aceite (EARS)
- **WHEN** os dados de dieta mudarem, **THEN** o `WidgetDieta` na Dashboard SHALL ser atualizado automaticamente.
- **WHEN** o usuário tocar no `WidgetTreino`, **THEN** o sistema SHALL navegar para a tela de Treino.
- **WHEN** não houver dados (primeiro uso), **THEN** o sistema SHALL exibir estados vazios (empty states) amigáveis com botões de ação (ex: "Criar Dieta").

## 5. Critérios de Sucesso
- Dashboard centraliza as informações mais importantes com clareza visual.
- Tempo de carregamento da Dashboard é mínimo (uso eficiente de queries WatermelonDB).
- Navegação fluida entre Dashboard e módulos.