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
    'HelveticaNowDisplay-Black': require('../assets/fonts/HelveticaNowDisplay-Black.otf'),
    'HelveticaNowDisplay-ExtraBold': require('../assets/fonts/HelveticaNowDisplay-ExtraBold.otf'),
    'HelveticaNowDisplay-Bold': require('../assets/fonts/helvetica-now-display-bold.otf'),
    'HelveticaNowText-Regular': require('../assets/fonts/helvetica-now-text-regular.otf'),
    'HelveticaNowText-Medium': require('../assets/fonts/helvetica-now-text-medium.otf'),
    'HelveticaNowText-Bold': require('../assets/fonts/helvetica-now-text-bold.otf'),
    'HelveticaNowText-BoldItalic': require('../assets/fonts/HelveticaNowText-BoldItalic.otf'),
    'HelveticaNowText-MediumItalic': require('../assets/fonts/HelveticaNowText-MediumItalic.otf'),
    'HelveticaNowText-RegIta': require('../assets/fonts/HelveticaNowText-RegIta.otf'),
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
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="diet/create-food" />
            <Stack.Screen name="diet/create-meal" />
            <Stack.Screen name="diet/food-bank" />
            <Stack.Screen name="style-guide" options={{ title: 'Design System', headerShown: true }} />
          </Stack>
          <PortalHost />
        </SafeAreaProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
