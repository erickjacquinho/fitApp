# Design: Simplified Training Flow & Connected Active Session Tab

This document outlines the technical design for the simplified training flow and active session visual indicator.

## 1. Summary Screen Hold-to-Trigger Action Button

### Component: `ProgramSummaryScreen.tsx`
- Replace standard `Button` with `Pressable` to support `onPressIn` and `onPressOut`.
- Define shared value `progress` and hooks:
  ```typescript
  const progress = useSharedValue(0);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });
  ```
- Implement hold handlers:
  - `handleHoldStart`: starts `withTiming` animation to 1 in 1500ms. On completion, calls the active button action on the JS thread.
  - `handleHoldEnd`: resets `progress` to 0 via `withTiming` if released early.
- Layout structure for the button:
  ```tsx
  <Pressable
    onPressIn={handleHoldStart}
    onPressOut={handleHoldEnd}
    disabled={blocks.length === 0}
    className="flex-1 min-h-control-lg bg-primary rounded-md overflow-hidden justify-center items-center relative active:opacity-90"
  >
    <Animated.View 
      className="absolute left-0 top-0 bottom-0 bg-text-inverse opacity-35" 
      style={animatedProgressStyle} 
    />
    <View className="flex-row items-center gap-2 z-10">
      <Icon as={buttonIcon} size={20} fill={buttonIcon === Play ? "currentColor" : undefined} className="text-text-inverse" />
      <Text variant="label" className="text-text-inverse font-bold">
        {buttonText}
      </Text>
    </View>
  </Pressable>
  ```

---

## 2. Connected Active Session Indicator Tab on Training Home

### Component: `TrainingHomeScreen.tsx`
- Remove the top active session card / banner from `TrainingHomeScreen.tsx`.
- Pass `hasActiveSession={activeSession?.programId === program.id}` to `ProgramCard`.

### Component: `ProgramCard.tsx`
- Add `hasActiveSession?: boolean` to `ProgramCardProps`.
- If `hasActiveSession` is true, modify the styling and layout of `ProgramCard` to visually attach the connected tab below it.
- **Card styling modification**:
  - The card wrapper gets `rounded-b-none border-b-0` to sit flush on top.
- **Connected tab layout**:
  - Rendered below the card `Pressable`:
    ```tsx
    <Pressable
      onPress={() => router.push('/training/active')}
      className={cn(
        "h-control-md flex-row items-center justify-center border-x border-b rounded-b-md bg-primary-soft",
        isActive 
          ? isDark 
            ? 'border-text-primary' 
            : 'border-primary'
          : 'border-border-subtle'
      )}
    >
      <Text variant="label" className="text-primary font-bold">
        Sessão de treino atual
      </Text>
    </Pressable>
    ```
- Place both the main card `Pressable` and the connected tab `Pressable` inside a wrapper `<View className="mb-4">` (moving the bottom margin `mb-4` from the card to the container `View` to keep the grid spacing perfectly consistent).
