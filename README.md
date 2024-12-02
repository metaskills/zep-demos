
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
Hi Ken, it's nice to meet you. Is there something I can help you with, or would you like to chat?

✔ You: What is my name?
Your name is Ken.

✔ You: Tell me a short story using my name.
Here's a short story for you, Ken:

<!-- Story truncated for brevity -->

And so, Ken's Sweet Treats became more than just a bakery – it became a place where people came not only to indulge in delicious treats but also to find joy, kindness, and a sense of community. And Ken, well, he was happy to have Emma by his side, spreading happiness and making wishes come true, one delicious cake at a time.

How was that, Ken?

✔ You: What was the last sentence of that story? Word for word.
And Ken, well, he was happy to have Emma by his side, spreading happiness and making wishes come true, one delicious cake at a time.
```

### With Zep

```shell
npm run chat0
```







## Observations

* I would imagine that a find or create pattern for a user is common. Perhaps an API upsert pattern would be useful? Either way, easy to make a helper function that does this.
* The User id property is a number but might be better off with a string. https://github.com/getzep/zep-js/issues/109
* Do Zep sessions expire??? Seems no. It would be nice if they expired in 30 days if not updated much the same way OpenAI's Thread object does? Would be nice too to set a TTL on a session when creating it too.
* Role Type for JavaScript/TypeScript Should Be roleType vs role_type. https://github.com/getzep/docs.getzep.com/issues/108
* A common pattern in Ecommerce systems is moving a user from anonymous to identified. This is especially useful for conversion tracking. HOW DO YOU DO THIS WITH ZEP?!? 
* The `zep.memory.listSessions` using a page should not raise a 404 error if no sessions are found. Instead, it could return an empty array.
