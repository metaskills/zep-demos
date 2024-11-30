import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { ZepClient } from "@getzep/zep-cloud";
import type { Message } from "@getzep/zep-cloud/api";

const zep = new ZepClient({
  apiKey: process.env.ZEP_API_KEY,
});

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})("llama-3.2-3b-preview");

async function findOrCreateUser(u: {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}) {
  let user;
  try {
    user = await zep.user.get(u.userId);
  } catch (error: any) {
    if (error.code === 404) {
      user = await zep.user.add(u);
    } else {
      throw error;
    }
  }
  return user;
}

async function chat() {
  const memory: any = await zep.memory.get(sessionId);
  // console.log(memory.context);
  const { text } = await generateText({
    model: groq,
    prompt: memory.context,
    temperature: 0.1,
    maxTokens: 1000,
  });
  return text;
}

const user = await findOrCreateUser({
  userId: "1",
  email: "ken@unremarkable.ai",
  firstName: "Ken",
  lastName: "Collins",
});

const sessionId = uuidv4();

zep.memory.addSession({
  sessionId: sessionId,
  userId: "1",
});

zep.memory.add(sessionId, {
  messages: [
    {
      role: "system",
      roleType: "system",
      content: "You are a helpful assistant.",
    },
  ],
});

while (true) {
  const userInput = await inquirer.prompt([
    { type: "input", name: "message", message: "You:" },
  ]);
  zep.memory.add(sessionId, {
    messages: [{ role: "user", roleType: "user", content: userInput.message }],
  });
  const assistant = await chat();
  zep.memory.add(sessionId, {
    messages: [
      { role: "assistant", roleType: "assistant", content: userInput.message },
    ],
  });
  console.log("AI:", assistant);
}
