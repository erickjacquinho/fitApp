# Requirements: Visão Macro do Treino em Execução

## 1. Visão Geral
Refatorar a tela principal de treino em execução (`WorkoutSessionScreen.tsx`) para apresentar uma **visão macro** focada no progresso geral do treino, em vez de exibir a lista detalhada de séries (que será movida para outra interface futuramente).

## 2. Requisitos de Interface (UI)
- **Header Simplificado:** Remover o título do treino e o botão "Finalizar" do `Header` padrão.
- **Cabeçalho de Conteúdo:** Adicionar o Título do Treino e o botão "Concluir" no topo do conteúdo rolável (`ScrollView`).
- **Remoção de Componente:** Excluir da tela atual a listagem detalhada de séries (`ExerciseColumn`).
- **Lista Macro de Exercícios:** Substituir por uma nova lista onde cada item (exercício) apresenta:
  - **Ordem:** Numeração do exercício (ex: 1, 2, 3...) na extrema esquerda.
  - **Identificação:** Nome do exercício no centro/topo.
  - **Progresso:** Texto descritivo de progresso abaixo do nome, no formato "Y/X séries concluídas" (ex: "0/3 séries concluídas").
  - **Ação:** Um ícone para abrir um dropdown menu. (O usuário mencionou "à esquerda", mas geralmente ícones de menu ficam à direita. Adicionamos isso nas perguntas em aberto).

## 3. Requisitos de Experiência (UX) & Dupla-Design
- **Clareza de Progresso:** O usuário precisa bater o olho e saber exatamente em que ponto do treino está.
- **Acessibilidade:** Textos grandes e legíveis para durante o treino (Helvetica Now Display/Text).
- **Estilo Visual:** Adotar paleta Mineral Warm e seguir a regra Blue-first para botões primários (botão "Concluir" em destaque).
- **Interação de Toque (Touch):** O ícone de menu e as áreas de toque dos exercícios devem ter no mínimo 44x44pt.

## 4. Dúvidas / Perguntas em Aberto
1. **Posição do Ícone de Menu:** Foi solicitado "à esquerda" tanto para a numeração quanto para o ícone de menu. É preferível ter a numeração à esquerda e o ícone de menu (três pontinhos) à direita do item para melhor equilíbrio visual?
2. **Ação ao clicar no exercício:** Nesta visão macro, o que acontece ao tocar no meio/nome do exercício? Abre uma nova tela/modal para preencher as séries?
