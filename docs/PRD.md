# fitApp - Aplicativo de Fitness e Nutrição

## 1. Resumo Executivo

Aplicativo mobile para gestão de fitness e nutrição com duas frentes principais: **Dashboard Unificada** e **Módulos Independentes** (Dieta e Treino). O app permite acompanhamento de plano alimentar, criação de alimentos/refeições, e gestão de programas de treino com exercícios personalizados.

---

## 2. Escopo do Feature

### Inclusões
- Dashboard central com visão unificada de dieta e treino atual
- Sistema de dieta com cardápio, refeições, macros e calorias
- Banco de alimentos com CRUD completo
- Criação de refeições combinadas (combos de alimentos)
- Sistema de treino com programas, blocos de dias e exercícios
- Sessão de treino com registro de execução (reps, quilagem, reps reserva)
- Histórico de treinos executados
- Persistência local via WatermelonDB

### Exclusões
- Contabilização de gasto calórico de cardio/treino (Fase 2)
- Autenticação de usuários
- Sincronização em nuvem
- Histórico de evolução

---

## 3. Arquitetura de Informação

### Estrutura de Navegação

```
├── Header de Navegação (todas as páginas)
│   └── Título da página atual + botão voltar (quando aplicável)
│
├── Dashboard (Tela Inicial)
│   ├── Visão unificada do plano atual
│   ├── Estatísticas resumidas
│   ├── [Botão] → Módulo Dieta
│   └── [Botão] → Módulo Treino
│
├── Módulo Dieta (Tab)
│   ├── Cardápio do dia
│   │   ├── Lista de refeições
│   │   ├── Calorias/macros por refeição e total
│   │   ├── [Botão +] → Criar Refeição
│   │   └── Card de refeição → abre detalhes/edição
│   │
│   ├── Tela: Criar/Editar Refeição
│   │   ├── Campos: nome, quantidade, estado preparo
│   │   ├── Seletor de alimentos (slide-up/modal)
│   │   └── Preview de macros/calorias
│   │
│   ├── [Botão] Banco de Alimentos
│   │   ├── Lista completa de alimentos
│   │   ├── Busca por nome
│   │   ├── [Botão +] → Criar Alimento
│   │   ├── Seleção em massa
│   │   └── Exclusão em massa (com confirmação)
│   │
│   └── Tela: Criar/Editar Alimento
│       ├── Campos: nome, peso preparo, descrição opcional
│       ├── Campos: macros (proteína, carboidrato, gordura)
│       └── Preview de calorias calculadas
│
└── Módulo Treino (Tab)
    ├── Lista de Programas
    │   ├── Programa cards (expandibles com chevron)
    │   ├── [Botão +] → Criar Novo Programa
    │   ├── [Botão iniciar] → Iniciar Sessão de Treino
    │   └── [Botão histórico] → Ver Histórico
    │
    ├── Tela: Criar/Editar Programa
    │   ├── Campo: nome do programa
    │   ├── Lista de Blocos
    │   │   ├── [Botão + Adicionar Bloco]
    │   │   └── Bloco expandível (chevron)
    │   │       ├── Campo: nome do bloco
    │   │       ├── Lista de exercícios
    │   │       ├── [Botão +] → Adicionar Exercício
    │   │       └── Exercício card (swipe para editar/excluir)
    │   │
    │   └── Tela: Criar/Editar Exercício
    │       ├── Campos: nome, séries, repetições mín/máx
    │       ├── Campo: técnica avançada (opcional)
    │       └── Campo: reps na reserva (opcional)
    │
    ├── Tela: Iniciar Sessão de Treino
    │   ├── Header: nome do programa
    │   ├── Progresso: bloco atual / total de blocos
    │   ├── Lista de exercícios do bloco
    │   │   └── [Botão] → Executar Exercício
    │   │
    │   └── Tela: Executar Exercício (Modal)
    │       ├── Header: nome do exercício
    │       ├── Info: séries programadas, reps range
    │       ├── Lista de séries
    │       │   ├── Input: quilagem executada
    │       │   ├── Input: reps feitas
    │       │   └── Input: reps reserva (opcional)
    │       └── [Botão] Próximo exercício / Finalizar treino
    │
    └── Tela: Histórico de Treinos
        ├── Lista de sessões (cronológica reversa)
        ├── Card: data, programa, duração
        └── [Tap] → Detalhes da sessão
            ├── Blocos executados
            ├── Exercícios com métricas
            └── Resumo (total séries, reps, quilagem)
```

