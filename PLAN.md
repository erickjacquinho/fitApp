# fitApp - Plano de Implementação

## 1. Visão Geral do Plano

Este plano organiza a implementação do fitApp em **6 fases** seguindo as dependências dos blocos:

| Fase | Blocos | Tasks | Dependências |
|------|--------|-------|--------------|
| 1 | A - Fundamentos | A-1 a A-4 | Nenhuma |
| 2 | B - Dieta Dados | B-1 a B-5 | A-1, A-4 |
| 3 | C - Dieta UI | C-1 a C-7 | B-1 a B-5 |
| 4 | D - Treino Dados | D-1 a D-7 | A-1, A-4 |
| 5 | E - Treino UI | E-1 a E-8 | D-1 a D-7 |
| 6 | F - Dashboard | F-1 a F-4 | C-1, E-1 |

**Total: 31 tasks**

---

## 2. Fase 1: Fundamentos e Infraestrutura

### A-1: Setup WatermelonDB
**Descrição**: Configurar schemas de dieta e treino
**Arquivo**: `src/database/`
**Entregáveis**:
- [ ] Schema de dieta (Alimento, Refeicao, ItemRefeicao)
- [ ] Schema de treino (Programa, Bloco, Exercicio, SessaoTreino, ExecucaoExercicio)
- [ ] Setup de database provider

### A-2: Header de Navegação
**Descrição**: Componente Header reutilizável
**Arquivo**: `src/components/Header.tsx`
**Entregáveis**:
- [ ] Props: título, showBackButton, onBackPress
- [ ] Estilo consistente com design system
- [ ] Safe area handling

### A-3: Componentes Base
**Descrição**: Componentes UI fundamentais
**Arquivos**: `src/components/ui/`
**Entregáveis**:
- [ ] Card.tsx - container básico com sombra
- [ ] Button.tsx - primário, secundário, destructive
- [ ] Input.tsx - texto, número com validação
- [ ] SwipeableCard.tsx - gesture de swipe
- [ ] ConfirmModal.tsx - pop-up de confirmação

### A-4: Sistema de Navegação
**Descrição**: Stack e Tab navigation
**Arquivo**: `src/navigation/`
**Entregáveis**:
- [ ] TabNavigator - Dieta, Treino, Dashboard
- [ ] StackNavigator por módulo
- [ ] Tipos de navegação tipados

---

## 3. Fase 2: Módulo Dieta - Dados

### B-1: Schema Alimento
**Descrição**: Modelo Alimento no WatermelonDB
**Arquivo**: `src/database/models/Alimento.ts`
**Entregáveis**:
- [ ] Fields: id, nome, pesoPreparo, descricao, proteina, carboidrato, gordura
- [ ] Timestamps: createdAt, updatedAt
- [ ] Relações: none (leaf entity)

### B-2: Schema Refeicao
**Descrição**: Modelo Refeicao
**Arquivo**: `src/database/models/Refeicao.ts`
**Entregáveis**:
- [ ] Fields: id, nome, quantidade, estadoPreparo
- [ ] Relations: hasMany ItemRefeicao
- [ ] Timestamps

### B-3: Schema ItemRefeicao
**Descrição**: Modelo ItemRefeicao (junction)
**Arquivo**: `src/database/models/ItemRefeicao.ts`
**Entregáveis**:
- [ ] Fields: id, quantidade
- [ ] Relations: belongsTo Refeicao, belongsTo Alimento

### B-4: Repositório de Alimentos
**Descrição**: CRUD operations para alimentos
**Arquivo**: `src/database/repositories/alimentos.ts`
**Entregáveis**:
- [ ] create(data): Alimento
- [ ] update(id, data): Alimento
- [ ] delete(id): void
- [ ] getAll(): Alimento[]
- [ ] getById(id): Alimento
- [ ] search(query): Alimento[]

### B-5: Repositório de Refeições
**Descrição**: CRUD operations para refeições
**Arquivo**: `src/database/repositories/refeicoes.ts`
**Entregáveis**:
- [ ] create(data, items): Refeicao
- [ ] update(id, data, items): Refeicao
- [ ] delete(id): void
- [ ] getAll(): Refeicao[]
- [ ] getById(id): Refeicao (com items carregados)
- [ ] getWithAlimentos(refeicaoId): RefeicaoComItems

