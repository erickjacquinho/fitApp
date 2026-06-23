import fs from 'fs';
import path from 'path';

describe('Workout Session Bypass Tests', () => {
  it('WorkoutSessionScreen uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/WorkoutSessionScreen.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('text-accent-main');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('bg-accent-main/5');
    expect(file).not.toContain('border-accent-main/30');
    expect(file).not.toContain('text-text-muted');
    
    expect(file).toContain('bg-surface');
  });
});
