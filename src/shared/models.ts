import type { LanguageModel } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAI } from "@ai-sdk/openai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})("llama-3.1-70b-versatile");

const lmstudio = createOpenAI({
  name: "lmstudio",
  baseURL: "http://localhost:1234/v1",
})("llama-3.1-70b-instruct");

const models: { [key: string]: LanguageModel } = { groq, lmstudio };
const model = process.env.MODEL ? models[process.env.MODEL] : groq;

export { model, groq, lmstudio };
