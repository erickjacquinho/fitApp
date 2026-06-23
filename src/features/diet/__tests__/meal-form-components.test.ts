import fs from 'fs';
import path from 'path';

describe('Meal Form Bypass Tests', () => {
  it('MealForm uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/MealForm.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('text-tomato-main');
    
    expect(file).toContain('bg-surface');
    expect(file).toContain('text-text-secondary');
    expect(file).toContain('text-error');
  });

  it('ReorderMealsModal uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/ReorderMealsModal.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('bg-surface-raised');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('text-text-muted');
    
    expect(file).toContain('bg-surface');
    expect(file).toContain('bg-surface-elevated');
    expect(file).toContain('border-border-subtle');
    expect(file).toContain('text-text-secondary');
  });
});
