# Tasks: Componente de Swipe Modular

## Fase 1: Atualização da Primitiva
- [x] **1.1** Modificar `SwipeableRow.tsx` para tipar `SwipeFeature` (apenas `delete` e `edit`) e adicionar o `FEATURE_CONFIG`. (Skill: `frontend-developer`)
- [x] **1.2** Atualizar as propriedades do componente, removendo o `onDelete` estático e criando a lógica que aceita `features`. (Skill: `frontend-developer`)
- [x] **1.3** Refatorar `renderRightActions` para iterar sobre o array de features e construir a UI baseada no `FEATURE_CONFIG`. (Skill: `ui-ux-pro-max`)
- [x] **1.4** Refazer a lógica do listener do `autoTrigger` para ser dinâmico e suportar segurança contra disparos múltiplos via dicionário em `useRef`. (Skill: `javascript-pro`)

## Fase 2: Integração e Refatoração de Consumidores
- [x] **2.1** Atualizar `FoodCardMeal.tsx`: Remover import de `Trash2`, ajustar chamada de `SwipeableRow` para `<SwipeableRow features={onDelete ? ['delete'] : undefined} onDelete={onDelete}>`. (Skill: `frontend-developer`)
- [x] **2.2** Atualizar `FoodCardList.tsx`: Remover import de `Trash2`, ajustar chamada de `SwipeableRow` analogamente. (Skill: `frontend-developer`)

## Fase 3: Verificação Visual (UI/UX)
- [x] **3.1** Garantir que o botão continue com visualização de bloco (`rounded-none`, `w-16`).
- [x] **3.2** Verificar acessibilidade garantindo que os leitores de tela leiam os atributos `accessibilityLabel` corretos vindos do config.

*Nota: As fases 1 e 2 já foram pré-executadas em prototipação e alinhamento prévio, restando apenas a validação e conclusão formal. Validação concluída.*
