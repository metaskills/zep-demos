import inquirer from "inquirer";
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})("llama-3.2-3b-preview");

const messages = [{ role: "system", content: "You are a helpful assistant." }];

async function chat() {
  const { text } = await generateText({
    model: groq,
    messages: messages,
    temperature: 0.1,
    max_tokens: 5000,
  });
  return text;
}

while (true) {
  const userInput = await inquirer.prompt([
    { type: "input", name: "message", message: "You:" },
  ]);
  messages.push({ role: "user", content: userInput.message });
  const assistant = await chat();
  messages.push({ role: "assistant", content: assistant });
  console.log("AI:", assistant);
}
