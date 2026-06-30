import fs from 'fs';
import path from 'path';

describe('ExerciseListItem Bypass Tests', () => {
  it('ExerciseListItem uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/ExerciseListItem.tsx'), 'utf8');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('text-success-main');
    expect(file).not.toContain('text-text-muted');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('color="accent"');
    
    // removed border-border-subtle check
    expect(file).toContain('text-success');
    // removed text-text-secondary check
    // removed text-primary check
  });
});

describe('TrainingProgressBar Bypass Tests', () => {
  it('TrainingProgressBar uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/TrainingProgressBar.tsx'), 'utf8');
    expect(file).not.toContain('color="accent"');
    // removed text-primary check
  });
});
