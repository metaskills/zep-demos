import { ZepClient } from "@getzep/zep-cloud";
import type { Message, Memory } from "@getzep/zep-cloud/api";

const zep = new ZepClient({
  apiKey: process.env.ZEP_API_KEY,
});

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

async function messagesFromMemory(sessionId: string, newUserMessage: string) {
  const memory: Memory = await zep.memory.get(sessionId);
  const messages = memory.messages!.map((m: Message) => {
    return { role: m.roleType, content: m.content };
  });
  messages.push({ role: "user", content: newUserMessage });
  return messages;
}

export { zep, findOrCreateUser, messagesFromMemory };
