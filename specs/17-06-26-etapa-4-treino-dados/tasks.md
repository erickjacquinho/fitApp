# Tasks - Etapa 4: Módulo Treino - Dados

## Phase 1: Models (Training)
- [ ] T001 [US1] Implementar `src/db/models/Programa.ts`
- [ ] T002 [US1] Implementar `src/db/models/Bloco.ts`
- [ ] T003 [US1] Implementar `src/db/models/Exercicio.ts`
- [ ] T004 [US1] Implementar `src/db/models/SessaoTreino.ts`
- [ ] T005 [US1] Implementar `src/db/models/ExecucaoExercicio.ts`

## Phase 2: Services (Training logic)
- [ ] T006 [US1] Criar tipos de DTO em `src/features/training/types.ts`
- [ ] T007 [US1] Implementar `src/features/training/services/workout-service.ts` (CRUD Programas)
- [ ] T008 [US1] Implementar `src/features/training/services/session-service.ts` (Execução de treino)
- [ ] T009 [US1] Exportar serviços e tipos em `src/features/training/index.ts`

## Phase 3: Validation
- [ ] T010 Validar hierarquia de modelos no WatermelonDB
- [ ] T011 [P] Criar teste de script para validar criação de programa complexo (múltiplos blocos/exercícios)
- [ ] T012 Executar `npx tsc` para validar tipos do módulo de treino
