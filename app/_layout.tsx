import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider';
import { StatusBar } from 'expo-status-bar';
import { PortalHost } from '@rn-primitives/portal';
import { database } from '../src/db';
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <DatabaseProvider database={database}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="diet/create-food" options={{ headerShown: false }} />
            <Stack.Screen name="diet/create-meal" options={{ headerShown: false }} />
            <Stack.Screen name="diet/food-bank" options={{ headerShown: false }} />
            <Stack.Screen name="style-guide" options={{ title: 'Design System' }} />
          </Stack>
          <PortalHost />
        </SafeAreaProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
