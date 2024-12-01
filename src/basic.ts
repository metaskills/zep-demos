import { streamText, CoreUserMessage, CoreAssistantMessage } from "ai";
import { inquire } from "./shared/inquirer.js";
import { groq } from "./shared/models.js";

const messages: (CoreUserMessage | CoreAssistantMessage)[] = [];

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
  const content = await inquire();
  if (content.toLowerCase() === "exit") break;
  await chat(content);
}
