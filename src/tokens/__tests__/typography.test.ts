import { TYPOGRAPHY } from '../typography';
import { FONT_WEIGHT } from '../font-weight';

describe('Typography Map Regression Tests', () => {
  it('should not contain deprecated unsafe weights in FONT_WEIGHT', () => {
    // We only expect 'normal' and 'bold' (mapped to regular/medium), or similar semantic weights
    // If you map thin/light etc, they must be explicit. Here we just assert the keys aren't generic numbers.
    expect((FONT_WEIGHT as any)['100']).toBeUndefined();
    expect((FONT_WEIGHT as any)['900']).toBeUndefined();
  });

  it('should define distinct typography roles in TYPOGRAPHY', () => {
    expect(TYPOGRAPHY.display).toBeDefined();
    expect(TYPOGRAPHY.body).toBeDefined();
    expect(TYPOGRAPHY.caption).toBeDefined();
    
    // Check that display has expected semantic properties rather than just raw size
    expect(TYPOGRAPHY.display.fontFamily).toBe('HelveticaNowDisplay-Bold');
  });
});
