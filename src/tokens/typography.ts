export const TYPOGRAPHY = {
  display: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    fontSize: 32,
    lineHeight: 38,
  },
  title: {
    fontFamily: 'HelveticaNowText-Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: 'HelveticaNowText-Medium',
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontFamily: 'HelveticaNowText-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  highlight: {
    fontFamily: 'HelveticaNowText-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontFamily: 'HelveticaNowText-Bold',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: 'HelveticaNowText-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
} as const;

/** 
 * @deprecated Use typography classes (e.g. text-title, text-body) or the TYPOGRAPHY theme tokens.
 */
export const FONT_SIZE = {
  xsmall: 8,
  small: 10,
  default: 12,
  large: 18,
  xlarge: 22,
  xxlarge: 24,
} as const;
