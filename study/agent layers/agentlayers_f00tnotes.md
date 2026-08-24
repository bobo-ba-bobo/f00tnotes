# f00tnotes: Agent Layers Glossary

> Lightweight, plain-language explanations for every term in the article that an average reader would not already know.
> Each entry is a self-contained card. The **Hover headline** is what shows in the collapsed pop-up. The rest expands when the reader opens the card.
> Format per card: `slug` (for linking) | `category` | `difficulty` | hover headline | mini infographic | plain explanation | why it appears in the piece.
> Rule of thumb followed here: no entry is longer than ~8 sentences. Anyone, expert or not, should get it on one read.

---

## The Big Picture (master infographic)

Where each term sits in an agent. Information flows left to right.

```
 INPUT          UNDERSTAND IT        REMEMBER          THINK             DO IT            ANSWER
 -----          -------------        --------          -----             -----            ------
 [token]        [context window]     [vector database] [chain-of-thought][tool calling]   [output]
 [parsing]      [prompt]             [embedding]       [tree-of-thought]
                [context eng.]       [RAG]             [extended thinking]
                [prompt caching]     [knowledge graph] [reasoning loop]
                                     [4 memory types]

         the model (LLM) sits in the middle and runs once per "call" (inference)
         the foundation labs make the model. moat / commoditization explain who keeps the value.
```

---

## A. Foundations

### AI Agent
`slug: ai-agent` | category: Core | difficulty: ★☆☆

> **Hover:** An AI that does not just answer, it acts. It can use tools, take steps, and keep going until a goal is done.

```
Chatbot:  you ask  ->  it answers.  (stop)
Agent:    you ask  ->  plan -> use a tool -> check result -> act -> repeat until finished
```

**What it is.** A normal chatbot replies once and stops. An agent keeps working: it breaks your request into steps, calls tools (search, edit a file, send an email), looks at what came back, and decides the next move. It loops like this until the task is complete. The difference is like asking someone for directions versus hiring a driver to actually get you there.

**In this piece.** The whole article is about what an agent is made of, layer by layer.

---

### Large Language Model (the "model" / LLM)
`slug: llm` | category: Core | difficulty: ★★☆

> **Hover:** The text engine at the center of every AI agent. Its one trick is predicting the next word, extremely well.

```
"The capital of France is ___"  ->  [ MODEL ]  ->  "Paris"
```

**What it is.** A large language model is trained on enormous amounts of text to do a single thing: given some words, guess what comes next. At huge scale that trick turns into writing, summarizing, coding, and reasoning. On its own it has no memory of yesterday and cannot take any action; it only maps text in to text out. Everything else an agent can do is built around it.

**In this piece.** The article argues the model is the commoditizing part of the stack, the thing everyone can rent equally.

---

### Foundation Model / Foundation Labs
`slug: foundation-model` | category: Core | difficulty: ★★☆

> **Hover:** The few giant, general-purpose models (and the companies that make them) that everyone else builds on top of.

```
Foundation labs (OpenAI, Anthropic, Google)
        | build the base models
        v
   thousands of apps rent them and build on top
```

**What it is.** A foundation model is a large, general model trained at great cost to be good at many tasks at once. Only a handful of companies, the "foundation labs," can afford to make them. Most AI products do not train their own; they rent one through an API. That is why a new capability a lab ships tends to reach every product at roughly the same time.

**In this piece.** "The labs own reasoning" means these companies, not the apps, control that layer.

---

### Token / Tokenization
`slug: token` | category: Core | difficulty: ★★☆

> **Hover:** Models do not read words, they read "tokens," small chunks of text. Tokenization is the chopping step.

```
"footnotes" -> [ foot | notes ]   (2 tokens)
"AI"        -> [ AI ]             (1 token)
rule of thumb:  1 token ~ 4 letters ~ three-quarters of a word
```

**What it is.** Before a model can read text, the text is split into tokens, pieces roughly the size of a short word or part of one. The model processes and is billed per token, so longer text literally costs more money and more time. Tokenization is simply the step that turns your sentence into that list of chunks.

**In this piece.** "Tokens you pay for" and per-token pricing both come from this.

---

### Context Window
`slug: context-window` | category: Core | difficulty: ★★☆

