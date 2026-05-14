# Page Conventions - Expo Router

Routes in `app/` are slim orchestrators. They compose screens, configure navigation, and delegate business logic and detailed UI to `src/features/` and `src/components/`.

## Page Responsibility

Pages MUST:
- Configure navigation options with Expo Router.
- Inject data through feature hooks, Zustand stores, or WatermelonDB observables.
- Compose shared and feature components.
- Handle loading, empty, error, and partial data states.
- Use layout tokens for screen containers.

Pages MUST NOT:
- Implement business logic.
- Write directly to WatermelonDB.
- Contain large internal components.
- Contain complex styling beyond screen-level layout.
- Use raw visual values.

## Screen Layout

Default phone screen structure:

```tsx
<View className="flex-1 bg-surface-app">
  <ScrollView
    className="flex-1"
    contentContainerClassName="px-screen-x py-screen-y gap-content-gap"
  >
    {/* composed sections */}
  </ScrollView>
</View>
```

Use safe-area handling from the app or navigation layer. Do not create non-phone page layouts.

## UI States

Loading:
- Use skeletons for content-heavy initial loading.
- Skeleton layout should mirror the final screen.

Empty:
- Use `EmptyState` for list or history screens with no data.
- Include one clear CTA when the user can fix the empty state.

Error:
- Prefer inline recoverable errors when the user can act.
- Use tomato tokens for error state.

Partial data:
- Show available data.
- Clearly explain what is missing.

## Canonical File Order

1. Imports.
2. Navigation options.
3. Data hooks.
4. Derived values.
5. Navigation handlers.
6. Render state selection.
7. Main render.

## Example

```tsx
import { Stack, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { EmptyState } from '@/components/organisms/EmptyState';
import { WorkoutList } from '@/features/training/components/WorkoutList';
import { useWorkouts } from '@/features/training/hooks/useWorkouts';

export default function WorkoutsPage() {
  const router = useRouter();
  const { workouts, isLoading } = useWorkouts();

  return (
    <View className="flex-1 bg-surface-app">
      <Stack.Screen
        options={{
          title: 'Treinos',
          headerRight: () => (
            <Button
              variant="ghost"
              title="Adicionar"
              onPress={() => router.push('/workouts/new')}
            />
          ),
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-screen-x py-screen-y gap-content-gap"
      >
        {isLoading ? (
          <WorkoutList.Skeleton />
        ) : workouts.length > 0 ? (
          <WorkoutList data={workouts} />
        ) : (
          <EmptyState
            title="Nenhum treino"
            description="Crie seu primeiro treino para acompanhar sua evolução."
            actionLabel="Adicionar treino"
            onAction={() => router.push('/workouts/new')}
          />
        )}
      </ScrollView>
    </View>
  );
}
```

## Performance

- Memoize expensive derived data with `useMemo`.
- Memoize handlers passed to heavy child components with `useCallback`.
- Keep DB writes in services/actions, not route files.
