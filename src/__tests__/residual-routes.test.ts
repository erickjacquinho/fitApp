import * as fs from 'fs';
import * as path from 'path';

describe('Residual Routes Bypass Tests', () => {
  it('profile.tsx uses canonical Mineral Warm contracts', () => {
    const filePath = path.join(__dirname, '../../app/(tabs)/profile.tsx');
    const file = fs.readFileSync(filePath, 'utf8');
    
    expect(file).toContain('CardHeader');
    expect(file).not.toContain('COLORS');
    expect(file).not.toContain('bg-surface-app');
  });

  it('statistics.tsx uses canonical Mineral Warm contracts', () => {
    const filePath = path.join(__dirname, '../../app/(tabs)/statistics.tsx');
    const file = fs.readFileSync(filePath, 'utf8');
    
    expect(file).toContain('CardHeader');
    expect(file).not.toContain('COLORS');
    expect(file).not.toContain('bg-surface-app');
  });
});
