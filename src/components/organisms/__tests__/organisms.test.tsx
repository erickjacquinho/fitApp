import * as fs from 'fs';
import * as path from 'path';

describe('ConfirmModal Contracts', () => {
  it('uses semantic tokens in ConfirmModal.tsx', () => {
    const filePath = path.join(__dirname, '../ConfirmModal.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    // AlertDialog is semantic, just verify it exists
    expect(content).toContain('<AlertDialog');
  });
});

describe('FeedbackDialog Contracts', () => {
  it('uses semantic tokens in FeedbackDialog.tsx', () => {
    const filePath = path.join(__dirname, '../FeedbackDialog.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('text-error');
    expect(content).toContain('text-text-primary');
    expect(content).not.toContain('text-tomato-main');
    expect(content).not.toContain('text-text-main');
  });
});

