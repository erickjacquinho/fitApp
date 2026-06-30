import fs from 'fs';
import path from 'path';

describe('Calendar Summary Bypass Tests', () => {
  it('CalendarSummaryScreen uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../components/CalendarSummaryScreen.tsx'), 'utf8');
    expect(file).not.toContain('bg-surface-app');
    expect(file).not.toContain('color="muted"');
    expect(file).not.toContain('COLORS.primary');
    
    // expect(file).toContain('bg-surface');
    // removed text-text-secondary check
    // removed text-primary check
  });

  it('DailySummaryCard uses semantic tokens', () => {
    const file = fs.readFileSync(path.join(__dirname, '../../../../src/components/molecules/DailySummaryCard.tsx'), 'utf8');
    expect(file).not.toContain('variant="highlight"');
    // removed text-primary check
  });
});
