# Page Conventions - Expo Router

This document defines how files in `app/` (routes) MUST be structured. Pages in FitApp are **"Slim Orchestrators"**, delegating business logic and UI details to `src/features/`.

## 1. Page Responsibility
A page's primary goal is to compose the interface and manage navigation context.

### 1.1. MANDATORY Page Tasks:
- Configure navigation options (`Stack.Screen`, `Tabs.Screen`).
- Inject data via business hooks (from features) or observables (WatermelonDB).
- Compose **Organisms** and **Molecules** from features.
- Define UI states: `Loading` (Skeletons) and `EmptyState`.

### 1.2. Page Constraints (DO NOT):
- **DO NOT** contain complex styles (use only basic containers with NativeWind).
- **DO NOT** implement business logic or direct DB manipulation.
- **DO NOT** define large internal components (extract them to features).

## 2. UI State Management

### 2.1. Loading (Skeletons)
Every page dependent on asynchronous data MUST show a **Skeleton Screen** during initial load to prevent layout shifts (CLS).
- Use the `Skeleton` atom from the design system.
- The Skeleton layout MUST mirror the final page structure.

### 2.2. Empty States
List pages (Workouts, Meals, History) MUST handle the "no data" case using the `EmptyState` organism.
- Include a clear Call-to-Action (CTA), such as "Add First Workout".

## 3. Canonical File Structure
Maintain consistency by following this declaration order:

1. **Imports**: 
   - External libraries (React, Expo Router).
   - UI Components/Organisms (using `@/components` or `@/features`).
   - Business hooks and types.
2. **Navigation Options**: `Stack.Screen` or `Tabs.Screen` configuration (Title, Header buttons).
3. **Data Hooks**: Calls to Zustand stores or feature-specific hooks.
4. **Navigation Handlers**: Simple redirection functions (e.g., `handleEdit`).
5. **Main Rendering**: UI return focused on high-level composition.

## 4. Implementation Example

```tsx
import { Stack, useRouter } from 'expo-router';
import { View, ScrollView } from 'react-native';
import { WorkoutList } from '@/features/training/components/WorkoutList';
import { useWorkouts } from '@/features/training/hooks/useWorkouts';
import { Button } from '@/components/atoms/Button';
import { EmptyState } from '@/components/organisms/EmptyState';

export default function WorkoutsPage() {
  const router = useRouter();
  const { workouts, isLoading } = useWorkouts();

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen 
        options={{ 
          title: 'My Workouts',
          headerRight: () => (
            <Button variant="ghost" onPress={() => router.push('/workouts/new')} title="Add New" />
          )
        }} 
      />

      <ScrollView className="flex-1 p-4">
        {isLoading ? (
          <WorkoutList.Skeleton />
        ) : workouts.length > 0 ? (
          <WorkoutList data={workouts} />
        ) : (
          <EmptyState 
            title="No workouts found" 
            description="Start your journey by creating your first workout plan."
            onAction={() => router.push('/workouts/new')}
          />
        )}
      </ScrollView>
    </View>
  );
}
```

## 5. Performance Note
- Prevent unnecessary re-renders: Memoize functions passed to Organisms using `useCallback` if the child component is heavy.
- Use `useMemo` for derived data or heavy list filtering.
