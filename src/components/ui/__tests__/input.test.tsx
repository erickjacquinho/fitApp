import * as fs from 'fs';
import * as path from 'path';

describe('Input Contracts', () => {
  it('contains correct semantic tokens in input.tsx', () => {
    const inputPath = path.join(__dirname, '../input.tsx');
    const content = fs.readFileSync(inputPath, 'utf8');

    expect(content).toContain('border-border-strong');
    expect(content).toContain('bg-surface');
    expect(content).toContain('text-text-primary');
    expect(content).toContain('border-border-focus');
    expect(content).toContain('opacity-50');
    expect(content).toContain('border-error');
    expect(content).toContain('text-error');
  });
});