---

## 4. Fluxo de Navegação

### 4.1 Fluxo Dieta

```
┌─────────────────────────────────────────────────────────────┐
│                     CARDÁPIO DO DIA                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [Header: Cardápio - Calorias: 1850/2200]                ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ ┌─────────────┐  Café da Manhã                          ││
│  │ │ 450 kcal    │  2 ovos, pão integral, café             ││
│  │ │ P:20 C:40 G │  [Swipe → Editar | Excluir]            ││
│  │ └─────────────┘                                         ││
│  │                          ┌─────────────────────────────┤│
│  │                          │ [+ Criar Refeição]           ││
│  └──────────────────────────┴─────────────────────────────┘│
│                                                             │
│  [Banco de Alimentos] ←────────────────────────┐            │
└─────────────────────────────────────────────────┘            │
                              │                               │
                              ▼                               │
┌─────────────────────────────────────────────────────────────┐
│                   BANCO DE ALIMENTOS                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [🔍 Buscar alimentos...]                                ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ □ Frango grelhado (100g) - P:31 C:0 G:3               ││
│  │ □ Arroz integral (100g) - P:4 C:26 G:1                 ││
│  │ □ Ovos (50g) - P:6 C:0 G:5                             ││
│  │                            [Swipe → Editar | Excluir]    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  [+ Novo Alimento]  [☐ Selecionar múltiplos] [🗑️ Excluir] │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Fluxo Criar Alimento

```
┌─────────────────────────────────────────────────────────────┐
│                  CRIAR NOVO ALIMENTO                        │
│  ← Voltar                                                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │ Nome do alimento *                                      ││
│  │ [________________________]                              ││
│  │                                                         ││
│  │ Peso do preparo (g)                                     ││
│  │ [_________]                                             ││
│  │                                                         ││
│  │ Descrição (opcional)                                    ││
│  │ [________________________]                              ││
│  │                                                         ││
│  │ ───────────── MACROS ─────────────                      ││
│  │ Proteína (g)      Carboidrato (g)    Gordura (g)       ││
│  │ [_______]         [_______]          [_______]         ││
│  │                                                         ││
│  │ ──────────────────────────────────────────────────────││
│  │ Calorias: 385 kcal (calculado)                         ││
│  │                                                         ││
│  │         [Cancelar]          [Salvar]                  ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Fluxo Criar Refeição (Combo)

