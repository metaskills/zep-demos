import { ZepClient } from "@getzep/zep-cloud";
import type {
  Message,
  Memory,
  CreateUserRequest,
  CreateSessionRequest,
} from "@getzep/zep-cloud/api";

const zep = new ZepClient({
  apiKey: process.env.ZEP_API_KEY,
});

async function getOrAddUser(r: CreateUserRequest) {
  let user;
  try {
    user = await zep.user.get(r.userId!);
  } catch (error: any) {
    if (error.statusCode === 404) {
      user = await zep.user.add(r);
    } else {
      throw error;
    }
  }
  return user;
}

async function getOrAddSession(r: CreateSessionRequest) {
  let session;
  try {
    session = await zep.memory.getSession(r.sessionId!);
  } catch (error: any) {
    if (error.statusCode === 404) {
      session = await zep.memory.addSession(r);
    } else {
      throw error;
    }
  }
  return session;
}

async function getMessages(sessionId: string, newUserMessage: string) {
  const memory: Memory = await zep.memory.get(sessionId);
  const messages = memory.messages!.map((m: Message) => {
    return { role: m.roleType, content: m.content };
  });
  messages.push({ role: "user", content: newUserMessage });
  return messages;
}

export { zep, getOrAddUser, getOrAddSession, getMessages };
