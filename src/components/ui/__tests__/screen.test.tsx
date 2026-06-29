import * as fs from 'fs';
import * as path from 'path';

describe('Screen Contracts', () => {
  it('implements overlayActive overlay and background tokens', () => {
    const filePath = path.join(__dirname, '../screen.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('overlayActive?: boolean;');
    expect(content).toContain('overlayActive = false');
    expect(content).toContain('bg-scrim');
    expect(content).toContain('z-40');
  });
});
