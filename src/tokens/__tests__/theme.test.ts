import { ThemeColors, lightTheme, darkTheme } from '../theme';

/**
 * Fixture: Expected shape of the theme colors to ensure all keys are present.
 */
export const expectedThemeKeys: (keyof ThemeColors)[] = [
  'background',
  'surface',
  'surfaceElevated',
  'surfaceDisabled',
  'borderSubtle',
  'borderStrong',
  'borderControl',
  'borderFocus',
  'textPrimary',
  'textSecondarySurface',
  'textSecondaryBackground',
  'textDisabled',
  'textInverse',
  'primary',
  'protein',
  'carbohydrate',
  'fat',
  'info',
  'warning',
  'success',
  'error',
  'link',
  'linkVisited',
  'scrim',
  'chartSeries',
];

describe('Theme Maps Parity', () => {
  it('lightTheme should contain all required keys', () => {
    expectedThemeKeys.forEach((key) => {
      expect(lightTheme[key]).toBeDefined();
    });
    expect(Object.keys(lightTheme).length).toBe(expectedThemeKeys.length);
  });

  it('darkTheme should contain all required keys', () => {
    expectedThemeKeys.forEach((key) => {
      expect(darkTheme[key]).toBeDefined();
    });
    expect(Object.keys(darkTheme).length).toBe(expectedThemeKeys.length);
  });

  it('lightTheme semantic precedence asserts expected colors', () => {
    // Assert some precedence mappings
    expect(lightTheme.background).toBe('#F3EFE7');
    expect(lightTheme.primary).toBe('#0800FF');
    expect(lightTheme.error).toBe('#C44732');
  });

  it('darkTheme semantic precedence asserts expected colors', () => {
    // Assert dark theme distinct mappings
    expect(darkTheme.background).toBe('#15110F');
    expect(darkTheme.primary).toBe('#9A96FA');
    expect(darkTheme.error).toBe('#E6B2A8');
  });
});
