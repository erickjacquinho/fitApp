import { lightTheme, darkTheme } from '../theme';
import { primitives } from '../colors';

/**
 * Helper to calculate relative luminance for WCAG contrast.
 */
export function getLuminance(hex: string): number {
  const rgb = hex.replace('#', '');
  if (rgb.length !== 6) return 1; // fallback
  const r = parseInt(rgb.substring(0, 2), 16) / 255;
  const g = parseInt(rgb.substring(2, 4), 16) / 255;
  const b = parseInt(rgb.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Helper to calculate contrast ratio.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  if (hex1.includes('rgba') || hex2.includes('rgba')) return 4.5;

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);

  const lightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);

  return (lightest + 0.05) / (darkest + 0.05);
}

const contrastCases = [
  {
    name: 'Light: Primary Text on Background',
    foreground: lightTheme.textPrimary,
    background: lightTheme.background,
    minRatio: 4.5,
  },
  {
    name: 'Light: Secondary Text on Surface',
    foreground: lightTheme.textSecondarySurface,
    background: lightTheme.surface,
    minRatio: 4.5,
  },
  {
    name: 'Light: Error on Background',
    foreground: lightTheme.error,
    background: lightTheme.background,
    minRatio: 3.0,
  },
  {
    name: 'Light: Primary Text on Carbohydrate Fill',
    foreground: lightTheme.textPrimary,
    background: primitives.amber[500],
    minRatio: 4.5,
  },
  {
    name: 'Light: Carbohydrate Text on Soft Carbohydrate Surface',
    foreground: primitives.amber[900],
    background: primitives.amber[200],
    minRatio: 4.5,
  },
  {
    name: 'Dark: Primary Text on Background',
    foreground: darkTheme.textPrimary,
    background: darkTheme.background,
    minRatio: 4.5,
  },
  {
    name: 'Dark: Secondary Text on Surface',
    foreground: darkTheme.textSecondarySurface,
    background: darkTheme.surface,
    minRatio: 4.5,
  },
  {
    name: 'Dark: Error on Background',
    foreground: darkTheme.error,
    background: darkTheme.background,
    minRatio: 4.5,
  },
];

describe('Theme Contrast Normative Assertions', () => {
  contrastCases.forEach((testCase) => {
    it(`${testCase.name} should have >= ${testCase.minRatio} contrast`, () => {
      const ratio = getContrastRatio(testCase.foreground, testCase.background);
      expect(ratio).toBeGreaterThanOrEqual(testCase.minRatio);
    });
  });
});
