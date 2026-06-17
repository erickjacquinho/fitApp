# Requirements - Etapa 5: Módulo Treino - UI

## 1. Visão Geral
Esta etapa foca na interface de usuário do módulo de Treino, abrangendo desde a criação de programas até a execução detalhada de cada sessão de treino.

## 2. Cenários de Usuário
- **Cenário 1: Builder de Treino**
  - O usuário adiciona exercícios a um bloco e define as séries e repetições pretendidas.
- **Cenário 2: Treino em Tempo Real**
  - O usuário segue a lista de exercícios e marca cada série como feita, inserindo a carga utilizada.
- **Cenário 3: Consulta de Histórico**
  - O usuário visualiza seus treinos passados e analisa o volume total.

## 3. Requisitos Funcionais

### 3.1 Telas de Fluxo
- **RF-01:** O sistema SHALL exibir a tela `ListaProgramasScreen` com cards dos programas.
- **RF-02:** O sistema SHALL exibir a tela `SessaoTreinoScreen` (treino ativo).
- **RF-03:** O sistema SHALL exibir a tela `HistoricoTreinoScreen` e `DetalhesSessaoScreen`.

### 3.2 Componentes Específicos
- **RF-04:** O sistema SHALL implementar o componente `BlocoExpandivel` com animação de altura e chevron.
- **RF-05:** O sistema SHALL implementar o `ExecutarExercicioModal` para preenchimento de quilagem e reps por série.

### 3.3 Interações
- **RF-06:** O sistema SHALL exibir progresso visual durante o treino (ex: 2/4 exercícios concluídos).
- **RF-07:** O sistema SHALL solicitar confirmação antes de finalizar uma sessão.

## 4. Critérios de Aceite (EARS)
- **WHEN** o cabeçalho do Bloco for pressionado, **THEN** o sistema SHALL expandir ou recolher a lista de exercícios.
- **WHEN** uma série for marcada como concluída, **THEN** o sistema SHALL salvar os dados instantaneamente no DB.
- **WHEN** o treino for finalizado, **THEN** o sistema SHALL navegar para a tela de Resumo/Detalhes.

## 5. Critérios de Sucesso
- Interface fluida e intuitiva para uso durante o esforço físico (botões grandes, inputs claros).
- Persistência garantida mesmo que o app seja fechado durante o treino.
- Navegação entre as fases do treino (Bloco 1 -> Bloco 2) sem fricção.