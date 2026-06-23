export const FONT_FAMILY = {
  display: 'HelveticaNowDisplay-Bold',
  sans: 'HelveticaNowText-Regular',
  sansMedium: 'HelveticaNowText-Medium',
  sansBold: 'HelveticaNowText-Bold',
} as const;

/** 
 * @deprecated Custom fonts do not support numeric font weights in React Native reliably. 
 * Use FONT_FAMILY with the exact variant (e.g. FONT_FAMILY.sansBold) instead. 
 */
export const FONT_WEIGHT = {
  xsmall: '300',
  small: '400',
  default: '500',
  large: '600',
  xlarge: '700',
  xxlarge: '800',
} as const;