```
┌─────────────────────────────────────────────────────────────┐
│                  CRIAR REFEIÇÃO                            │
│  ← Voltar                                                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │ Nome da refeição *                                      ││
│  │ [________________________]                              ││
│  │                                                         ││
│  │ Quantidade                                              ││
│  │ [_________] porção(es)                                   ││
│  │                                                         ││
│  │ Estado do preparo                                       ││
│  │ [Pronto ✓] [Preparo] [Cru]                              ││
│  │                                                         ││
│  │ ───────────── ALIMENTOS ─────────────                   ││
│  │ + Adicionar alimento                                    ││
│  │                                                         ││
│  │ ┌─────────────────────────────────────────────────────┐││
│  │ │ □ Frango grelhado (100g)              [x]           │││
│  │ │   Quantidade: [100] g                             │││
│  │ └─────────────────────────────────────────────────────┘││
│  │ ┌─────────────────────────────────────────────────────┐││
│  │ │ □ Arroz integral (150g)               [x]           │││
│  │ │   Quantidade: [150] g                             │││
│  │ └─────────────────────────────────────────────────────┘││
│  │                                                         ││
│  │ ──────────────────────────────────────────────────────││
│  │ Total: P:35g | C:40g | G:5g | Cal: 385kcal             ││
│  │                                                         ││
│  │         [Cancelar]          [Salvar]                  ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 4.4 Fluxo Treino

```
┌─────────────────────────────────────────────────────────────┐
│                   PROGRAMAS DE TREINO                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │ ▶ Programa A - Hipertrofia          [Iniciar] [⚙️]     ││
│  │   ▾ Peito (3 exercícios)                               ││
│  │   ▾ Costas (4 exercícios)                              ││
│  │   ▾ Pernas (5 exercícios)                              ││
│  │                                                         ││
│  │ ▶ Programa B - Full Body             [Iniciar] [⚙️]     ││
│  │   ▾ Segunda (6 exercícios)                             ││
│  │   ▾ Quarta (6 exercícios)                               ││
│  │   ▾ Sexta (6 exercícios)                               ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  [Novo Programa]                    [Ver Histórico]        │
└─────────────────────────────────────────────────────────────┘

                  │
                  ▼ (Iniciar)
                  
┌─────────────────────────────────────────────────────────────┐
│              SESSÃO: PROGRAMA A - HIROFIA                  │
│  Bloco 1/3 - Peito                           [Finalizar]   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │ Supino Reto                                     [→]    ││
│  │ 4 séries | 8-12 reps | RIR: 2                          ││
│  │                                                         ││
│  │ Supino Inclinado                                     [→]││
│  │ 4 séries | 10-12 reps                                 ││
│  │                                                         ││
│  │ Crossover                                            [→]│
│  │ 3 séries | 12-15 reps                                ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

                  │
                  ▼ (Clicar em exercício)
                  
┌─────────────────────────────────────────────────────────────┐
│              SUPINO RETO - SÉRIE 1/4                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Reps programadas: 8-12                                 ││
│  │                                                         ││
│  │ ┌─────────────────────────────────────────────────────┐││
│  │ │ SÉRIE 1                    [✓ Feito]               │││
│  │ │ Quilagem: [_____] kg                                │││
│  │ │ Reps feitas: [_____]                               │││
│  │ │ Reps reserva: [_____]                               │││
│  │ └─────────────────────────────────────────────────────┘││
│  │ ┌─────────────────────────────────────────────────────┐││
│  │ │ SÉRIE 2                    [○ Fazer]               │││
│  │ │ Quilagem: [_____] kg                                │││
│  │ │ Reps feitas: [_____]                               │││
│  │ │ Reps reserva: [_____]                               │││
│  │ └─────────────────────────────────────────────────────┘││
│  │ ... (mais séries)                                      ││
│  │                                                         ││
│  │         [Anterior]          [Próximo →]               ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 5. User Scenarios & Flows

### 5.1 Dashboard → Dieta
1. Usuário está na Dashboard
2. Clica no card "Dieta" ou botão de acesso
3. Navega para tela de Cardápio do dia

### 5.2 Dashboard → Treino
1. Usuário está na Dashboard
2. Clica no card "Treino" ou botão de acesso
3. Navega para tela de Lista de Programas

### 5.3 Dieta - Cardápio → Criar Refeição
1. Usuário está no Cardápio do dia
2. Clica em "+" ou "Criar Refeição"
3. Navega para tela Criar Refeição
4. Preenche nome, quantidade, estado preparo
5. Clica em "Adicionar Alimento"
6. Abre seletor de alimentos (modal/slide-up)
7. Seleciona alimentos e define quantidade
8. Confirma seleção
9. Vê preview de macros/calorias total
10. Salva → retorna ao Cardápio

### 5.4 Dieta - Cardápio → Banco de Alimentos
1. Usuário está no Cardápio do dia
2. Clica em "Banco de Alimentos"
3. Navega para tela do Banco
4. Vê lista de alimentos cadastrados
5. Pode buscar por nome
6. Pode selecionar múltiplos para exclusão

