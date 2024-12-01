
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

## Basic Chat

```shell
npm run basic
```

```
✔ You: Hi, my name is Ken.
AI: Hi Ken, it's nice to meet you. Is there something I can help you with, or would you like to chat?
✔ You: What is my name?
AI: Your name is Ken.
✔ You: Tell me a short story using my name.
AI: Here's a short story for you, Ken:

It was a sunny day in the small town of Willow Creek, and Ken was excited to participate in the annual SummerFest celebration <!-- Story truncated for brevity -->

The crowd erupted in applause, and Mr. Jenkins was so grateful that he offered Ken a special prize: a year's supply of his famous homemade jam. Ken accepted, and from that day on, he was known as the hero of SummerFest.

How was that, Ken?
✔ You: Quote the last sentence of the story exactly.
AI: Ken accepted, and from that day on, he was known as the hero of SummerFest.
```

### With Zep

```shell
npm run chat-zep
```

This is `memory.context` after the first message:

```xml
FACTS and ENTITIES represent relevant context to the current conversation.

# These are the most relevant facts and their valid date ranges
# format: FACT (Date range: from - to)
<FACTS>
  - user has the id of 1 (2024-11-30 17:09:44 - present)
  - user has the name of Ken Collins (2024-11-30 17:09:44 - present)
  - user has the email of ken@unremarkable.ai (2024-11-30 17:09:44 - present)
</FACTS>

# These are the most relevant entities
# ENTITY_NAME: entity summary
<ENTITIES>
  - user: The user initiated a conversation with a greeting, using either 'hey' or 'hello'.
  - ken@unremarkable.ai: user with the email of ken@unremarkable.ai
  - User: user
  - Ken Collins: user with the name of Ken Collins
  - 1: user with the id of 1
</ENTITIES>
```





## Observations

* I would imagine that a find or create pattern for a user is common. Perhaps an API upsert pattern would be useful? Either way, easy to make a helper function that does this.
* The User id property is a number but might be better off with a string. https://github.com/getzep/zep-js/issues/109
* Do Zep sessions expire??? Seems no. It would be nice if they expired in 30 days if not updated much the same way OpenAI's Thread object does? Would be nice too to set a TTL on a session when creating it too.
* Role Type for JavaScript/TypeScript Should Be roleType vs role_type. https://github.com/getzep/docs.getzep.com/issues/108
* A common pattern in Ecommerce systems is moving a user from anonymous to identified. This is especially useful for conversion tracking. HOW DO YOU DO THIS WITH ZEP?!? 

