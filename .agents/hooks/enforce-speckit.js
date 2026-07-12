const fs = require('fs');

function main() {
  try {
    // Read stdin
    const input = fs.readFileSync(0, 'utf-8');
    if (!input) {
      console.log(JSON.stringify({}));
      return;
    }
    
    const payload = JSON.parse(input);

    // Prepare output payload
    const output = {
      injectSteps: [
        {
          type: "EPHEMERAL_MESSAGE",
          content: "MANDATORY HOOK: When generating plans or tasks (e.g. tasks.md), you are strictly FORBIDDEN from executing the implementation manually. You MUST ALWAYS invoke the `speckit-implement` skill (or advise the user to run the slash command `/speckit-implement`) to process and execute tasks."
        }
      ]
    };

    // Write to stdout
    console.log(JSON.stringify(output));

  } catch (error) {
    // Fail silently on error to not crash the agent's invocation, but return empty JSON
    console.log(JSON.stringify({}));
  }
}

main();
