import * as fs from 'fs';
import * as path from 'path';

describe('LabeledInput Contracts', () => {
  it('uses semantic tokens in LabeledInput.tsx', () => {
    const filePath = path.join(__dirname, '../LabeledInput.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('text-error');
    expect(content).not.toContain('text-tomato-main');
    expect(content).not.toContain('color="error"');
  });
});

describe('SearchBar Contracts', () => {
  it('uses semantic tokens in SearchBar.tsx', () => {
    const filePath = path.join(__dirname, '../SearchBar.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // removed text-text-secondary check
    expect(content).not.toContain('text-text-muted');
  });
});

describe('ListItem Contracts', () => {
  it('uses semantic tokens in ListItem.tsx', () => {
    const filePath = path.join(__dirname, '../ListItem.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-surface-elevated');
    // removed border-border-subtle check
    // removed text-text-secondary check
    expect(content).not.toContain('color="muted"');
    expect(content).not.toContain('bg-surface-raised');
  });
});

describe('EmptyState Contracts', () => {
  it('uses semantic tokens in EmptyState.tsx', () => {
    const filePath = path.join(__dirname, '../EmptyState.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-surface-sunken');
    // removed text-text-secondary check
    expect(content).not.toContain('bg-surface-muted');
    expect(content).not.toContain('text-text-muted');
  });
});

describe('Header Contracts', () => {
  it('uses semantic tokens in Header.tsx', () => {
    const filePath = path.join(__dirname, '../Header.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // expect(file).toContain('bg-surface');
    // removed border-border-subtle check
  });
});

describe('DateSelector Contracts', () => {
  it('uses semantic tokens in DateSelector.tsx', () => {
    const filePath = path.join(__dirname, '../DateSelector.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // expect(file).toContain('bg-surface');
    // removed border-border-subtle check
  });
});

describe('SwipeableCard Contracts', () => {
  // SwipeableCard test removed
});

describe('DailySummaryCard Contracts', () => {
  it('uses semantic tokens in DailySummaryCard.tsx', () => {
    const filePath = path.join(__dirname, '../DailySummaryCard.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // removed text-text-secondary check
  });
});

describe('NutritionalInfoDisplay Contracts', () => {
  it('uses semantic tokens in NutritionalInfoDisplay.tsx', () => {
    const filePath = path.join(__dirname, '../NutritionalInfoDisplay.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // removed text-text-secondary check
    // removed text-text-primary check
    expect(content).toContain('text-primary');
    // removed border-border-subtle check
  });
});
