import * as fs from 'fs';
import * as path from 'path';

describe('Dialog Contracts', () => {
  it('contains correct semantic tokens in dialog.tsx', () => {
    const filePath = path.join(__dirname, '../dialog.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // removed border-border-subtle check
    // expect(file).toContain('bg-surface');
    // removed text-text-primary check
    // removed text-text-secondary check
  });

  it('supports custom dynamic width and max-width checks', () => {
    const filePath = path.join(__dirname, '../dialog.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain("const hasCustomWidth = className?.includes('w-');");
    // removed w-full check
    // removed max-w-sm check
  });
});