> **Hover:** The model's short-term memory: the most text it can "see" at one time. When it is full, things get dropped.

```
|<--------------- context window --------------->|
[ system rules | past messages | documents | your question ]
        anything that does not fit gets left out
```

**What it is.** A context window is the fixed amount of text (counted in tokens) a model can consider in a single run. Everything it knows in that moment, the instructions, the chat so far, any documents, your question, must fit inside it. When it fills up, older or less important material falls out. Bigger windows handle more at once, but models still recall the middle of a long window less reliably than the start and end.

**In this piece.** Growing context windows are one reason the article says context engineering is losing its edge.

---

### Inference (a "call")
`slug: inference` | category: Core | difficulty: ★★☆

> **Hover:** One run of the model: text in, answer out. Each run is independent and forgets the last one.

```
call #1: question -> answer   (then the model forgets everything)
call #2: question -> answer   (starts fresh again)
```

**What it is.** Inference is the act of running the model once to get an output. Each call is self-contained: the model does not automatically remember the previous call. Anything you want it to "remember" must be fed back in as text. This is exactly why memory has to be built around the model, not inside it.

**In this piece.** "A single call" and the amnesia metaphor both rest on this.

---

### API
`slug: api` | category: Core | difficulty: ★☆☆

> **Hover:** A standard doorway that lets one piece of software use another. Apps reach the model through its API.

```
your app  --request-->  [ model's API ]  --answer-->  your app
```

**What it is.** An API (application programming interface) is an agreed-upon way for software to talk to other software. Instead of building a model yourself, you send your text to the model provider's API and get the answer back. It is the rented doorway that makes "renting a model" possible.

**In this piece.** "Rent one of these models through an API" refers to this.

---

## B. Context and Prompting

### Prompt / Prompt Engineering
`slug: prompt` | category: Context | difficulty: ★☆☆

> **Hover:** The prompt is everything you send the model. Prompt engineering is wording it well to get better answers.

```
prompt = instructions + background + your question
"You are a lawyer. Here is the contract: [...]. Find the risky clauses."
```

**What it is.** A prompt is the full block of text handed to the model, including any role instructions, background, and the actual request. Prompt engineering is the craft of structuring that text well, since small wording changes can noticeably move the quality of the output. For years this was one of the main skills in building AI products.

**In this piece.** The article treats hand-tuned prompting as a skill that is now depreciating.

---

### Context Engineering
`slug: context-engineering` | category: Context | difficulty: ★★★

> **Hover:** Choosing what to put in the model's limited window each turn. The system-level, grown-up version of prompt engineering.

```
everything you COULD show:  [docs][history][memory][tools][user]
window only fits:           [____ pick the right subset ____]
```

**What it is.** Context engineering is the job of assembling the right material into the model's window every time it runs: which documents to include, how much history to keep, what to summarize, what to leave out. Because the window is limited, choosing well makes the same model perform far better. The article's contrarian claim is that this skill, celebrated today, is fading as windows grow and models handle more of it on their own.

**In this piece.** This is one of the two layers the article says is being commoditized.

---

### Prompt Caching
`slug: prompt-caching` | category: Context | difficulty: ★★★

> **Hover:** Reusing the unchanging part of a prompt so you do not pay to reprocess it every single time.

```
without caching: [long fixed instructions + new question] -> pay for ALL of it, every call
with caching:    [cached fixed part]   + [new question]   -> pay mostly for the new part
```

**What it is.** Many prompts repeat the same large fixed section (long instructions, tool definitions) on every call. Prompt caching stores that fixed part so it is not reprocessed and re-billed each time, which sharply cuts cost and waiting for the repeated portion. It is a feature the model providers offer, not something each app has to invent.

**In this piece.** It is an example of the labs absorbing work apps used to do.

---

## C. Memory and Retrieval

### Vector Database
`slug: vector-database` | category: Memory | difficulty: ★★★

> **Hover:** A search engine for meaning instead of exact keywords.

```
keyword search: "car"  finds only the word "car"
vector search:  "car"  also finds "automobile", "vehicle", "sedan"
                       (it matches by meaning, not spelling)
```

