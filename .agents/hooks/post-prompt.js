const fs = require('fs');

try {
  // Read stdin
  const input = fs.readFileSync(0, 'utf-8');
  let payload = {};
  if (input) {
    payload = JSON.parse(input);
  }

  // The output to inject an ephemeral message
  const response = {
    injectSteps: [
      {
        ephemeralMessage: "Lembrete: Sempre responda de forma resumida, direto ao ponto, mas sem comprometer em nada o sentido e os detalhes da resposta."
      }
    ]
  };

  console.log(JSON.stringify(response));
} catch (err) {
  // Graceful fallback
  console.log(JSON.stringify({}));
}
