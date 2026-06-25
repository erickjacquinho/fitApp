# Design: Novo Cartão de Refeição

## Componentes Afetados

1. **`src/features/diet/components/MealCard.tsx`**:
   - Manter o `Card`.
   - Cabeçalho: Ajustar para exibir o título da refeição (à esquerda) e a hora à direita ("00:00" hardcoded por agora ou vindo de props se houver). Garantir altura padronizada 1x (ex: `min-h-control-md` ou classe específica de sizing Tailwind do fitApp).
   - Manter `MacroProportionBar` logo abaixo do cabeçalho.
   - Botão Adicionar Alimentos: Atualizar estilo visual. Alterar variant para ficar parecido com o wireframe (ex: botão outline, ghost ou link) com o texto "+ Adicionar Alimentos". Altura 1x.

2. **`src/features/diet/components/FoodEntryCard.tsx`**:
   - Refatorar layout para ter 1,5x a altura do header. Pode-se usar padding generoso ou um height fixo `h-[1.5 * control_height]`.
   - Lado esquerdo: Nome em cima. O preparo e a porção embaixo (ex: "Cozido, 100g").
   - Lado direito superior: Calorias.
   - Lado direito inferior (ou linha inteira embaixo): Macros formatados como "P: 00 C: 00 G: 00".

3. **`src/features/diet/components/MealMacrosSummary.tsx`**:
   - Converter o visual atual (que mostra 4 views separadas) para uma linha condensada: "P: 00 C: 00 G: 00 kcal: 00".
   - Alinhar na base do cartão antes do botão de adicionar. Altura 1x.

## Estilo e Tokens
- Todos os tamanhos (heights) serão baseados nos tokens do Tailwind (`h-control-md`, `h-control-lg`, etc) para manter proporção 1x e 1.5x de forma consistente. Exemplo: Se header é `min-h-12`, a comida seria `min-h-[72px]`.
- Cores de fonte: text-primary para informações principais, text-secondary para macros e porções.
