/* f00tnotes glossary - single source of truth
 * Used by both the article tooltips and the concept pages.
 * Each term:
 *   slug       - URL id (/glossary/<slug>)
 *   term       - display name
 *   aliases    - phrases auto-linked on FIRST occurrence in an article body
 *   category   - grouping label
 *   difficulty - 1..3 (3 = most jargon-heavy)
 *   hover      - one-line plain explanation shown in the footnote bubble
 *   infographic- ASCII blueprint shown on the concept page
 *   body       - array of paragraphs (the "sophisticated wikipedia" page)
 *   analogy    - one-line analogy callout
 */
window.F00T_GLOSSARY = {
  terms: [
    {
      slug: 'ai-agent',
      term: 'AI Agent',
      aliases: ['AI agent'],
      category: 'Foundations',
      difficulty: 1,
      hover: 'An AI that does not just answer, it acts: it uses tools, takes steps, and keeps going until a goal is done.',
      infographic:
        'Chatbot:  you ask  ->  it answers.  (stop)\n' +
        'Agent:    you ask  ->  plan -> use a tool -> check -> act -> repeat until finished',
      body: [
        'An AI agent is a system built around a language model that can pursue a goal over multiple steps rather than producing a single reply. A plain chatbot answers once and stops. An agent breaks a request into smaller steps, takes actions through tools (searching the web, editing a file, sending a message, querying a database), reads the result of each action, and decides what to do next. It repeats that loop until the task is finished or it decides it cannot continue.',
        'The important thing to understand is that the agent is not the model. The model supplies the reasoning, but the ability to remember, to act, and to stay on task across many steps comes from the layers of software wrapped around it. That is why two products built on the exact same model can feel completely different.'
      ],
      analogy: 'The difference between asking someone for directions and hiring a driver to actually get you there.'
    },
    {
      slug: 'llm',
      term: 'Large Language Model (LLM)',
      aliases: ['the model', 'a language model'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'The text engine at the center of every AI agent. Its one trick is predicting the next word, extremely well.',
      infographic:
        '"The capital of France is ___"  ->  [ MODEL ]  ->  "Paris"',
      body: [
        'A large language model, or LLM, is trained on enormous amounts of text to do a single thing: given some words, predict what comes next. At a large enough scale, that simple prediction trick turns into the ability to write, summarize, translate, code, and reason. Modern models like the Claude, GPT, and Gemini families are all LLMs at their core.',
        'On its own a model has no memory of yesterday and cannot take any action in the world. It only maps text in to text out, one run at a time. Everything else an agent appears to do, remembering you, looking things up, calling tools, is built around the model rather than inside it. This is precisely why the article argues the model is the part of the stack that is becoming a commodity: capability is converging and anyone can rent it.'
      ],
      analogy: 'A brilliant improviser who is also a complete amnesiac: dazzling in the moment, with no idea what happened five minutes ago.'
    },
    {
      slug: 'foundation-model',
      term: 'Foundation Model / Foundation Labs',
      aliases: ['foundation labs', 'foundation models'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'The few giant, general-purpose models (and the companies that make them) that everyone else builds on top of.',
      infographic:
        'Foundation labs (OpenAI, Anthropic, Google)\n' +
        '        | build the base models\n' +
        '        v\n' +
        '   thousands of apps rent them and build on top',
      body: [
        'A foundation model is a large, general-purpose model trained at great expense to be capable across many tasks at once, rather than tuned for one narrow job. Only a handful of companies, often called the foundation labs, have the data, compute, and capital to train them. Most AI products do not build their own; they rent one of these models through an API.',
        'This structure matters for strategy. When a foundation lab ships a new capability, it tends to reach every product built on that model at roughly the same time. So any advantage that lives at the model layer is shared by all of a company’s competitors almost immediately. The article’s phrase "the labs own reasoning" means exactly this: the labs, not the apps on top, control that layer.'
      ],
      analogy: 'Like power utilities: a few players generate the electricity, and countless businesses plug in and build on top of it.'
    },
    {
      slug: 'token',
      term: 'Token / Tokenization',
      aliases: ['tokenizing', 'tokens', 'tokenization'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'Models do not read words, they read "tokens", small chunks of text. Tokenization is the chopping step.',
      infographic:
        '"footnotes" -> [ foot | notes ]   (2 tokens)\n' +
        '"AI"        -> [ AI ]             (1 token)\n' +
        'rule of thumb:  1 token ~ 4 letters ~ three-quarters of a word',
      body: [
        'Before a model can read text, that text is split into tokens, pieces roughly the size of a short word or a fragment of one. A model processes and is billed per token, so longer inputs and outputs literally cost more money and more time. Tokenization is simply the step that turns a sentence into the list of chunks the model actually consumes.',
        'Tokens are the unit that almost everything else is measured in. A context window is measured in tokens, pricing is quoted per million tokens, and "the model is thinking" means it is generating tokens you pay for. When the article notes that "tokens spent thinking are tokens you pay for", this is the reason reasoning is expensive to run.'
      ],
      analogy: 'Like cutting a sentence into LEGO bricks before the machine can build with them.'
    },
    {
      slug: 'context-window',
      term: 'Context Window',
      aliases: ['context windows', 'context window'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'The model’s short-term memory: the most text it can "see" at one time. When it is full, things get dropped.',
      infographic:
        '|<--------------- context window --------------->|\n' +
        '[ system rules | past messages | documents | your question ]\n' +
        '        anything that does not fit gets left out',
      body: [
        'A context window is the fixed amount of text, counted in tokens, that a model can consider in a single run. Everything the model knows in that moment, its instructions, the conversation so far, any documents you pasted in, and your actual question, has to fit inside it. When the window fills up, older or less relevant material falls out of view.',
        'Windows have grown quickly, from a few thousand tokens to hundreds of thousands and, in some models, a million or more. But a bigger window is not the same as perfect recall: models still retrieve information from the middle of a long window less reliably than from the beginning or end. The article points to growing windows as one of the two forces eroding the value of careful context engineering.'
      ],
      analogy: 'A desk you can only fit so many papers on. Add a new one and an old one slides off the edge.'
    },
    {
      slug: 'inference',
      term: 'Inference (a "call")',
      aliases: ['a single call', 'a single forward pass'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'One run of the model: text in, answer out. Each run is independent and forgets the last one.',
      infographic:
        'call #1: question -> answer   (then the model forgets everything)\n' +
        'call #2: question -> answer   (starts fresh again)',
      body: [
        'Inference is the act of running the model once to produce an output. Each call is self-contained: the model does not automatically carry anything over from the previous call. Whatever you want it to "remember" has to be fed back in as text on the next call.',
        'This single fact explains a great deal about how agents are built. Because the model forgets between calls, memory cannot live inside the model; it has to be stored outside and re-injected. The amnesia the article opens with is not a bug, it is just what inference is.'
      ],
      analogy: 'Like talking to someone with no short-term memory: every sentence, you have to remind them what you were discussing.'
    },
    {
      slug: 'api',
      term: 'API',
      aliases: ['through an API', 'an API'],
      category: 'Foundations',
      difficulty: 1,
      hover: 'A standard doorway that lets one piece of software use another. Apps reach the model through its API.',
      infographic:
        'your app  --request-->  [ model’s API ]  --answer-->  your app',
      body: [
        'An API (application programming interface) is an agreed-upon way for one piece of software to request something from another. Instead of building a model yourself, you send your text to the model provider’s API and get the answer back over the internet.',
        'It is the rented doorway that makes "renting a model" possible, and it is why switching from one model to another can be as simple as changing which API you call. Low switching cost at this layer is part of why model capability commoditizes.'
      ],
      analogy: 'Like a restaurant’s order window: you do not enter the kitchen, you hand a ticket through the slot and get a plate back.'
    },
    {
      slug: 'prompt',
      term: 'Prompt / Prompt Engineering',
      aliases: ['prompt engineering', 'the cleverest prompt'],
      category: 'Context',
      difficulty: 1,
      hover: 'The prompt is everything you send the model. Prompt engineering is wording it well to get better answers.',
      infographic:
        'prompt = instructions + background + your question\n' +
        '"You are a lawyer. Here is the contract: [...]. Find the risky clauses."',
      body: [
        'A prompt is the full block of text handed to the model on a given call, including any role instructions ("you are a lawyer"), background material, and the actual request. Prompt engineering is the craft of structuring that text so the model responds better, since small changes in wording can move the quality of the output noticeably.',
        'For the first couple of years of the generative-AI wave, prompt engineering was treated as a core, almost magical skill. The article’s argument is that this hand-tuning is a depreciating asset: as models get better and windows get larger, they need less coaxing, and the clever prompt that gave you an edge today is easier to copy and less necessary tomorrow.'
      ],
      analogy: 'Like phrasing a question to a brilliant but very literal expert: ask well and you get gold, ask sloppily and you get nonsense.'
    },
    {
      slug: 'context-engineering',
      term: 'Context Engineering',
      aliases: ['context engineering', 'context assembly', 'context-assembly'],
      category: 'Context',
      difficulty: 3,
      hover: 'Choosing what to put in the model’s limited window each turn. The system-level, grown-up version of prompt engineering.',
      infographic:
        'everything you COULD show:  [docs][history][memory][tools][user]\n' +
        'window only fits:           [____ pick the right subset ____]',
      body: [
        'Context engineering is the discipline of assembling exactly the right material into the model’s window every time it runs: which documents to include, how much conversation history to keep, what to summarize, what to leave out entirely. Because the window is limited and the model attends unevenly across it, choosing well can make the same model perform dramatically better than choosing badly.',
        'It is currently the most celebrated skill in applied AI, and for the last two years the praise has been deserved. The article’s contrarian claim is that it is a transitional craft. It exists to work around the model’s limitations, and those limitations are receding as windows grow and as the labs build retrieval, compression, and relevance-filtering into the model itself. Valuable now, depreciating quietly.'
      ],
      analogy: 'Like a great chief of staff deciding which three documents land on the CEO’s desk, out of a thousand.'
    },
    {
      slug: 'prompt-caching',
      term: 'Prompt Caching',
      aliases: ['Prompt caching', 'prompt caching'],
      category: 'Context',
      difficulty: 3,
      hover: 'Reusing the unchanging part of a prompt so you do not pay to reprocess it every single time.',
      infographic:
        'without caching: [long fixed instructions + new question] -> pay for ALL of it, every call\n' +
        'with caching:    [cached fixed part]   + [new question]   -> pay mostly for the new part',
      body: [
        'Many prompts repeat the same large fixed section on every call: long system instructions, tool definitions, a reference document. Prompt caching stores that fixed section after the first call so it does not have to be reprocessed and re-billed each time, which sharply cuts the cost and latency of the repeated portion.',
        'It is offered as a feature by the model providers rather than something each application has to invent. In the article it is an example of the labs absorbing work that used to live in the application layer, the same pattern that is eroding context engineering as a source of advantage.'
      ],
      analogy: 'Like keeping a frequently used document open in a tab instead of re-downloading it every time you need it.'
    },
    {
      slug: 'vector-database',
      term: 'Vector Database',
      aliases: ['vector database', 'vector store'],
      category: 'Memory',
      difficulty: 3,
      hover: 'A search engine for meaning instead of exact keywords.',
      infographic:
        'keyword search: "car"  finds only the word "car"\n' +
        'vector search:  "car"  also finds "automobile", "vehicle", "sedan"\n' +
        '                       (it matches by meaning, not spelling)',
      body: [
        'A vector database stores text (and images, audio, and more) as lists of numbers called embeddings that capture meaning. To search, it returns the stored items whose meaning is closest to your query, even when they share no exact words. This is how an agent pulls "the few relevant past notes" out of an enormous pile.',
        'It is the standard storage engine behind AI memory and document retrieval, and the article’s point is that treating it as a checkbox ("we’ll add a vector database") badly understates the real problem. Storing vectors is easy; deciding what is worth storing, what to forget, and how to retrieve the right three items out of a million is the hard, unsolved part.'
      ],
      analogy: 'Like a librarian who finds books by what they are about, not by exact title spelling.'
    },
    {
      slug: 'embedding',
      term: 'Embedding',
      aliases: ['embeddings', 'embedding'],
      category: 'Memory',
      difficulty: 3,
      hover: 'Turning text into a list of numbers that captures its meaning, so a computer can compare meanings.',
      infographic:
        '"happy"  -> [0.91, -0.12, 0.44, ...]\n' +
        '"joyful" -> [0.89, -0.10, 0.47, ...]   close numbers -> close meaning\n' +
        '"tax"    -> [-0.33, 0.78, 0.02, ...]   far away      -> unrelated',
      body: [
        'An embedding is the numeric fingerprint of a piece of text. Texts with similar meaning are converted into similar lists of numbers, so a computer can measure how related two things are simply by how close their numbers sit in space.',
        'This is the trick that makes search-by-meaning possible. Vector databases, retrieval, and codebase indexing all run on embeddings underneath. Without them, a computer can only match exact characters; with them, it can match ideas.'
      ],
      analogy: 'Like GPS coordinates for meaning: "happy" and "joyful" end up on nearly the same spot of the map.'
    },
    {
      slug: 'rag',
      term: 'RAG (Retrieval-Augmented Generation)',
      aliases: ['RAG', 'retrieval'],
      category: 'Memory',
      difficulty: 3,
      hover: 'Let the model look things up before answering, instead of relying only on what it memorized.',
      infographic:
        'your question -> search your documents -> paste the best matches into the prompt -> model answers from them',
      body: [
        'RAG is a pattern where, instead of trusting the model’s built-in knowledge, you first retrieve relevant documents (usually from a vector database) and feed them into the prompt so the model answers based on them. This keeps responses grounded in your specific, current data and cuts down on confidently made-up facts.',
        'It is the standard way to give an agent access to private or up-to-date information the model was never trained on. The article references the running industry debate, "is long context killing RAG?", and argues the framing is wrong: bigger windows are killing the manual, hand-tuned version of context assembly, not the underlying need to retrieve the right information.'
      ],
      analogy: 'Like an open-book exam: rather than recite from memory, the model looks up the relevant page first.'
    },
    {
      slug: 'knowledge-graph',
      term: 'Knowledge Graph (and Temporal Knowledge Graph)',
      aliases: ['temporal knowledge graph', 'knowledge graph'],
      category: 'Memory',
      difficulty: 3,
      hover: 'Storing facts as a web of connected things, not loose text. The "temporal" version also tracks how facts changed over time.',
      infographic:
        '[Alice] --works at--> [Acme] --located in--> [Seoul]\n' +
        'temporal:  Alice worked at Acme   2021 to 2024\n' +
        '           Alice works at Beta    2024 to now',
      body: [
        'A knowledge graph records information as entities (people, companies, places) joined by labeled relationships, like a map of how things connect. This lets an agent answer questions that depend on connections rather than on matching keywords, for example "who at this company reported to whom, and when".',
        'A temporal knowledge graph adds time, so it stores not only what is true now but how facts changed. That lets an agent reason about history instead of silently overwriting it, which matters for memory: a person’s job, preference, or address can change, and a good memory remembers the difference. The article notes this is the approach the startup Zep takes.'
      ],
      analogy: 'Like a detective’s wall of photos and string, except it also notes when each connection started and ended.'
    },
    {
      slug: 'memory-types',
      term: 'The Four Types of AI Memory',
      aliases: ['Episodic memory', 'episodic memory'],
      category: 'Memory',
      difficulty: 2,
      hover: 'Agents need different kinds of memory, like people do: a scratchpad, a diary, a textbook, and a set of habits.',
      infographic:
        'Working    | the current scratchpad   | gone when the chat ends\n' +
        'Episodic   | a diary of what happened | "last Tuesday you tried X"\n' +
        'Semantic   | a textbook of facts      | your product specs, your codebase\n' +
        'Procedural | learned habits / how-to  | "always format reports like this"',
      body: [
        'Agents draw on four kinds of memory. Working memory is whatever sits in the current context window and disappears when the session ends. Episodic memory is the record of past events and conversations. Semantic memory is stable factual knowledge about a domain. Procedural memory is learned ways of doing things, the workflows and patterns that turn out to work for a given user.',
        'Today’s agents reliably have only the first kind. Making the other three persist and retrieve well is the genuinely hard, mostly unsolved problem, and it is the spine of the article’s thesis: the three durable kinds of memory are where lasting, compounding value accumulates, while everyone’s attention is fixed on reasoning.'
      ],
      analogy: 'Working = scratchpad, episodic = diary, semantic = textbook, procedural = muscle memory.'
    },
    {
      slug: 'chain-of-thought',
      term: 'Chain-of-Thought',
      aliases: ['chain-of-thought'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'Asking the model to "show its work" step by step instead of blurting a final answer.',
      infographic:
        'without:  Q -> A                         (often wrong on hard problems)\n' +
        'with:     Q -> step 1 -> step 2 -> A     (more accurate)',
      body: [
        'Chain-of-thought is the technique of having the model write out its intermediate reasoning before giving a final answer. Working through the steps, rather than jumping straight to a conclusion, makes the model noticeably more accurate on math, logic, and multi-part problems.',
        'The cost is more tokens, since the reasoning itself is generated text you pay for. In the article, chain-of-thought is one of several techniques that applications used to build by hand and that the foundation labs have since folded directly into the models.'
      ],
      analogy: 'Like a math teacher insisting you show your working: slower, but far fewer careless mistakes.'
    },
    {
      slug: 'self-consistency',
      term: 'Self-Consistency',
      aliases: ['self-consistency'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'Ask the model the same question several times and go with the answer it gives most often.',
      infographic:
        'run 1 -> 42\n' +
        'run 2 -> 42   ->  majority vote  ->  42\n' +
        'run 3 -> 17',
      body: [
        'Self-consistency improves reliability by sampling several independent answers to the same question and taking the most common one, rather than trusting a single run. It works because a model’s occasional wrong turns tend not to agree with each other, while correct reasoning tends to converge on the same result.',
        'The trade-off is cost: you run the model multiple times for one answer. Like chain-of-thought, it is a once-bespoke trick that has largely been absorbed into how modern reasoning models operate internally.'
      ],
      analogy: 'Like asking three experts independently and going with the answer two of them agree on.'
    },
    {
      slug: 'tree-of-thought',
      term: 'Tree-of-Thought',
      aliases: ['tree-of-thought'],
      category: 'Reasoning',
      difficulty: 3,
      hover: 'Exploring several lines of reasoning at once and keeping the most promising, like a chess player weighing options.',
      infographic:
        '            start\n' +
        '          /   |   \\\n' +
        '     path A  path B  path C\n' +
        '       x      ok      best   <- evaluate, keep the winner',
      body: [
        'Tree-of-thought lets the model branch into multiple possible lines of reasoning, evaluate them, and pursue the most promising rather than committing to the first idea it has. It suits hard planning and creative problems, where the first approach is often not the best one.',
        'It is the most expensive of the common reasoning techniques because it explores many branches before settling. In the article it stands in for the elaborate reasoning scaffolds that applications used to construct and that the labs are now subsuming.'
      ],
      analogy: 'Like a chess player mentally playing out several moves down different lines before choosing one.'
    },
    {
      slug: 'extended-thinking',
      term: 'Extended Thinking',
      aliases: ['extended thinking'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'The model does a long, private "thinking" pass before answering. Now a built-in feature, not something apps build.',
      infographic:
        '[ your question ]\n' +
        '   -> (model thinks privately, at length) ...\n' +
        '   -> [ final answer ]',
      body: [
        'Extended thinking is when a model spends extra effort reasoning in a hidden internal scratchpad before producing its visible answer. It captures the accuracy benefit of techniques like chain-of-thought, but it is handled inside the model and switched on with a simple setting rather than hand-built by the application.',
        'Its arrival is the article’s clearest concrete example of foundation labs absorbing work that used to be an application-level craft. When Anthropic shipped extended thinking in Claude 3.7 in early 2025, a capability apps once engineered by hand became a flag you turn on.'
      ],
      analogy: 'Like a contestant who gets to think silently for a full minute before answering, instead of blurting immediately.'
    },
    {
      slug: 'reasoning-loop',
      term: 'Reasoning Loop / Agent Loop (ReAct)',
      aliases: ['reasoning loops', 'clever agent loop', 'reasoning loop', 'agent loop'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'The cycle an agent repeats: think, act, look at the result, think again, until the task is done.',
      infographic:
        'Think -> Act (use a tool) -> Observe result -> Think -> Act -> ... -> Done',
      body: [
        'A reasoning loop, a common version of which is called ReAct (short for "reason and act"), is the repeating cycle at the heart of most agents. The agent reasons about what to do, takes an action such as calling a tool, observes what came back, and feeds that observation into its next round of reasoning. This loop is what turns a one-shot answer into a multi-step task.',
        'It continues until the goal is reached or the agent gives up. The article notes that an agent whose only advantage is a clever loop is exposed, because the next model release tends to do this kind of orchestration better, for free, for everyone.'
      ],
      analogy: 'Like cooking from a recipe: do a step, taste, adjust, do the next step, repeat until it is done.'
    },
    {
      slug: 'tool-use',
      term: 'Tool Use / Tool Calling',
      aliases: ['calling tools', 'tool calling', 'tool use'],
      category: 'Action',
      difficulty: 2,
      hover: 'Letting the model actually do things (search, run code, send email) by calling outside functions.',
      infographic:
        'Model: "I need today’s weather"\n' +
        '   -> calls weather_tool(city) -> the system runs it -> result handed back to the model',
      body: [
        'On its own, a model can only produce text. Tool use lets it request real actions: the model outputs a structured call like "search the web for X" or "write this file", a surrounding system actually performs that action, and the result is handed back into the model’s context. This is how an agent reads files, queries databases, or sends messages.',
        'The key point is that the tools, not the model, are what touch the real world. The model decides what to do; the runtime does it. This division is what makes an agent useful and also what the security layer has to govern carefully.'
      ],
      analogy: 'Like a smart manager who cannot lift a box, but can tell the right worker exactly which box to move.'
    },
    {
      slug: 'moat',
      term: 'Moat',
      aliases: ['the moat', 'a moat'],
      category: 'Business',
      difficulty: 2,
      hover: 'A business term for whatever makes you hard to copy. The wider the moat, the safer the castle.',
      infographic:
        'castle = your business\n' +
        'moat   = what stops rivals copying you\n' +
        '         (proprietary data, lock-in, scale)\n' +
        'wider moat  ->  safer business',
      body: [
        'A moat is a durable advantage that protects a business from competitors, named after the ring of water that protects a castle. Common moats include a strong brand, proprietary data, network effects, or high switching costs that make customers reluctant to leave.',
        'The entire article is an argument about which layer of an AI agent provides a real moat versus a copyable one. Its claim is that reasoning is a shallow moat that the labs keep refilling for everyone, while accumulated memory is a deep moat that gets wider the longer a customer stays.'
      ],
      analogy: 'The wider the water around the castle, the harder it is for attackers to reach the walls.'
    },
    {
      slug: 'commoditization',
      term: 'Commoditization',
      aliases: ['resists commoditization', 'commoditization', 'commoditizing', 'a commodity'],
      category: 'Business',
      difficulty: 2,
      hover: 'When something special becomes a cheap, interchangeable, buy-it-anywhere product. Great for buyers, hard on sellers’ margins.',
      infographic:
        'scarce and special   ---- over time ---->   cheap and interchangeable\n' +
        '(high price, an edge)                        (low price, no edge)',
      body: [
        'Commoditization is the process by which a product that was once rare and differentiated becomes standardized and widely available, so prices fall and no single seller keeps an edge. It is excellent for buyers and brutal for sellers’ margins.',
        'The article argues that AI reasoning is commoditizing: every competitor can buy the same quality from the same few labs on the same afternoon, so it stops being a source of advantage. Once a layer commoditizes, value moves to whatever has not, which is the heart of the memory thesis.'
      ],
      analogy: 'Like bottled water or USB cables: once special, now identical and cheap on every shelf.'
    },
    {
      slug: 'parsing',
      term: 'Parsing',
      aliases: ['parsing'],
      category: 'Plumbing',
      difficulty: 2,
      hover: 'Reading messy raw input and turning it into a clean, structured form a program can use.',
      infographic:
        'raw:    "Name: Bob; Age: 30"\n' +
        'parsed: { name: "Bob", age: 30 }',
      body: [
        'Parsing is the step of taking raw input, a file, a webpage, a blob of text, and pulling it apart into organized pieces a program can work with. It is the unglamorous first stage of handling almost any input an agent receives.',
        'It rarely gets attention, but it sets a ceiling on everything downstream: if parsing is sloppy, every later layer inherits the mess. In the article it appears as part of the ingestion layer, where raw signals are turned into something the agent can process.'
      ],
      analogy: 'Like unpacking a messy grocery bag and sorting items onto the right shelves before you can cook.'
    },
    {
      slug: 'codebase-indexing',
      term: 'Codebase Indexing',
      aliases: ['indexed your entire codebase'],
      category: 'Plumbing',
      difficulty: 3,
      hover: 'Pre-scanning all of a project’s code so an AI tool can instantly find the parts that matter.',
      infographic:
        'whole codebase  ---->  [ index: meaning + location of every chunk ]\n' +
        '                            ^\n' +
        '        your question -> jump straight to the 3 relevant files',
      body: [
        'Codebase indexing is when a coding assistant reads through an entire project ahead of time and builds a searchable map, usually using embeddings, of what each part of the code does and where it lives. Then, when you ask a question, it can jump straight to the few relevant files instead of rereading everything.',
        'The article points to this index as the real, hard-to-copy asset behind AI coding tools like Cursor. A rival can use a better model, but it cannot instantly reproduce months of a specific team’s indexed code and accumulated conventions. That index is memory, and it is the moat.'
      ],
      analogy: 'Like a detailed table of contents for a 10,000-page book, so you never have to skim the whole thing again.'
    }
  ]
};
