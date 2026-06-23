import { lightTheme, darkTheme } from '../theme';

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

describe('Theme Contrast Normative Assertions', () => {
  it('lightTheme textPrimary should have > 4.5 contrast against background', () => {
    const ratio = getContrastRatio(lightTheme.textPrimary, lightTheme.background);
    expect(ratio).toBeGreaterThan(4.5);
  });

  it('lightTheme error should have > 3.0 contrast against background', () => {
    const ratio = getContrastRatio(lightTheme.error, lightTheme.background);
    expect(ratio).toBeGreaterThan(3.0);
  });

  it('darkTheme textPrimary should have > 4.5 contrast against background', () => {
    const ratio = getContrastRatio(darkTheme.textPrimary, darkTheme.background);
    expect(ratio).toBeGreaterThan(4.5);
  });

  it('darkTheme error should have > 4.5 contrast against background', () => {
    const ratio = getContrastRatio(darkTheme.error, darkTheme.background);
    expect(ratio).toBeGreaterThan(4.5);
  });
});
