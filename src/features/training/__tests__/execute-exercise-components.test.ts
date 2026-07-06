import fs from 'fs';
import path from 'path';

describe('Execute Exercise Bypass Tests', () => {
  it('SetCard uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/SetCard.tsx'), 'utf8');
    expect(file).not.toContain('text-accent-main');
    expect(file).not.toContain('border-soft');
  });
  
  it('ExerciseColumn uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/ExerciseColumn.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('bg-surface-muted');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('text-success-main');
    expect(file).not.toContain('text-tomato-main');
    expect(file).not.toContain('color="muted"');
  });
});
