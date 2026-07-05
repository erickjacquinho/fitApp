const fs = require('fs');

let inputData = '';
process.stdin.on('data', chunk => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const payload = JSON.parse(inputData);
    
    // Filtra apenas pelo evento PostToolUse
    if (payload.event !== 'PostToolUse') {
      console.log(JSON.stringify({}));
      return;
    }

    const toolName = payload.data && payload.data.toolName;
    const toolResult = payload.data && payload.data.toolResult;
    const toolArgs = payload.data && payload.data.toolArgs;
    
    // Ferramentas que indicam uma implementação ou alteração em arquivos
    const modifyingTools = ['write_to_file', 'replace_file_content', 'multi_replace_file_content'];
    
    // Verifica se uma ferramenta de modificação rodou com sucesso
    if (modifyingTools.includes(toolName) && (!toolResult || !toolResult.error)) {
      const targetFile = (toolArgs && (toolArgs.TargetFile || toolArgs.AbsolutePath)) || '';
      
      // Checa se é um arquivo focado no frontend
      if (targetFile.match(/\.(tsx|jsx|ts|js|css)$/i)) {
        console.log(JSON.stringify({
          injectSteps: [
            {
              ephemeralMessage: "IMPLEMENTAÇÃO DETECTADA: Verifique as implementações recém realizadas utilizando as skills `ui-ux-pro-max` e `frontend-design` para validar e buscar inconsistências que passaram despercebidas."
            }
          ]
        }));
        return;
      }
    }
    
    // Retorno padrão vazio para os demais eventos
    console.log(JSON.stringify({}));
  } catch (error) {
    // Retorno seguro em caso de falha no parse
    console.log(JSON.stringify({}));
  }
});
