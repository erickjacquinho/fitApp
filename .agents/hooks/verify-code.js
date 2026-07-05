const fs = require('fs');

let inputData = '';
process.stdin.on('data', chunk => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const payload = JSON.parse(inputData);
    
    if (payload.event !== 'PostToolUse') {
      console.log(JSON.stringify({}));
      return;
    }

    const toolName = payload.data && payload.data.toolName;
    const toolResult = payload.data && payload.data.toolResult;
    const toolArgs = payload.data && payload.data.toolArgs;
    
    const modifyingTools = ['write_to_file', 'replace_file_content', 'multi_replace_file_content'];
    
    if (modifyingTools.includes(toolName) && (!toolResult || !toolResult.error)) {
      const targetFile = (toolArgs && (toolArgs.TargetFile || toolArgs.AbsolutePath)) || '';
      
      // Heurística para identificar código backend vs frontend no projeto FitApp
      const isBackend = targetFile.match(/[\\/](api|server|database|models|backend|watermelon|db|services)[\\/]/i) || targetFile.match(/\.(sql|prisma)$/i);
      const isFrontend = targetFile.match(/\.(tsx|jsx|css)$/i) || (targetFile.match(/\.(ts|js)$/i) && !isBackend);

      if (isBackend) {
         console.log(JSON.stringify({
          injectSteps: [
            {
              ephemeralMessage: "IMPLEMENTAÇÃO DETECTADA: Verifique o código backend/banco de dados recém implementado utilizando as skills `backend-architect` e `backend-dev-guidelines` (ou similares de backend) para garantir performance, segurança e consistência na arquitetura."
            }
          ]
        }));
        return;
      } else if (isFrontend) {
        console.log(JSON.stringify({
          injectSteps: [
            {
              ephemeralMessage: "IMPLEMENTAÇÃO DETECTADA: Verifique as implementações de frontend recém realizadas utilizando as skills `ui-ux-pro-max` e `frontend-design` para validar e buscar inconsistências que passaram despercebidas."
            }
          ]
        }));
        return;
      }
    }
    
    console.log(JSON.stringify({}));
  } catch (error) {
    console.log(JSON.stringify({}));
  }
});
