import fs from 'fs';
import path from 'path';

describe('HistoryScreen Bypass Tests', () => {
  it('HistoryScreen uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/HistoryScreen.tsx'), 'utf8');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('bg-component-card-bg');
    expect(file).not.toContain('active:bg-surface-muted/10');
    expect(file).not.toContain('text-text-muted');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('bg-surface-muted');
    
    expect(file).toContain('text-text-secondary');
    expect(file).toContain('bg-surface-elevated');
  });
});

describe('SessionDetailsScreen Bypass Tests', () => {
  it('SessionDetailsScreen uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/SessionDetailsScreen.tsx'), 'utf8');
    expect(file).not.toContain('bg-success-main/10');
    expect(file).not.toContain('border-success-main/20');
    expect(file).not.toContain('bg-success-main');
    expect(file).not.toContain('text-success-main');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('text-text-muted');
    expect(file).not.toContain('border-soft');
    expect(file).not.toContain('text-accent-main');
    
    expect(file).toContain('border-border-strong');
    expect(file).toContain('text-text-primary');
  });
});
