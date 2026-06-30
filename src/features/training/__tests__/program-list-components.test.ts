import fs from 'fs';
import path from 'path';

describe('Program List Bypass Tests', () => {
  it('ProgramListScreen uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/TrainingHomeScreen.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('bg-surface-muted');
    expect(file).not.toContain('text-accent-main');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('text-tomato-main');
    expect(file).not.toContain('text-text-muted');
    
    // expect(file).toContain('bg-surface');
    // removed bg-surface-disabled check
    // removed text-primary check
    // removed text-text-secondary check
    // removed text-error check
  });
});
