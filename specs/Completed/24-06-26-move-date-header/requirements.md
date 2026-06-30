# Requirements: Mover Sistema de Data para Header

## Descrição da Funcionalidade
O seletor de datas (`DateSelector`) deve ser movido do corpo principal da tela `MenuScreen` (aba Dieta) para o cabeçalho (Header), substituindo ou integrando-se ao título atual da tela, conforme o novo wireframe de design.

## Acceptance Criteria (EARS Pattern)

1. **Exibição do Seletor no Header:**
   - WHEN o usuário acessa a aba Dieta (`MenuScreen`), THEN o sistema SHALL exibir o componente `DateSelector` centralizado na área do cabeçalho (header).
   - WHEN o `DateSelector` é renderizado no header, THEN o sistema SHALL remover o componente `DateSelector` do corpo da página (abaixo do header).

2. **Interação e Funcionalidade:**
   - WHEN o usuário clica nas setas de navegação do `DateSelector` no header, THEN o sistema SHALL atualizar a data selecionada na aplicação.
   - WHEN a data é alterada via header, THEN o sistema SHALL recarregar os dados diários (macros, refeições) correspondentes à nova data.

3. **Responsividade e Layout:**
   - WHEN o dispositivo possui diferentes tamanhos de tela, THEN o sistema SHALL manter o `DateSelector` alinhado e centralizado no header sem sobrepor os botões de ações (`headerLeft` e `headerRight`).

## Failure Scenarios (Edge/Error Cases)
- **Falha ao carregar dados da nova data:** Se a troca de data falhar por problemas no banco de dados local (WatermelonDB), o sistema deve exibir o Skeleton loader ou manter a tela no estado anterior com um aviso de erro silencioso.
- **Espaço insuficiente no Header:** Em telas muito pequenas (como iPhone SE) onde `headerLeft` e `headerRight` ocupam muito espaço, o `DateSelector` pode sofrer truncamento. O design do `DateSelector` deve se ajustar ou os ícones devem ter espaçamento adequado.

## Out-of-Scope
- Criação de um novo calendário (o `CalendarDays` modal/página continua o mesmo).
- Refatoração interna da lógica de como a data é armazenada (continuaremos usando o estado `selectedDate` atual e passando para o `MenuScreen`).
- Modificação dos resumos de macro e calorias (isso será feito em um SDD separado).
