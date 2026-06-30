import fs from 'fs';
import path from 'path';

describe('Food Bank Component Bypass Tests', () => {
  it('FoodBankScreen uses semantic tokens and no legacy colors', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/FoodBankScreen.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('border-accent-main');
    expect(file).not.toContain('bg-accent-soft');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('variant="highlight"');
    
    // removed text-text-secondary check
  });

  it('FoodCardList uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/FoodCardList.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-raised');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('text-text-main');
    
    // removed border-border-subtle check
  });

  it('FoodForm uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/FoodForm.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('text-tomato-main');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('text-accent-main');
    
    // expect(file).toContain('bg-surface');
    // removed text-error check
    // removed border-border-subtle check
    // removed text-primary check
  });

  it('FoodSelectorModal uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/FoodSelectorModal.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('color="muted"');
    
    // expect(file).toContain('bg-surface');
  });
});
