# Tasks: Novo Cartão de Refeição

1. **Refatorar Cabeçalho do Cartão (Skill: frontend-developer)**
   - Target: `src/features/diet/components/MealCard.tsx`
   - Source: `design.md` -> Componentes Afetados (1)
   - Trace: `requirements.md` -> Estrutura e Proporções, Cabeçalho
   - Ação: Modificar o cabeçalho no `MealCardContent`. Exibir o título da refeição à esquerda e "00:00" à direita (usar a mesma fonte do wireframe ou similar, possivelmente variante `subtitle`). O botão de exclusão (lixeira) pode ficar ao lado do horário. Garantir altura 1x (`min-h-12` ou classe do token). Manter a barra de macros diretamente abaixo do cabeçalho.

2. **Refatorar FoodEntryCard (Skill: frontend-developer)**
   - Target: `src/features/diet/components/FoodEntryCard.tsx`
   - Source: `design.md` -> Componentes Afetados (2)
   - Trace: `requirements.md` -> Cartões de Alimentos
   - Ação: Ajustar layout para ter maior respiro (altura ~1.5x do cabeçalho). O nome do alimento e a descrição de porção (ex: "100g") devem ficar alinhados à esquerda (nome em cima, porção em baixo). À direita (ou em layout fluido), as calorias no topo e as macros formatadas como "P: {p} C: {c} G: {f}" embaixo. 

3. **Refatorar Resumo da Refeição (Skill: frontend-developer)**
   - Target: `src/features/diet/components/MealMacrosSummary.tsx`
   - Source: `design.md` -> Componentes Afetados (3)
   - Trace: `requirements.md` -> Rodapé
   - Ação: Simplificar o componente para renderizar apenas um texto condensado: "P: {macros.protein} C: {macros.carbs} G: {macros.fat} kcal: {macros.calories}", centralizado com altura 1x e bordas/separadores se necessário (conforme wireframe).

4. **Refatorar Botão Adicionar Alimentos (Skill: frontend-developer)**
   - Target: `src/features/diet/components/MealCard.tsx`
   - Source: `design.md` -> Componentes Afetados (1)
   - Trace: `requirements.md` -> Rodapé
   - Ação: No final da listagem do `MealCard`, alterar o botão existente. Modificar o texto para "+ Adicionar Alimentos", ajustar sua classe/variante para ficar mais limpo e amigável, assegurando altura visual de 1x.

5. **Validação Final**
   - Executar: `npx tsc --noEmit && npx expo-doctor`
