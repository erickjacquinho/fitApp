# Requirements: Kanban Screen para Registro de Séries

## 1. Descrição Geral
O usuário quer poder clicar no card de um exercício na "Macro View" (Treino em andamento) e ser levado para uma "Micro View" (Registro de Séries) que funcionará num modelo de Kanban/Carrossel horizontal.

## 2. Requisitos de UX (ui-ux-pro-max)
- **Navegação Contínua**: Ao invés de abrir e fechar telas para cada exercício, o usuário entra na "Kanban Screen" e pode deslizar lateralmente para acessar os exercícios anterior/próximo.
- **Contexto Visual**: No topo da tela, deve haver o componente `PaginationDots` exibindo o total de exercícios no treino e em qual ele está atualmente.
- **Isolamento de Foco**: Cada página do Kanban deve mostrar as informações de um único exercício por vez (Nome, histórico, botão de substituir) e a lista de séries (Sets) para preenchimento (Carga e Repetições) e botões de marcação de "Concluído".

## 3. Requisitos de UI (frontend-design)
- Utilizar o componente genérico `<Screen>` para gerenciar as SafeAreas de forma segura no topo e no rodapé.
- O layout de cada coluna/card do Kanban deve preencher a tela, garantindo rolagem vertical apenas para a lista de séries caso seja muito grande.
- Animações super fluidas no arrasto horizontal.
- Tipografia e Cores devem seguir estritamente o `theme.ts` do FitApp (Mineral Warm, Helvetica).

## 4. Integração de Dados
- Utilizar os hooks do WatermelonDB (`useWorkoutSession` ou variação) para buscar as séries concluídas do exercício exibido.
- Sincronização em tempo real: preencher uma série salva automaticamente no banco e reflete na Macro View ao voltar.
