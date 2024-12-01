import { ZepClient } from "@getzep/zep-cloud";

const zep = new ZepClient({
  apiKey: process.env.ZEP_API_KEY,
});

export { zep };
