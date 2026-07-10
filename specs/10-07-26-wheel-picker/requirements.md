# Requirements: Wheel Picker & Demo Page
**Slug:** `10-07-26-wheel-picker`

## 1. Feature Description
O projeto necessita de um componente de entrada de dados baseado em gestos do tipo "Roleta" (Wheel Picker) nativo em React Native, sem uso de teclados numéricos, voltado para registro ágil de variáveis de treino (carga, repetições, duração). 
Além disso, uma página de demonstração (Demo) acessível pelo Header da Dashboard deve ser criada para testar e homologar o comportamento.

## 2. User Stories
- **Como usuário**, eu quero deslizar verticalmente sobre as opções de números/palavras, para que eu possa selecionar valores com apenas uma mão e sem ativar o teclado.
- **Como usuário**, eu quero sentir um feedback tátil (vibração) cada vez que meu dedo arrastar e engatar em um novo valor, para ter a sensação de uma engrenagem mecânica real.
- **Como usuário**, eu quero ver o número atual em destaque (maior) e os números imediatamente anterior e próximo levemente visíveis enquanto rolo a lista, para saber o que está por vir.
- **Como usuário**, quando eu solto o dedo e a roleta para, eu quero que os valores adjacentes desapareçam suavemente, restando apenas o número que selecionei no centro, garantindo foco extremo na informação final.
- **Como QA/Desenvolvedor**, quero acessar uma página de exemplos a partir da Dashboard para testar diferentes casos de uso do Wheel Picker (números pequenos, números grandes, palavras).

## 3. Visual & Animation Constraints (Dupla-Design & 12 Principles)
- **Zero Hardcoded Styles:** Para componentes React nativos puros, usar tokens NativeWind. Exceção: `Reanimated.View` pode usar interpoladores matemáticos para transform.
- **Física:** Rolagem (Scroll) baseada na inércia padrão do SO. Ao repousar (settle), as animações de opacidade devem usar Molas (Springs) ao invés de Easing linear.
- **Dimensões & Acessibilidade:** Altura do item de toque de no mínimo 44px (Usaremos 56px para melhor legibilidade).
- **Visibilidade Estrita:** Apenas o item central deve ter opacidade total (1) e escala normal (1). Durante a rolagem `isScrolling = true`, apenas 1 item acima e 1 item abaixo podem aparecer com escala menor e opacidade reduzida.
- **Repouso Absoluto:** Quando `isScrolling = false`, qualquer item diferente do central deve ter opacidade interpolada em mola para `0`.
