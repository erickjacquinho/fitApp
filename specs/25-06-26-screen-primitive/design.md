# Technical Design: Screen Primitive

## 1. Architecture Overview
The `Screen` component will reside in `src/components/ui/screen.tsx` (as a foundational primitive). It aggregates `SafeAreaView` (or handles insets explicitly), `KeyboardAvoidingView`, `ScrollView`, and our `Header.tsx`. 

## 2. Component Hierarchy
- `Screen` (Wrapper handling Keyboard and Background)
  - `SafeAreaView` (or explicit `useSafeAreaInsets`)
    - `Header` (Conditional)
    - `ScrollView` / `View` (Based on `scrollable`)
      - `Content Container` (Handles `withPadding`)

## 3. Props Interface
```typescript
import { ReactNode } from 'react';
import { ViewStyle, ScrollViewProps } from 'react-native';
import { Edge } from 'react-native-safe-area-context';

export interface ScreenProps {
  children: ReactNode;
  
  // Layout Options
  scrollable?: boolean; // default: true
  withPadding?: boolean; // default: true
  
  // Safe Area
  safeAreaEdges?: Edge[]; // default: ['top', 'bottom']
  
  // Header Options
  headerTitle?: string;
  headerShowBackButton?: boolean;
  headerRightContent?: ReactNode;
  
  // Styling overrides
  className?: string;
  contentClassName?: string;
  
  // ScrollView Specific
  scrollViewProps?: Omit<ScrollViewProps, 'children'>;
}
```

## 4. Dependencies
- `react-native`: `View`, `ScrollView`, `KeyboardAvoidingView`, `Platform`.
- `react-native-safe-area-context`: `useSafeAreaInsets` or `SafeAreaView`.
- `@/components/molecules/Header`: For rendering the optional header.
- `@/lib/utils`: `cn` for Tailwind class merging.

## 5. Security, Maintainability & Scalability
- **Security:** Centralizes padding and layouts, minimizing ad-hoc safe-area violations that could hide critical info.
- **Maintainability:** Replaces scattered `SafeAreaView` and `KeyboardAvoidingView` wrappers across pages. Centralizes design tokens.
- **Scalability:** By exposing `contentClassName` and `scrollViewProps`, it allows for escape hatches without breaking the abstraction.
