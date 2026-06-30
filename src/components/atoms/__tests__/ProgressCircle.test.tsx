import * as fs from 'fs';
import * as path from 'path';

describe('ProgressCircle Contracts', () => {
  it('uses semantic tokens in ProgressCircle.tsx', () => {
    const filePath = path.join(__dirname, '../ProgressCircle.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-surface');
    expect(content).toContain('border-border-subtle');
    expect(content).toContain('text-primary');
    expect(content).toContain('text-text-secondary');
  });
});
