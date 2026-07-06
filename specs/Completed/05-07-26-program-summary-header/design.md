# Design: Refatoração do Header & Swipeable Atalho

## 1. Data Layer
- **`src/db/queries/program.ts`**:
  - Criar `observeProgramCompletedSessions(programId: string)` utilizando `.query(Q.where('program_id', programId), Q.where('status', 'completed')).observeCount()`.
- **`src/features/training/hooks/useProgramSummary.ts`**:
  - Consumir `observeProgramCompletedSessions` e expor `completedSessionsCount`.

## 2. UI Layer: O Header (`[id].tsx`)
- Elevar a chamada de `useProgramSummary(id)` para dentro de `[id].tsx`.
- Usar as propriedades `customTitle` e `headerRight` do componente genérico `<Header>` para reconstruir o layout do topo.
- `customTitle`: Container flex em coluna centralizado. Título `font-bold text-text-primary`. Subtítulo menor `text-text-secondary`.
- `headerRight`: `<Button variant="ghost" size="icon"> <Icon as={Edit2} /> </Button>`.

## 3. UI Layer: O Card e o Swipeable (`WorkoutListItem.tsx`)
- Envolver `BaseCardList` com `Swipeable` do `react-native-gesture-handler/ReanimatedSwipeable` ou da própria `react-native-gesture-handler`. Se o projeto usar Reanimated v3, deve usar componentes compatíveis. *Nota: o app parece utilizar RNGH. Checaremos a importação de Swipeable.*
- Propriedade `renderLeftActions`: Retornar uma View verde (`bg-primary` ou similar, baseada nos tokens) contendo o ícone de Play e texto.
- Propriedade `onSwipeableOpen` (ou disparando ao completar o swipe): Invocar a função `handleStartSession(block.id)` via nova prop passada pelo pai.
- Como o `WorkoutListItem` está dentro de um `DraggableFlatList`, garantir que o Swipeable utilize um threshold adequado e possivelmente `simultaneousHandlers` se houver conflito, mas tipicamente o Swipeable lida bem se houver separação de eixos (horizontal vs vertical).

## 4. Limpeza (`ProgramSummaryScreen.tsx`)
- Modificar o componente para ser "stateless" em relação a dados, recebendo `program`, `blocks`, `completedSessionsCount`, etc., via props.
- O método `handleStartSession` (que checa conflito e cria sessão) será mantido aqui ou em `[id].tsx`. Provavelmente melhor mantê-lo em `[id].tsx` e passar o callback via props.
- Remover modais antigos e código do "Action Card".
