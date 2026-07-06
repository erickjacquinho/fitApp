# Especificação: Refatoração do Treino Ativo (Kanban)

## 1. Visão Geral
O fluxo da tela de "Treino em andamento" (active workout) está sendo refatorado para eliminar o uso de modais pop-up. O objetivo é adotar uma visualização baseada em colunas estilo Kanban, oferecendo uma interação fluida e focada onde cada exercício possui seu próprio espaço, e suas séries são manipuladas diretamente em cards expansíveis (chevrons).

## 2. Requisitos Funcionais
1. **Remoção de Modal**: O componente `ExecuteExerciseModal` será eliminado. Toda a iteração com as séries ocorrerá diretamente na página do treino.
2. **Layout em Colunas (Kanban)**: 
   - A listagem vertical de exercícios será convertida em uma visualização de páginas/colunas (ex: Carrossel Horizontal ou FlatList paginada).
   - Cada "página" (coluna) da tela representará 1 exercício.
3. **Cards de Séries (Séries como Cards)**:
   - Dentro da coluna do exercício atual, as séries são listadas como cards agrupados empilhados.
   - Cada série será um card colapsado por padrão.
   - O card deve possuir um ícone de "chevron" (seta) para expandir ou retrair.
   - Quando expandido, exibe os inputs de Peso (Weight) e Repetições (Reps) e botão de salvar.
   - Quando colapsado, mostra um resumo rápido (ex: "Série 1 - 12x 50kg" ou pendente).
4. **Navegação Kanban**:
   - O usuário pode deslizar lateralmente para navegar entre as colunas dos diferentes exercícios do treino.
   - Um indicador de paginação (bolinhas, similar ao carrossel do Instagram) deve estar presente fixo na tela para orientar o usuário sobre qual exercício ele está, quantos faltam e quantos já passaram.
5. **Integração de Estado**: As lógicas de `handleSaveSet` e `handleDeleteSet` devem ser preservadas, mas aplicadas aos novos Cards diretamente, acionando as atualizações do `WorkoutSessionScreen`.

## 3. Critérios de Sucesso
- A tela não exibe nenhum Modal para a edição de exercícios.
- É possível deslizar horizontalmente e visualizar todos os exercícios do treino atual.
- O usuário consegue expandir, preencher (peso e reps) e salvar uma série diretamente no Kanban.
- A experiência do usuário no mobile não é prejudicada por scrolls horizontais confusos (o snap de coluna deve ser de 1 exercício por vez).

## 4. UI/UX & Regras FitApp 
*(Derivado do dupla-design e ui-ux-pro-max)*
- **Touch Targets**: Os chevrons e inputs devem ter ao menos 44x44px.
- **Micro-interações**: Animações de acordeão (expandir a série) devem ocorrer entre 150-300ms.
- **Componentes**: Deve usar primariamente `<Card>`, `<Text>` e ícones do `lucide-react-native` padronizados na pasta `src/components/ui`. Nenhuma dependência não aprovada deve ser inserida.
- **Sem Scroll Horizontal Duplo**: Utilizar um `FlatList` com `pagingEnabled={true}` ou `snapToInterval` exato na largura da tela para navegar entre os exercícios sem sobrepor a navegação de sistema.
