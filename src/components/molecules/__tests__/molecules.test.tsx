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

    expect(content).toContain('text-text-secondary');
    expect(content).not.toContain('text-text-muted');
  });
});

describe('ListItem Contracts', () => {
  it('uses semantic tokens in ListItem.tsx', () => {
    const filePath = path.join(__dirname, '../ListItem.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-surface-elevated');
    expect(content).toContain('border-border-subtle');
    expect(content).toContain('text-text-secondary');
    expect(content).not.toContain('color="muted"');
    expect(content).not.toContain('bg-surface-raised');
  });
});

describe('EmptyState Contracts', () => {
  it('uses semantic tokens in EmptyState.tsx', () => {
    const filePath = path.join(__dirname, '../EmptyState.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-surface-sunken');
    expect(content).toContain('text-text-secondary');
    expect(content).not.toContain('bg-surface-muted');
    expect(content).not.toContain('text-text-muted');
  });
});

describe('Header Contracts', () => {
  it('uses semantic tokens in Header.tsx', () => {
    const filePath = path.join(__dirname, '../Header.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-surface');
    expect(content).toContain('border-border-subtle');
  });
});

describe('DateSelector Contracts', () => {
  it('uses semantic tokens in DateSelector.tsx', () => {
    const filePath = path.join(__dirname, '../DateSelector.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-surface');
    expect(content).toContain('border-border-subtle');
  });
});

describe('SwipeableCard Contracts', () => {
  it('uses semantic tokens in SwipeableCard.tsx', () => {
    const filePath = path.join(__dirname, '../SwipeableCard.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('bg-error');
    expect(content).toContain('text-error-foreground');
  });
});

describe('DailySummaryCard Contracts', () => {
  it('uses semantic tokens in DailySummaryCard.tsx', () => {
    const filePath = path.join(__dirname, '../DailySummaryCard.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('text-text-secondary');
  });
});

describe('NutritionalInfoDisplay Contracts', () => {
  it('uses semantic tokens in NutritionalInfoDisplay.tsx', () => {
    const filePath = path.join(__dirname, '../NutritionalInfoDisplay.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('text-text-secondary');
    expect(content).toContain('text-text-primary');
    expect(content).toContain('text-primary');
    expect(content).toContain('border-border-subtle');
  });
});