### 5.5 Dieta - Banco → Criar Alimento
1. Usuário está no Banco de Alimentos
2. Clica em "+ Novo Alimento"
3. Navega para tela Criar Alimento
4. Preenche: nome, peso preparo, descrição, macros
5. Vê cálculo de calorias em tempo real
6. Salva → retorna ao Banco

### 5.6 Dieta - Swipe para Editar/Excluir
1. Usuário está no Cardápio ou Banco
2. Faz swipe lateral no card
3. Revela botões "Editar" e "Excluir"
4. Se Editar: navega para tela de edição com dados pré-preenchidos
5. Se Excluir: pop-up de confirmação → exclusão

### 5.7 Treino - Cardápio de Programas
1. Usuário está na Lista de Programas
2. Vê programas em ordem cronológica
3. Cada programa é expansível (chevron)
4. Expandido mostra blocos e exercícios internos

### 5.8 Treino - Criar Programa
1. Usuário está na Lista de Programas
2. Clica em "Novo Programa"
3. Navega para tela Criar Programa
4. Define nome do programa
5. Adiciona blocos (dias/sections)
6. Dentro de cada bloco, adiciona exercícios
7. Para cada exercício: nome, séries, reps range, técnica, reps reserva
8. Salva → retorna à Lista

### 5.9 Treino - Iniciar Sessão
1. Usuário está na Lista de Programas
2. Clica em "Iniciar" em um programa existente
3. Sistema cria nova SessaoTreino (status: em_progresso)
4. Navega para tela de Sessão com primeiro bloco expandido
5. Vê lista de exercícios do bloco atual
6. Clica em exercício para executar
7. Preenche execução: quilagem, reps feitas, reps reserva por série
8. Completa série → próxima ou vai para próximo exercício
9. Completa bloco → avança para próximo bloco
10. Completa todos blocos → botão "Finalizar"
11. Confirma → Sessão marcada como concluída, salva no histórico

### 5.10 Treino - Histórico
1. Usuário está na Lista de Programas
2. Clica em "Ver Histórico"
3. Navega para tela de Histórico
4. Vê lista de sessões concluídas (cronológica reversa)
5. Clica em sessão → vê detalhes completos
   - Data e duração
   - Programa executado
   - Blocos e exercícios realizados
   - Métricas: total séries, reps, quilagem

---

## 6. Implementation Blocks (para tasks.md)

Os blocos abaixo representam a organização lógica para criação de tasks.

### BLOCO A: Fundamentos e Infraestrutura
**Dependências:** Nenhuma

| ID | Descrição |
|----|-----------|
| A-1 | Setup e configuração do WatermelonDB (schemas de dieta e treino) |
| A-2 | Componente Header de navegação reutilizável |
| A-3 | Componentes base: Card, Button, Input, SwipeableCard |
| A-4 | Sistema de navegação (Stack/Tab) |

### BLOCO B: Módulo Dieta - Dados
**Dependências:** A-1, A-4

| ID | Descrição |
|----|-----------|
| B-1 | Schema e modelo de Alimento |
| B-2 | Schema e modelo de Refeicao |
| B-3 | Schema e modelo de ItemRefeicao |
| B-4 | Repositório de alimentos (CRUD) |
| B-5 | Repositório de refeições (CRUD) |

### BLOCO C: Módulo Dieta - UI
**Dependências:** B-1, B-2, B-3, B-4, B-5

| ID | Descrição |
|----|-----------|
| C-1 | Tela Cardápio (lista de refeições com macros) |
| C-2 | Tela Criar/Editar Alimento (formulário com cálculo de kcal) |
| C-3 | Tela Criar/Editar Refeição (com seletor de alimentos) |
| C-4 | Tela Banco de Alimentos (lista, busca, seleção em massa) |
| C-5 | Componente SwipeableCard (editar/excluir) |
| C-6 | Modal Seletor de Alimentos |
| C-7 | Componente PreviewMacros (useMemo) |

### BLOCO D: Módulo Treino - Dados
**Dependências:** A-1, A-4

