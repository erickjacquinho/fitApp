# Requirements: SwipeableRow Refactor — Centralização & Tokens

## Contexto
O `SwipeableRow` funciona mecanicamente (gestos, auto-delete, haptic), mas a API pública **não escala** e a implementação **viola o design system** (cores hex hardcoded, dark mode quebrado). Há também um consumidor (`FoodCardList.tsx`) usando uma API inexistente (`rightActions`).

---

## RF-01: Registry Pattern Centralizado
O componente DEVE manter um registro interno (`FEATURE_REGISTRY`) de todas as ações possíveis (delete, edit, e futuras como archive, share, duplicate, pin). O consumidor seleciona ações apenas pelo `features` array, sem precisar conhecer configurações visuais.

- [x] Definido

## RF-02: Handlers Record
O componente DEVE aceitar um **`handlers` record** (`Record<SwipeFeature, () => void>`) em vez de props individuais (`onDelete`, `onEdit`). Isso elimina a necessidade de adicionar uma prop para cada feature nova.

- [x] Definido

## RF-03: Tokens Semânticos
Todas as cores do componente DEVEM vir de `useThemeColors()` usando as chaves semânticas do `ThemeColors` (`error`, `primary`, `textInverse`). Cores hex hardcoded são proibidas. O componente DEVE funcionar corretamente em dark mode.

- [x] Definido

## RF-04: Correção do Consumidor FoodCardList
O `FoodCardList.tsx` DEVE ser atualizado para usar a nova API (`features` + `handlers`), substituindo a prop inexistente `rightActions`.

- [x] Definido

## RF-05: Correção do Consumidor FoodCardMeal
O `FoodCardMeal.tsx` DEVE ser atualizado para usar a nova API (`features` + `handlers`), substituindo as props individuais `onDelete`/`onEdit`.

- [x] Definido

## RF-06: Extensibilidade do Type
O `SwipeFeature` union type DEVE ser facilmente extensível. Adicionar uma nova feature deve exigir apenas: (1) adicionar ao union type, (2) adicionar ao `FEATURE_REGISTRY` com token semântico e ícone.

- [x] Definido

## RNF-01: Zero Breaking Changes no Comportamento
O gesto de swipe, auto-delete, haptic feedback, overscroll fill, e animações de entrada NÃO devem mudar. Apenas a API pública e as cores mudam.

- [x] Definido