---

## 4. Fase 3: Módulo Dieta - UI

### C-1: Tela Cardápio
**Descrição**: Lista de refeições do dia
**Arquivo**: `src/screens/dieta/CardapioScreen.tsx`
**Entregáveis**:
- [ ] Header: "Cardápio" + total calórico
- [ ] Lista de refeição cards com macros
- [ ] Botão "+ Nova Refeição"
- [ ] Botão "Banco de Alimentos"
- [ ] Pull-to-refresh

### C-2: Tela Criar/Editar Alimento
**Descrição**: Formulário de alimento completo
**Arquivo**: `src/screens/dieta/CriarAlimentoScreen.tsx`
**Entregáveis**:
- [ ] Inputs: nome, peso preparo, descrição
- [ ] Inputs macros: proteína, carboidrato, gordura
- [ ] Preview calories (useMemo) - cálculo em tempo real
- [ ] Validação de campos obrigatórios
- [ ] Botões: Salvar, Cancelar

### C-3: Tela Criar/Editar Refeição
**Descrição**: Formulário de refeição com seletor
**Arquivo**: `src/screens/dieta/CriarRefeicaoScreen.tsx`
**Entregáveis**:
- [ ] Inputs: nome, quantidade, estado preparo
- [ ] Botão "Adicionar Alimento" → abre modal
- [ ] Lista de alimentos selecionados com quantidade
- [ ] Preview macros totais (useMemo)
- [ ] Botões: Salvar, Cancelar

### C-4: Tela Banco de Alimentos
**Descrição**: Lista completa com gestão
**Arquivo**: `src/screens/dieta/BancoAlimentosScreen.tsx`
**Entregáveis**:
- [ ] Search bar com filtro
- [ ] Lista de alimentos em cards
- [ ] Swipeable para edit/delete
- [ ] Mode seleção em massa (checkbox)
- [ ] Botões: + Novo, ☑ Selecionar, 🗑️ Excluir

### C-5: Componente SwipeableCard
**Descrição**: Gesture de swipe reutilizável
**Arquivo**: `src/components/ui/SwipeableCard.tsx`
**Entregáveis**:
- [ ] Swipe left revela ações
- [ ] Configurable: Editar, Excluir
- [ ] Confirmation on delete
- [ ] Haptic feedback

### C-6: Modal Seletor de Alimentos
**Descrição**: Modal para selecionar alimentos
**Arquivo**: `src/components/dieta/SeletorAlimentosModal.tsx`
**Entregáveis**:
- [ ] Lista de alimentos com busca
- [ ] Input quantidade por item
- [ ] Checkbox seleção
- [ ] Botão "Confirmar" adiciona à refeição

### C-7: Componente PreviewMacros
**Descrição**: Display de macros calculado
**Arquivo**: `src/components/dieta/PreviewMacros.tsx`
**Entregáveis**:
- [ ] Props: alimentos[], quantities[]
- [ ] Cálculo useMemo: proteína, carbo, gordura, calorias
- [ ] Display formatado

---

## 5. Fase 4: Módulo Treino - Dados

### D-1: Schema Programa
**Descrição**: Modelo Programa
**Arquivo**: `src/database/models/Programa.ts`
**Entregáveis**:
- [ ] Fields: id, nome, dataCriacao
- [ ] Relations: hasMany Bloco
- [ ] Timestamps

### D-2: Schema Bloco
**Descrição**: Modelo Bloco (dia de treino)
**Arquivo**: `src/database/models/Bloco.ts`
**Entregáveis**:
- [ ] Fields: id, programaId, nome, ordem
- [ ] Relations: belongsTo Programa, hasMany Exercicio

### D-3: Schema Exercicio
**Descrição**: Modelo Exercicio
**Arquivo**: `src/database/models/Exercicio.ts`
**Entregáveis**:
- [ ] Fields: id, blocoId, nome, series, repeticoesMin, repeticoesMax, tecnicaAvancada, repsReserva
- [ ] Relations: belongsTo Bloco

### D-4: Schema SessaoTreino
**Descrição**: Modelo SessaoTreino
**Arquivo**: `src/database/models/SessaoTreino.ts`
**Entregáveis**:
- [ ] Fields: id, programaId, dataInicio, dataFim, status
- [ ] Relations: belongsTo Programa, hasMany ExecucaoExercicio

