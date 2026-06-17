# Tasks - Etapa 2: Módulo Dieta - Dados

## Phase 1: Models
- [ ] T001 [US1] Finalizar implementação de `src/db/models/Alimento.ts` com decoradores
- [ ] T002 [US1] Implementar `src/db/models/Refeicao.ts` com relação `@children`
- [ ] T003 [US1] Implementar `src/db/models/ItemRefeicao.ts` com relações `@relation`

## Phase 2: Services (CRUD)
- [ ] T004 [US1] Criar tipos de DTO em `src/features/diet/types.ts`
- [ ] T005 [US1] Implementar `src/features/diet/services/alimento-service.ts` com métodos CRUD
- [ ] T006 [US1] Implementar `src/features/diet/services/refeicao-service.ts` com lógica de batching para itens
- [ ] T007 [US1] Exportar serviços e tipos em `src/features/diet/index.ts`

## Phase 3: Validation
- [ ] T008 Validar modelos no WatermelonDB (verificar se tabelas são criadas corretamente)
- [ ] T009 [P] Criar um script de teste simples ou usar o console para validar `create` e `getAll` de alimentos
- [ ] T010 Executar `npx tsc` para validar tipos do módulo de dieta
