import { cardVariants } from '../card';

describe('Card Contracts', () => {
  it('default variant generates surface background and subtle border', () => {
    const classes = cardVariants({});
    expect(classes).toContain('bg-surface');
    expect(classes).toContain('border-border-subtle');
  });

  it('elevated variant generates elevated background and shadow', () => {
    const classes = cardVariants({ variant: 'elevated' });
    expect(classes).toContain('bg-surface-elevated');
    expect(classes).toContain('shadow-floating');
  });

  it('outline variant generates transparent background and subtle border', () => {
    const classes = cardVariants({ variant: 'outline' });
    expect(classes).toContain('bg-transparent');
    expect(classes).toContain('border-border-subtle');
  });
});