### D-5: Schema ExecucaoExercicio
**Descrição**: Modelo ExecucaoExercicio
**Arquivo**: `src/database/models/ExecucaoExercicio.ts`
**Entregáveis**:
- [ ] Fields: id, sessaoTreinoId, exercicioId, serieNumero, repsFeitas, quilagem, repsReservaFeitas
- [ ] Relations: belongsTo SessaoTreino, belongsTo Exercicio

### D-6: Repositório de Programas
**Descrição**: CRUD para programas
**Arquivo**: `src/database/repositories/programas.ts`
**Entregáveis**:
- [ ] create(data, blocos): Programa
- [ ] update(id, data, blocos): Programa
- [ ] delete(id): void
- [ ] getAll(): Programa[]
- [ ] getById(id): Programa (com blocos e exercícios)

### D-7: Repositório de Sessões
**Descrição**: CRUD para sessões de treino
**Arquivo**: `src/database/repositories/sessoes.ts`
**Entregáveis**:
- [ ] create(programaId): SessaoTreino
- [ ] update(id, data): SessaoTreino
- [ ] finalize(id): SessaoTreino (status: concluido)
- [ ] getAll(): SessaoTreino[] (histórico)
- [ ] getById(id): SessaoTreino (com execuções)
- [ ] addExecucao(sessaoId, exercicioId, serie, data): ExecucaoExercicio

---

## 6. Fase 5: Módulo Treino - UI

### E-1: Tela Lista de Programas
**Descrição**: Home do módulo treino
**Arquivo**: `src/screens/treino/ListaProgramasScreen.tsx`
**Entregáveis**:
- [ ] Lista de programas em ordem cronológica
- [ ] Cards expansíveis (expandir/blocos)
- [ ] Botão "Novo Programa"
- [ ] Botão "Iniciar" em cada programa
- [ ] Botão "Histórico"

### E-2: Tela Criar/Editar Programa
**Descrição**: Builder de programa com blocos
**Arquivo**: `src/screens/treino/CriarProgramaScreen.tsx`
**Entregáveis**:
- [ ] Input nome do programa
- [ ] Lista de blocos (adicionar/remover)
- [ ] Bloco expandível (mostra exercícios)
- [ ] Botão "Adicionar Exercício" por bloco
- [ ] Botões: Salvar, Cancelar

### E-3: Componente BlocoExpandivel
**Descrição**: Bloco com toggle
**Arquivo**: `src/components/treino/BlocoExpandivel.tsx`
**Entregáveis**:
- [ ] Header: nome do bloco + chevron
- [ ] Chevron toggle (expand/collapse)
- [ ] Animated height transition
- [ ] Lista de exercícios dentro
- [ ] Botão adicionar exercício

### E-4: Tela Criar/Editar Exercício
**Descrição**: Formulário de exercício
**Arquivo**: `src/screens/treino/CriarExercicioScreen.tsx`
**Entregáveis**:
- [ ] Inputs: nome, séries, repetições mín/máx
- [ ] Select técnica avançada (opcional)
- [ ] Input reps na reserva (opcional)
- [ ] Botões: Salvar, Cancelar

### E-5: Tela Iniciar Sessão
**Descrição**: Progressão de blocos durante treino
**Arquivo**: `src/screens/treino/SessaoTreinoScreen.tsx`
**Entregáveis**:
- [ ] Header: nome programa + progresso (bloco X/Y)
- [ ] Lista de exercícios do bloco atual
- [ ] Botão "Executar" em cada exercício
- [ ] Botão "Finalizar" (aparece ao completar bloco)
- [ ] Confirmação ao finalizar

### E-6: Modal Executar Exercício
**Descrição**: Preenchimento de execução por série
**Arquivo**: `src/components/treino/ExecutarExercicioModal.tsx`
**Entregáveis**:
- [ ] Header: nome exercício, série atual/total
- [ ] Info: reps programadas, range
- [ ] Lista de inputs por série:
  - [ ] Quilagem (kg)
  - [ ] Reps feitas
  - [ ] Reps reserva
- [ ] Botão "Feito" por série
- [ ] Botões: Anterior, Próximo

