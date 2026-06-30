import { TYPOGRAPHY } from '../typography';

describe('Typography Map Regression Tests', () => {
  it('should define distinct typography roles in TYPOGRAPHY', () => {
    expect(TYPOGRAPHY.display).toBeDefined();
    expect(TYPOGRAPHY.body).toBeDefined();
    expect(TYPOGRAPHY.caption).toBeDefined();
    
    // Check that display has expected semantic properties rather than just raw size
    expect(TYPOGRAPHY.display.fontFamily).toBe('HelveticaNowDisplay-Black');
  });
});
