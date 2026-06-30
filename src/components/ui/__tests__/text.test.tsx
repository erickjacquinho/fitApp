import { textVariants } from '../text';

describe('Text Contracts', () => {
  it('default variant generates text-text', () => {
    const classes = textVariants({});
    expect(classes).toContain('text-text');
    expect(classes).toContain('text-text-primary');
  });

  it('display variant generates text-display', () => {
    const classes = textVariants({ variant: 'display' });
    expect(classes).toContain('text-display');
  });

  it('error color generates text-error', () => {
    const classes = textVariants({ color: 'error' });
    expect(classes).toContain('text-error');
  });

  it('highlight variant maps to appropriate styling', () => {
    const classes = textVariants({ variant: 'highlight' });
    expect(classes).toContain('text-highlight');
  });
});
