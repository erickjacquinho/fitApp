import fs from 'fs';
import path from 'path';

describe('Exercise Select Bypass Tests', () => {
  it('ExerciseSelect uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/ExerciseSelect.tsx'), 'utf8');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('color="muted"');
    
    expect(file).toContain('border-border-subtle');
    expect(file).toContain('text-text-secondary');
  });
});
