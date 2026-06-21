# The Forgetting Problem: Why the Agent Wars Will Be Won on Memory

The industry is pouring its best talent into making agents think better. This is a mistake. Reasoning is already a commodity the foundation labs own, and context engineering, the craft everyone currently celebrates, is a depreciating asset being quietly erased by longer context windows and better models. The one layer that compounds, resists commoditization, and is still badly under-built is memory. The agents that win this cycle will be remembered not for how they reason, but for what they refuse to forget.

> AI / Infra
> Reading Time: ~12 min
> Draft: 2026-06-11

---

## Rundown

- Every Agent Wakes Up With Amnesia
- The Seven Layers, and Where the Money Is Flowing
- Reasoning Is Already Gone
- Context Engineering Is the Next to Go
- The Forgetting Problem
- The Vertical Agents' Mislabeled Moat
- How to Bet on Memory

---

## Every Agent Wakes Up With Amnesia

Every morning, the most capable AI agent in your company wakes up knowing nothing about you. It does not remember the bug it helped you fix yesterday, the preference you stated last week, or the three times it already tried the approach you are about to ask it to try again. It is brilliant and it is amnesiac, and those two facts are not in tension. They are the defining feature of how agents work today.

The standard response to this is that intelligence is what matters, and memory is a detail to be solved later with a vector database. This piece argues the opposite. The intelligence is the commodity. The memory is the moat. And the gap between how much attention each gets right now is the single largest mispricing in the agent stack.

To see why, you have to look at an agent as what it actually is: not a model, but a stack of layers that information passes through on its way from input to output. Most of those layers are commoditizing fast. One is not.

---

## The Seven Layers, and Where the Money Is Flowing

An agent is a system of layers. Raw input enters, and it flows through ingestion (parsing and tokenizing the input), context assembly (deciding what to put in front of the model), memory (retrieving what is known from past interactions), security (checking permissions and filtering risk), reasoning (planning and deciding), action (calling tools and touching real systems), and output (generating and post-processing the response).

```
Input -> Ingestion -> Context -> Memory -> Security -> Reasoning -> Action -> Output -> Response
```

Here is the strange part. If you map where engineering talent, investor attention, and product marketing are flowing, almost all of it pools around two layers: reasoning and context. The pitch decks talk about superior reasoning loops. The conference talks are about context engineering. The model releases compete on benchmark scores that measure thinking.

These are the two layers most exposed to commoditization. The labs are absorbing one of them outright, and erasing the moat in the other. The industry is sprinting toward the parts of the stack that are about to stop being defensible.

---

## Reasoning Is Already Gone

The reasoning layer is the one people point to when they say "the AI." It is also the layer the foundation labs have most thoroughly claimed.

Three years ago, getting a model to reason well was an application-level craft. You wrote chain-of-thought prompts to coax out intermediate steps. You implemented self-consistency by sampling multiple answers and voting. You built tree-of-thought scaffolds that explored several reasoning paths in parallel. These techniques were genuine sources of differentiation, because the model would not do them on its own.

Then the labs ate them. When Anthropic shipped extended thinking in Claude 3.7 in early 2025, a capability that applications used to hand-build (a long internal reasoning pass before answering) became a flag you turn on. OpenAI's reasoning models did the same thing from the other direction. The scaffolding moved inside the model. Today, paying for "better reasoning" means paying a lab, and every one of your competitors can pay the same lab for the same thing the same afternoon.

This is the textbook shape of commoditization: a capability that was scarce and bespoke becomes abundant and standardized. Reasoning quality is now table stakes, not an edge. A startup whose entire advantage is a clever agent loop is building on a layer that the next model release will partially subsume, for free, for everyone. The reasoning layer is expensive to run, because tokens spent thinking are tokens you pay for, and impossible to own. That is the worst combination in the stack.

---

## Context Engineering Is the Next to Go

This is the less obvious claim, and the more important one.

Context engineering, the discipline of deciding exactly what to put in the model's window on each turn, is currently the most celebrated skill in applied AI. The argument for it is real: the same model, behind two different context layers, produces output of wildly different quality. Whoever assembles context best wins. For the last two years that has been true.

But context engineering is a craft that exists to compensate for the model's limitations, and those limitations are receding. Two forces are erasing its moat at once.

The first is the context window. When windows were 8K tokens, deciding what to include was a high-stakes optimization problem, and doing it well was a real skill. As windows stretched to 200K and then to a million tokens, the pressure to be clever about inclusion dropped. For a growing set of tasks, the optimal strategy is no longer to carefully curate what goes in the window. It is to put everything in and let the model sort it out. The craft of fitting things into a small space loses value as the space stops being small.

The second is that the labs are absorbing context management itself, exactly as they absorbed reasoning. Prompt caching turned the expensive part of a long, stable prompt into a managed feature. Models now do their own retrieval, their own context compression, their own relevance filtering inside a single call. The work that lived in the application is migrating into the model.

The tell is in the debate that has consumed AI engineering circles: "is long context killing RAG?" The question is framed wrong, but it points at something true. Longer windows and smarter models are not killing retrieval. They are killing the *manual* version of context assembly, the hand-tuned prompt engineering that everyone is currently treating as a durable skill. Context engineering is a transitional discipline. It is extremely valuable right now and depreciating quietly, and building a company on it is building on a layer with a shelf life.

If reasoning is already gone and context is going, that leaves a question. As the model absorbs more of the surrounding stack, what is the one thing it structurally cannot absorb?

---

## The Forgetting Problem

It cannot absorb your data. More precisely, it cannot absorb what your specific agent learned from your specific interactions over the specific months it has been running for you. That is memory, and it is the one layer with a property none of the others have: it compounds.