### E-7: Tela Histórico de Treinos
**Descrição**: Lista de sessões concluídas
**Arquivo**: `src/screens/treino/HistoricoScreen.tsx`
**Entregáveis**:
- [ ] Lista de sessões (cronológica reversa)
- [ ] Card: data, programa, duração
- [ ] Tap → navegação para detalhes

### E-8: Tela Detalhes da Sessão
**Descrição**: Resumo completo da sessão
**Arquivo**: `src/screens/treino/DetalhesSessaoScreen.tsx`
**Entregáveis**:
- [ ] Header: data, programa
- [ ] Lista de blocos executados
- [ ] Exercícios com métricas (quilagem, reps)
- [ ] Resumo consolidado:
  - Total séries
  - Total reps
  - Total quilagem

---

## 7. Fase 6: Dashboard

### F-1: Tela Dashboard
**Descrição**: Visão unificada
**Arquivo**: `src/screens/DashboardScreen.tsx`
**Entregáveis**:
- [ ] Layout: cards de dieta e treino
- [ ] Widget resumo dieta (C-2)
- [ ] Widget resumo treino (F-3)
- [ ] Estatísticas básicas (F-4)
- [ ] Links de navegação para módulos

### F-2: Widget Resumo Dieta
**Descrição**: Card de resumo alimentar
**Arquivo**: `src/components/dashboard/WidgetDieta.tsx`
**Entregáveis**:
- [ ] Calorias consumidas / meta
- [ ] Progress bar calórico
- [ ] Resumo de macros do dia

### F-3: Widget Resumo Treino
**Descrição**: Card de resumo de treino
**Arquivo**: `src/components/dashboard/WidgetTreino.tsx`
**Entregáveis**:
- [ ] Nome do programa ativo
- [ ] Treinos da semana
- [ ] Último treino realizado

### F-4: Navegação Integrada
**Descrição**: Links Dashboard ↔ Dieta/Treino
**Entregáveis**:
- [ ] Botão "Ver mais" em widgets
- [ ] Navegação para módulos específicos

---

## 8. Ordem de Implementação Recomendada

```
SEMANA 1: Fundamentos
├── A-1: WatermelonDB Setup
├── A-2: Header
├── A-3: Componentes Base
└── A-4: Navegação

SEMANA 2-3: Dieta (Dados + UI)
├── B-1 a B-3: Schemas dieta
├── B-4 a B-5: Repositórios dieta
├── C-1: Cardápio
├── C-2: Criar Alimento
├── C-3: Criar Refeição
├── C-5: SwipeableCard
├── C-6: Modal Seletor
└── C-7: PreviewMacros

SEMANA 4-5: Treino (Dados + UI)
├── D-1 a D-5: Schemas treino
├── D-6 a D-7: Repositórios treino
├── E-1: Lista Programas
├── E-2: Criar Programa
├── E-3: Bloco Expandível
├── E-4: Criar Exercício
├── E-5: Iniciar Sessão
├── E-6: Executar Exercício
├── E-7: Histórico
└── E-8: Detalhes Sessão

SEMANA 6: Dashboard
├── F-1: Dashboard
├── F-2: Widget Dieta
├── F-3: Widget Treino
└── F-4: Navegação
```

---

## 9. Dependências Entre Tasks

```
A-1 → (B-1, B-2, B-3, D-1, D-2, D-3, D-4, D-5)
A-4 → (B-4, B-5, D-6, D-7)

B-1, B-2, B-3, B-4, B-5 → (C-1, C-2, C-3, C-4, C-5, C-6, C-7)
D-1, D-2, D-3, D-4, D-5, D-6, D-7 → (E-1, E-2, E-3, E-4, E-5, E-6, E-7, E-8)

C-1, E-1 → (F-1)
```

---

## 10. Critérios de Conclusão

- [ ] Fase 1 completa: App compila e navega
- [ ] Fase 2 completa: CRUD alimentos/refeições funciona
- [ ] Fase 3 completa: UI dieta completa e funcional
- [ ] Fase 4 completa: CRUD programas/exercícios funciona
- [ ] Fase 5 completa: UI treino completa e funcional
- [ ] Fase 6 completa: Dashboard integrado
- [ ] Todos os fluxos de usuário testados
- [ ] Dados persistem entre sessões