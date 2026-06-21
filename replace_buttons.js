const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // Replace import
  if (content.includes('components/atoms/Button')) {
    content = content.replace(/import\s+\{\s*Button\s*\}\s+from\s+['"].*components\/atoms\/Button['"];?/, "import { Button } from '@/components/ui/button';\nimport { Text } from '@/components/ui/text';");
  } else if (content.includes('components/atoms') && /import.*Button/.test(content)) {
    // case like import { Button, Card } from '../../../components/atoms';
    content = content.replace(/(import\s+.*\{[^}]*)(Button)(,?\s*[^}]*\}.*from\s+['"].*components\/atoms['"];?)/, (match, p1, p2, p3) => {
      let newImport = p1 + p3;
      newImport = newImport.replace(/,\s*,/g, ',');
      newImport = newImport.replace(/\{\s*,\s*/g, '{ ');
      newImport = newImport.replace(/,\s*\}/g, ' }');
      let result = `import { Button } from '@/components/ui/button';\nimport { Text } from '@/components/ui/text';\n`;
      if (!/\{\s*\}/.test(newImport)) {
        result += newImport;
      }
      return result;
    });
  }

  // Replace <Button title="XXX" variant="YYY" ... /> with <Button variant="mapped" ...><Text>XXX</Text></Button>
  content = content.replace(/<Button\s+([^>]*?)\/?>/gs, (match, attrsStr) => {
    let newAttrsStr = attrsStr;

    // Extract title
    const titleRegex = /title=(\{.*\}|"[^"]*"|'[^']*')/;
    const titleMatch = newAttrsStr.match(titleRegex);
    let titleContent = '""';

    if (titleMatch) {
      titleContent = titleMatch[1];
      if (titleContent.startsWith('"') || titleContent.startsWith("'")) {
        titleContent = titleContent.slice(1, -1);
      } else if (titleContent.startsWith('{') && titleContent.endsWith('}')) {
        titleContent = titleContent.slice(1, -1);
        titleContent = `{${titleContent}}`;
      }
      newAttrsStr = newAttrsStr.replace(titleRegex, '');
    }

    // Map variants
    const variantMatch = newAttrsStr.match(/variant=(['"])([^'"]*)(['"])/);
    if (variantMatch) {
      let newVariant = variantMatch[2];
      if (newVariant === 'primary') newVariant = 'default';
      if (newVariant === 'danger') newVariant = 'destructive';
      newAttrsStr = newAttrsStr.replace(variantMatch[0], `variant=${variantMatch[1]}${newVariant}${variantMatch[3]}`);
    }

    // Map size
    const sizeMatch = newAttrsStr.match(/size=(['"])([^'"]*)(['"])/);
    if (sizeMatch) {
      let newSize = sizeMatch[2];
      if (newSize === 'md') newSize = 'default';
      newAttrsStr = newAttrsStr.replace(sizeMatch[0], `size=${sizeMatch[1]}${newSize}${sizeMatch[3]}`);
    }

    // If it was self closing or empty tag, we replace it with <Button><Text>Title</Text></Button>
    if (titleMatch) {
      return `<Button ${newAttrsStr.trim()}><Text>${titleContent}</Text></Button>`;
    }
    
    // If no title was found, just return it as it was (maybe it already has children)
    if (match.endsWith('/>')) {
      return `<Button ${newAttrsStr.trim()} />`;
    }
    return `<Button ${newAttrsStr.trim()}>`;
  });

  // Clean up any weird `<Button ><Text>`
  content = content.replace(/<Button\s+>/g, '<Button>');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
