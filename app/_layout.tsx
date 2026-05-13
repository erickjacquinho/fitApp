import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GluestackUIProvider, Box } from '@gluestack-ui/themed';
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider>
        <Box flex={1}>
          <Stack>
            <Stack.Screen name="index" />
          </Stack>
        </Box>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
