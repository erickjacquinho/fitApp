# Tasks: Refatoração de Arquivos Grandes

- `[ ]` **1. Refatoração Base (Styles & Config)**
  - `[ ]` 1.1 Limpar `tailwind.config.js` removendo tokens não utilizados e consolidando cores.
  - `[ ]` 1.2 Limpar `global.css` removendo classes legadas.

- `[ ]` **2. Refatoração UI Components (Shared)**
  - `[ ]` 2.1 Refatorar `SwipeableRow.tsx`: extrair lógicas de animação para hooks customizados dedicados se houver complexidade, ou apenas remover código inútil.
  - `[ ]` 2.2 Refatorar `dropdown-menu.tsx`: aplicar princípios de clean code, possivelmente extraindo sub-componentes (Menu Item, Menu Trigger).

- `[ ]` **3. Refatoração Feature: Training**
  - `[ ]` 3.1 `ProgramForm.tsx`: dividir em sub-componentes menores (FormHeader, FormInputs, FormActions).
  - `[ ]` 3.2 `useProgramForm.ts`: extrair lógicas de validação e submit para helpers puros.
  - `[ ]` 3.3 `WorkoutSessionScreen.tsx`: quebrar a interface gigante em componentes menores.
  - `[ ]` 3.4 `BlockDetailsScreen.tsx` e `WorkoutExerciseKanbanScreen.tsx`: limpar código inútil, otimizar renderizações.
  - `[ ]` 3.5 Services (`workout-service.ts`, `session-service.ts`): extrair queries compartilhadas, reduzir redundância.

- `[ ]` **4. Refatoração Feature: Diet**
  - `[ ]` 4.1 `MenuScreen.tsx`: extrair componentes visuais da lógica da tela.
  - `[ ]` 4.2 `FoodBankScreen.tsx`: refatorar listagem e hooks de estado.
  - `[ ]` 4.3 `CalendarSummaryScreen.tsx`: componentizar lógicas de calendário.
  - `[ ]` 4.4 `MealCard.tsx`: enxugar props e lógicas internas para renderização mais rápida.

- `[ ]` **5. Refatoração Core/DB**
  - `[ ]` 5.1 `migrations.ts`: limpar e consolidar, se aplicável, sem perder integridade dos dados históricos (atenção especial de testes aqui).

- `[ ]` **6. Qualidade & Validação**
  - `[ ]` 6.1 Executar linter global e corrigir qualquer warning introduzido.
  - `[ ]` 6.2 Validar build Android e realizar testes manuais nas rotas de Treino e Dieta para garantir ausência de crashes.