**What it is.** A vector database stores text (and images, and more) as lists of numbers, called embeddings, that capture meaning. To search, it returns the stored items whose meaning is closest to your query, even if they share no exact words. This is how an agent pulls "the relevant past notes" out of a huge pile. It is the standard storage engine behind AI memory and document lookup.

**In this piece.** "Solve it later with a vector database" is the lazy approach the article pushes back on.

---

### Embedding
`slug: embedding` | category: Memory | difficulty: ★★★

> **Hover:** Turning text into a list of numbers that captures its meaning, so a computer can compare meanings.

```
"happy"  -> [0.91, -0.12, 0.44, ...]
"joyful" -> [0.89, -0.10, 0.47, ...]   close numbers  -> close meaning
"tax"    -> [-0.33, 0.78, 0.02, ...]   far away       -> unrelated
```

**What it is.** An embedding is the numeric fingerprint of a piece of text. Texts with similar meaning get similar numbers, so a computer can measure how related two things are by how close their numbers are. This is the trick that makes "search by meaning" possible, and it is what vector databases and retrieval run on.

**In this piece.** Memory and codebase indexing both rely on embeddings under the hood.

---

### RAG (Retrieval-Augmented Generation)
`slug: rag` | category: Memory | difficulty: ★★★

> **Hover:** Let the model look things up before answering, instead of relying only on what it memorized.

```
your question -> search your documents -> paste the best matches into the prompt -> model answers from them
```

**What it is.** RAG is a pattern where, before trusting the model's built-in knowledge, you first retrieve relevant documents (usually from a vector database) and feed them into the prompt so the model answers based on them. This keeps answers grounded in your specific, current data and cuts down on made-up facts. It is the standard way to give an agent access to private or up-to-date information.

**In this piece.** The "is long context killing RAG?" debate is named directly.

---

### Knowledge Graph (and Temporal Knowledge Graph)
`slug: knowledge-graph` | category: Memory | difficulty: ★★★

> **Hover:** Storing facts as a web of connected things, not loose text. The "temporal" version also tracks how facts changed over time.

```
[Alice] --works at--> [Acme] --located in--> [Seoul]
temporal:  Alice worked at Acme   2021 to 2024
           Alice works at Beta    2024 to now
```

**What it is.** A knowledge graph records information as entities (people, companies, places) joined by relationships, like a map of how things connect. This lets an agent answer questions that depend on connections, not just matching words. A temporal knowledge graph adds time, so it knows not only what is true now but how facts changed, letting an agent reason about history instead of erasing it.

**In this piece.** This is the approach the company Zep uses for memory.

---

### The Four Types of AI Memory
`slug: memory-types` | category: Memory | difficulty: ★★☆

> **Hover:** Agents need different kinds of memory, like people do: a scratchpad, a diary, a textbook, and a set of habits.

```
Working    | the current scratchpad   | gone when the chat ends
Episodic   | a diary of what happened | "last Tuesday you tried X"
Semantic   | a textbook of facts      | your product specs, your codebase
Procedural | learned habits / how-to  | "always format reports like this"
```

**What it is.** Working memory is whatever is in the current window, and it vanishes when the session ends. Episodic memory is the record of past events and conversations. Semantic memory is stable factual knowledge about a domain. Procedural memory is learned ways of doing things. Today's agents reliably have only the first kind, and the article's core point is that the other three are where lasting value piles up.

**In this piece.** This is the spine of the "memory is the moat" argument.

---

## D. Reasoning

### Chain-of-Thought
`slug: chain-of-thought` | category: Reasoning | difficulty: ★★☆

> **Hover:** Asking the model to "show its work" step by step instead of blurting a final answer.

```
without:  Q -> A                         (often wrong on hard problems)
with:     Q -> step 1 -> step 2 -> A     (more accurate)
```

**What it is.** Chain-of-thought is having the model write out its intermediate reasoning before the final answer. Working through the steps makes it noticeably more accurate on math, logic, and multi-part problems. The cost is more tokens, because the reasoning itself is generated text that you pay for.

**In this piece.** Listed as a technique apps used to hand-build that the labs have now absorbed.

---

### Self-Consistency
`slug: self-consistency` | category: Reasoning | difficulty: ★★☆

> **Hover:** Ask the model the same question several times and go with the answer it gives most often.

