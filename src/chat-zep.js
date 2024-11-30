"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var groq_1 = require("@ai-sdk/groq");
var zep_cloud_1 = require("@getzep/zep-cloud");
var session = "12345678-abcd-1234-abcd-1234567890ab";
var zep = new zep_cloud_1.ZepClient({
    apiKey: process.env.ZEP_API_KEY,
});
var groq = (0, groq_1.createGroq)({
    apiKey: process.env.GROQ_API_KEY,
})("llama-3.2-3b-preview");
var messages = [
    {
        role: "system",
        content: "You are a helpful assistant.",
    },
];
// const messages = [
//   { role_type: "system", content: "You are a helpful assistant." },
// ];
// async function user(u) {
//   let user;
//   try {
//     user = await zep.user.get(u.userId);
//   } catch (error) {
//     if (error.code === 404) {
//       user = await zep.user.add(u);
//     } else {
//       throw error;
//     }
//   }
//   return user;
// }
// async function chat() {
//   const { text } = await generateText({
//     model: groq,
//     messages: messages,
//     temperature: 0.1,
//     max_tokens: 5000,
//   });
//   return text;
// }
// const ken = await user({
//   userId: "1",
//   email: "ken@unremarkable.ai",
//   firstName: "Ken",
//   lastName: "Collins",
// });
// while (true) {
//   const userInput = await inquirer.prompt([
//     { type: "input", name: "message", message: "You:" },
//   ]);
//   messages.push({ role_type: "user", content: userInput.message });
//   const assistant = await chat();
//   messages.push({ role_type: "assistant", content: assistant });
//   console.log("AI:", assistant);
// }
