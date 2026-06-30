# Design: Mover Sistema de Data para Header

## Componentes Afetados

1. **`src/components/molecules/Header.tsx`**:
   - Mudar a prop `title` de `string` para `string | ReactNode` ou adicionar uma prop `customTitle?: ReactNode`. A melhor abordagem para não quebrar outros lugares e manter a tipagem flexível é alterar `title?: string | ReactNode` (mas talvez exija fallback). Vamos usar `customTitle?: ReactNode`.
   - Se `customTitle` for fornecido, renderizar ele no centro (view do meio). Caso contrário, renderizar o `Text` com o `title`.

2. **`src/components/organisms/main-tab-screen.tsx`**:
   - Propagar a propriedade `customTitle?: ReactNode` da sua interface `MainTabScreenProps` para o `Header`.

3. **`src/features/diet/components/MenuScreen.tsx`**:
   - Remover o `<DateSelector />` que está dentro do `<View className="flex-1">`.
   - Adicionar `customTitle={<DateSelector selectedDate={selectedDate} onSelectDate={onSelectDate} />}` no `<MainTabScreen>`.
   - Garantir que o `DateSelector` receba `className="bg-transparent"` ou algo similar caso precise se adaptar ao fundo do header, e ajustar padding/margin internos do DateSelector se necessário (hoje ele tem padding lateral e fundo).
   
## Considerações de Estilo
O `DateSelector` hoje deve ter margens e fundos desenhados para ficar no corpo. No Header, ele deve se integrar limpamente. 
- Verificaremos o `DateSelector` durante a task para possivelmente remover `className="bg-surface"` (ou deixá-lo transparente) e remover margens verticais extras.

## Segurança, Manutenibilidade e Escalabilidade
- Nenhuma implicação de segurança.
- Manutenibilidade mantida por usar injeção de dependência via prop (`customTitle`), evitando o acoplamento do Header com a feature de Dieta.
- Compatibilidade TS mantida.
