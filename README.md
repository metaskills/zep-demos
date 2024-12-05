
# Zep Demos

https://www.unremarkable.ai/about/?ref=unremarkable.ai [TK] To full post.

A handful of demos exploring Knowledge Graphs with [Zep](https://www.getzep.com?ref=unremarkable.ai) and [Graphiti](https://github.com/getzep/graphiti?ref=unremarkable.ai).

[https://www.getzep.com](https://www.getzep.com=ref=unremarkable.ai)

## Setup

Run npm install and build. 

```shell
npm install
npm run build
```

Make sure you have the following environment variables needed:

- `ZEP_API_KEY` - Your [Zep's](https://help.getzep.com/projects) project API Key.
- `GROQ_API_KEY` - Your [Groq](https://console.groq.com/playground?ref=unremarkable.ai) API Key.

## High-Level Demos

All demos follow these patterns:

1. Uses [Inquirer.js](https://www.npmjs.com/package/inquirer) with the CLI to prompt for user questions.
2. Streams model output to the CLI using the [Vercel AI SDK](https://sdk.vercel.ai).
3. Uses the `llama-3.2-3b` model via the Groq provider.

Enumerated demos can be called using `npm run`. For example:

```shell
npm run zep0
```

A brief description of these enumerated demos are:

- zep0: Unique Zep sessions per chat. Uses `zep.memory.get` for chat history messages.
- zep1: Static Zep user with static user associated session. Creates or finds each. Uses `zep.memory.get` for chat history messages. 
- zep2: Static Zep user with unique user associated session. Creates or finds a user. Uses `zep.memory.get` for chat history messages.
- zep3: Static Zep user with static user associated session. Creates or finds each. Uses `zep.memory.get` for chat history messages and `memory.context` system prompt for in-context learning.

## Basic Chat

A baseline AI SDK chatbot with static in-memory messages array. No Zep usage.

```shell
npm run basic
```

```
✔ You: What is my name?
I don't have any information about your name. Our conversation just started...

✔ You: Hi then, my name is Ken.
Hi Ken, it's nice to meet you. Is there something I can help you with, or would you like to chat?

✔ You: I am working on a Personal AI project. Could you give me a very short idea for a use case?
That sounds like an interesting project. Here's a brief idea for a use case...
```

### With Zep0

```shell
npm run zep0
```

Just like above but memory (messages) are stored in Zep.

### With Zep1

```shell
npm run clean
npm run zep1
✔ You: My name is Ken.
Hello Ken. It's nice to meet you. Is there something I can help you with, or would you like to chat?
```

Now, if we exit and run the same command again:

```shell
npm run zep1
✔ You: What is my name?
Your name is Ken.
```

### With Zep2

This would work if we changed our `getMessages` helper to use `zep.memory.getSessions` and used each session's `createdAt` to sort them in order.

```shell
npm run clean
npm run zep2
✔ You: My name is Ken.

npm run zep2
✔ You: I blog at unremarkable.ai

npm run zep2
✔ You: What is my name and what do I do?
```

### With Zep3

Meant to simulate a restored session, for example, logging back into a chatbot after a period of time. The first question of that first session, our chatbot will not know our name. Besides messages being empty, the `memory.context` is undefined. Meaning that despite the fact we have a created user and session attached to each other, that is no pre-seeded facts and entities in the `memory.context`.

All first session chat basic baseline replies are exactly the same. However, if we quit the session and start up the chat again using `npm run zep3` and ask what is my name:

```
✔ You: What is my name?
You've already told me, Ken. Your full name is actually Ken Collins.
```

See how it knows our full name now? This is because the `memory.context` is now seeded with the facts and entities from our last use of the session. For example:

```xml
<FACTS>
  - Ken is working on a Personal AI project. (2024-12-05 03:29:10 - present)
  - user has the email of ken@unremarkable.ai (2024-12-05 03:28:40 - present)
  - The user's name is Ken. (2024-12-05 03:28:40 - 2024-12-05 03:29:01)
  - user has the id of 1 (2024-12-05 03:28:40 - present)
</FACTS>

<ENTITIES>
  - Ken Collins: Ken Collins is working on a Personal AI project and is seeking ideas for use cases.
</ENTITIES>
```

So now we have a working demo that leverages Zep for both:

- memory.context
- memory.messages

But we can do a little better. Why not ask the user what they would like to do when they next login to their session.


## Observations

* I would imagine that a find or create pattern for a user is common. Perhaps an API upsert pattern would be useful? Either way, easy to make a helper function that does this.
* The User id property is a number but might be better off with a string. https://github.com/getzep/zep-js/issues/109
* Do Zep sessions expire??? Seems no. It would be nice if they expired in 30 days if not updated much the same way OpenAI's Thread object does? Would be nice too to set a TTL on a session when creating it too.
* Role Type for JavaScript/TypeScript Should Be roleType vs role_type. https://github.com/getzep/docs.getzep.com/issues/108
* A common pattern in Ecommerce systems is moving a user from anonymous to identified. This is especially useful for conversion tracking. HOW DO YOU DO THIS WITH ZEP?!? 
* The `zep.memory.listSessions` using a page should not raise a 404 error if no sessions are found. Instead, it could return an empty array.
* The best way to learn the API is to read the SDK's source code. For example, I found the resource clients in the TypeScript source really helpful. For example, the Memory client. https://github.com/getzep/zep-js/blob/main/src/api/resources/memory/client/Client.ts