```
run 1 -> 42
run 2 -> 42   ->  majority vote  ->  42
run 3 -> 17
```

**What it is.** Self-consistency improves reliability by sampling several independent answers to the same question and taking the most common one, like polling a small crowd instead of trusting one voice. It works because wrong turns tend not to agree with each other, while correct reasoning tends to converge on the same result. It costs more because you run the model several times.

**In this piece.** Another once-bespoke technique now folded into the models.

---

### Tree-of-Thought
`slug: tree-of-thought` | category: Reasoning | difficulty: ★★★

> **Hover:** Exploring several lines of reasoning at once and keeping the most promising, like a chess player weighing options.

```
            start
          /   |   \
     path A  path B  path C
       x      ok      best   <- evaluate, keep the winner
```

**What it is.** Tree-of-thought lets the model branch into multiple possible reasoning paths, judge them, and pursue the best rather than committing to the first line of thinking. It suits hard planning and creative problems where the first idea is rarely the best. It is the most expensive of these techniques because it explores many branches.

**In this piece.** Cited as part of the reasoning scaffolding the labs have taken over.

---

### Extended Thinking
`slug: extended-thinking` | category: Reasoning | difficulty: ★★☆

> **Hover:** The model does a long, private "thinking" pass before answering. Now a built-in feature, not something apps build.

```
[ your question ]
   -> (model thinks privately, at length) ...
   -> [ final answer ]
```

**What it is.** Extended thinking is when a model spends extra effort reasoning in a hidden scratchpad before producing its visible answer. It captures the benefit of techniques like chain-of-thought, but it lives inside the model and is switched on with a setting. Its arrival is the article's clearest example of foundation labs absorbing work applications used to do by hand.

**In this piece.** The Claude 3.7 example of "the scaffolding moved inside the model."

---

### Reasoning Loop / Agent Loop (ReAct)
`slug: reasoning-loop` | category: Reasoning | difficulty: ★★☆

> **Hover:** The cycle an agent repeats: think, act, look at the result, think again, until the task is done.

```
Think -> Act (use a tool) -> Observe result -> Think -> Act -> ... -> Done
```

**What it is.** A reasoning loop (a common version is called ReAct, short for "reason and act") is the repeating cycle at the heart of most agents: reason about what to do, take an action like calling a tool, observe what happened, and feed that back into the next round. This loop is what turns a one-shot answer into a multi-step task. It keeps going until the goal is reached or the agent gives up.

**In this piece.** "A clever agent loop" that the next model release can subsume points here.

---

## E. Action

### Tool Use / Tool Calling
`slug: tool-use` | category: Action | difficulty: ★★☆

> **Hover:** Letting the model actually do things (search, run code, send email) by calling outside functions.

```
Model: "I need today's weather"
   -> calls weather_tool(city) -> the system runs it -> result handed back to the model
```

**What it is.** On its own a model only produces text. Tool use lets it request real actions: the model outputs a structured call like "search the web for X," a surrounding system performs it, and the result is handed back. This is how an agent reads files, queries databases, or sends messages. The tools, not the model, are what touch the real world.

**In this piece.** "Calling tools and touching real systems" in the action layer.

---

## F. Business Terms

### Moat
`slug: moat` | category: Business | difficulty: ★★☆

> **Hover:** Whatever makes a business hard for competitors to copy. The wider the moat, the safer the castle.

```
castle = your business
moat   = what stops rivals copying you
         (proprietary data, lock-in, scale)
wider moat  ->  safer business
```

**What it is.** A moat is a durable advantage that protects a business from competitors, named after the water ring around a castle. Common moats include a strong brand, proprietary data, or high switching costs that make customers reluctant to leave. The article's whole argument is about which layer of an AI agent gives a real moat versus a copyable one.

**In this piece.** The title question "where the moat is" lives here.

---

### Commoditization
`slug: commoditization` | category: Business | difficulty: ★★☆

> **Hover:** When something special becomes a cheap, interchangeable, buy-it-anywhere product. Great for buyers, hard on sellers' margins.

```
scarce and special   ---- over time ---->   cheap and interchangeable
(high price, an edge)                        (low price, no edge)
```

