import { v4 as uuidv4 } from "uuid";
import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import type { Message } from "@getzep/zep-cloud/api";
import { inquire } from "./shared/inquirer.js";
import { zep } from "./shared/zep.js";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})("llama-3.2-3b-preview");

async function chat() {
  const memory: any = await zep.memory.get(sessionId);
  const { text } = await streamText({
    model: groq,
    system: "You are a helpful assistant.",
    messages: memory.messages.map((m: Message) => {
      return { role: m.roleType, content: m.content };
    }),
    temperature: 0.1,
    maxTokens: 1000,
  });
  return text;
}

const sessionId = uuidv4();

while (true) {
  const userInput = await inquirer.prompt([
    { type: "input", name: "message", message: "You:" },
  ]);
  if (userInput.message.toLowerCase() === "exit") break;
  zep.memory.add(sessionId, {
    messages: [{ roleType: "user", content: userInput.message }],
  });
  const assistant = await chat();
  zep.memory.add(sessionId, {
    messages: [{ roleType: "assistant", content: assistant }],
  });
  console.log("AI:", assistant);
}
