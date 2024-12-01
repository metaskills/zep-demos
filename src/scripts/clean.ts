import { zep } from "../shared/zep.js";

let pageNumber = 1;
let sessions;
process.stdout.write("Deleting sessions...");
do {
  const response = await zep.memory.listSessions({
    pageSize: 100,
    pageNumber,
  });
  sessions = response.sessions;
  sessions?.forEach((s) => {
    try {
      zep.memory.delete(s.sessionId!);
    } catch {}
    process.stdout.write(".");
  });
  pageNumber++;
} while (sessions && sessions.length > 0);
process.stdout.write("\n");
