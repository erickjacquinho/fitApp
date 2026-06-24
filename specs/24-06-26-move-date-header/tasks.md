# Tasks: Mover Sistema de Data para Header

1. **Atualizar Tipagem do Header e MainTabScreen (Skill: frontend-developer)**
   - Target: `src/components/molecules/Header.tsx` e `src/components/organisms/main-tab-screen.tsx`
   - Source: `design.md` -> Componentes Afetados (1 e 2)
   - Trace: `requirements.md` -> Exibição do Seletor no Header
   - Ação: Adicionar a propriedade `customTitle?: ReactNode` à interface `HeaderProps`. Modificar o render do Header para usar `customTitle` (se existir) no lugar de `<Text variant="label">{title}</Text>`. 
   - Ação: Fazer a mesma adição na interface de `MainTabScreen` e repassar para o componente `Header`.

2. **Ajustar Estilo do DateSelector para Caber no Header (Skill: frontend-developer)**
   - Target: `src/components/molecules/DateSelector.tsx`
   - Source: `design.md` -> Considerações de Estilo
   - Trace: `requirements.md` -> Responsividade e Layout
   - Ação: Remover/ajustar margens/paddings excessivos e `bg-surface` se houver, garantindo que o componente se ajuste de forma centralizada e limpa no header, aproveitando as props para poder mudar estilos se necessário (ou fazendo-o agnóstico por padrão). Adicionar classes para centralização correta.

3. **Mover Componente no MenuScreen (Skill: frontend-developer)**
   - Target: `src/features/diet/components/MenuScreen.tsx`
   - Source: `design.md` -> Componentes Afetados (3)
   - Trace: `requirements.md` -> Exibição do Seletor no Header
   - Ação: Remover o componente `DateSelector` do corpo da View principal. Passar como prop `customTitle` no `MainTabScreen`.
   - Ação: Confirmar que `title="Minha dieta"` ainda continua sendo passado (como fallback se for a API do router que usa, mas para o Header ele pode ser ignorado na view se `customTitle` tiver prioridade).

4. **Validação Final**
   - Executar: `npx tsc --noEmit && npx expo-doctor`
