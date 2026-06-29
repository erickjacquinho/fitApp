import fs from 'fs';
import path from 'path';

describe('Quantity Screens Bypass Tests', () => {
  it('AddFoodToMealScreen uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/AddFoodToMealScreen.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('color="muted"');
    
    expect(file).toContain('border-border-subtle');
    expect(file).toContain('text-text-secondary');
  });

  it('EditMealItemScreen uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/EditMealItemScreen.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
  });
});
