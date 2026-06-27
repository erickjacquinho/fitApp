import * as fs from 'fs';
import * as path from 'path';

describe('Dialog Contracts', () => {
  it('contains correct semantic tokens in dialog.tsx', () => {
    const filePath = path.join(__dirname, '../dialog.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('border-border-subtle');
    expect(content).toContain('bg-surface');
    expect(content).toContain('text-text-primary');
    expect(content).toContain('text-text-secondary');
  });

  it('supports custom dynamic width and max-width checks', () => {
    const filePath = path.join(__dirname, '../dialog.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain("const hasCustomWidth = className?.includes('w-');");
    expect(content).toContain("!hasCustomWidth && 'w-full'");
    expect(content).toContain("!hasCustomMaxWidth && 'max-w-sm'");
  });
});