| ID | Descrição |
|----|-----------|
| D-1 | Schema e modelo de Programa |
| D-2 | Schema e modelo de Bloco |
| D-3 | Schema e modelo de Exercicio |
| D-4 | Schema e modelo de SessaoTreino |
| D-5 | Schema e modelo de ExecucaoExercicio |
| D-6 | Repositório de programas (CRUD) |
| D-7 | Repositório de sessões de treino |

### BLOCO E: Módulo Treino - UI
**Dependências:** D-1, D-2, D-3, D-4, D-5, D-6, D-7

| ID | Descrição |
|----|-----------|
| E-1 | Tela Lista de Programas (com cards expansíveis) |
| E-2 | Tela Criar/Editar Programa (com builder de blocos) |
| E-3 | Componente BlocoExpandivel (chevron toggle) |
| E-4 | Tela Criar/Editar Exercício |
| E-5 | Tela Iniciar Sessão (progressão de blocos) |
| E-6 | Modal Executar Exercício (séries com inputs) |
| E-7 | Tela Histórico de Treinos |
| E-8 | Tela Detalhes da Sessão |

### BLOCO F: Dashboard
**Dependências:** C-1, E-1

| ID | Descrição |
|----|-----------|
| F-1 | Tela Dashboard unificada |
| F-2 | Widget resumo de dieta (cardápio + macros) |
| F-3 | Widget resumo de treino (programa ativo + stats) |
| F-4 | Navegação integrada Dashboard ↔ Dieta/Treino |

---

## 7. Functional Requirements

### FR-001: Dashboard Unificada
- **Descrição**: Tela inicial exibindo dieta atual e treino atual lado a lado
- **Critérios de Aceitação**:
  - [ ] Exibe resumo do cardápio do dia
  - [ ] Exibe nome do programa de treino ativo
  - [ ] Mostra estatísticas básicas (calorias consumidas, total treino semana)
  - [ ] Links de navegação para módulos Dieta e Treino

### FR-002: Sistema de Cardápio
- **Descrição**: Lista de refeições do dia com macros e calorias
- **Critérios de Aceitação**:
  - [ ] Exibe todas refeições do dia em ordem
  - [ ] Mostra macros por refeição
  - [ ] Mostra calorias por refeição
  - [ ] Mostra total calórico do dia no topo
  - [ ] Botão para criar nova refeição
  - [ ] Botão para acessar banco de alimentos

### FR-003: CRUD de Alimentos
- **Descrição**: Interface para criar/editar/excluir alimentos
- **Critérios de Aceitação**:
  - [ ] Campos: nome (obrigatório), peso preparo, descrição (opcional), macros (proteína, carboidrato, gordura)
  - [ ] Validação de campos obrigatórios
  - [ ] Cálculo de calorias automático via macros (4-4-9 kcal/g) em tempo real
  - [ ] Feedback visual de sucesso/erro

### FR-004: CRUD de Refeições (Combos)
- **Descrição**: Interface para criar refeições combinadas
- **Critérios de Aceitação**:
  - [ ] Campos: nome refeição, quantidade, estado preparo
  - [ ] Modal/selector para adicionar alimentos
  - [ ] Definição de quantidade por alimento selecionado
  - [ ] Cálculo automático de macros totais da refeição
  - [ ] Preview de macros/calorias antes de salvar

### FR-005: Banco de Alimentos
- **Descrição**: Lista completa de alimentos cadastrados
- **Critérios de Aceitação**:
  - [ ] Lista todos alimentos em scroll
  - [ ] Busca por nome (filtro em tempo real)
  - [ ] Botão para criar novo alimento
  - [ ] Seleção em massa (checkbox por item)
  - [ ] Exclusão em massa com pop-up de confirmação

### FR-006: Edição/Exclusão via Swipe
- **Descrição**: Gesture lateral em cards para ações
- **Critérios de Aceitação**:
  - [ ] Swipe revela botões editar/excluir
  - [ ] Exclusão requer confirmação via pop-up
  - [ ] Editar navega para tela de edição com dados pré-preenchidos

