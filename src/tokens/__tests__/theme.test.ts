import { lightTheme, darkTheme } from '../theme';
import type { ThemeColors } from '../theme';
import { primitives } from '../colors';

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
  'dietSuccess',
  'dietWarning',
  'dietError',
  'link',
  'linkVisited',
  'scrim',
  'chartSeries',
];

describe('Theme Maps Parity', () => {
  it('uses the canonical amber scale for carbohydrate tokens', () => {
    expect(primitives.amber).toEqual({
      100: '#FAE9C1',
      200: '#F5D58A',
      500: '#F1AE11',
      600: '#D99B0F',
      900: '#77550D',
    });
    expect(lightTheme.carbohydrate).toBe(primitives.amber[500]);
    expect(lightTheme.chartSeries[2]).toBe(primitives.amber[900]);
    expect(darkTheme.carbohydrate).toBe(primitives.amber[200]);
    expect(darkTheme.chartSeries[2]).toBe(primitives.amber[200]);
  });

  it('uses the canonical orange scale for fat tokens', () => {
    expect(primitives.orange).toEqual({
      100: '#F7D5C2',
      200: '#F0AE89',
      500: '#E43F03',
      600: '#C43804',
      900: '#702A10',
    });
    expect(lightTheme.fat).toBe(primitives.orange[500]);
    expect(lightTheme.chartSeries[1]).toBe(primitives.orange[500]);
    expect(darkTheme.fat).toBe(primitives.orange[200]);
    expect(darkTheme.chartSeries[1]).toBe(primitives.orange[200]);
  });

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
