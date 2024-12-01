import { ZepClient } from "@getzep/zep-cloud";

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

export { zep, findOrCreateUser };
