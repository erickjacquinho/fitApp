# Tasks - Etapa 6: Dashboard

## Phase 1: Dashboard Widgets
- [ ] T001 [US1] Implementar `src/features/dashboard/components/WidgetDieta.tsx`
- [ ] T002 [US1] Implementar `src/features/dashboard/components/WidgetTreino.tsx`
- [ ] T003 [US1] Criar `src/features/dashboard/components/DashboardScreen.tsx` e organizar layout

## Phase 2: Data Hooks
- [ ] T004 [US1] Implementar `src/features/dashboard/hooks/useDashboardMetrics.ts` para consulta de dados agregados
- [ ] T005 [US1] Integrar observáveis para atualização em tempo real na Dashboard

## Phase 3: Final Integration
- [ ] T006 [US1] Configurar rota inicial em `app/(tabs)/index.tsx` para exibir a Dashboard
- [ ] T007 [US1] Garantir navegação profunda funcional a partir de todos os widgets
- [ ] T008 [US1] Implementar Empty States para quando não houver dados cadastrados

## Phase 4: Validation
- [ ] T009 Validar atualização da Dashboard após adicionar um alimento
- [ ] T010 Validar atualização da Dashboard após concluir um treino
- [ ] T011 Testar navegação de "ponta a ponta" (Dashboard -> Dieta -> Dashboard)
- [ ] T012 Executar validação final de tipos e linting em todo o projeto
