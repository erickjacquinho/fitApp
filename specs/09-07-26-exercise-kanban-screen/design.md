# Design: Kanban Screen para Registro de Séries

## 1. Arquitetura do Componente (ui-ux-pro-max + frontend-design)
O componente será construído utilizando o padrão "Pager" nativo (via `FlatList` com `horizontal` e `pagingEnabled`).

- **Rotas**: `app/training/exercise-kanban.tsx` (Tela que recebe os parâmetros e inicia a navegação).
- **Componentes**:
  - `WorkoutExerciseKanbanScreen.tsx` (Organismo principal que orquestra a paginação e os dados do treino).
  - `PaginationDots`: No topo do `Screen`.
  - `FlatList`: Contém os "Cards" do Kanban. A view visível é detectada via `onViewableItemsChanged` para atualizar os `PaginationDots`.
  - `WorkoutExerciseCard.tsx`: A página/coluna em si. Terá uma lista local de "Sets" (séries).

## 2. Decisões de Estado e Performance
- `FlatList` é ideal para paginação de itens com tamanho idêntico (largura da tela), `snapToInterval` será igual à largura da tela.
- **Memória**: Como as listas de exercícios tendem a ter de 4 a 10 exercícios, o `FlatList` não terá grandes gargalos de memória usando a propriedade `windowSize`.
- **Animações (Reanimated)**: O scroll horizontal será nativo, sem necessidade complexa de reanimated, exceto para interações do usuário.

## 3. Estrutura Visual
- **Top**: `Header` minimalista contendo um botão de voltar para a tela anterior ("Treino em andamento") e o componente `<PaginationDots />` logo abaixo.
- **Body**: 
  - Título do exercício grande no topo do "card".
  - Seção de histórico de cargas.
  - Tabela/Lista de séries para logar as reps/cargas.

## 4. Integração WatermelonDB
- O roteador passará o `sessionId` e o `initialExerciseIndex` (ou `initialExerciseId`) para a Kanban Screen.
- A Kanban Screen usa o hook `useWorkoutSession` para buscar a lista de exercícios e passar para o `FlatList`.
- Ao deslizar o Kanban (Pager), a prop `initialScrollIndex` deve colocar o usuário no exercício que ele clicou na Macro View.
