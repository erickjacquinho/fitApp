import fs from 'fs';
import path from 'path';

describe('PaginationDots Bypass Tests', () => {
  it('PaginationDots uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../../../components/ui/PaginationDots.tsx'), 'utf8');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('text-success-main');
    expect(file).not.toContain('text-text-muted');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('color="accent"');
  });
});

