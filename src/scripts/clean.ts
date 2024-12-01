import { zep } from "../shared/zep.js";

let pageNumber = 1;
let sessions;
process.stdout.write("Deleting sessions...");
do {
  try {
    const response = await zep.memory.listSessions({
      pageSize: 100,
      pageNumber,
    });
    sessions = response.sessions;
  } catch (error) {
    if (error.code === 404) {
      sessions = [];
    } else {
      throw error;
    }
  }
  sessions?.forEach((s) => {
    zep.memory.delete(s.sessionId!);
    process.stdout.write(".");
  });
  pageNumber++;
} while (sessions && sessions.length > 0);
process.stdout.write("\n");
