import { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider';
import { StatusBar } from 'expo-status-bar';
import { PortalHost } from '@rn-primitives/portal';
import { database } from '../src/db';
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'HelveticaNowDisplay-Bold': require('../assets/fonts/helvetica-now-display-bold.otf'),
    'HelveticaNowText-Regular': require('../assets/fonts/helvetica-now-text-regular.otf'),
    'HelveticaNowText-Medium': require('../assets/fonts/helvetica-now-text-medium.otf'),
    'HelveticaNowText-Bold': require('../assets/fonts/helvetica-now-text-bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1 bg-background">
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