Every other layer is roughly as good on day one as on day five hundred. A reasoning loop does not get smarter because it has run for a year. A context-assembly strategy does not deepen with use. But a memory system is strictly more valuable on day five hundred than on day one, because it now holds five hundred days of accumulated episodes, preferences, corrections, and domain knowledge that did not exist before and that no competitor can copy. Memory is the only layer where time is an asset instead of a liability.

Memory comes in a few kinds, and the distinction matters. Episodic memory is the record of what happened: past conversations, specific events, the fact that you tried approach X last Tuesday and it failed. Semantic memory is accumulated fact and domain knowledge: your company's product specs, your codebase, your firm's investment criteria. Procedural memory is learned behavior: the workflows and patterns the agent has figured out work for you. Working memory is just the current context window, the only kind that vanishes when the session ends, and the only kind today's agents reliably have.

The technically hard, genuinely unsolved problem is making the other three persist and retrieve well. It is not enough to dump conversation logs into a vector store. You need to decide what is worth remembering and what to discard, how to resolve memories that contradict each other, how to let memories decay or update as facts change, and how to retrieve the three relevant memories out of a million without flooding the context with noise. This is real infrastructure, and it is being badly under-built relative to its importance, precisely because the field's attention is pointed at the layers that demo better.

A small set of companies have figured out that this is the actual frontier. **Mem0** is building a memory layer as standalone infrastructure, an open-source system any agent can plug into to persist and retrieve user memory across sessions, and it has grown fast enough on adoption alone to raise real venture money. **Letta**, the team that came out of the Berkeley MemGPT research, took the most pointed position of all: their founding paper reframed the model as an operating system and memory as virtual context to be paged in and out, treating an agent as fundamentally a memory-management problem rather than a reasoning one. **Zep** went a different route, structuring memory as a temporal knowledge graph so that an agent can reason over how facts about a user changed over time, not just what is true now.

None of these companies are competing on intelligence. They are all renting the same models everyone else rents. They are competing on the layer the models cannot eat, and they are early to a category that the consensus is still treating as a feature rather than a business.

---

## The Vertical Agents' Mislabeled Moat

The clearest evidence for the memory thesis is hiding in plain sight, in the vertical-agent companies that are actually working.

The standard story about why Sierra, Decagon, Harvey, and Cursor are winning is that they nailed a workflow. Sierra and Decagon built customer-service agents tuned to support operations. Harvey built a legal agent that speaks the language of law firms. Cursor built an agent into the code editor. The narrative is about domain focus and user experience, and it is half right.

The half it misses is what actually locks the customer in. A Cursor that has indexed your entire codebase, learned your conventions, and accumulated the context of how your team works is not easily replaced by an identical editor that starts from zero, even if that competitor uses a better model. The moat is the index, which is to say the memory. A Sierra or Decagon agent that has absorbed a company's resolution history, its edge cases, and the specific way its customers phrase problems gets better at that company's support every month it runs, and a challenger has to start that accumulation from scratch. Harvey's value to a firm grows as it ingests that firm's documents and precedents and learns its house style.

In every case, the part people call the workflow moat is, underneath, a memory moat. The workflow got them in the door. The accumulated, proprietary, compounding state is what makes leaving painful. These companies are valued at billions of dollars not because their reasoning is unique, it is the same reasoning anyone can buy, but because they have spent months filling a memory store that no competitor possesses and that gets deeper every day. They are memory companies wearing workflow clothing.

This reframes what a defensible agent business looks like. It is not the one with the cleverest prompt or the temporary advantage of an early model. It is the one whose product gets meaningfully better the longer a specific customer uses it, because that improvement is stored, proprietary, and compounding. If your agent is exactly as good for a customer on month twelve as on day one, you have no memory moat, and you have no moat.

---

## How to Bet on Memory

If the thesis holds, a few things follow, and most of them cut against where attention is currently pointed.

For builders, stop trying to win on the layers the labs will own. A better reasoning loop and a cleverer context-assembly trick are depreciating assets; the next model release is your competitor there, and it ships for free. Put the engineering into the layer that compounds. Treat memory as core infrastructure, not as a vector database you bolt on at the end. The hard questions (what to remember, what to forget, how to resolve contradictions, how to retrieve the right few items from many) are where durable product quality actually lives, and they are mostly unsolved.

For investors, discount the model-layer and context-layer pitches and underwrite the gravity. The sharpest single question to ask any agent company is this: when the underlying model doubles in capability and halves in price next year, does that make you stronger or does it erase your advantage? A company whose edge is reasoning or prompt engineering gets eroded by that release. A company accumulating proprietary memory gets a free upgrade on top of a moat the upgrade cannot touch. The first kind of company is renting its advantage from a lab. The second kind owns something the lab will never have, which is the specific, compounding record of one customer's world.

The reasoning layer is where the magic appears to happen, and it is exactly the layer becoming a commodity. The memory layer is unglamorous, under-funded, and technically unfinished, and it is the only one in the stack where time works in your favor. The foundation models will keep getting smarter, cheaper, and more interchangeable. The thing they will never do is remember your customer for you. That is the layer left standing, and it is the one almost nobody is building as if their company depended on it. The ones who do are the ones who will still be here when the model underneath them is a commodity.

---

*Draft for f00tnotes. Company facts, funding details, and figures to be verified before publication. Research basis: internal agent-architecture notes (2026-04-23); MemGPT paper (Packer et al.); Anthropic extended thinking and prompt caching documentation; public reporting on Mem0, Letta, Zep, Sierra, Decagon, Harvey, and Cursor.*
