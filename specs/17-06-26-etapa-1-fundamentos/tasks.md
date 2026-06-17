# Tasks - Etapa 1: Fundamentos e Infraestrutura

## Phase 1: Setup
- [ ] T001 Criar estrutura de diretórios em `src/db/models/`, `src/features/`, e `src/components/atoms/`
- [ ] T002 Configurar dependências do WatermelonDB no `package.json` (se não presentes)

## Phase 2: Foundation (WatermelonDB)
- [ ] T003 [P] Criar esquema inicial em `src/db/schema.ts` conforme design
- [ ] T004 [P] Configurar instância do database em `src/db/index.ts`
- [ ] T005 Implementar classes de Modelos base em `src/db/models/` (Alimento, Refeicao, etc.)
- [ ] T006 [P] Criar hook `src/hooks/use-database.ts` para acesso simplificado ao DB

## Phase 3: [US1] Navegação (Expo Router)
- [ ] T007 [US1] Configurar `app/_layout.tsx` com `DatabaseProvider` e `SafeAreaProvider`
- [ ] T008 [US1] Implementar `app/(tabs)/_layout.tsx` com o Bottom Tab Navigator
- [ ] T009 [US1] [P] Criar telas placeholder: `app/(tabs)/index.tsx`, `app/(tabs)/diet.tsx`, `app/(tabs)/training.tsx`

## Phase 4: [US2] Componentes Base & Header
- [ ] T010 [US2] [P] Implementar `src/components/atoms/Typography.tsx` usando NativeWind
- [ ] T011 [US2] [P] Implementar `src/components/atoms/Button.tsx` com variantes de estilo
- [ ] T012 [US2] [P] Implementar `src/components/atoms/Card.tsx` base
- [ ] T013 [US2] [P] Implementar `src/components/atoms/Input.tsx` com suporte a tipos
- [ ] T014 [US2] Implementar `src/components/molecules/Header.tsx` com suporte a navegação
- [ ] T015 [US2] Implementar `src/components/molecules/SwipeableCard.tsx` usando Gesture Handler
- [ ] T016 [US2] Implementar `src/components/organisms/ConfirmModal.tsx`

## Phase 5: Polish & Validation
- [ ] T017 Integrar Header global em `app/(tabs)/_layout.tsx` ou telas individuais
- [ ] T018 Executar `npx tsc` e `npm run lint` para validar integridade
- [ ] T019 Validar navegação entre abas e renderização dos componentes base na tela Dashboard

## Dependency Graph
T003, T004 -> T005 -> T007
T007 -> T008 -> T009
T010, T011, T012, T013 -> T014, T015, T016
T014 -> T017
T009, T017 -> T019
