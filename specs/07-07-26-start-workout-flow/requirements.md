# Especificação: Fluxo de Início de Treino por Botão

## 1. Visão Geral
Atualmente, o fluxo para iniciar um treino no FitApp depende de um gesto de swipe horizontal ("deslizar para a direita") na listagem de treinos do programa. Esse gesto sofre de problemas graves de usabilidade: falta de descoberta visual, conflito de gestos com a reordenação (drag and drop) e scroll vertical, além de forçar o usuário a iniciar o treino sem poder visualizar a lista de exercícios planejados primeiro.

Esta especificação define a remoção do swipe e a introdução de uma ação clara com o botão "Iniciar Treino" na página individual do treino (detalhes do bloco).

## 2. Requisitos Funcionais

1. **Desativação do Swipe na Listagem**:
   - O componente `WorkoutListItem` (na visualização resumida do plano) não deve mais utilizar o wrapper `ReanimatedSwipeable`.
   - O card deve ser um elemento de toque simples padrão (que abre os detalhes do treino) e toque longo (long press para reordenação quando aplicável).

2. **Botão de Início de Treino**:
   - A tela de detalhes do treino (`BlockDetailsScreen`) terá um botão primário com o rótulo "Iniciar Treino".
   - Este botão deve ser posicionado de forma fixa (sticky) no rodapé do container principal da tela, permanecendo sempre visível abaixo da lista rolável de exercícios planejados.

3. **Verificação de Sessão Ativa**:
   - Ao pressionar o botão "Iniciar Treino", o fluxo deve verificar a existência de sessões de treino ativas:
     - Se houver uma sessão ativa vinculada a **outro programa**, exibe um modal de confirmação (`ConfirmModal`) com o título "Treino em andamento" e descrição orientando a finalizar ou retomar a sessão existente.
     - Se houver uma sessão ativa para o **mesmo programa**, o app deve redirecionar o usuário diretamente para a tela de treino em andamento (`/training/active`) com o ID da sessão ativa para que ele a retome.
     - Caso não haja nenhuma sessão ativa, cria uma nova sessão via `SessionService.startSession` e redireciona o usuário para a tela `/training/active`.

## 3. Critérios de Sucesso
- Nenhum comportamento de deslizar (swipe) para iniciar o treino existe na listagem de rotinas.
- Clicar em um bloco de treino na lista de treinos leva o usuário para a tela de detalhes.
- O usuário consegue ver todos os exercícios planejados e clicar no botão "Iniciar Treino" na parte inferior.
- O controle de sessões ativas (retomar ou avisar sobre treino em andamento de outro programa) funciona exatamente como antes, mas disparado a partir da tela de detalhes.
