# Design: Visão Macro do Treino em Execução

## 1. Arquitetura de Componentes

### `WorkoutSessionScreen.tsx`
- **Header:** Mantém o componente `<Header />` apenas com o botão de voltar (`headerLeft`). O título e `headerRight` serão removidos.
- **Top Content:** Novo sub-componente ou seção no topo do `ScrollView` contendo:
  - Título do treino (`Text variant="h1"` ou similar).
  - Botão de Concluir (`Button variant="primary"` seguindo o Blue-first).
- **Progresso Global:** Manter o `TrainingProgressBar` logo abaixo do Top Content.
- **Lista de Exercícios:** Mapeamento do array `exercises`, renderizando o novo componente `MacroExerciseListItem`.

### `MacroExerciseListItem.tsx` (Novo Componente)
Componente responsável por exibir o resumo do exercício na lista.
- **Props:**
  - `exercise`: Dados do exercício (nome, id, etc).
  - `order`: Número da ordem (index + 1).
  - `completedSets`: Número de séries concluídas.
  - `totalSets`: Número total de séries planejadas.
  - `onMenuPress`: Callback para abertura do dropdown menu.
- **Estrutura Visual (Flexbox):**
  - Container principal: `flex-row items-center p-4 border-b border-border-subtle bg-surface`.
  - **Esquerda (Ordem):** Container de tamanho fixo com o número em destaque (ex: cor text-text-tertiary, fonte um pouco maior).
  - **Meio (Info):** `flex-1 ml-3`.
    - Nome do exercício (`Text variant="subtitle" text-text-primary`).
    - Subtítulo de progresso (`Text variant="body" text-text-secondary` indicando "Y/X séries concluídas").
  - **Direita (Ação):** Botão/Ícone de ellipsis (`lucide-react-native/MoreVertical`) para o dropdown menu. (Assumindo a direita pela convenção de UX, pendente confirmação).

## 2. Decisões de Estado e Hooks
- O hook `useWorkoutSession` já provê a maioria dos dados necessários:
  - `block.name` (para o título).
  - `exercises` (para listar).
  - `getExerciseExecutions(item.id)` para calcular o número de séries concluídas (`executions.length`) versus séries totais (pode requerer cruzar com `exercise.sets`).
- Precisaremos garantir que a lógica de "séries totais" esteja acessível (geralmente baseada em `exercise.sets` ou configuração do plano).

## 3. Considerações do Dupla-Design (UI/UX Pro Max)
- **Hierarquia Visual:** O Botão "Concluir" no topo deve ser muito claro, mas não deve competir com a ação principal de "Tocar no exercício para treinar".
- **Feedback Visual (Progresso):** Se `completedSets === totalSets`, a UI pode sutilmente indicar conclusão (ex: opacidade reduzida ou um check icon verde ao lado do nome).
- **Touch Targets:** Garantir que o botão do Dropdown Menu seja englobado num `Pressable` com padding generoso (`p-2` no mínimo) para atingir os 44x44pt.
