# Requirements: Novo Resumo Diário de Macros e Calorias

## Descrição da Funcionalidade
O componente `DailyBalance` atual será substituído ou refatorado para alinhar-se ao novo design. O novo componente exibirá um gráfico radial de calorias consumidas à esquerda e uma tabela condensada de macronutrientes (Proteínas, Carboidratos e Gorduras) à direita, mostrando a proporção (em porcentagem) e a quantidade (em gramas).

## Acceptance Criteria (EARS Pattern)

1. **Exibição do Gráfico Radial:**
   - WHEN o componente é renderizado, THEN o sistema SHALL exibir um gráfico circular (radial progress) à esquerda contendo as calorias totais no centro (ex: "1600 Cal").
   - WHEN os dados das refeições são calculados, THEN o sistema SHALL preencher o arco do gráfico proporcionalmente às calorias consumidas em relação à meta diária. (Se não houver meta ainda, pode exibir o total ou um círculo completo por enquanto).

2. **Exibição dos Macronutrientes:**
   - WHEN o componente é renderizado, THEN o sistema SHALL exibir três colunas à direita do gráfico radial: Prot, Carb, Fat.
   - WHEN o usuário tem macros calculados, THEN o sistema SHALL mostrar em cada coluna a proporção percentual no topo (ex: "50%") e as gramas consumidas logo abaixo (ex: "00 g").

3. **Layout e Posicionamento:**
   - WHEN o componente for exibido, THEN o sistema SHALL manter o alinhamento flexível, com o gráfico à esquerda e as colunas de macros alinhadas à direita.

## Failure Scenarios (Edge/Error Cases)
- **Falta de dados / Divisão por zero:** Se as calorias ou macros forem 0, o sistema deve exibir "0 g", "0%" e o gráfico radial deve mostrar 0% de progresso sem quebrar. Se não houver meta de calorias definida globalmente, o percentual dos macros pode ser relativo ao total consumido no dia.

## Out-of-Scope
- Não será implementado nesta task a configuração da "Meta de Calorias/Macros" do usuário (o cálculo de % usará uma constante temporária ou será relativo ao consumo total de macros no momento se a meta não existir no modelo).
- Não refatoraremos o banco de dados.
