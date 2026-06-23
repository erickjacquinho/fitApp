import { useThemeColors } from '../use-theme-colors';
import { lightTheme, darkTheme } from '../../tokens/theme';

let mockScheme: any = 'light';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: (cb: any) => cb(),
}));

jest.mock('react-native', () => ({
  useColorScheme: () => mockScheme,
}));

describe('useThemeColors', () => {
  it('returns lightTheme when colorScheme is light', () => {
    mockScheme = 'light';
    const result = useThemeColors();
    expect(result).toBe(lightTheme);
  });

  it('returns darkTheme when colorScheme is dark', () => {
    mockScheme = 'dark';
    const result = useThemeColors();
    expect(result).toBe(darkTheme);
  });

  it('defaults to lightTheme when colorScheme is undefined', () => {
    mockScheme = undefined;
    const result = useThemeColors();
    expect(result).toBe(lightTheme);
  });
});
