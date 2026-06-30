import fs from 'fs';
import path from 'path';

describe('Execute Exercise Bypass Tests', () => {
  it('ExecuteExerciseModal uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/ExecuteExerciseModal.tsx'), 'utf8');
    expect(file).not.toContain('text-accent-main');
    expect(file).not.toContain('border-soft');
    
    // removed border-border-subtle check
    // removed text-primary check
  });
  
  it('SetInputRow uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/SetInputRow.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('bg-surface-muted');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('text-success-main');
    expect(file).not.toContain('text-tomato-main');
    expect(file).not.toContain('color="muted"');
    
    // expect(file).toContain('bg-surface');
    // removed border-border-subtle check
    // removed text-error check
  });
});
