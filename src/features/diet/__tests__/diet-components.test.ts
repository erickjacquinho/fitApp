import fs from 'fs';
import path from 'path';

describe('Diet Component Bypass Tests', () => {
  it('MenuScreen does not use raw COLORS', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/MenuScreen.tsx'), 'utf8');
    expect(file).not.toContain('COLORS');
    expect(file).not.toContain('color="muted"');
  });

  it('MenuScreen remounts DraggableFlatList when reordering mode changes', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/MenuScreen.tsx'), 'utf8');

    expect(file).toContain("key={isReordering ? 'meal-reorder-list' : 'meal-normal-list'}");
    expect(file).toContain('extraData={isReordering}');
  });

  it('diet.tsx (tab) does not use raw COLORS', () => {
    const file = fs.readFileSync(path.join(__dirname, '../../../../app/(tabs)/diet.tsx'), 'utf8');
    expect(file).not.toContain('COLORS');
  });

  it('MealCard uses semantic macro tokens and no legacy colors', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/MealCard.tsx'), 'utf8');
    expect(file).not.toContain('bg-info-main');
    expect(file).not.toContain('bg-tomato-main');
    expect(file).not.toContain('bg-warning-main');
    expect(file).toContain('bg-protein');
    expect(file).toContain('bg-carbohydrate');
    expect(file).toContain('bg-fat');
    expect(file).toContain('bg-surface');
    expect(file).toContain('bg-border-subtle');
  });

  it('MealCard renders a separate compact branch while reordering', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/MealCard.tsx'), 'utf8');
    const compactBranchIndex = file.indexOf('if (isReordering)');
    const bodyRenderIndex = file.indexOf('<MacroProportionBar macros={macros} />');

    expect(compactBranchIndex).toBeGreaterThan(-1);
    expect(bodyRenderIndex).toBeGreaterThan(compactBranchIndex);
    expect(file).not.toContain("isReordering ? { height: 0, opacity: 0, overflow: 'hidden' } : null");
  });

  it('DailyBalance uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/DailyBalance.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-raised');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('color="muted"');
    expect(file).toContain('bg-surface');
    expect(file).toContain('border-border-subtle');
    expect(file).toContain('text-text-secondary');
    expect(file).toContain('text-text-primary');
  });

  it('MacroBadge uses semantic macro tokens directly', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/MacroBadge.tsx'), 'utf8');
    expect(file).not.toContain('variant="info"');
    expect(file).toContain('bg-protein');
    expect(file).toContain('bg-carbohydrate');
    expect(file).toContain('bg-fat');
    expect(file).toContain('bg-primary');
    expect(file).toContain('text-text-inverse');
  });

  it('MealMacrosSummary uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/MealMacrosSummary.tsx'), 'utf8');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('text-text-main');
    expect(file).toContain('border-border-subtle');
    expect(file).toContain('text-text-primary');
  });
});