**What it is.** Commoditization is the process by which a once-rare, differentiated product becomes standardized and widely available, so prices fall and no single seller keeps an edge. The article argues AI "reasoning" is commoditizing: every competitor can buy the same quality from the same few labs, so it stops being an advantage. Value then moves to whatever has not commoditized.

**In this piece.** The engine of the entire argument: reasoning commoditizes, memory does not.

---

## G. Plumbing

### Parsing
`slug: parsing` | category: Plumbing | difficulty: ★★☆

> **Hover:** Reading messy raw input and turning it into a clean, structured form a program can use.

```
raw:    "Name: Bob; Age: 30"
parsed: { name: "Bob", age: 30 }
```

**What it is.** Parsing is taking raw input (a file, a webpage, a blob of text) and pulling it apart into organized pieces a program can work with. It is the unglamorous first step in handling almost any input. Done badly, everything downstream inherits the mess.

**In this piece.** Named as part of the ingestion layer.

---

### Codebase Indexing
`slug: codebase-indexing` | category: Plumbing | difficulty: ★★★

> **Hover:** Pre-scanning all of a project's code so an AI tool can instantly find the parts that matter.

```
whole codebase  ---->  [ index: meaning + location of every chunk ]
                            ^
        your question -> jump straight to the 3 relevant files
```

**What it is.** Codebase indexing is when a coding assistant reads an entire project ahead of time and builds a searchable map (usually with embeddings) of what each part does and where it lives. Then, when you ask something, it jumps straight to the relevant files instead of rereading everything. The article points to this index as the real, hard-to-copy asset behind AI coding tools like Cursor.

**In this piece.** "A Cursor that has indexed your entire codebase" is exactly this.

---

## Link Map (for implementation)

Which phrase in the article should link to which card. Match on first meaningful occurrence.

| Phrase in article                              | Links to card (`slug`)   |
| ---------------------------------------------- | ------------------------ |
| "AI agent" / "agent"                           | `ai-agent`               |
| "the model" / "frontier model"                 | `llm`                    |
| "foundation labs" / "the labs"                 | `foundation-model`       |
| "tokens" / "tokenizing"                        | `token`                  |
| "context window"                               | `context-window`         |
| "a single call"                                | `inference`              |
| "through an API"                               | `api`                    |
| "prompt engineering" / "prompt"                | `prompt`                 |
| "context engineering"                          | `context-engineering`    |
| "prompt caching"                               | `prompt-caching`         |
| "vector database"                              | `vector-database`        |
| "embeddings"                                   | `embedding`              |
| "RAG" / "retrieval"                            | `rag`                    |
| "temporal knowledge graph"                     | `knowledge-graph`        |
| "episodic / semantic / procedural / working memory" | `memory-types`      |
| "chain-of-thought"                             | `chain-of-thought`       |
| "self-consistency"                             | `self-consistency`       |
| "tree-of-thought"                              | `tree-of-thought`        |
| "extended thinking"                            | `extended-thinking`      |
| "agent loop" / "reasoning loop"                | `reasoning-loop`         |
| "calling tools" / "tool"                       | `tool-use`               |
| "moat"                                         | `moat`                   |
| "commoditize" / "commodity"                    | `commoditization`        |
| "parsing"                                      | `parsing`                |
| "indexed your entire codebase"                 | `codebase-indexing`      |

---

## Implementation notes (for the hover-card build)

- **Collapsed state (hover):** show only the term name + the **Hover** line. That single sentence is written to stand alone.
- **Expanded state (click / tap):** show the infographic, the "What it is" paragraph, and the "In this piece" connector.
- **Card-news option:** each card maps cleanly to one slide: title, one infographic, one short paragraph.
- **Linking:** only link a term on its first meaningful appearance in the article, so the prose does not turn blue everywhere.
- **Difficulty stars** can be used to decide which terms are worth linking at all. If you want fewer links, drop the ★☆☆ ones (`ai-agent`, `prompt`, `api`).
- Every infographic here is plain ASCII as a blueprint. A designer can redraw each as a clean visual without changing the meaning.

---

*Draft for f00tnotes. Glossary covering: the-forgetting-problem.md. Definitions are intentionally simplified for general readers; technical precision is traded for clarity.*
