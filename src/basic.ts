import inquirer from "inquirer";
import { createGroq } from "@ai-sdk/groq";
import { streamText, CoreUserMessage, CoreAssistantMessage } from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})("llama-3.2-3b-preview");

async function chat() {
  const stream = streamText({
    model: groq,
    system: "You are a helpful assistant.",
    messages: messages,
    temperature: 0.1,
    maxTokens: 1000,
  });
  let fullResponse = "";
  for await (const chunk of stream.textStream) {
    process.stdout.write(chunk);
    fullResponse += chunk;
  }
  process.stdout.write("\n");
  return fullResponse;
}

const messages: (CoreUserMessage | CoreAssistantMessage)[] = [];

while (true) {
  const userInput = await inquirer.prompt([
    { type: "input", name: "message", message: "You:" },
  ]);
  if (userInput.message.toLowerCase() === "exit") break;
  messages.push({ role: "user", content: userInput.message });
  const assistant = await chat();
  messages.push({ role: "assistant", content: assistant });
}
