import * as fs from 'fs';
import * as path from 'path';

describe('Shell layout tests', () => {
  it('app/_layout.tsx uses bg-background', () => {
    const filePath = path.resolve(__dirname, '../../../../../../app/_layout.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-background');
  });

  it('app/(tabs)/_layout.tsx uses semantic tokens and TYPOGRAPHY', () => {
    const filePath = path.resolve(__dirname, '../../../../../../app/(tabs)/_layout.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('colors.primary');
    expect(content).toContain('colors.surfaceElevated');
    expect(content).toContain('TYPOGRAPHY.label');
  });
});
