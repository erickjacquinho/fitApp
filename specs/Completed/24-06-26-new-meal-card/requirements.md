# Requirements: Novo Cartão de Refeição

## Descrição da Funcionalidade
O componente `MealCard` atual e seus filhos (`FoodEntryCard`, `MealMacrosSummary`) serão refatorados visualmente para seguir as proporções definidas no wireframe e organizar a exibição da informação de forma mais harmoniosa e padronizada.

## Acceptance Criteria (EARS Pattern)

1. **Estrutura e Proporções:**
   - WHEN o cartão de refeição for renderizado, THEN o sistema SHALL respeitar as seguintes proporções visuais baseadas no wireframe:
     - Altura do Cabeçalho (Título e Hora) = 1x
     - Altura do Cartão de Alimento = 1,5x
     - Altura do Resumo da Refeição (Macros) = 1x
     - Altura do Botão Adicionar Alimentos = 1x
   - WHEN o componente é construído, THEN o sistema SHALL manter o `MacroProportionBar` exatamente entre o cabeçalho e o primeiro alimento (ou container de alimentos).

2. **Cabeçalho (Header):**
   - WHEN renderizado, THEN o sistema SHALL mostrar o Nome da Refeição e, opcionalmente, um placeholder de horário ("00:00" ou a hora real se implementada no modelo) no lado direito.

3. **Cartões de Alimentos:**
   - WHEN renderizados, THEN o sistema SHALL exibir o nome do alimento, a porção (ex: "[preparo], 100g"), o valor calórico em destaque, e os macros condensados ("P: 00 C: 00 G: 00").

4. **Rodapé (Resumo e Botão):**
   - WHEN houver alimentos na refeição, THEN o sistema SHALL exibir o total de macros e calorias no formato "P: 00 C: 00 G: 00 kcal: 00".
   - WHEN renderizar o botão de adicionar, THEN o sistema SHALL exibir com o texto "+ Adicionar Alimentos", ocupando largura total ou centralizado com proporção de 1x.

## Failure Scenarios (Edge/Error Cases)
- **Refeição Vazia:** Se não houver alimentos, o cartão apenas mostrará o cabeçalho, o separador (vazio/cinza), e o botão de Adicionar Alimentos, suprimindo o resumo de macros (ou zerado).

## Out-of-Scope
- Não será implementado lógica de arrastar para reordenar alimentos neste cartão (se houver, continuaremos com o fluxo padrão atual).
- A hora real da refeição só será exibida se o modelo do DB possuir esse campo de forma fácil, caso contrário será "00:00" como estipulado no wireframe visual, até haver task de backend.
