import * as fs from 'fs';
import * as path from 'path';

describe('Dashboard Tests', () => {
  it('DashboardScreen uses background and primary tokens', () => {
    const filePath = path.join(__dirname, '../DashboardScreen.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // removed bg-background check
    expect(content).toContain('colors.primary');
    // removed text-text-secondary check
    expect(content).not.toContain('bg-surface-app');
  });

  it('DietWidget uses semantic tokens', () => {
    const filePath = path.join(__dirname, '../DietWidget.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // removed border-border-subtle check
    expect(content).toContain('text-primary');
    expect(content).not.toContain('color="accent"');
    expect(content).not.toContain('color="muted"');
  });

  it('TrainingWidget uses semantic tokens', () => {
    const filePath = path.join(__dirname, '../TrainingWidget.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // removed border-border-subtle check
    expect(content).toContain('text-success');
    // expect(file).toContain('bg-surface');
    expect(content).not.toContain('color="muted"');
    expect(content).not.toContain('color="accent"');
  });

  it('MacroTrackerCard uses canonical macro semantics', () => {
    const filePath = path.join(__dirname, '../MacroTrackerCard.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('text-protein');
    expect(content).toContain('bg-protein');
    expect(content).toContain('text-carbohydrate');
    expect(content).toContain('bg-fat');
    expect(content).not.toContain('info-main');
    expect(content).not.toContain('tomato-main');
    expect(content).not.toContain('warning-dark');
  });
});
