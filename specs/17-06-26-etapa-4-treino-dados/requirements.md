# Requirements - Etapa 4: Módulo Treino - Dados

## 1. Visão Geral
Esta etapa foca na persistência e lógica de dados para o módulo de Treino, incluindo a estruturação de programas de treino, blocos e a captura de sessões de treino ativas.

## 2. Cenários de Usuário
- **Cenário 1: Planejamento de Treino**
  - O usuário cria um programa e define os blocos (ex: Treino A, Treino B).
- **Cenário 2: Registro de Sessão**
  - O usuário inicia um treino e o sistema salva o início e o fim da sessão.
- **Cenário 3: Registro de Performance**
  - O usuário salva peso e repetições para cada série de cada exercício.

## 3. Requisitos Funcionais

### 3.1 Modelos de Dados (WatermelonDB)
- **RF-01:** O sistema SHALL implementar os Modelos: `Programa`, `Bloco`, `Exercicio`.
- **RF-02:** O sistema SHALL implementar os Modelos de execução: `SessaoTreino` e `ExecucaoExercicio`.

### 3.2 Repositórios (Services)
- **RF-03:** O sistema SHALL fornecer o `TreinoService` para gerenciar a criação de programas e blocos.
- **RF-04:** O sistema SHALL fornecer o `SessaoService` para registrar o início, progresso e conclusão de um treino.

### 3.3 Regras de Negócio
- **RF-05:** O sistema SHALL calcular automaticamente o volume total de carga (kg * reps) ao finalizar uma sessão (opcional nesta etapa, obrigatório na UI).

## 4. Critérios de Aceite (EARS)
- **WHEN** um programa for excluído, **THEN** o sistema SHALL excluir em cascata todos os blocos e exercícios associados.
- **WHEN** uma sessão de treino for finalizada, **THEN** o sistema SHALL atualizar o status para "concluído" e salvar o timestamp final.
- **WHEN** adicionar uma execução de exercício, **THEN** o sistema SHALL vincular corretamente à sessão e ao exercício original.

## 5. Critérios de Sucesso
- Estrutura hierárquica (Programa -> Bloco -> Exercício) funcionando no DB.
- Histórico de sessões sendo persistido corretamente.
- Performance de consulta otimizada para carregar o programa completo com seus exercícios.