### FR-007: Sistema de Treino - Programas
- **Descrição**: Gestão de programas de treino com blocos
- **Critérios de Aceitação**:
  - [ ] Lista programas em ordem cronológica
  - [ ] Botão para criar novo programa
  - [ ] Cards de programa expansíveis (mostram blocos quando expandido)
  - [ ] Blocos com nome customizável
  - [ ] Botão iniciar sessão (cria nova SessaoTreino)

### FR-008: Sistema de Treino - Exercícios
- **Descrição**: Cadastro de exercícios dentro de blocos
- **Critérios de Aceitação**:
  - [ ] Campos: nome exercício, séries, repetições mín, repetições máx
  - [ ] Seletor de técnica avançada (opcional)
  - [ ] Campo reps na reserva (opcional)
  - [ ] Swipe para editar/excluir exercício

### FR-009: Interface de Blocos
- **Descrição**: Visualização de blocos expandíveis com chevron
- **Critérios de Aceitação**:
  - [ ] Blocos colapsados mostram nome e chevron
  - [ ] Clique no chevron expande/colapsa com animação
  - [ ] Exercícios exibidos como cards dentro do bloco expandido
  - [ ] Botão para adicionar exercício ao bloco

### FR-010: Sessão de Treino
- **Descrição**: Registro de execução de treino completo
- **Critérios de Aceitação**:
  - [ ] Inicia sessão a partir de programa existente
  - [ ] Header mostra progresso (bloco atual / total)
  - [ ] Lista exercícios do bloco atual
  - [ ] Modal para executar exercício com inputs por série
  - [ ] Inputs: quilagem, reps feitas, reps reserva
  - [ ] Botão para avançar entre séries e exercícios
  - [ ] Botão "Finalizar" ao completar todos blocos
  - [ ] Confirmação antes de marcar como concluído
  - [ ] Sessão salva no histórico com data e métricas

### FR-011: Histórico de Treinos
- **Descrição**: Lista de treinos executados com detalhes
- **Critérios de Aceitação**:
  - [ ] Lista sessões concluídas em ordem cronológica reversa
  - [ ] Card mostra: data, programa, duração
  - [ ] Toque no card abre detalhes da sessão
  - [ ] Detalhes mostram: blocos, exercícios, métricas (séries, reps, quilagem)
  - [ ] Resumo consolidado da sessão

### FR-012: Persistência Local
- **Descrição**: Dados salvos localmente via WatermelonDB
- **Critérios de Aceitação**:
  - [ ] Alimentos persistem entre sessões
  - [ ] Refeições persistem entre sessões
  - [ ] Programas de treino persistem entre sessões
  - [ ] Exercícios persistem entre sessões
  - [ ] Sessões de treino persistem entre sessões
  - [ ] Histórico de treinos persistem entre sessões

---

## 8. Key Entities

### Entidades de Dieta
- **Alimento**: id, nome, pesoPreparo, descricao, proteina, carboidrato, gordura, createdAt, updatedAt
- **Refeicao**: id, nome, quantidade, estadoPreparo, createdAt, updatedAt
- **ItemRefeicao**: id, refeicaoId, alimentoId, quantidade

### Entidades de Treino
- **Programa**: id, nome, dataCriacao, createdAt, updatedAt
- **Bloco**: id, programaId, nome, ordem
- **Exercicio**: id, blocoId, nome, series, repeticoesMin, repeticoesMax, tecnicaAvancada, repsReserva
- **SessaoTreino**: id, programaId, dataInicio, dataFim, status (em_progresso/concluido), createdAt
- **ExecucaoExercicio**: id, sessaoTreinoId, exercicioId, serieNumero, repsFeitas, quilagem, repsReservaFeitas

---

## 9. Non-Functional Requirements

### NFR-001: Performance
- Carregamento de lista de alimentos < 500ms
- Expansão/colapso de blocos < 100ms
- Cálculo de macros em tempo real < 50ms

