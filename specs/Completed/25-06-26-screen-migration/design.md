# Technical Design: Screen Migration

## 1. Architecture Overview
We are shifting from an ad-hoc page layout strategy to a centralized `Screen` primitive strategy. The `Screen` component simplifies safe areas, padding, headers, and scroll views.

## 2. Refactor Pattern

### 2.1 Before (Current Pattern)
```tsx
import { View, ScrollView } from 'react-native';
import { Header } from '@/components/molecules/Header';

export default function MyRoute() {
  return (
    <View className="flex-1 bg-surface-app">
      <Header title="My Title" showBackButton />
      <ScrollView className="flex-1 px-4">
        {/* Content */}
      </ScrollView>
    </View>
  );
}
```

### 2.2 After (New Pattern)
```tsx
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';

export default function MyRoute() {
  return (
    <Screen 
      header={<Header title="My Title" showBackButton />}
      scrollable={true} 
      withPadding={true}
    >
      {/* Content */}
    </Screen>
  );
}
```

## 3. Rule Implementation
The rule will be added to `C:\Programmer\fitApp\AGENTS.md` under the working rules section.
**Rule Text:** 
"**Screen Primitive Rule:** Whenever creating or modifying a full-screen page or route, you MUST use the `Screen` component (`src/components/ui/screen.tsx`) as the root wrapper. Do not manually use `SafeAreaView`, `KeyboardAvoidingView`, or root `ScrollView` wrappers. Pass headers via the `header` prop. Use `scrollable={false}` when using `FlatList`."
