import inquirer from "inquirer";

async function getMessage() {
  const userInput = await inquirer.prompt([
    { type: "input", name: "message", message: "You:" },
  ]);
  return userInput.message;
}

export { getMessage };
