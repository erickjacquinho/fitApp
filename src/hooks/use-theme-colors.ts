import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { lightTheme, darkTheme, ThemeColors } from '../tokens/theme';

/**
 * Returns a stable map of semantic theme colors based on the current system scheme.
 * This hook relies exclusively on system preference (`useColorScheme`), ensuring
 * no persisted preferences or stores cause out-of-sync states.
 */
export function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme();

  return useMemo(() => {
    return colorScheme === 'dark' ? darkTheme : lightTheme;
  }, [colorScheme]);
}
