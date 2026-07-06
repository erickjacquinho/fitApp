# Requirements: Refatoração do Header da Tela Resumo do Programa & Atalho nos Cards

## 1. Visão Geral
O objetivo é simplificar a interface da tela de "Resumo do Programa" (`app/training/program/[id].tsx`), removendo o atual "Action Card" e movendo as informações vitais para o `<Header>` da tela de forma minimalista. Adicionalmente, implementar um atalho "Swipe to Start" nos cards de treino para facilitar o início imediato de um bloco, sem a necessidade de modais ou transições extras.

## 2. Requisitos Funcionais
1. **Header Customizado**: 
   - Nome do programa como título principal no Header.
   - Abaixo do título: "Iniciado em [data de criação do programa]" e "[número] de treinos completos".
   - Lado direito do Header: Botão discreto "Editar" com ícone, redirecionando para a edição do plano.
2. **Swipeable nos Cards (Atalho Iniciar)**: 
   - Ao invés do Long Press, usaremos um gesto *Leading Swipe* (deslizar da esquerda para a direita) nos itens da lista (`WorkoutListItem`) para revelar e acionar um atalho de "Iniciar treino".
3. **Limpeza da UI Antiga**: 
   - Remoção completa do "Action Card" (que antes continha título, contador de treinos e botão "Segure para iniciar treino").
   - Remoção dos estados de modais não utilizados e dependências desnecessárias do `ProgramSummaryScreen`.

## 3. Requisitos Não Funcionais (UI/UX)
- **Minimalismo**: Aplicar guidelines de `frontend-design`. A tipografia substitui os cards na comunicação de dados cruciais. Cores secundárias para metadados (datas, contagens).
- **Interação Fluida (Swipeable)**: Usar `react-native-gesture-handler` (ex: `Swipeable`) com animação fluida para a ação do card, proporcionando feedback visual satisfatório sem conflitar com o scroll/drag da lista.

## 4. Arquitetura e Modelagem
- A data "Iniciado em" virá da propriedade `createdAt` de `Program`.
- O número de "treinos completos" será calculado buscando a contagem de `WorkoutSession` finalizados (status === 'completed') via WatermelonDB para o `programId` atual.
