const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');

const project = new Project();
project.addSourceFilesAtPaths("src/**/*.tsx");
project.addSourceFilesAtPaths("app/**/*.tsx");

const sourceFiles = project.getSourceFiles();

sourceFiles.forEach(sourceFile => {
  let hasChanges = false;
  
  // Find Button imports from our atoms
  const importDecls = sourceFile.getImportDeclarations();
  let importedButton = false;
  
  for (const importDecl of importDecls) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    if (moduleSpecifier.includes('components/atoms/Button') || (moduleSpecifier.includes('components/atoms') && importDecl.getNamedImports().some(n => n.getName() === 'Button'))) {
      importedButton = true;
      
      // If it's a specific button import, remove it completely
      if (moduleSpecifier.includes('components/atoms/Button')) {
        importDecl.remove();
      } else {
        // If it's a shared import, just remove the Button
        const namedImports = importDecl.getNamedImports();
        for (const namedImport of namedImports) {
          if (namedImport.getName() === 'Button') {
            namedImport.remove();
          }
        }
        if (importDecl.getNamedImports().length === 0) {
          importDecl.remove();
        }
      }
      hasChanges = true;
    }
  }
  
  if (importedButton) {
    // Add new imports
    sourceFile.addImportDeclaration({
      moduleSpecifier: '@/components/ui/button',
      namedImports: ['Button']
    });
    // Check if Text is already imported
    const hasTextImport = sourceFile.getImportDeclarations().some(d => d.getNamedImports().some(n => n.getName() === 'Text' && d.getModuleSpecifierValue() === '@/components/ui/text'));
    if (!hasTextImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: '@/components/ui/text',
        namedImports: ['Text']
      });
    }
    
    // Find all JSX elements using Button
    const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
    const jsxOpeningElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
    
    [...jsxElements, ...jsxOpeningElements].forEach(element => {
      if (element.getTagNameNode().getText() === 'Button') {
        const titleAttr = element.getAttribute('title');
        
        let titleContent = '""';
        if (titleAttr) {
          // get its initializer
          const initializer = titleAttr.getInitializer();
          if (initializer) {
            if (initializer.getKind() === SyntaxKind.StringLiteral) {
              titleContent = initializer.getText().slice(1, -1);
            } else if (initializer.getKind() === SyntaxKind.JsxExpression) {
              titleContent = initializer.getText();
            }
          }
          titleAttr.remove();
          hasChanges = true;
        }
        
        const variantAttr = element.getAttribute('variant');
        if (variantAttr) {
          const initializer = variantAttr.getInitializer();
          if (initializer && initializer.getKind() === SyntaxKind.StringLiteral) {
            const val = initializer.getText().slice(1, -1);
            if (val === 'primary') variantAttr.set({ initializer: '"default"' });
            else if (val === 'danger') variantAttr.set({ initializer: '"destructive"' });
          } else if (initializer && initializer.getKind() === SyntaxKind.JsxExpression) {
             const expr = initializer.getExpression();
             if (expr && expr.getKind() === SyntaxKind.ConditionalExpression) {
               // A bit too complex, let's just do text replace on the attribute text if possible
               const text = variantAttr.getText();
               variantAttr.replaceWithText(text.replace(/'primary'/g, "'default'").replace(/'danger'/g, "'destructive'").replace(/"primary"/g, '"default"').replace(/"danger"/g, '"destructive"'));
             }
          }
          hasChanges = true;
        }
        
        const sizeAttr = element.getAttribute('size');
        if (sizeAttr) {
          const initializer = sizeAttr.getInitializer();
          if (initializer && initializer.getKind() === SyntaxKind.StringLiteral) {
            const val = initializer.getText().slice(1, -1);
            if (val === 'md') sizeAttr.set({ initializer: '"default"' });
          }
          hasChanges = true;
        }
        
        // If it was self-closing, we need to replace it with a standard JSX element with <Text>
        if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
          if (titleAttr) {
            const innerText = titleContent.startsWith('{') ? titleContent : titleContent;
            const newText = `<Button ${element.getAttributes().map(a => a.getText()).join(' ')}><Text>${innerText}</Text></Button>`;
            element.replaceWithText(newText);
          }
        } else {
          // It's an opening element, so it has children. If it had title prop, we should add <Text> inside? 
          // Usually if it's not self closing, we don't need to do anything since it already has children, but if it had a title prop, that's weird.
        }
      }
    });
  }
  
  if (hasChanges) {
    sourceFile.saveSync();
    console.log('Updated', sourceFile.getFilePath());
  }
});
