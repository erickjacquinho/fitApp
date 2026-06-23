import { badgeVariants, badgeTextVariants } from '../badge';

describe('Badge Contracts', () => {
  it('default variant generates primary background', () => {
    const classes = badgeVariants({});
    expect(classes).toContain('bg-primary');
    const textClasses = badgeTextVariants({});
    expect(textClasses).toContain('text-text-inverse');
  });

  it('destructive variant generates error background', () => {
    const classes = badgeVariants({ variant: 'destructive' });
    expect(classes).toContain('bg-error');
  });

  it('success tone', () => {
    const classes = badgeVariants({ variant: 'success' });
    expect(classes).toContain('bg-success');
    const textClasses = badgeTextVariants({ variant: 'success' });
    expect(textClasses).toContain('text-text-inverse');
  });

  it('warning tone', () => {
    const classes = badgeVariants({ variant: 'warning' });
    expect(classes).toContain('bg-warning');
  });

  it('neutral tone', () => {
    const classes = badgeVariants({ variant: 'neutral' });
    expect(classes).toContain('bg-surface-disabled');
    const textClasses = badgeTextVariants({ variant: 'neutral' });
    expect(textClasses).toContain('text-text-primary');
  });
});
