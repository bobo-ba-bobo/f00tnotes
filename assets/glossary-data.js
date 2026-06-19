/* f00tnotes glossary - single source of truth
 * Bilingual: English fields + parallel <field>_ko (Korean). Renderer (glossary.js)
 * picks _ko when the language toggle is Korean, otherwise the English field.
 *   slug       - URL id (/glossary/<slug>)
 *   term       - display name            (+ term_ko)
 *   aliases    - phrases auto-linked on FIRST occurrence in an article body
 *   aliases_ko - the same, for the Korean article body
 *   category   - grouping label (English key; Korean label mapped in glossary.js)
 *   difficulty - 1..3 (3 = most jargon-heavy)
 *   hover      - one-line plain explanation in the footnote bubble  (+ hover_ko)
 *   infographic- ASCII blueprint (shared across languages)
 *   body       - array of paragraphs, the "sophisticated wikipedia" page  (+ body_ko)
 *   analogy    - one-line analogy callout  (+ analogy_ko)
 * Note: Korean keeps technical terms in their natural loanword form on purpose.
 */
window.F00T_GLOSSARY = {
  terms: [
    {
      slug: 'ai-agent',
      term: 'AI Agent',
      term_ko: 'AI 에이전트',
      aliases: ['AI agent'],
      aliases_ko: ['AI 에이전트'],
      category: 'Foundations',
      difficulty: 1,
      hover: 'An AI that does not just answer, it acts: it uses tools, takes steps, and keeps going until a goal is done.',
      hover_ko: '답만 하는 게 아니라 직접 움직이는 AI다. 툴을 쓰고, 단계를 밟고, 목표가 끝날 때까지 계속 진행한다.',
      infographic:
        'Chatbot:  you ask  ->  it answers.  (stop)\n' +
        'Agent:    you ask  ->  plan -> use a tool -> check -> act -> repeat until finished',
      body: [
        'An AI agent is a system built around a language model that can pursue a goal over multiple steps rather than producing a single reply. A plain chatbot answers once and stops. An agent breaks a request into smaller steps, takes actions through tools (searching the web, editing a file, sending a message, querying a database), reads the result of each action, and decides what to do next. It repeats that loop until the task is finished or it decides it cannot continue.',
        'The important thing to understand is that the agent is not the model. The model supplies the reasoning, but the ability to remember, to act, and to stay on task across many steps comes from the layers of software wrapped around it. That is why two products built on the exact same model can feel completely different.'
      ],
      body_ko: [
        'AI 에이전트는 언어 모델을 중심으로 짜인 시스템으로, 한 번 답하고 끝나는 대신 여러 단계에 걸쳐 목표를 추구한다. 일반 챗봇은 한 번 대답하고 멈춘다. 에이전트는 요청을 작은 단계로 쪼개고, 툴을 통해 행동하며(웹 검색, 파일 편집, 메시지 발송, 데이터베이스 조회), 각 행동의 결과를 읽고 다음에 무엇을 할지 결정한다. 작업이 끝나거나 더 진행할 수 없다고 판단할 때까지 이 루프를 반복한다.',
        '핵심은 에이전트가 곧 모델은 아니라는 점이다. 모델은 추론을 제공하지만, 기억하고 행동하고 여러 단계에 걸쳐 작업을 이어가는 능력은 모델을 감싸고 있는 소프트웨어 레이어에서 나온다. 똑같은 모델 위에 만든 두 제품이 전혀 다르게 느껴지는 이유가 여기에 있다.'
      ],
      analogy: 'The difference between asking someone for directions and hiring a driver to actually get you there.',
      analogy_ko: '길을 물어보는 것과, 목적지까지 실제로 데려다줄 기사를 고용하는 것의 차이.'
    },
    {
      slug: 'llm',
      term: 'Large Language Model (LLM)',
      term_ko: '대규모 언어 모델 (LLM)',
      aliases: ['the model', 'a language model'],
      aliases_ko: ['모델'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'The text engine at the center of every AI agent. Its one trick is predicting the next word, extremely well.',
      hover_ko: '모든 AI 에이전트의 중심에 있는 텍스트 엔진. 다음 단어를 아주 잘 예측하는 것, 그 하나가 핵심 능력이다.',
      infographic:
        '"The capital of France is ___"  ->  [ MODEL ]  ->  "Paris"',
      body: [
        'A large language model, or LLM, is trained on enormous amounts of text to do a single thing: given some words, predict what comes next. At a large enough scale, that simple prediction trick turns into the ability to write, summarize, translate, code, and reason. Modern models like the Claude, GPT, and Gemini families are all LLMs at their core.',
        'On its own a model has no memory of yesterday and cannot take any action in the world. It only maps text in to text out, one run at a time. Everything else an agent appears to do, remembering you, looking things up, calling tools, is built around the model rather than inside it. This is precisely why the article argues the model is the part of the stack that is becoming a commodity: capability is converging and anyone can rent it.'
      ],
      body_ko: [
        '대규모 언어 모델(LLM)은 엄청난 양의 텍스트로 학습해 단 하나의 일을 한다. 앞에 주어진 단어들을 보고 다음에 올 단어를 예측하는 것이다. 규모가 충분히 커지면 이 단순한 예측이 글쓰기, 요약, 번역, 코딩, 추론 능력으로 바뀐다. Claude, GPT, Gemini 계열의 최신 모델은 모두 본질적으로 LLM이다.',
        '모델 자체는 어제의 기억이 없고 세상에서 어떤 행동도 직접 하지 못한다. 한 번에 한 번씩, 텍스트를 입력받아 텍스트를 내보낼 뿐이다. 에이전트가 하는 것처럼 보이는 나머지 모든 일(사용자를 기억하고, 정보를 찾고, 툴을 호출하는 것)은 모델 안이 아니라 모델 주변에 만들어진다. 이 글이 모델을 점점 범용재가 되어가는 부분이라고 보는 이유가 바로 이것이다. 성능이 비슷해지고 있고, 누구나 빌려 쓸 수 있기 때문이다.'
      ],
      analogy: 'A brilliant improviser who is also a complete amnesiac: dazzling in the moment, with no idea what happened five minutes ago.',
      analogy_ko: '뛰어난 즉흥 연기자이면서 동시에 완전한 기억상실증 환자. 순간은 눈부시지만 5분 전 일은 전혀 기억하지 못한다.'
    },
    {
      slug: 'foundation-model',
      term: 'Foundation Model / Foundation Labs',
      term_ko: '파운데이션 모델 / 파운데이션 랩',
      aliases: ['foundation labs', 'foundation models'],
      aliases_ko: ['파운데이션 랩', '파운데이션 모델'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'The few giant, general-purpose models (and the companies that make them) that everyone else builds on top of.',
      hover_ko: '나머지 모두가 그 위에 무언가를 쌓아 올리는, 소수의 거대한 범용 모델(과 그것을 만드는 회사들).',
      infographic:
        'Foundation labs (OpenAI, Anthropic, Google)\n' +
        '        | build the base models\n' +
        '        v\n' +
        '   thousands of apps rent them and build on top',
      body: [
        'A foundation model is a large, general-purpose model trained at great expense to be capable across many tasks at once, rather than tuned for one narrow job. Only a handful of companies, often called the foundation labs, have the data, compute, and capital to make them. Most AI products do not train their own; they rent one through an API.',
        'This structure matters for strategy. When a foundation lab ships a new capability, it tends to reach every product built on that model at roughly the same time. So any advantage that lives at the model layer is shared by all of a company’s competitors almost immediately. The article’s phrase "the labs own reasoning" means exactly this: the labs, not the apps on top, control that layer.'
      ],
      body_ko: [
        '파운데이션 모델은 하나의 좁은 용도에 맞춘 게 아니라 한 번에 여러 작업을 두루 해내도록, 막대한 비용을 들여 학습한 대형 범용 모델이다. 이런 모델을 만들 데이터와 연산, 자본을 가진 회사는 흔히 파운데이션 랩이라 불리는 소수뿐이다. 대부분의 AI 제품은 자체 모델을 학습하지 않고 API로 하나를 빌려 쓴다.',
        '이 구조는 전략적으로 중요하다. 파운데이션 랩이 새 기능을 내놓으면 그 모델을 쓰는 모든 제품에 거의 동시에 도달한다. 따라서 모델 레이어에 있는 우위는 경쟁사 전부가 거의 즉시 공유한다. 이 글에서 "랩이 추론을 소유한다"는 말이 바로 이 뜻이다. 위에 얹힌 앱이 아니라 랩이 그 레이어를 쥐고 있다.'
      ],
      analogy: 'Like power utilities: a few players generate the electricity, and countless businesses plug in and build on top of it.',
      analogy_ko: '전력 회사와 비슷하다. 소수가 전기를 생산하고, 수많은 사업체가 거기에 코드를 꽂아 그 위에 사업을 짓는다.'
    },
    {
      slug: 'token',
      term: 'Token / Tokenization',
      term_ko: '토큰 / 토큰화',
      aliases: ['tokenizing', 'tokens', 'tokenization'],
      aliases_ko: ['토큰화', '토큰'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'Models do not read words, they read "tokens", small chunks of text. Tokenization is the chopping step.',
      hover_ko: '모델은 단어가 아니라 "토큰"이라는 작은 텍스트 조각을 읽는다. 토큰화는 그 조각으로 잘게 써는 단계다.',
      infographic:
        '"footnotes" -> [ foot | notes ]   (2 tokens)\n' +
        '"AI"        -> [ AI ]             (1 token)\n' +
        'rule of thumb:  1 token ~ 4 letters ~ three-quarters of a word',
      body: [
        'Before a model can read text, that text is split into tokens, pieces roughly the size of a short word or a fragment of one. A model processes and is billed per token, so longer inputs and outputs literally cost more money and more time. Tokenization is simply the step that turns a sentence into the list of chunks the model actually consumes.',
        'Tokens are the unit that almost everything else is measured in. A context window is measured in tokens, pricing is quoted per million tokens, and "the model is thinking" means it is generating tokens you pay for. When the article notes that "tokens spent thinking are tokens you pay for", this is the reason reasoning is expensive to run.'
      ],
      body_ko: [
        '모델이 텍스트를 읽기 전에, 그 텍스트는 토큰으로 쪼개진다. 토큰은 대략 짧은 단어 하나, 또는 그 일부 크기의 조각이다. 모델은 토큰 단위로 처리하고 토큰 단위로 과금되므로, 입력과 출력이 길수록 말 그대로 돈과 시간이 더 든다. 토큰화는 문장을, 모델이 실제로 소비하는 조각 목록으로 바꾸는 단계일 뿐이다.',
        '거의 모든 것이 토큰 단위로 측정된다. 컨텍스트 윈도우도 토큰으로 재고, 가격도 100만 토큰당으로 매기며, "모델이 생각 중"이라는 말은 곧 돈을 내는 토큰을 생성하고 있다는 뜻이다. 이 글에서 "생각에 쓰는 토큰도 결국 내가 내는 토큰"이라고 한 것이 추론이 비싼 이유다.'
      ],
      analogy: 'Like cutting a sentence into LEGO bricks before the machine can build with them.',
      analogy_ko: '기계가 조립할 수 있도록 문장을 레고 블록으로 잘라두는 것과 같다.'
    },
    {
      slug: 'context-window',
      term: 'Context Window',
      term_ko: '컨텍스트 윈도우',
      aliases: ['context windows', 'context window'],
      aliases_ko: ['컨텍스트 윈도우'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'The model’s short-term memory: the most text it can "see" at one time. When it is full, things get dropped.',
      hover_ko: '모델의 단기 기억. 한 번에 "볼" 수 있는 텍스트의 최대량이다. 꽉 차면 오래된 내용부터 밀려난다.',
      infographic:
        '|<--------------- context window --------------->|\n' +
        '[ system rules | past messages | documents | your question ]\n' +
        '        anything that does not fit gets left out',
      body: [
        'A context window is the fixed amount of text, counted in tokens, that a model can consider in a single run. Everything the model knows in that moment, its instructions, the conversation so far, any documents you pasted in, and your actual question, has to fit inside it. When the window fills up, older or less relevant material falls out of view.',
        'Windows have grown quickly, from a few thousand tokens to hundreds of thousands and, in some models, a million or more. But a bigger window is not the same as perfect recall: models still retrieve information from the middle of a long window less reliably than from the beginning or end. The article points to growing windows as one of the two forces eroding the value of careful context engineering.'
      ],
      body_ko: [
        '컨텍스트 윈도우는 모델이 한 번의 실행에서 고려할 수 있는, 토큰으로 세는 고정된 텍스트 양이다. 그 순간 모델이 아는 모든 것(지시문, 지금까지의 대화, 붙여넣은 문서, 그리고 실제 질문)이 이 안에 들어가야 한다. 윈도우가 차면 오래되거나 덜 관련된 내용이 시야에서 빠진다.',
        '윈도우는 수천 토큰에서 수십만 토큰으로, 일부 모델은 100만 토큰 이상으로 빠르게 커졌다. 하지만 윈도우가 크다고 완벽히 기억하는 것은 아니다. 모델은 여전히 긴 윈도우의 중간에 있는 정보를 앞뒤보다 덜 안정적으로 끄집어낸다. 이 글은 커지는 윈도우를, 세심한 컨텍스트 엔지니어링의 가치를 깎는 두 힘 중 하나로 지목한다.'
      ],
      analogy: 'A desk you can only fit so many papers on. Add a new one and an old one slides off the edge.',
      analogy_ko: '서류를 일정 장수만 올릴 수 있는 책상. 새 서류를 올리면 오래된 게 가장자리로 밀려 떨어진다.'
    },
    {
      slug: 'inference',
      term: 'Inference (a "call")',
      term_ko: '추론 (한 번의 "호출")',
      aliases: ['a single call', 'a single forward pass'],
      aliases_ko: ['한 번의 호출'],
      category: 'Foundations',
      difficulty: 2,
      hover: 'One run of the model: text in, answer out. Each run is independent and forgets the last one.',
      hover_ko: '모델을 한 번 돌리는 것. 텍스트가 들어가고 답이 나온다. 매 실행은 독립적이고 직전 실행을 잊는다.',
      infographic:
        'call #1: question -> answer   (then the model forgets everything)\n' +
        'call #2: question -> answer   (starts fresh again)',
      body: [
        'Inference is the act of running the model once to produce an output. Each call is self-contained: the model does not automatically carry anything over from the previous call. Whatever you want it to "remember" has to be fed back in as text on the next call.',
        'This single fact explains a great deal about how agents are built. Because the model forgets between calls, memory cannot live inside the model; it has to be stored outside and re-injected. The amnesia the article opens with is not a bug, it is just what inference is.'
      ],
      body_ko: [
        '추론(inference)은 모델을 한 번 돌려 출력을 만드는 행위다. 매 호출은 그 자체로 완결된다. 모델은 이전 호출의 내용을 자동으로 가져오지 않는다. 무언가를 "기억"하게 하려면 다음 호출에 텍스트로 다시 넣어줘야 한다.',
        '이 한 가지 사실이 에이전트가 어떻게 만들어지는지를 많이 설명한다. 모델은 호출 사이에 잊어버리므로, 기억은 모델 안에 살 수 없고 바깥에 저장했다가 다시 주입해야 한다. 이 글이 시작에서 말한 기억상실은 버그가 아니라 추론이라는 것의 본모습이다.'
      ],
      analogy: 'Like talking to someone with no short-term memory: every sentence, you have to remind them what you were discussing.',
      analogy_ko: '단기 기억이 없는 사람과 대화하는 것과 같다. 매 문장마다 무슨 얘기를 하고 있었는지 다시 일러줘야 한다.'
    },
    {
      slug: 'api',
      term: 'API',
      term_ko: 'API',
      aliases: ['through an API', 'an API'],
      aliases_ko: ['API'],
      category: 'Foundations',
      difficulty: 1,
      hover: 'A standard doorway that lets one piece of software use another. Apps reach the model through its API.',
      hover_ko: '한 소프트웨어가 다른 소프트웨어를 쓰게 해주는 표준 출입구. 앱은 모델의 API를 통해 모델에 닿는다.',
      infographic:
        'your app  --request-->  [ model’s API ]  --answer-->  your app',
      body: [
        'An API (application programming interface) is an agreed-upon way for one piece of software to request something from another. Instead of building a model yourself, you send your text to the model provider’s API and get the answer back over the internet.',
        'It is the rented doorway that makes "renting a model" possible, and it is why switching from one model to another can be as simple as changing which API you call. Low switching cost at this layer is part of why model capability commoditizes.'
      ],
      body_ko: [
        'API(application programming interface)는 한 소프트웨어가 다른 소프트웨어에 무언가를 요청하는, 약속된 방식이다. 모델을 직접 만드는 대신, 텍스트를 모델 제공사의 API로 보내고 인터넷을 통해 답을 돌려받는다.',
        '"모델을 빌려 쓴다"를 가능하게 하는 임대 출입구이고, 한 모델에서 다른 모델로 갈아타는 일이 어느 API를 부를지만 바꾸는 정도로 간단해지는 이유다. 이 레이어의 낮은 전환 비용이 모델 성능이 범용재화되는 한 원인이다.'
      ],
      analogy: 'Like a restaurant’s order window: you do not enter the kitchen, you hand a ticket through the slot and get a plate back.',
      analogy_ko: '식당의 주문 창구와 같다. 주방에 들어가지 않고, 창구로 주문표를 건네면 음식이 나온다.'
    },
    {
      slug: 'prompt',
      term: 'Prompt / Prompt Engineering',
      term_ko: '프롬프트 / 프롬프트 엔지니어링',
      aliases: ['prompt engineering', 'the cleverest prompt'],
      aliases_ko: ['프롬프트 엔지니어링'],
      category: 'Context',
      difficulty: 1,
      hover: 'The prompt is everything you send the model. Prompt engineering is wording it well to get better answers.',
      hover_ko: '프롬프트는 모델에 보내는 모든 것. 프롬프트 엔지니어링은 더 나은 답을 얻으려 그 표현을 잘 다듬는 일이다.',
      infographic:
        'prompt = instructions + background + your question\n' +
        '"You are a lawyer. Here is the contract: [...]. Find the risky clauses."',
      body: [
        'A prompt is the full block of text handed to the model on a given call, including any role instructions ("you are a lawyer"), background material, and the actual request. Prompt engineering is the craft of structuring that text so the model responds better, since small changes in wording can move the quality of the output noticeably.',
        'For the first couple of years of the generative-AI wave, prompt engineering was treated as a core, almost magical skill. The article’s argument is that this hand-tuning is a depreciating asset: as models get better and windows get larger, they need less coaxing, and the clever prompt that gave you an edge today is easier to copy and less necessary tomorrow.'
      ],
      body_ko: [
        '프롬프트는 한 번의 호출에서 모델에 건네는 텍스트 전체다. 역할 지시("당신은 변호사다"), 배경 자료, 그리고 실제 요청이 모두 포함된다. 프롬프트 엔지니어링은 모델이 더 잘 답하도록 그 텍스트를 구성하는 기술이다. 표현의 작은 차이가 결과 품질을 눈에 띄게 바꾸기 때문이다.',
        '생성형 AI 붐의 첫 1, 2년 동안 프롬프트 엔지니어링은 거의 마법 같은 핵심 기술로 대접받았다. 이 글의 주장은 이 손튜닝이 감가상각되는 자산이라는 것이다. 모델이 좋아지고 윈도우가 커질수록 달래줄 필요가 줄고, 오늘 우위를 준 영리한 프롬프트는 내일이면 더 베끼기 쉽고 덜 필요해진다.'
      ],
      analogy: 'Like phrasing a question to a brilliant but very literal expert: ask well and you get gold, ask sloppily and you get nonsense.',
      analogy_ko: '뛰어나지만 곧이곧대로 받아들이는 전문가에게 질문하는 것과 같다. 잘 물으면 금을 얻고, 대충 물으면 헛소리를 얻는다.'
    },
    {
      slug: 'context-engineering',
      term: 'Context Engineering',
      term_ko: '컨텍스트 엔지니어링',
      aliases: ['context engineering', 'context assembly', 'context-assembly'],
      aliases_ko: ['컨텍스트 엔지니어링', '컨텍스트 조립'],
      category: 'Context',
      difficulty: 3,
      hover: 'Choosing what to put in the model’s limited window each turn. The system-level, grown-up version of prompt engineering.',
      hover_ko: '매 턴 모델의 한정된 윈도우에 무엇을 넣을지 고르는 일. 프롬프트 엔지니어링의 시스템 차원 확장판이다.',
      infographic:
        'everything you COULD show:  [docs][history][memory][tools][user]\n' +
        'window only fits:           [____ pick the right subset ____]',
      body: [
        'Context engineering is the discipline of assembling exactly the right material into the model’s window every time it runs: which documents to include, how much conversation history to keep, what to summarize, what to leave out entirely. Because the window is limited and the model attends unevenly across it, choosing well can make the same model perform dramatically better than choosing badly.',
        'It is currently the most celebrated skill in applied AI, and for the last two years the praise has been deserved. The article’s contrarian claim is that it is a transitional craft. It exists to work around the model’s limitations, and those limitations are receding as windows grow and as the labs build retrieval, compression, and relevance-filtering into the model itself. Valuable now, depreciating quietly.'
      ],
      body_ko: [
        '컨텍스트 엔지니어링은 모델이 실행될 때마다 딱 맞는 재료를 윈도우에 조립해 넣는 기술이다. 어떤 문서를 넣고, 대화 기록을 얼마나 유지하며, 무엇을 요약하고, 무엇을 통째로 뺄지를 정한다. 윈도우는 한정돼 있고 모델은 그 안을 고르게 보지 않으므로, 잘 고르면 같은 모델이 못 고를 때보다 훨씬 좋은 성능을 낸다.',
        '지금 응용 AI에서 가장 떠받들어지는 기술이고, 지난 2년간 그 찬사는 정당했다. 이 글의 역발상 주장은 이것이 과도기적 기술이라는 점이다. 모델의 한계를 우회하려 존재하는데, 윈도우가 커지고 랩이 검색, 압축, 관련성 필터링을 모델 자체에 넣으면서 그 한계가 줄고 있다. 지금은 값지지만 조용히 감가상각되는 중이다.'
      ],
      analogy: 'Like a great chief of staff deciding which three documents land on the CEO’s desk, out of a thousand.',
      analogy_ko: '천 건의 문서 중 어떤 세 건을 CEO 책상에 올릴지 정하는 유능한 비서실장과 같다.'
    },
    {
      slug: 'prompt-caching',
      term: 'Prompt Caching',
      term_ko: '프롬프트 캐싱',
      aliases: ['Prompt caching', 'prompt caching'],
      aliases_ko: ['프롬프트 캐싱'],
      category: 'Context',
      difficulty: 3,
      hover: 'Reusing the unchanging part of a prompt so you do not pay to reprocess it every single time.',
      hover_ko: '프롬프트에서 안 바뀌는 부분을 재사용해, 매번 다시 처리하는 비용을 내지 않게 하는 것.',
      infographic:
        'without caching: [long fixed instructions + new question] -> pay for ALL of it, every call\n' +
        'with caching:    [cached fixed part]   + [new question]   -> pay mostly for the new part',
      body: [
        'Many prompts repeat the same large fixed section on every call: long system instructions, tool definitions, a reference document. Prompt caching stores that fixed section after the first call so it does not have to be reprocessed and re-billed each time, which sharply cuts the cost and latency of the repeated portion.',
        'It is offered as a feature by the model providers rather than something each application has to invent. In the article it is an example of the labs absorbing work that used to live in the application layer, the same pattern that is eroding context engineering as a source of advantage.'
      ],
      body_ko: [
        '많은 프롬프트는 매 호출마다 같은 큰 고정 구간을 반복한다. 긴 시스템 지시문, 툴 정의, 참고 문서 같은 것이다. 프롬프트 캐싱은 첫 호출 뒤 그 고정 구간을 저장해 매번 다시 처리하고 다시 과금하지 않게 한다. 반복되는 부분의 비용과 지연이 크게 준다.',
        '각 애플리케이션이 만들어야 하는 게 아니라 모델 제공사가 기능으로 제공한다. 이 글에서는 앱 레이어에 있던 일을 랩이 흡수하는 사례로 나온다. 컨텍스트 엔지니어링의 우위를 깎는 것과 같은 패턴이다.'
      ],
      analogy: 'Like keeping a frequently used document open in a tab instead of re-downloading it every time you need it.',
      analogy_ko: '자주 쓰는 문서를 매번 다시 받지 않고 탭에 열어두는 것과 같다.'
    },
    {
      slug: 'vector-database',
      term: 'Vector Database',
      term_ko: '벡터 데이터베이스',
      aliases: ['vector database', 'vector store'],
      aliases_ko: ['벡터 데이터베이스', '벡터 저장소'],
      category: 'Memory',
      difficulty: 3,
      hover: 'A search engine for meaning instead of exact keywords.',
      hover_ko: '정확한 키워드가 아니라 의미로 찾는 검색 엔진.',
      infographic:
        'keyword search: "car"  finds only the word "car"\n' +
        'vector search:  "car"  also finds "automobile", "vehicle", "sedan"\n' +
        '                       (it matches by meaning, not spelling)',
      body: [
        'A vector database stores text (and images, audio, and more) as lists of numbers called embeddings that capture meaning. To search, it returns the stored items whose meaning is closest to your query, even when they share no exact words. This is how an agent pulls "the few relevant past notes" out of an enormous pile.',
        'It is the standard storage engine behind AI memory and document retrieval, and the article’s point is that treating it as a checkbox ("we’ll add a vector database") badly understates the real problem. Storing vectors is easy; deciding what is worth storing, what to forget, and how to retrieve the right three items out of a million is the hard, unsolved part.'
      ],
      body_ko: [
        '벡터 데이터베이스는 텍스트(그리고 이미지, 오디오 등)를 의미를 담은 숫자 목록, 즉 임베딩으로 저장한다. 검색할 때는 정확히 같은 단어가 없어도, 질의와 의미가 가장 가까운 항목들을 돌려준다. 에이전트가 거대한 더미에서 "관련 있는 과거 메모 몇 개"를 끄집어내는 방식이 이것이다.',
        'AI 메모리와 문서 검색의 표준 저장 엔진이다. 이 글의 요점은, 이것을 "벡터 데이터베이스 하나 붙이면 됨" 식 체크박스로 취급하면 진짜 문제를 크게 과소평가한다는 것이다. 벡터를 저장하는 건 쉽다. 무엇을 저장할 가치가 있는지, 무엇을 잊을지, 100만 개 중 딱 맞는 세 개를 어떻게 꺼낼지가 어렵고 아직 풀리지 않은 부분이다.'
      ],
      analogy: 'Like a librarian who finds books by what they are about, not by exact title spelling.',
      analogy_ko: '제목 철자가 아니라 "무슨 내용인지"로 책을 찾아주는 사서와 같다.'
    },
    {
      slug: 'embedding',
      term: 'Embedding',
      term_ko: '임베딩',
      aliases: ['embeddings', 'embedding'],
      aliases_ko: ['임베딩'],
      category: 'Memory',
      difficulty: 3,
      hover: 'Turning text into a list of numbers that captures its meaning, so a computer can compare meanings.',
      hover_ko: '컴퓨터가 의미를 비교할 수 있도록, 텍스트를 그 의미를 담은 숫자 목록으로 바꾸는 것.',
      infographic:
        '"happy"  -> [0.91, -0.12, 0.44, ...]\n' +
        '"joyful" -> [0.89, -0.10, 0.47, ...]   close numbers -> close meaning\n' +
        '"tax"    -> [-0.33, 0.78, 0.02, ...]   far away      -> unrelated',
      body: [
        'An embedding is the numeric fingerprint of a piece of text. Texts with similar meaning are converted into similar lists of numbers, so a computer can measure how related two things are simply by how close their numbers sit in space.',
        'This is the trick that makes search-by-meaning possible. Vector databases, retrieval, and codebase indexing all run on embeddings underneath. Without them, a computer can only match exact characters; with them, it can match ideas.'
      ],
      body_ko: [
        '임베딩은 텍스트의 숫자로 된 지문이다. 의미가 비슷한 텍스트는 비슷한 숫자 목록으로 변환되므로, 컴퓨터는 두 대상이 얼마나 관련 있는지를 단지 숫자들이 공간상 얼마나 가까운지로 잴 수 있다.',
        '의미로 검색하는 것을 가능하게 하는 핵심 장치다. 벡터 데이터베이스, 검색, 코드베이스 인덱싱이 모두 그 아래에서 임베딩으로 돌아간다. 임베딩이 없으면 컴퓨터는 정확한 글자만 맞출 수 있지만, 임베딩이 있으면 의미를 맞출 수 있다.'
      ],
      analogy: 'Like GPS coordinates for meaning: "happy" and "joyful" end up on nearly the same spot of the map.',
      analogy_ko: '의미에 매긴 GPS 좌표 같은 것. "happy"와 "joyful"은 지도상 거의 같은 지점에 찍힌다.'
    },
    {
      slug: 'rag',
      term: 'RAG (Retrieval-Augmented Generation)',
      term_ko: 'RAG (검색 증강 생성)',
      aliases: ['RAG', 'retrieval'],
      aliases_ko: ['RAG'],
      category: 'Memory',
      difficulty: 3,
      hover: 'Let the model look things up before answering, instead of relying only on what it memorized.',
      hover_ko: '외운 것에만 의존하지 않고, 답하기 전에 모델이 자료를 찾아보게 하는 방식.',
      infographic:
        'your question -> search your documents -> paste the best matches into the prompt -> model answers from them',
      body: [
        'RAG is a pattern where, instead of trusting the model’s built-in knowledge, you first retrieve relevant documents (usually from a vector database) and feed them into the prompt so the model answers based on them. This keeps responses grounded in your specific, current data and cuts down on confidently made-up facts.',
        'It is the standard way to give an agent access to private or up-to-date information the model was never trained on. The article references the running industry debate, "is long context killing RAG?", and argues the framing is wrong: bigger windows are killing the manual, hand-tuned version of context assembly, not the underlying need to retrieve the right information.'
      ],
      body_ko: [
        'RAG는 모델의 내장 지식을 믿는 대신, 먼저 관련 문서를(보통 벡터 데이터베이스에서) 검색해 프롬프트에 넣어 그 자료를 근거로 답하게 하는 패턴이다. 이렇게 하면 답이 내 고유의 최신 데이터에 발을 붙이고, 그럴듯하게 지어낸 사실이 줄어든다.',
        '모델이 학습한 적 없는 비공개 정보나 최신 정보에 에이전트가 접근하게 하는 표준 방식이다. 이 글은 업계의 단골 논쟁인 "긴 컨텍스트가 RAG를 죽이나?"를 언급하며 그 틀이 틀렸다고 본다. 큰 윈도우가 죽이는 것은 손으로 다듬던 컨텍스트 조립이지, 맞는 정보를 검색해야 한다는 근본 필요가 아니다.'
      ],
      analogy: 'Like an open-book exam: rather than recite from memory, the model looks up the relevant page first.',
      analogy_ko: '오픈북 시험과 같다. 외운 걸 읊는 대신 모델이 먼저 해당 페이지를 찾아본다.'
    },
    {
      slug: 'knowledge-graph',
      term: 'Knowledge Graph (and Temporal Knowledge Graph)',
      term_ko: '지식 그래프 (그리고 시간 지식 그래프)',
      aliases: ['temporal knowledge graph', 'knowledge graph'],
      aliases_ko: ['시간 지식 그래프', '지식 그래프'],
      category: 'Memory',
      difficulty: 3,
      hover: 'Storing facts as a web of connected things, not loose text. The "temporal" version also tracks how facts changed over time.',
      hover_ko: '사실을 흩어진 텍스트가 아니라 연결된 관계망으로 저장하는 것. "시간" 버전은 사실이 시간에 따라 어떻게 바뀌었는지도 기록한다.',
      infographic:
        '[Alice] --works at--> [Acme] --located in--> [Seoul]\n' +
        'temporal:  Alice worked at Acme   2021 to 2024\n' +
        '           Alice works at Beta    2024 to now',
      body: [
        'A knowledge graph records information as entities (people, companies, places) joined by labeled relationships, like a map of how things connect. This lets an agent answer questions that depend on connections rather than on matching keywords, for example "who at this company reported to whom, and when".',
        'A temporal knowledge graph adds time, so it stores not only what is true now but how facts changed. That lets an agent reason about history instead of silently overwriting it, which matters for memory: a person’s job, preference, or address can change, and a good memory remembers the difference. The article notes this is the approach the startup Zep takes.'
      ],
      body_ko: [
        '지식 그래프는 정보를 엔티티(사람, 회사, 장소)와 그 사이의 이름 붙은 관계로 기록한다. 무엇이 어떻게 연결되는지를 그린 지도 같은 것이다. 덕분에 에이전트는 키워드 일치가 아니라 관계에 의존하는 질문, 예컨대 "이 회사에서 누가 누구에게 언제 보고했나" 같은 질문에 답할 수 있다.',
        '시간 지식 그래프는 여기에 시간을 더해, 지금 무엇이 참인지뿐 아니라 사실이 어떻게 바뀌었는지까지 저장한다. 덕분에 에이전트는 과거를 조용히 덮어쓰지 않고 그것에 대해 추론할 수 있다. 사람의 직장, 취향, 주소는 바뀔 수 있고 좋은 기억은 그 차이를 기억하므로, 메모리에서 이는 중요하다. 이 글은 이것이 스타트업 Zep이 택한 방식이라고 짚는다.'
      ],
      analogy: 'Like a detective’s wall of photos and string, except it also notes when each connection started and ended.',
      analogy_ko: '사진과 실로 이어 붙인 형사의 수사판 같은데, 각 연결이 언제 시작되고 끝났는지까지 적어둔 것이다.'
    },
    {
      slug: 'memory-types',
      term: 'The Four Types of AI Memory',
      term_ko: 'AI 메모리의 네 가지 유형',
      aliases: ['Episodic memory', 'episodic memory'],
      aliases_ko: ['에피소드 메모리'],
      category: 'Memory',
      difficulty: 2,
      hover: 'Agents need different kinds of memory, like people do: a scratchpad, a diary, a textbook, and a set of habits.',
      hover_ko: '에이전트도 사람처럼 여러 종류의 기억이 필요하다. 메모장, 일기장, 교과서, 그리고 몸에 밴 습관.',
      infographic:
        'Working    | the current scratchpad   | gone when the chat ends\n' +
        'Episodic   | a diary of what happened | "last Tuesday you tried X"\n' +
        'Semantic   | a textbook of facts      | your product specs, your codebase\n' +
        'Procedural | learned habits / how-to  | "always format reports like this"',
      body: [
        'Agents draw on four kinds of memory. Working memory is whatever sits in the current context window and disappears when the session ends. Episodic memory is the record of past events and conversations. Semantic memory is stable factual knowledge about a domain. Procedural memory is learned ways of doing things, the workflows and patterns that turn out to work for a given user.',
        'Today’s agents reliably have only the first kind. Making the other three persist and retrieve well is the genuinely hard, mostly unsolved problem, and it is the spine of the article’s thesis: the three durable kinds of memory are where lasting, compounding value accumulates, while everyone’s attention is fixed on reasoning.'
      ],
      body_ko: [
        '에이전트는 네 가지 기억에 의존한다. 작업 기억(working)은 지금 컨텍스트 윈도우에 든 것으로, 세션이 끝나면 사라진다. 에피소드 기억(episodic)은 과거 사건과 대화의 기록이다. 의미 기억(semantic)은 한 분야에 대한 안정적인 사실 지식이다. 절차 기억(procedural)은 일하는 법, 즉 특정 사용자에게 잘 통하는 것으로 드러난 워크플로와 패턴이다.',
        '오늘날의 에이전트는 사실상 첫 번째만 안정적으로 가진다. 나머지 셋을 잘 지속시키고 잘 끄집어내는 일이 진짜 어렵고 대체로 풀리지 않은 문제다. 이것이 이 글 논지의 척추다. 모두의 관심이 추론에 쏠려 있는 동안, 지속 가능한 세 종류의 기억이야말로 오래가고 복리로 쌓이는 가치가 모이는 곳이다.'
      ],
      analogy: 'Working = scratchpad, episodic = diary, semantic = textbook, procedural = muscle memory.',
      analogy_ko: '작업 기억은 메모장, 에피소드 기억은 일기장, 의미 기억은 교과서, 절차 기억은 몸이 외운 동작이다.'
    },
    {
      slug: 'chain-of-thought',
      term: 'Chain-of-Thought',
      term_ko: 'Chain-of-Thought (사고의 연쇄)',
      aliases: ['chain-of-thought'],
      aliases_ko: ['Chain-of-Thought', '사고의 연쇄'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'Asking the model to "show its work" step by step instead of blurting a final answer.',
      hover_ko: '최종 답을 툭 내뱉는 대신, 모델에게 단계별로 "풀이 과정을 적게" 하는 기법.',
      infographic:
        'without:  Q -> A                         (often wrong on hard problems)\n' +
        'with:     Q -> step 1 -> step 2 -> A     (more accurate)',
      body: [
        'Chain-of-thought is the technique of having the model write out its intermediate reasoning before giving a final answer. Working through the steps, rather than jumping straight to a conclusion, makes it noticeably more accurate on math, logic, and multi-part problems.',
        'The cost is more tokens, since the reasoning itself is generated text you pay for. In the article, chain-of-thought is one of several techniques that applications used to build by hand and that the foundation labs have since folded directly into the models.'
      ],
      body_ko: [
        'Chain-of-thought는 모델이 최종 답을 내기 전에 중간 추론을 적어 내려가게 하는 기법이다. 결론으로 바로 건너뛰지 않고 단계를 밟게 하면, 수학, 논리, 여러 단계로 된 문제에서 눈에 띄게 정확해진다.',
        '대가는 더 많은 토큰이다. 추론 자체가 돈을 내는 생성 텍스트이기 때문이다. 이 글에서 chain-of-thought는 예전엔 앱이 손으로 만들었지만 이후 파운데이션 랩이 모델 안에 직접 접어 넣은 여러 기법 중 하나로 등장한다.'
      ],
      analogy: 'Like a math teacher insisting you show your working: slower, but far fewer careless mistakes.',
      analogy_ko: '풀이 과정을 꼭 적으라는 수학 선생님과 같다. 느리지만 실수가 훨씬 준다.'
    },
    {
      slug: 'self-consistency',
      term: 'Self-Consistency',
      term_ko: 'Self-Consistency (자기 일관성)',
      aliases: ['self-consistency'],
      aliases_ko: ['Self-Consistency', '자기 일관성'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'Ask the model the same question several times and go with the answer it gives most often.',
      hover_ko: '같은 질문을 여러 번 물어보고, 모델이 가장 자주 내놓는 답으로 정하는 방식.',
      infographic:
        'run 1 -> 42\n' +
        'run 2 -> 42   ->  majority vote  ->  42\n' +
        'run 3 -> 17',
      body: [
        'Self-consistency improves reliability by sampling several independent answers to the same question and taking the most common one, rather than trusting a single run. It works because a model’s occasional wrong turns tend not to agree with each other, while correct reasoning tends to converge on the same result.',
        'The trade-off is cost: you run the model multiple times for one answer. Like chain-of-thought, it is a once-bespoke trick that has largely been absorbed into how modern reasoning models operate internally.'
      ],
      body_ko: [
        'Self-consistency는 한 번의 실행을 믿는 대신, 같은 질문에 대한 독립적인 답을 여러 개 뽑아 가장 흔한 것을 택해 신뢰도를 높인다. 모델이 가끔 틀리는 방향은 서로 잘 일치하지 않는 반면, 맞는 추론은 같은 결과로 수렴하는 경향이 있어 효과가 있다.',
        '대가는 비용이다. 답 하나를 위해 모델을 여러 번 돌린다. chain-of-thought처럼, 한때 따로 만들던 기법이 이제는 최신 추론 모델의 내부 동작에 대체로 흡수됐다.'
      ],
      analogy: 'Like asking three experts independently and going with the answer two of them agree on.',
      analogy_ko: '세 전문가에게 따로 물어보고 둘이 동의한 답으로 가는 것과 같다.'
    },
    {
      slug: 'tree-of-thought',
      term: 'Tree-of-Thought',
      term_ko: 'Tree-of-Thought (사고의 나무)',
      aliases: ['tree-of-thought'],
      aliases_ko: ['Tree-of-Thought', '사고의 나무'],
      category: 'Reasoning',
      difficulty: 3,
      hover: 'Exploring several lines of reasoning at once and keeping the most promising, like a chess player weighing options.',
      hover_ko: '체스 선수가 수를 재듯, 여러 갈래의 추론을 동시에 탐색하고 가장 유망한 것을 남기는 방식.',
      infographic:
        '            start\n' +
        '          /   |   \\\n' +
        '     path A  path B  path C\n' +
        '       x      ok      best   <- evaluate, keep the winner',
      body: [
        'Tree-of-thought lets the model branch into multiple possible lines of reasoning, evaluate them, and pursue the most promising rather than committing to the first idea it has. It suits hard planning and creative problems, where the first approach is often not the best one.',
        'It is the most expensive of the common reasoning techniques because it explores many branches before settling. In the article it stands in for the elaborate reasoning scaffolds that applications used to construct and that the labs are now subsuming.'
      ],
      body_ko: [
        'Tree-of-thought는 모델이 처음 떠올린 생각에 매달리지 않고, 가능한 추론을 여러 갈래로 뻗어 평가한 뒤 가장 유망한 길을 좇게 한다. 첫 접근이 최선이 아닌 경우가 많은 어려운 계획 문제와 창의적 문제에 잘 맞는다.',
        '여러 갈래를 탐색한 뒤에야 정하므로, 흔한 추론 기법 중 가장 비싸다. 이 글에서는 예전에 앱이 짜던, 그리고 이제 랩이 흡수하고 있는 정교한 추론 골조를 대표한다.'
      ],
      analogy: 'Like a chess player mentally playing out several moves down different lines before choosing one.',
      analogy_ko: '체스 선수가 여러 수순을 머릿속으로 끝까지 둬본 뒤 하나를 고르는 것과 같다.'
    },
    {
      slug: 'extended-thinking',
      term: 'Extended Thinking',
      term_ko: 'Extended Thinking (확장 사고)',
      aliases: ['extended thinking'],
      aliases_ko: ['Extended Thinking', '확장 사고'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'The model does a long, private "thinking" pass before answering. Now a built-in feature, not something apps build.',
      hover_ko: '모델이 답하기 전에 길게, 보이지 않는 "생각" 과정을 거치는 것. 이제 앱이 만드는 게 아니라 기본 내장 기능이다.',
      infographic:
        '[ your question ]\n' +
        '   -> (model thinks privately, at length) ...\n' +
        '   -> [ final answer ]',
      body: [
        'Extended thinking is when a model spends extra effort reasoning in a hidden internal scratchpad before producing its visible answer. It captures the accuracy benefit of techniques like chain-of-thought, but it is handled inside the model and switched on with a simple setting rather than hand-built by the application.',
        'Its arrival is the article’s clearest concrete example of foundation labs absorbing work that used to be an application-level craft. When Anthropic shipped extended thinking in Claude 3.7 in early 2025, a capability apps once engineered by hand became a flag you turn on.'
      ],
      body_ko: [
        'Extended thinking은 모델이 보이는 답을 내놓기 전에, 보이지 않는 내부 메모장에서 추가로 추론에 공을 들이는 것이다. chain-of-thought 같은 기법의 정확도 이점을 가져오되, 앱이 손으로 만드는 게 아니라 모델 안에서 처리되고 간단한 설정으로 켠다.',
        '이것의 등장은 파운데이션 랩이 앱 차원의 기술을 흡수하는 가장 분명한 사례다. Anthropic이 2025년 초 Claude 3.7에 extended thinking을 넣으면서, 한때 앱이 손으로 짜던 능력이 그냥 켜는 플래그가 됐다.'
      ],
      analogy: 'Like a contestant who gets to think silently for a full minute before answering, instead of blurting immediately.',
      analogy_ko: '바로 내뱉지 않고, 답하기 전에 1분 동안 조용히 생각할 시간을 받는 참가자와 같다.'
    },
    {
      slug: 'reasoning-loop',
      term: 'Reasoning Loop / Agent Loop (ReAct)',
      term_ko: '추론 루프 / 에이전트 루프 (ReAct)',
      aliases: ['reasoning loops', 'clever agent loop', 'reasoning loop', 'agent loop'],
      aliases_ko: ['추론 루프', '에이전트 루프'],
      category: 'Reasoning',
      difficulty: 2,
      hover: 'The cycle an agent repeats: think, act, look at the result, think again, until the task is done.',
      hover_ko: '에이전트가 반복하는 사이클. 생각하고, 행동하고, 결과를 보고, 다시 생각하기를 작업이 끝날 때까지.',
      infographic:
        'Think -> Act (use a tool) -> Observe result -> Think -> Act -> ... -> Done',
      body: [
        'A reasoning loop, a common version of which is called ReAct (short for "reason and act"), is the repeating cycle at the heart of most agents. The agent reasons about what to do, takes an action such as calling a tool, observes what came back, and feeds that observation into its next round of reasoning. This loop is what turns a one-shot answer into a multi-step task.',
        'It continues until the goal is reached or the agent gives up. The article notes that an agent whose only advantage is a clever loop is exposed, because the next model release tends to do this kind of orchestration better, for free, for everyone.'
      ],
      body_ko: [
        '추론 루프는, 흔한 형태가 ReAct("reason and act"의 약자)라 불리는데, 대부분 에이전트의 심장에 있는 반복 사이클이다. 에이전트는 무엇을 할지 추론하고, 툴 호출 같은 행동을 하고, 돌아온 결과를 관찰한 뒤 그 관찰을 다음 추론에 넣는다. 이 루프가 한 번의 답을 여러 단계 작업으로 바꾼다.',
        '목표에 닿거나 에이전트가 포기할 때까지 계속된다. 이 글은 영리한 루프 하나만이 유일한 우위인 에이전트는 위태롭다고 짚는다. 다음 모델이 이런 오케스트레이션을 모두에게 무료로 더 잘 해주는 경향이 있기 때문이다.'
      ],
      analogy: 'Like cooking from a recipe: do a step, taste, adjust, do the next step, repeat until it is done.',
      analogy_ko: '레시피대로 요리하는 것과 같다. 한 단계 하고, 맛보고, 조절하고, 다음 단계로, 완성될 때까지 반복한다.'
    },
    {
      slug: 'tool-use',
      term: 'Tool Use / Tool Calling',
      term_ko: '툴 사용 / 툴 호출',
      aliases: ['calling tools', 'tool calling', 'tool use'],
      aliases_ko: ['툴 호출', '툴 사용'],
      category: 'Action',
      difficulty: 2,
      hover: 'Letting the model actually do things (search, run code, send email) by calling outside functions.',
      hover_ko: '외부 함수를 호출해 모델이 실제로 일을 하게 하는 것(검색, 코드 실행, 이메일 발송 등).',
      infographic:
        'Model: "I need today’s weather"\n' +
        '   -> calls weather_tool(city) -> the system runs it -> result handed back to the model',
      body: [
        'On its own, a model can only produce text. Tool use lets it request real actions: the model outputs a structured call like "search the web for X" or "write this file", a surrounding system actually performs that action, and the result is handed back into the model’s context. This is how an agent reads files, queries databases, or sends messages.',
        'The key point is that the tools, not the model, are what touch the real world. The model decides what to do; the runtime does it. This division is what makes an agent useful and also what the security layer has to govern carefully.'
      ],
      body_ko: [
        '모델 혼자서는 텍스트만 만들 수 있다. 툴 사용은 모델이 실제 행동을 요청하게 한다. 모델이 "웹에서 X를 검색" 또는 "이 파일을 작성" 같은 구조화된 호출을 내놓으면, 주변 시스템이 그 행동을 실제로 수행하고, 결과가 다시 모델의 컨텍스트로 전달된다. 에이전트가 파일을 읽고, 데이터베이스를 조회하고, 메시지를 보내는 방식이 이것이다.',
        '핵심은 실제 세계에 닿는 것은 모델이 아니라 툴이라는 점이다. 모델은 무엇을 할지 결정하고, 런타임이 그것을 실행한다. 이 분업이 에이전트를 쓸모 있게 만들고, 동시에 보안 레이어가 신중히 통제해야 하는 부분이다.'
      ],
      analogy: 'Like a smart manager who cannot lift a box, but can tell the right worker exactly which box to move.',
      analogy_ko: '상자를 직접 들지는 못해도, 어느 작업자에게 어떤 상자를 옮기라고 정확히 지시하는 유능한 관리자와 같다.'
    },
    {
      slug: 'moat',
      term: 'Moat',
      term_ko: '해자 (Moat)',
      aliases: ['the moat', 'a moat'],
      aliases_ko: ['해자'],
      category: 'Business',
      difficulty: 2,
      hover: 'A business term for whatever makes you hard to copy. The wider the moat, the safer the castle.',
      hover_ko: '베끼기 어렵게 만드는 모든 것을 가리키는 경영 용어. 해자가 넓을수록 성은 더 안전하다.',
      infographic:
        'castle = your business\n' +
        'moat   = what stops rivals copying you\n' +
        '         (proprietary data, lock-in, scale)\n' +
        'wider moat  ->  safer business',
      body: [
        'A moat is a durable advantage that protects a business from competitors, named after the ring of water that protects a castle. Common moats include a strong brand, proprietary data, network effects, or high switching costs that make customers reluctant to leave.',
        'The entire article is an argument about which layer of an AI agent provides a real moat versus a copyable one. Its claim is that reasoning is a shallow moat that the labs keep refilling for everyone, while accumulated memory is a deep moat that gets wider the longer a customer stays.'
      ],
      body_ko: [
        '해자(moat)는 경쟁사로부터 사업을 지키는 지속적인 우위로, 성을 둘러싼 물길에서 따온 말이다. 흔한 해자로는 강한 브랜드, 독점 데이터, 네트워크 효과, 또는 고객이 떠나기 꺼리게 만드는 높은 전환 비용이 있다.',
        '이 글 전체가 AI 에이전트의 어느 레이어가 진짜 해자이고 어느 것이 베낄 수 있는 것인지에 대한 논증이다. 핵심 주장은, 추론은 랩이 모두에게 계속 다시 채워주는 얕은 해자인 반면, 쌓인 메모리는 고객이 오래 머물수록 더 넓어지는 깊은 해자라는 것이다.'
      ],
      analogy: 'The wider the water around the castle, the harder it is for attackers to reach the walls.',
      analogy_ko: '성을 두른 물길이 넓을수록, 공격자가 성벽에 닿기 어렵다.'
    },
    {
      slug: 'commoditization',
      term: 'Commoditization',
      term_ko: '범용재화 (Commoditization)',
      aliases: ['resists commoditization', 'commoditization', 'commoditizing', 'a commodity'],
      aliases_ko: ['범용재화', '코모디티화', '범용재'],
      category: 'Business',
      difficulty: 2,
      hover: 'When something special becomes a cheap, interchangeable, buy-it-anywhere product. Great for buyers, hard on sellers’ margins.',
      hover_ko: '특별하던 것이 싸고, 서로 바꿔 쓸 수 있고, 어디서나 살 수 있는 물건이 되는 것. 사는 쪽엔 좋고 파는 쪽 마진엔 가혹하다.',
      infographic:
        'scarce and special   ---- over time ---->   cheap and interchangeable\n' +
        '(high price, an edge)                        (low price, no edge)',
      body: [
        'Commoditization is the process by which a product that was once rare and differentiated becomes standardized and widely available, so prices fall and no single seller keeps an edge. It is excellent for buyers and brutal for sellers’ margins.',
        'The article argues that AI reasoning is commoditizing: every competitor can buy the same quality from the same few labs on the same afternoon, so it stops being a source of advantage. Once a layer commoditizes, value moves to whatever has not, which is the heart of the memory thesis.'
      ],
      body_ko: [
        '범용재화(commoditization)는 한때 희소하고 차별화됐던 제품이 표준화되고 널리 공급되면서, 가격이 떨어지고 어느 판매자도 우위를 지키지 못하게 되는 과정이다. 사는 쪽엔 더없이 좋고 파는 쪽 마진엔 가혹하다.',
        '이 글은 AI 추론이 범용재화되고 있다고 본다. 경쟁사 누구나 같은 오후에 같은 소수 랩에서 같은 품질을 살 수 있으니, 더는 우위의 원천이 못 된다. 한 레이어가 범용재화되면 가치는 그렇지 않은 쪽으로 옮겨간다. 이것이 메모리 논지의 핵심이다.'
      ],
      analogy: 'Like bottled water or USB cables: once special, now identical and cheap on every shelf.',
      analogy_ko: '생수나 USB 케이블 같은 것. 한때 특별했지만 이제는 어느 매대에서나 똑같고 싸다.'
    },
    {
      slug: 'parsing',
      term: 'Parsing',
      term_ko: '파싱 (Parsing)',
      aliases: ['parsing'],
      aliases_ko: ['파싱'],
      category: 'Plumbing',
      difficulty: 2,
      hover: 'Reading messy raw input and turning it into a clean, structured form a program can use.',
      hover_ko: '지저분한 원시 입력을 읽어, 프로그램이 쓸 수 있는 깔끔하고 구조화된 형태로 바꾸는 것.',
      infographic:
        'raw:    "Name: Bob; Age: 30"\n' +
        'parsed: { name: "Bob", age: 30 }',
      body: [
        'Parsing is the step of taking raw input, a file, a webpage, a blob of text, and pulling it apart into organized pieces a program can work with. It is the unglamorous first stage of handling almost any input an agent receives.',
        'It rarely gets attention, but it sets a ceiling on everything downstream: if parsing is sloppy, every later layer inherits the mess. In the article it appears as part of the ingestion layer, where raw signals are turned into something the agent can process.'
      ],
      body_ko: [
        '파싱은 원시 입력, 즉 파일이나 웹페이지나 텍스트 덩어리를 받아, 프로그램이 다룰 수 있는 정리된 조각으로 분해하는 단계다. 에이전트가 받는 거의 모든 입력을 처리하는, 화려하지 않은 첫 단계다.',
        '주목받는 일은 드물지만, 이후 모든 것의 상한선을 정한다. 파싱이 엉성하면 뒤따르는 모든 레이어가 그 엉망을 물려받는다. 이 글에서는 원시 신호를 에이전트가 처리할 수 있는 무언가로 바꾸는 인제스션 레이어의 일부로 등장한다.'
      ],
      analogy: 'Like unpacking a messy grocery bag and sorting items onto the right shelves before you can cook.',
      analogy_ko: '요리하기 전에 뒤죽박죽 장바구니를 풀어 물건을 알맞은 선반에 정리하는 것과 같다.'
    },
    {
      slug: 'codebase-indexing',
      term: 'Codebase Indexing',
      term_ko: '코드베이스 인덱싱',
      aliases: ['indexed your entire codebase'],
      aliases_ko: ['코드베이스 전체를 인덱싱'],
      category: 'Plumbing',
      difficulty: 3,
      hover: 'Pre-scanning all of a project’s code so an AI tool can instantly find the parts that matter.',
      hover_ko: 'AI 도구가 중요한 부분을 즉시 찾도록, 프로젝트의 모든 코드를 미리 훑어두는 것.',
      infographic:
        'whole codebase  ---->  [ index: meaning + location of every chunk ]\n' +
        '                            ^\n' +
        '        your question -> jump straight to the 3 relevant files',
      body: [
        'Codebase indexing is when a coding assistant reads through an entire project ahead of time and builds a searchable map, usually using embeddings, of what each part of the code does and where it lives. Then, when you ask a question, it can jump straight to the few relevant files instead of rereading everything.',
        'The article points to this index as the real, hard-to-copy asset behind AI coding tools like Cursor. A rival can use a better model, but it cannot instantly reproduce months of a specific team’s indexed code and accumulated conventions. That index is memory, and it is the moat.'
      ],
      body_ko: [
        '코드베이스 인덱싱은 코딩 어시스턴트가 미리 프로젝트 전체를 훑어, 보통 임베딩을 써서 코드의 각 부분이 무엇을 하고 어디에 있는지에 대한 검색 가능한 지도를 만드는 것이다. 그러면 질문이 들어왔을 때 전부 다시 읽지 않고 관련 있는 몇 개 파일로 곧장 건너뛸 수 있다.',
        '이 글은 이 인덱스를 Cursor 같은 AI 코딩 도구 뒤에 있는, 진짜로 베끼기 어려운 자산으로 짚는다. 경쟁자는 더 나은 모델을 쓸 수는 있어도, 특정 팀이 몇 달간 인덱싱한 코드와 쌓인 관행을 즉시 재현하지는 못한다. 그 인덱스가 곧 메모리이고, 그것이 해자다.'
      ],
      analogy: 'Like a detailed table of contents for a 10,000-page book, so you never have to skim the whole thing again.',
      analogy_ko: '1만 쪽짜리 책의 상세한 목차 같은 것. 덕분에 전체를 다시 훑을 필요가 없다.'
    }
  ]
};
