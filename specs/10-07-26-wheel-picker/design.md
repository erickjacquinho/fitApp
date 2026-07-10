# Design: Wheel Picker & Demo Page
**Slug:** `10-07-26-wheel-picker`

## 1. Component Architecture
A solução será ancorada no `react-native-reanimated` v4. Usaremos uma FlatList Animada que delega o processamento da rolagem exclusivamente para a UI Thread.

### 1.1 `src/components/ui/wheel-picker.tsx`
- **Core Engine:** `Animated.FlatList` com `snapToInterval={56}` (altura fixa por item).
- **Controlador de Estado (isScrolling):** Utilizar o hook `useAnimatedScrollHandler` para ouvir:
  - `onBeginDrag`: Define `isScrolling.value = 1`.
  - `onEndDrag`: Se a velocidade (velocity) for zero, define `isScrolling.value = 0` via setTimeout seguro em Worklet para dar tempo de *snap*, ou usa `onMomentumEnd`.
  - `onMomentumEnd`: Define `isScrolling.value = 0`.
- **Haptics (Tato):** 
  - `useAnimatedReaction` vai monitorar `Math.round(scrollY.value / ITEM_HEIGHT)`.
  - Quando o index mudar e estivermos rolando ativamente, um `runOnJS(Haptics.selectionAsync)()` é chamado para feedback físico no exato limiar numérico.
- **Micro-Animações (WheelItem):**
  - Cada `<WheelItem>` recebe o `isScrolling` e `scrollY`.
  - Distância = abs(scrollY - posição do item).
  - **Lógica Visível:** 
    - Durante `isScrolling === 1`: Opacidade é mapeada para (100% no centro, 40% nas laterais `[+/- 1]`, 0% no resto). Escala é mapeada para (100% no centro, 75% laterais).
    - Durante `isScrolling === 0`: Opacidade é forçada para `0` em qualquer item onde Distância > 0. A transição desse valor (`withSpring`) fará os *ghosts* desaparecerem de modo satisfatório.

## 2. Route Architecture
- O projeto usa `expo-router`.
- Nova tela: `app/wheel-picker-demo.tsx`.
- Modificação: `app/(tabs)/index.tsx`.
- **Ligação:** Adicionar um botão no `headerRight` do Dashboard.

## 3. Theming & Styling
- Fundo do indicador central usa `bg-surface-elevated` do NativeWind.
- Texto principal usa `text-primary`.
- Todos obedecem a paleta *Mineral Warm* (azuis puros ou tons neutros, sem uso de azeitonas legadas conforme regras gerais do FitApp).
