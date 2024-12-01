import inquirer from "inquirer";
import { createGroq } from "@ai-sdk/groq";
import {
  generateText,
  CoreSystemMessage,
  CoreUserMessage,
  CoreAssistantMessage,
} from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})("llama-3.2-3b-preview");

async function chat() {
  const { text } = await generateText({
    model: groq,
    messages: messages,
    temperature: 0.1,
    maxTokens: 1000,
  });
  return text;
}

const messages: (CoreSystemMessage | CoreUserMessage | CoreAssistantMessage)[] =
  [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
  ];

while (true) {
  const userInput = await inquirer.prompt([
    { type: "input", name: "message", message: "You:" },
  ]);
  if (userInput.message.toLowerCase() === "exit") break;
  messages.push({ role: "user", content: userInput.message });
  const assistant = await chat();
  messages.push({ role: "assistant", content: assistant });
  console.log("AI:", assistant);
}
