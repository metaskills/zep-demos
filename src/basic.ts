import { createGroq } from "@ai-sdk/groq";
import { streamText, CoreUserMessage, CoreAssistantMessage } from "ai";
import { getMessage } from "./shared/inquirer.js";

const messages: (CoreUserMessage | CoreAssistantMessage)[] = [];

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})("llama-3.2-3b-preview");

async function chat(content: string) {
  messages.push({ role: "user", content: content });
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
  messages.push({ role: "assistant", content: fullResponse });
}

while (true) {
  const content = await getMessage();
  if (content.toLowerCase() === "exit") break;
  await chat(content);
}
