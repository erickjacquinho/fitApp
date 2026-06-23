import * as fs from 'fs';
import * as path from 'path';

describe('AlertDialog Contracts', () => {
  it('contains correct semantic tokens in alert-dialog.tsx', () => {
    const filePath = path.join(__dirname, '../alert-dialog.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('border-border-subtle');
    expect(content).toContain('bg-surface');
    expect(content).toContain('text-text-primary');
    expect(content).toContain('text-text-secondary');
  });
});
