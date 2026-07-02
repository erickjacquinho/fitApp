export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceDisabled: string;
  borderSubtle: string;
  borderStrong: string;
  borderControl: string;
  borderFocus: string;
  textPrimary: string;
  textSecondarySurface: string;
  textSecondaryBackground: string;
  textDisabled: string;
  textInverse: string;
  primary: string;
  protein: string;
  carbohydrate: string;
  fat: string;
  info: string;
  warning: string;
  success: string;
  error: string;
  dietSuccess: string;
  dietWarning: string;
  dietError: string;
  link: string;
  linkVisited: string;
  scrim: string;
  chartSeries: readonly [string, string, string, string, string, string];
}

export type PrimitiveColorScale = {
  100: string;
  200: string;
  500: string;
  600: string;
  900: string;
};

export type NeutralColorScale = {
  0: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export interface PrimitiveColors {
  blue: PrimitiveColorScale;
  amber: PrimitiveColorScale;
  orange: PrimitiveColorScale;
  moss: PrimitiveColorScale;
  tomato: PrimitiveColorScale;
  mustard: PrimitiveColorScale;
  teal: PrimitiveColorScale;
  plum: PrimitiveColorScale;
  neutral: NeutralColorScale;
}

export const lightTheme: ThemeColors = {
  background: '#F3EFE7',
  surface: '#FCFAF6',
  surfaceElevated: '#FFFFFF',
  surfaceDisabled: '#F3EFE7',
  borderSubtle: '#DED8CF',
  borderStrong: '#C5BAAE',
  borderControl: '#7A7069',
  borderFocus: '#0800FF',
  textPrimary: '#241C18',
  textSecondarySurface: '#7A7069',
  textSecondaryBackground: '#625851',
  textDisabled: '#A3988F',
  textInverse: '#FFFFFF',
  primary: '#0800FF',
  protein: '#0800FF',
  carbohydrate: '#F1AE11',
  fat: '#E43F03',
  info: '#0800FF',
  warning: '#8A6A00',
  success: '#556B4D',
  error: '#C44732',
  dietSuccess: '#00875A',
  dietWarning: '#D97706',
  dietError: '#E11D48',
  link: '#1008BA',
  linkVisited: '#5D4055',
  scrim: 'rgba(24, 17, 14, 0.56)',
  chartSeries: ['#0800FF', '#E43F03', '#77550D', '#2F6F6A', '#76506F', '#625851'],
};

export const darkTheme: ThemeColors = {
  background: '#15110F',
  surface: '#211A17',
  surfaceElevated: '#2B221E',
  surfaceDisabled: '#15110F',
  borderSubtle: '#443832',
  borderStrong: '#5A4C45',
  borderControl: '#766860',
  borderFocus: '#9A96FA',
  textPrimary: '#F8F3EB',
  textSecondarySurface: '#C9BFB5',
  textSecondaryBackground: '#C9BFB5',
  textDisabled: '#82776F',
  textInverse: '#18110E',
  primary: '#9A96FA',
  protein: '#9A96FA',
  carbohydrate: '#F5D58A',
  fat: '#F0AE89',
  info: '#9A96FA',
  warning: '#CEC094',
  success: '#B9C1B2',
  error: '#E6B2A8',
  dietSuccess: '#34D399',
  dietWarning: '#FBBF24',
  dietError: '#FB7185',
  link: '#9A96FA',
  linkVisited: '#C6B6C0',
  scrim: 'rgba(0, 0, 0, 0.68)',
  chartSeries: ['#9A96FA', '#F0AE89', '#F5D58A', '#AAC2BE', '#C6B6C0', '#C5BAAE'],
};
