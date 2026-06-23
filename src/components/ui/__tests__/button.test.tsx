import { buttonVariants, buttonTextVariants } from '../button';

describe('Button Contracts', () => {
  it('default variant generates primary background', () => {
    const classes = buttonVariants({});
    expect(classes).toContain('bg-primary');
  });

  it('destructive variant generates error background', () => {
    const classes = buttonVariants({ variant: 'destructive' });
    expect(classes).toContain('bg-error');
  });

  it('link variant text generates link color', () => {
    const textClasses = buttonTextVariants({ variant: 'link' });
    expect(textClasses).toContain('text-link');
  });

  it('warning/amber variant text', () => {
    const classes = buttonVariants({ variant: 'warning' });
    expect(classes).toContain('bg-warning');
    const textClasses = buttonTextVariants({ variant: 'warning' });
    expect(textClasses).toContain('text-text-primary'); // or inverse
  });

  it('default size generates 44px (h-control-md) target', () => {
    const classes = buttonVariants({});
    expect(classes).toContain('h-control-md');
  });
});
