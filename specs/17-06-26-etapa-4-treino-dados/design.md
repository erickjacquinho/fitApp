# Design - Etapa 4: Módulo Treino - Dados

## 1. Mapeamento de Entidades
Localização: `src/db/models/`

- **Programa.ts**: `@children('blocos') blocos!: Query<Bloco>`
- **Bloco.ts**: `@relation('programas', 'programa_id') programa!: Relation<Programa>`, `@children('exercicios') exercicios!: Query<Exercicio>`
- **Exercicio.ts**: `@relation('blocos', 'bloco_id') bloco!: Relation<Bloco>`
- **SessaoTreino.ts**: `@relation('programas', 'programa_id') programa!: Relation<Programa>`, `@children('execucao_exercicio') execucoes!: Query<ExecucaoExercicio>`
- **ExecucaoExercicio.ts**: `@relation('sessao_treino', 'sessao_treino_id') sessao!: Relation<SessaoTreino>`, `@relation('exercicios', 'exercicio_id') exercicio!: Relation<Exercicio>`

## 2. Camada de Serviços
Localização: `src/features/training/services/`

- **workout-service.ts**:
  - `createProgram(data: ProgramaDTO, blocos: BlocoDTO[])`
  - `addExerciseToBloco(blocoId: string, exerciseData: ExercicioDTO)`
- **session-service.ts**:
  - `startSession(programaId: string)`
  - `logSet(sessaoId: string, exercicioId: string, data: ExecucaoDTO)`
  - `finishSession(sessaoId: string)`

## 3. Tipos
Localização: `src/features/training/types.ts`

- `ProgramaDTO`, `BlocoDTO`, `ExercicioDTO`, `ExecucaoDTO`.

## 4. Performance
- Uso de `Q.sortBy('ordem', Q.asc)` para listar blocos e exercícios.
- Batching em `createProgram` para evitar múltiplas transações no DB.