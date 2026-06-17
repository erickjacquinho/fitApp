# Requirements - Etapa 2: Módulo Dieta - Dados

## 1. Visão Geral
Esta etapa foca na implementação da lógica de dados específica para o módulo de Dieta, incluindo a finalização dos modelos WatermelonDB e a criação de serviços/repositórios para operações CRUD.

## 2. Cenários de Usuário
- **Cenário 1: Gestão de Alimentos**
  - O sistema permite salvar, editar e excluir alimentos no banco de dados.
- **Cenário 2: Montagem de Refeições**
  - O usuário pode criar uma refeição associando múltiplos alimentos a ela.
- **Cenário 3: Consulta Rápida**
  - O sistema retorna a lista de alimentos cadastrados para busca ou seleção.

## 3. Requisitos Funcionais

### 3.1 Modelos de Dados (WatermelonDB)
- **RF-01:** O sistema SHALL implementar o Modelo `Alimento` com todos os campos nutricionais.
- **RF-02:** O sistema SHALL implementar o Modelo `Refeicao`.
- **RF-03:** O sistema SHALL implementar o Modelo `ItemRefeicao` para gerenciar a relação Many-to-Many entre Alimento e Refeicao.

### 3.2 Repositórios (Services)
- **RF-04:** O sistema SHALL fornecer o `AlimentoService` com métodos: `create`, `update`, `delete`, `getAll`, `search`.
- **RF-05:** O sistema SHALL fornecer o `RefeicaoService` com métodos para criar refeições e gerenciar seus itens de forma atômica (batch operations).
- **RF-06:** O sistema SHALL garantir que todas as escritas sejam feitas via `@writer` ou `database.write`.

## 4. Critérios de Aceite (EARS)
- **WHEN** um novo alimento for salvo, **THEN** o sistema SHALL persistir os dados no WatermelonDB.
- **WHEN** uma refeição for excluída, **THEN** o sistema SHALL excluir também os registros de `ItemRefeicao` associados (cascading manual ou automático).
- **WHEN** buscar por um alimento, **THEN** o sistema SHALL retornar resultados filtrados pelo nome.

## 5. Critérios de Sucesso
- Repositórios de Dieta implementados e testados (mesmo que via console log).
- Relações entre tabelas funcionando corretamente.
- Operações de escrita respeitando as diretrizes do WatermelonDB (batching e writers).