# Styling Conventions - NativeWind v4

This guide defines how the FitApp UI MUST be styled. Compliance is mandatory to maintain consistency, maintainability, and high performance.

## 1. Zero Hardcoded Styles
**Hardcoded styles are strictly PROHIBITED.**

This includes:
- **Inline Styles**: `style={{ flex: 1, color: 'red' }}`.
- **StyleSheet.create**: DO NOT use unless complex dynamic calculations are required that cannot be solved via NativeWind or Reanimated.
- **Magic Values**: Colors, spacing, or font sizes defined as raw strings/numbers.

## 2. Mandatory Standard: NativeWind (Tailwind CSS)
All styling MUST be done using **NativeWind v4** utility classes.

### Usage Guidelines:
- Use the `className` prop for applying styles.
- Use only tokens and colors defined in `tailwind.config.js`.
- Prefer Tailwind utility composition over custom style abstractions.

## 3. Best Practices

### 3.1. Standard Class Order
To maintain readability, follow this order when declaring classes:
1. **Layout**: `flex`, `grid`, `absolute`, `z-10`.
2. **Box Model**: `w-full`, `h-32`, `m-4`, `p-2`.
3. **Display & Interaction**: `hidden`, `opacity-50`, `overflow-hidden`.
4. **Typography**: `text-title`, `font-bold`, `text-center`, `tracking-tight`.
5. **Visuals**: `bg-surface-muted`, `border border-soft`, `rounded-sm`.
6. **States & Platform**: `active:scale-95`, `ios:pt-2`, `android:pt-2`.

### 3.2. Complex & Conditional Classes
- Use `clsx` or `tailwind-merge` to organize dynamic strings.
- **DO NOT**: `className={isError ? "bg-[raw-color] border-[raw-color] p-[13px] rounded-[18px]" : "bg-[raw-color] border-[raw-color] p-[13px] rounded-[18px]"}`.
- **DO**: 
  ```tsx
  const containerClasses = clsx(
    "p-4 rounded-sm border",
    isError ? "bg-tomato-soft border-tomato-main" : "bg-surface-muted border-soft"
  );
  ```

### 3.3. Abstraction Protocol
- If a class set is repeated in 3+ places, create an **Atom** (e.g., `src/components/atoms/Card.tsx`) instead of copying classes.
- **DO NOT** use `@apply` in global CSS; use direct utility classes in components.
- **DO NOT** use shadows, large radii, or high-contrast borders unless a focused rule file allows it.

## 4. Dynamic Styles and Performance
- **Static Strings**: The NativeWind compiler optimizes static class strings. Avoid generating classes via string interpolation (e.g., `className={`p-${paddingSize}`} `).
- **Reanimated**: For animations (translations, gradual opacity), ALWAYS use `useAnimatedStyle`. Tailwind classes define the "base state".

## 5. Constraint Checklist
- **No Arbitrary Values**: Avoid `m-[13px]` unless strictly necessary for a specific design edge case.
- **Consistency**: Always check `tailwind.config.js` for brand-compliant tokens.

---
**Note**: Violations of these rules are considered immediate technical debt and MUST be fixed before commit.
