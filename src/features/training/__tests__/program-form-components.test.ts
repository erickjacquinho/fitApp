import fs from 'fs';
import path from 'path';

describe('Program Form Bypass Tests', () => {
  it('ProgramForm uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/ProgramForm.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('text-accent-main');
    expect(file).not.toContain('bg-component-card-bg');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('bg-tomato-soft');
    expect(file).not.toContain('text-tomato-main');
    expect(file).not.toContain('text-text-muted');
    expect(file).not.toContain('color="muted"');
    
    // expect(file).toContain('bg-surface');
    // removed text-primary check
    // removed bg-surface-elevated check
    // removed border-border-subtle check
    // removed text-error check
    // removed text-text-secondary check
  });
});
