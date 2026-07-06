# Design Técnico: Treino Ativo Kanban

## 1. Arquitetura da Tela
A página `c:\Programmer\fitApp\app\training\active.tsx` vai continuar como contêiner, mas `WorkoutSessionScreen.tsx` será radicalmente alterado:
- Sai: `ExerciseListItem`, `ExecuteExerciseModal`.
- Entra: `ExerciseColumnPager`, `ExerciseColumn`, `SetCard`.

## 2. Componentes Novos

### `ExerciseColumnPager` (ou Pager na raiz do WorkoutSessionScreen)
- **Tecnologia**: `Animated.FlatList` ou `FlatList` com `pagingEnabled={true}` e `horizontal={true}`.
- **Largura**: A largura de cada item será a largura exata da tela (ou `width - padding`).
- **Estado**: Gerenciará qual é a página ativa (índice do exercício).
- **Indicador (Dots)**: Componente `PaginationDots` no formato carrossel do Instagram.

### `PaginationDots` (Componente Modular)
- **Localização**: `src/components/ui/PaginationDots.tsx` (ou `molecules`).
- **Design**: Monocromático, funcional, simples e discreto.
- **Layout**: Sem fundo (transparente), ocupando apenas a largura necessária para as bolinhas (não ocupará a largura inteira da tela).
- **Reusabilidade**: Receberá `totalItems` e `activeIndex` como props para ser usado em qualquer outra tela.

### `ExerciseColumn`
- Componente que representa 1 Exercício no Kanban.
- Exibe o cabeçalho do Exercício (nome, meta, músculos, etc.).
- Renderiza uma `ScrollView` vertical com a listagem dos `SetCard`.
- Exibe um botão de "Adicionar Série" no rodapé.

### `SetCard` (Acordeão de Série)
- **Tecnologia**: `<Card>` com `Reanimated` para gerenciar o estado colapsado vs expandido.
- **Estado Interno**: `isExpanded`.
- **Visão Colapsada**:
  - Título ("Série 1")
  - Indicador de Concluído (badge success) ou Pendente.
  - Resumo de valores (ex: 12x 50kg).
  - Ícone de `ChevronDown` ou `ChevronUp`.
- **Visão Expandida**:
  - O conteúdo abre (height animado).
  - Exibe o `SetInputRow` atual (já existente, porém adaptado) ou campos nativos.
  - Botão Salvar, Botão Excluir.

## 3. Fluxo de Dados e Hooks
O `useWorkoutSession` permanecerá em grande parte intocado:
- `handleSaveSet` e `handleDeleteSet` serão passados para cada `ExerciseColumn`, e dela para os `SetCard`s.
- `initialExecutions` será calculado diretamente na `ExerciseColumn` a partir do `getExerciseExecutions`.

## 4. UI/UX Handling (Dupla-Design)
- A barra de progresso (botão "Segure para finalizar treino") precisa ficar disponível na interface global (fora do paginador), possivelmente fixado no final da tela principal ou no rodapé do Pager, para que não precise navegar até a última coluna para finalizar.
- Cores de fundo: Usar `bg-background` para a tela, e os cards usarão estilo padrão. Evitar poluição visual (sombras duplas).