### NFR-002: Usabilidade
- Feedback visual em todas ações
- Estados de loading durante operações
- Confirmação para ações destrutivas
- Animação suave em transições

### NFR-003: Mobile First
- Layout responsivo para phones
- Touch targets mínimo 44x44px
- Swipe gestures funcionais

---

## 10. Success Criteria

1. **SC-001**: Usuário consegue acessar Dashboard e navegar para Dieta ou Treino em menos de 2 segundos
2. **SC-002**: Usuário consegue criar um alimento completo em menos de 30 segundos
3. **SC-003**: Usuário consegue criar uma refeição combinada selecionando alimentos existentes
4. **SC-004**: Banco de alimentos permite busca instantânea e gestão em massa
5. **SC-005**: Usuário consegue criar programa de treino com blocos e exercícios
6. **SC-006**: Blocos expandem/colapsam com animação suave
7. **SC-007**: Usuário consegue registrar execução completa de treino (reps, quilagem, reps reserva) por série
8. **SC-008**: Usuário consegue visualizar histórico de treinos concluídos com detalhes
9. **SC-009**: Todos dados persistem corretamente após fechar e reabrir app
10. **SC-010**: Exclusão de itens requer confirmação explícita

---

## 11. Assumptions

1. WatermelonDB já instalado e configurado no projeto
2. UI components básicos disponíveis (cards, buttons, inputs)
3. Sistema de navegação funcional (React Navigation ou similar)
4. Não há autenticação - todos dados são locais ao dispositivo
5. Banco de exercícios e banco de alimentos são separados (WatermelonDB databases diferentes)
6. Calorias calculadas via macros: proteína 4kcal/g, carboidrato 4kcal/g, gordura 9kcal/g

---

## 12. Out of Scope (Fase 1)

- Autenticação de usuários
- Sincronização em nuvem
- Histórico de evolução
- Contabilização de gasto calórico de cardio/treino
- Importação/exportação de dados
- Gráficos de progresso
- Notificações e lembretes

---

## Clarifications

### 2026-05-13

- Q: Como as calorias devem ser calculadas para alimentos e refeições? → A: Cálculo automático via macros (4/4/9 kcal/g) - implementado com useMemo
- Q: Quais nutrientes adicionais devem ser trackeados além de proteína, carbo e gordura? → A: Apenas macros (proteína, carboidrato, gordura)
- Q: O usuário precisa registrar execução de treino? Como? → A: Sessão de treino com registro completo: iniciar programa → entrar em exercício → preencher execução (reps feitas, quilagem, reps reserva) para cada série → marcar concluído → salvar em histórico

---

## Resumo de Blocos para Tasks

| Bloco | Tasks | Dependências |
|-------|-------|---------------|
| **A - Fundamentos** | A-1 a A-4 | Nenhuma |
| **B - Dieta Dados** | B-1 a B-5 | A-1, A-4 |
| **C - Dieta UI** | C-1 a C-7 | B-1 a B-5 |
| **D - Treino Dados** | D-1 a D-7 | A-1, A-4 |
| **E - Treino UI** | E-1 a E-8 | D-1 a D-7 |
| **F - Dashboard** | F-1 a F-4 | C-1, E-1 |

**Total de Tasks:** ~31 tasks organizados em 6 blocos com dependências claras

---

## Mapeamento Fluxo → Tasks

### Fluxo Dieta Completo
```
Cardápio (C-1) → Criar Refeição (C-3) → Seletor Alimentos (C-6)
Cardápio (C-1) → Banco Alimentos (C-4)
Banco Alimentos (C-4) → Criar Alimento (C-2)
```

### Fluxo Treino Completo
```
Lista Programas (E-1) → Criar Programa (E-2) → Blocos (E-3) → Exercícios (E-4)
Lista Programas (E-1) → Iniciar Sessão (E-5) → Executar Exercício (E-6)
Lista Programas (E-1) → Histórico (E-7) → Detalhes (E-8)
```