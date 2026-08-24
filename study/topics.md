# 2026 초기단계 VC 필수 학습 토픽 10

작성: 백보성 (Mashup Ventures)
작성일: 2026-08-04
목적: 테마(thesis) 단위 글쓰기에서 **용어(term) 단위 학습**으로 전환하기 위한 커리큘럼 설계

---

## 이 문서를 쓰는 이유

지금까지의 f00tnotes 글은 "RFM 시장", "Agent Layer" 같은 **테마 단위**였다. 테마 글은 남에게 설명할 때 유용하지만, 딜 미팅에서 창업자가 "우리는 flow matching 기반이라 diffusion policy보다 추론이 빠릅니다"라고 말하는 순간 필요한 건 테마가 아니라 **용어 해상도**다.

그래서 아래 10개 토픽은 각각 다음 3개 층으로 구성했다.

1. **용어층**: 그 분야에서 실제로 오가는 단어 목록. 한 개씩 정의를 쓸 수 있어야 한다.
2. **기업층**: 그 용어의 SOTA를 들고 있는 기업. 왜 그들이 SOTA인지 한 문장으로 말할 수 있어야 한다.
3. **판단층**: 그 용어를 알면 딜에서 어떤 질문을 던질 수 있는지.

주의: 아래 기업명은 2026년 상반기까지의 인식 기준이다. 밸류에이션과 라운드 수치는 일부러 최소화했고, 실제 IM/IC 문서에 인용하기 전에는 반드시 최신 데이터로 교차검증한다.

---

## 1. 추론(Inference) 경제학

> 모델을 "훈련"하는 이야기는 끝났고, 이제 돈이 새는 곳은 전부 추론이다.

### 왜 VC가 알아야 하나
AI 스타트업 실사에서 gross margin이 40%인지 80%인지를 결정하는 건 코드가 아니라 추론 스택이다. 창업자가 자기 토큰 단가 구조를 설명하지 못하면 유닛 이코노믹스를 모르는 것과 같다.

### 뜯어볼 용어
| 용어 | 왜 중요한가 |
| --- | --- |
| Prefill vs Decode | 입력 처리와 출력 생성의 비용 구조가 다르다. 긴 프롬프트 제품과 긴 출력 제품의 원가가 다른 이유 |
| KV cache | 컨텍스트 재사용의 핵심. 캐시 히트율이 곧 원가 |
| Batching (continuous / dynamic) | GPU 활용률을 결정. 동일 GPU에서 처리량 수배 차이 |
| Speculative decoding | 작은 모델이 초안을 쓰고 큰 모델이 검증. 지연시간 단축 기법 |
| Quantization (FP8, INT4, AWQ, GPTQ) | 정확도를 얼마 내주고 원가를 얼마 줄이는가의 trade-off |
| MoE (Mixture of Experts) serving | 전체 파라미터 대비 활성 파라미터. "700B 모델"이 실제로는 37B만 쓰는 구조 |
| Test-time compute / reasoning token | 추론 시점에 생각을 더 하게 만드는 스케일링. 원가가 출력 길이에 비례해 폭증 |
| Tokens per second, TTFT, TPOT | 제품 체감 품질 지표. 지연시간 SLA의 언어 |
| Tokens per dollar | 결국 이 숫자로 모든 비교가 끝난다 |

### SOTA / 대표 기업
- **하드웨어 축**: NVIDIA(압도적 기본값), Groq(LPU, 초저지연 특화), Cerebras(웨이퍼 스케일)
- **서빙 레이어**: vLLM, SGLang, TensorRT-LLM (오픈소스 표준 3파)
- **추론 API/클라우드**: Together AI, Fireworks AI, Baseten, Modal, Replicate
- **한국**: FriendliAI(추론 최적화), Rebellions, FuriosaAI (2, 9번 토픽과 연결)

### 딜에서 던질 질문
- 캐시 히트율과 배치 사이즈가 얼마인가. 트래픽이 10배가 되면 원가는 몇 배가 되는가
- 자체 서빙인가 API 재판매인가. 후자면 모델 벤더 가격 인하에 마진이 종속된다
- reasoning 토큰을 쓰는 제품이면, 사용자당 월 토큰 상한이 설계돼 있는가

### f00tnotes 글감 후보
"AI 스타트업의 원가표: 토큰 하나가 만드는 마진 차이"

---

## 2. Open Weight 모델과 라이선스 스펙트럼

> "오픈소스 AI"라는 말은 대부분 부정확하다. 가중치만 열린 것과 전부 열린 것은 다르다.

### 왜 VC가 알아야 하나
포트폴리오사가 어떤 모델 위에 서 있는지가 곧 기술 리스크이자 법적 리스크다. 라이선스 조항 하나로 상업화 경로가 막히는 경우가 실제로 있다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| Open weight vs Open source | 가중치 공개 vs 학습 데이터/코드/레시피까지 공개 |
| 라이선스 유형 | Apache 2.0, MIT (자유) / Llama Community License, Gemma Terms (조건부) / Research-only (상업 불가) |
| Distillation | 큰 모델의 출력으로 작은 모델을 학습. 대부분 벤더 ToS 위반 소지가 있다 |
| Fine-tuning 계열 | Full FT, LoRA, QLoRA, adapter |
| Post-training 계열 | SFT, RLHF, DPO, GRPO, RLVR |
| Continued pretraining | 도메인 지식 주입. 한국어/의료/법률 특화의 실제 방법 |
| Sovereign AI | 국가 단위 자국 모델 확보 흐름. 한국 정부 사업의 논리 |
| Model merging | 여러 파인튜닝 모델을 합치는 기법 |

### SOTA / 대표 기업
- **미국 open weight**: Meta Llama 계열, OpenAI gpt-oss 계열, NVIDIA Nemotron
- **중국 진영**: DeepSeek, Alibaba Qwen, Moonshot Kimi, Z.ai GLM (2025년 이후 오픈 웨이트 성능 프론티어를 상당 부분 주도)
- **유럽**: Mistral
- **진짜 오픈소스**: AI2 OLMo (데이터/코드/체크포인트 전부 공개)
- **한국**: LG AI연구원 EXAONE, Upstage Solar, Naver HyperCLOVA X SEED, NCSOFT VARCO

### 딜에서 던질 질문
- 베이스 모델 라이선스가 이 회사의 과금 모델을 허용하는가
- 베이스 모델을 갈아탈 때 드는 비용이 얼마인가 (모델 종속성 테스트)
- 파인튜닝이 진짜 moat인가, 아니면 다음 세대 베이스 모델이 무료로 흡수할 개선인가

### f00tnotes 글감 후보
"오픈 웨이트는 오픈소스가 아니다: 라이선스로 읽는 AI 스타트업 리스크"

---

## 3. 생성 모델 아키텍처: Flow Matching, Diffusion, Autoregressive

> 텍스트는 autoregressive, 이미지/영상/로봇 행동은 점점 flow matching으로 간다.

### 왜 VC가 알아야 하나
이미지/영상/음성/로봇 딜에서 "어떤 방식으로 생성하는가"가 속도, 원가, 제어 가능성을 전부 결정한다. 이 용어를 모르면 미디어 생성과 물리 AI 딜을 동시에 판단할 수 없다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| Autoregressive | 다음 토큰 예측. LLM의 기본 |
| Diffusion | 노이즈에서 시작해 여러 스텝에 걸쳐 복원 |
| Flow matching / Rectified flow | 노이즈에서 데이터로 가는 경로를 직선에 가깝게 학습. diffusion보다 적은 스텝으로 생성 |
| Latent space | 압축된 표현 공간에서 생성. 원가 절감의 핵심 |
| DiT (Diffusion Transformer) | UNet을 트랜스포머로 대체. 현재 영상 생성의 사실상 표준 |
| Diffusion LLM | 텍스트를 병렬로 생성하는 시도. 지연시간의 다른 접근 |
| Consistency model / distillation | 몇 스텝, 심지어 1스텝 생성 |
| Guidance (CFG) | 프롬프트 충실도와 다양성의 조절 손잡이 |
| Diffusion Policy vs VLA | 로봇 행동 생성의 두 계보 (4번과 직결) |

### SOTA / 대표 기업
- **이미지**: Black Forest Labs (FLUX, flow matching 상용화 대표), Midjourney, Ideogram, Recraft
- **영상**: OpenAI Sora, Google Veo, Runway, Luma, Kuaishou Kling, Pika
- **음성/음악**: ElevenLabs, Suno, Cartesia (실시간 음성 특화)
- **3D/월드**: World Labs, Odyssey
- **로봇 적용**: Physical Intelligence π 계열이 flow matching을 action 생성에 사용

### 딜에서 던질 질문
- 생성 스텝 수와 장당/초당 원가가 얼마인가. 경쟁사 대비 몇 배인가
- 아키텍처 우위인가, 데이터 우위인가, 유통 우위인가. 아키텍처는 6개월 안에 따라잡힌다
- 제어 가능성(캐릭터 일관성, 편집, 레이어 분리)이 있는가. 프로덕션 워크플로우의 진입 조건

### f00tnotes 글감 후보
"Flow matching이 왜 로봇과 영상에서 동시에 등장하는가"

---

## 4. Physical AI의 실제 스코프

> 휴머노이드는 Physical AI의 한 조각일 뿐이고, 돈이 도는 곳은 대부분 다른 데다.

### 왜 VC가 알아야 하나
RFM 리서치를 이미 했으니 여기서는 스코프를 넓히는 게 목적이다. 로봇 팔, 자율주행, 물류 자동화, 농기계, 건설, 웨어러블, 산업 센서까지가 같은 기술 스택을 공유한다. 한국은 제조 데이터 접근성이라는 비대칭 우위가 있는 시장이다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| VLA (Vision-Language-Action) | 영상+언어를 받아 행동을 출력하는 단일 정책 |
| World model | 환경의 dynamics를 학습해 미래를 예측. 데이터 부족의 우회로 |
| Sim2Real gap | 시뮬레이션 성능이 실제로 이전되지 않는 문제 |
| Embodiment gap | 다른 로봇 폼팩터로의 전이 실패 |
| Teleoperation | 사람이 원격 조작해 학습 데이터를 만드는 방식. 비용 구조의 핵심 |
| Proprioception | 관절 상태 등 자기 감각 입력 |
| Whole-body control / MPC | 고전 제어. 학습 기반과 하이브리드로 쓰인다 |
| End effector / dexterous hand | 손이 병목이다. 휴머노이드 원가의 큰 축 |
| Cycle time, uptime, MTBF | 산업 현장이 실제로 보는 지표. 데모 영상과 무관 |
| Actuator, harmonic drive, cycloidal | 하드웨어 원가와 국산화 이슈 |

### SOTA / 대표 기업
- **모델 전용**: Physical Intelligence, Skild AI
- **수직통합 휴머노이드**: Figure AI, 1X, Apptronik, Tesla Optimus, Unitree/AgiBot/Galbot(중국)
- **플랫폼/툴체인**: NVIDIA (GR00T, Isaac, Omniverse), World Labs
- **응용 수직**: Waymo(자율주행), Zipline(드론), Carbon Robotics(농업), Path Robotics(용접), Dexterity(물류)
- **한국**: RLWRLD, Config, WIRobotics, 두산로보틱스, 레인보우로보틱스

### 딜에서 던질 질문
- 학습 데이터를 어디서 얻는가. 텔레옵 시간당 원가와 확보 채널이 명확한가
- 고객이 사는 게 로봇인가 결과(시간당 처리량)인가. RaaS 과금이면 자본 구조가 완전히 달라진다
- 하드웨어 자체 개발인가 조달인가. 조달이면 중국 공급망 의존도는 얼마인가

### f00tnotes 글감 후보
"Physical AI 지도: 휴머노이드 바깥의 8개 시장"

---

## 5. Agent 개발 스택: 컨텍스트 엔지니어링부터 RL 환경까지

> 2026년 에이전트 회사의 실력 차이는 모델이 아니라 harness에서 나온다.

### 왜 VC가 알아야 하나
에이전트 딜이 딜 플로우의 절대 다수를 차지하는데, 대부분 "GPT 래퍼"와 "진짜 시스템"의 구별이 어렵다. 구별 기준은 컨텍스트 관리, 평가 체계, 실패 복구 설계다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| Context engineering | 프롬프트가 아니라 컨텍스트 예산 배분 설계. 현재 에이전트 성능의 최대 변수 |
| Tool calling / function calling | 모델이 외부 기능을 호출하는 규약 |
| MCP (Model Context Protocol) | 툴/데이터 연결 표준. 사실상 업계 표준으로 정착 |
| Agent memory | 세션 간 상태 유지. episodic/semantic/procedural 구분 |
| Context rot / lost in the middle | 긴 컨텍스트에서 성능이 무너지는 현상 |
| Compaction / summarization | 컨텍스트 압축 전략 |
| Subagent / orchestration | 감독자-작업자 패턴, 컨텍스트 격리 |
| Sandbox / computer use | 코드 실행 및 GUI 조작 환경 |
| Eval, LLM-as-judge, rubric | 성능을 숫자로 만드는 유일한 방법 |
| RL environment | 에이전트를 학습시킬 검증 가능한 과제 환경. 2026년 신흥 인프라 시장 |
| Human in the loop, escalation | 실패를 제품 안에서 처리하는 설계 |

### SOTA / 대표 기업
- **프로토콜/프레임워크**: Anthropic (MCP, Claude Agent SDK), OpenAI Agents SDK, LangChain/LangGraph, CrewAI
- **코딩 에이전트**: Anthropic Claude Code, Cursor, Cognition Devin, GitHub Copilot
- **버티컬 에이전트**: Sierra(CS), Decagon(CS), Harvey(법률), Abridge(의료), Clay(GTM)
- **인프라**: E2B, Modal, Daytona(샌드박스), Browserbase(브라우저), Mem0/Zep(메모리)
- **평가**: Braintrust, LangSmith, Galileo
- **RL 환경/데이터**: Prime Intellect, Mechanize, Surge, Mercor

### 딜에서 던질 질문
- 자체 eval set이 있는가. 없으면 개선을 측정할 수 없고 개선할 수도 없다
- 실패율이 얼마이고 실패 시 비용을 누가 지는가
- 컨텍스트/메모리 설계가 코드에 있는가 프롬프트에 있는가. 후자는 복제 가능하다

### f00tnotes 글감 후보
"GPT 래퍼와 에이전트 회사를 가르는 6가지 질문" (기존 agent layers 글의 후속)

---

## 6. AI 시대 SaaS 비즈니스 모델

> Seat 과금은 무너지고 있는데, 대체할 표준이 아직 없다. 그 공백이 지금 가장 큰 논쟁이다.

### 왜 VC가 알아야 하나
전통 SaaS 지표(ARR, NDR, Rule of 40)를 AI 회사에 그대로 적용하면 오독한다. 원가가 사용량에 비례하고, 고객 수가 아니라 처리량이 매출을 만든다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| Seat-based pricing | 사용자당 과금. 에이전트가 사람을 대체하면 매출이 줄어드는 구조적 모순 |
| Usage-based / consumption | 토큰, 호출, 크레딧 단위 과금 |
| Outcome-based pricing | 해결된 티켓, 성사된 미팅 등 결과당 과금 |
| Hybrid pricing | 기본료 + 사용량. 현재 가장 흔한 타협점 |
| Credit system | 사용량을 추상화해 마진을 숨기는 장치 |
| COGS 구조 변화 | SaaS 90% 마진 시대에서 AI 60-70% 마진 시대로 |
| ARR quality | AI 매출의 변동성. 실험 예산 매출과 정착 매출 구분 |
| NDR / GRR | AI SaaS에서 특히 이탈 패턴이 다르다 |
| Services-as-software | 인건비 예산을 겨냥. TAM 계산 방식 자체가 바뀐다 |
| FDE (Forward Deployed Engineer) | 도입 마찰을 사람으로 뚫는 조직 모델. 확장성 논쟁 |
| Agent 단위 SKU | "AI 직원" 과금. 좌석의 다음 형태 후보 |

### SOTA / 대표 기업
- **outcome 과금 선례**: Intercom Fin(해결당), Sierra(해결당), Zendesk
- **크레딧/사용량**: Cursor, Lovable, Replit, Vercel
- **엔터프라이즈 에이전트 SKU**: Salesforce Agentforce, Microsoft Copilot 계열, ServiceNow
- **과금 인프라**: Stripe Billing, Metronome, Orb, Lago (사용량 과금은 인프라 없이 못 한다)
- **services-as-software 대표**: Harvey, EvenUp, Crete(회계) 등

### 딜에서 던질 질문
- 매출이 고객 수에 비례하는가 사용량에 비례하는가. 성장 시 마진이 개선되는가 악화되는가
- 과금 단위를 고객이 직관적으로 이해하는가. 크레딧은 예측 불가능성 때문에 이탈 요인이 된다
- 파일럿 매출이 전체의 몇 %인가. AI 예산은 아직 실험 예산 성격이 강하다

### f00tnotes 글감 후보
"좌석이 사라진 뒤: AI SaaS 과금 모델 6종 비교"

---

## 7. 커머스의 형태: Agentic Commerce와 그 앞의 것들

> 검색 유입이 무너지는 중이고, 그 다음 트래픽 관문이 무엇인지가 커머스 전체를 재배열한다.

### 왜 VC가 알아야 하나
커머스는 한국에서 가장 두꺼운 딜 플로우 중 하나다. 그런데 "좋은 커머스 형태"의 정답이 D2C -> 마켓플레이스 -> 소셜/라이브 -> 에이전틱으로 계속 이동해 왔다. 현재 위치를 알아야 어떤 형태에 베팅할지 판단할 수 있다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| Agentic commerce | AI가 탐색하고 결제까지 수행하는 거래 |
| ACP / AP2 | 에이전트 결제 프로토콜 계열. 결제 권한 위임과 신원 증명 표준 경쟁 |
| Headless commerce | 프론트와 커머스 백엔드 분리. 채널 확장의 전제 |
| Retail media | 마켓플레이스의 광고 매출. 실제 이익의 원천 |
| Take rate vs GMV | 커머스 밸류에이션의 기본 분모/분자 |
| CAC payback, contribution margin | D2C 판별의 핵심. GMV는 지표가 아니다 |
| Live/social commerce | 콘텐츠가 유통이 되는 구조 |
| Quick commerce / dark store | 밀도 경제. 지역 단위 유닛 이코노믹스 |
| Embedded finance / BNPL | 커머스 마진을 금융으로 보완 |
| Reverse logistics | 반품이 카테고리 생존을 결정 (패션 특히) |
| Zero-click / AI 유입 | 검색 트래픽 소멸 후의 획득 경로 |

### SOTA / 대표 기업
- **에이전틱 결제 표준**: OpenAI + Stripe(ACP 계열), Google(AP2 계열), Visa/Mastercard의 에이전트 결제 이니셔티브
- **AI 쇼핑 관문**: ChatGPT 쇼핑, Perplexity, Amazon Rufus
- **플랫폼**: Shopify(에이전틱 대응 가장 빠름), Amazon, TikTok Shop, Temu/Shein
- **B2B/도매**: Faire, Ankorstore
- **한국**: Coupang, Naver 쇼핑, 무신사, 오늘의집, 에이블리

### 딜에서 던질 질문
- 이 회사의 유입이 검색/광고에 얼마나 의존하는가. AI 관문이 커지면 어떻게 되는가
- 에이전트가 대신 구매하는 세계에서 이 브랜드가 선택될 이유가 데이터로 존재하는가
- 기여이익이 양수가 되는 시점의 필요 GMV가 얼마인가

### f00tnotes 글감 후보
"에이전트가 결제하는 시대의 브랜드 생존 조건"

---

## 8. 평가, 벤치마크, 데이터 노동

> 모델을 못 만드는 회사도 평가는 만들 수 있다. 그리고 평가가 곧 moat이 되는 국면이다.

### 왜 VC가 알아야 하나
"성능이 좋다"는 주장을 검증할 언어가 없으면 실사가 불가능하다. 동시에 이 영역 자체가 큰 시장으로 성장했다. 데이터 라벨링에서 전문가 데이터, RL 환경으로 사다리가 올라가는 중이다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| Benchmark contamination | 학습 데이터에 벤치마크가 섞여 점수가 무의미해지는 현상 |
| Pass@k, Elo, win rate | 성능 표기 방식별 함정 |
| LLM-as-judge | 모델이 모델을 채점. position bias 등 편향 문제 |
| Reward model | 선호를 학습한 채점 모델 |
| RLVR (verifiable rewards) | 정답 검증이 가능한 과제로 학습. 코드/수학에서 강력 |
| Reward hacking | 지표는 오르는데 실제로는 나빠지는 현상 |
| Golden dataset | 도메인 정답 세트. 버티컬 AI의 실질 자산 |
| Human preference data | 전문가 시간이 곧 원재료 |
| Red teaming | 안전성/취약점 평가 |
| Agentic benchmark | SWE-bench, OSWorld, 터미널 계열 등 실행 기반 평가 |

### SOTA / 대표 기업
- **데이터/전문가 노동**: Scale AI, Surge AI, Mercor, Handshake, Invisible
- **RL 환경**: Prime Intellect, Mechanize
- **독립 평가/분석**: Epoch AI, Artificial Analysis, LMArena, METR
- **평가 툴링**: Braintrust, LangSmith, Patronus, Galileo

### 딜에서 던질 질문
- 성능 주장의 근거가 공개 벤치마크인가 자체 golden set인가
- 도메인 정답 데이터를 누가 소유하는가. 고객사인가 이 회사인가
- 평가 세트가 고객 확대에 따라 자동으로 커지는 구조인가 (데이터 플라이휠 진위 검증)

### f00tnotes 글감 후보
"벤치마크 점수를 믿지 않는 방법"

---

## 9. 컴퓨트와 반도체 인프라

> AI 자본의 90%가 지나가는 통로. 여기 원가가 위쪽 모든 레이어의 마진을 결정한다.

### 왜 VC가 알아야 하나
초기 VC가 반도체 딜을 직접 하는 경우는 적지만, 컴퓨트 가격과 가용성이 모든 포트폴리오사의 비용 구조 전제다. 한국은 HBM과 팹리스에서 실제 딜 플로우가 있는 몇 안 되는 시장이다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| HBM | 메모리 대역폭이 추론의 실제 병목. SK하이닉스/삼성의 전략적 위치 |
| CoWoS / advanced packaging | 생산 병목. GPU 공급량을 결정 |
| Interconnect (NVLink, InfiniBand, Ethernet) | 대규모 학습/추론 클러스터의 성립 조건 |
| ASIC vs GPU | TPU/Trainium 같은 전용칩과 범용칩의 경쟁 |
| NPU / edge inference | 온디바이스 추론. 원가와 프라이버시의 다른 답 |
| Neocloud | GPU 임대 전문 클라우드. 자산 집약 사업 모델 |
| GPU depreciation schedule | 감가 기간 가정이 이 산업 수익성 논쟁의 핵심 |
| Power / PUE / 변전 | 2026년 진짜 제약은 칩이 아니라 전력이다 |
| Liquid cooling | 랙 밀도 상승의 필수 조건 |
| Compute utilization | 계약 GPU와 실제 사용 GPU의 격차 |

### SOTA / 대표 기업
- **칩**: NVIDIA, AMD, Google TPU, Amazon Trainium, Broadcom(커스텀 ASIC)
- **파운드리/메모리**: TSMC, SK하이닉스, 삼성전자, Micron
- **Neocloud**: CoreWeave, Nebius, Crusoe, Lambda
- **한국 팹리스**: Rebellions, FuriosaAI, DeepX, Mobilint
- **인프라 소프트웨어**: Modular, Together, SkyPilot

### 딜에서 던질 질문
- 컴퓨트 조달이 계약으로 확보돼 있는가 스팟 의존인가
- 온디바이스로 내릴 수 있는 워크로드인가. 그렇다면 원가 곡선이 완전히 달라진다
- 이 회사의 원가 개선이 자체 기술인가, 하드웨어 세대 교체에 무임승차인가

### f00tnotes 글감 후보
"전력이 병목이 된 해: 2026 컴퓨트 제약 지도"

---

## 10. AI 보안, 신원, 규제

> 에이전트가 실제로 행동하기 시작하면, 막는 쪽이 새 시장이 된다.

### 왜 VC가 알아야 하나
에이전트 도입의 최대 장애물은 성능이 아니라 권한과 책임이다. 여기가 뚫려야 엔터프라이즈 예산이 열리고, 그 자체가 별도 카테고리다. 한국은 AI 관련 법제 시행 국면이어서 컴플라이언스 수요가 실제로 발생한다.

### 뜯어볼 용어
| 용어 | 정의 요지 |
| --- | --- |
| Prompt injection (direct / indirect) | 에이전트 보안의 근본 미해결 문제 |
| Lethal trifecta | 민감 데이터 + 외부 입력 + 외부 통신이 겹칠 때의 위험 구조 |
| Agent identity / non-human identity | 에이전트에게 계정과 권한을 어떻게 주는가 |
| Scoped token / OAuth for agents | 최소 권한 위임 |
| Audit trail / observability | 사고 후 추적 가능성. 규제 대응의 최소 요건 |
| Data residency / 국내 리전 | 한국 금융/공공 도입의 사실상 진입 조건 |
| Model provenance / watermarking | 생성물 출처 표시 |
| Deepfake / KYC 우회 | 금융 사기 대응 수요 |
| EU AI Act 위험 등급 | 글로벌 판매 시 제품 요구사항으로 직결 |
| 한국 AI 기본법 | 국내 사업자 의무. 컴플라이언스 제품 수요의 근거 |

### SOTA / 대표 기업
- **에이전트/LLM 보안**: Lakera, HiddenLayer, Prompt Security, Zenity, Protect AI
- **비인간 신원/권한**: Astrix, Oasis, WorkOS, Descope, Okta/Auth0의 에이전트 대응
- **컴플라이언스/거버넌스**: Vanta, Drata, Credo AI, Holistic AI
- **위조 대응**: Reality Defender, Persona, Sardine

### 딜에서 던질 질문
- 에이전트에 부여된 권한 범위가 문서화돼 있는가. 최악의 사고 시나리오가 정의돼 있는가
- 보안 심사(SOC 2, ISMS-P)가 세일즈 사이클의 몇 개월을 차지하는가
- 규제가 이 회사에 순풍인가 역풍인가. 컴플라이언스 제품은 규제가 매출이다

### f00tnotes 글감 후보
"에이전트에게 회사 계정을 주는 문제"

---

## 학습 순서 제안

| 순서 | 토픽 | 이유 | 목표 산출물 |
| --- | --- | --- | --- |
| 1 | 1. 추론 경제학 | 모든 AI 딜의 마진 언어. 가성비 최고 | 원가 계산 시트 1개 |
| 2 | 5. Agent 스택 | 현재 딜 플로우 비중 1위 | 기존 agent layers 글 후속편 |
| 3 | 6. SaaS BM | 딜 판단에 즉시 쓰인다 | 과금 모델 비교표 |
| 4 | 2. Open weight | 기술/법적 리스크 체크리스트화 | 라이선스 체크리스트 |
| 5 | 8. 평가/데이터 | 성능 주장 검증 능력 | 실사용 질문 리스트 |
| 6 | 7. 커머스 | 국내 딜 플로우 대응 | 커머스 형태 지도 |
| 7 | 4. Physical AI | RFM 리서치 확장 | 휴머노이드 외 시장 지도 |
| 8 | 3. 생성 모델 | 미디어/로봇 딜 공통 기반 | flow matching 설명글 |
| 9 | 9. 컴퓨트 | 거시 전제 이해 | 컴퓨트 제약 메모 |
| 10 | 10. 보안/규제 | 엔터프라이즈 도입 병목 | 보안 실사 질문지 |

작성 방식 제안: 토픽당 파일 1개(`study/<topic>/`), 그 안에 (a) 용어 사전, (b) 기업 리서치, (c) f00tnotes 발행용 글 1편. 기존 RFM 및 agent layers 폴더와 같은 3파일 구조를 유지한다.

---

## 부록: 다음 라운드 후보 토픽

10개에는 넣지 않았지만 2026년 하반기에 올라올 가능성이 큰 축.

1. **Voice AI**: 실시간 음성 대화 스택(STT/TTS/full-duplex), 지연시간 300ms 경계, 콜센터 시장
2. **Vertical AI / Services-as-software**: 법률, 회계, 의료, 보험의 인건비 예산 침식
3. **AI 인프라 미들웨어**: 벡터DB, 검색, RAG 이후의 구조, 컨텍스트 저장소
4. **온디바이스/엣지 AI**: SLM, 스마트폰/웨어러블 NPU, 프라이버시 규제와의 결합
5. **AI 네이티브 조직론**: 5명이 100억 매출을 만드는 회사의 실사 방법, 시드 밸류에이션 재조정
6. **국가 단위 AI 정책**: 한국 GPU 확충 사업과 국가 대표 모델, 정책 자금이 만드는 딜 플로우
7. **Robotics 하드웨어 공급망**: 액추에이터, 감속기 국산화와 중국 의존도

---

## 참고: 무엇을 믿을지

- 1차 소스 우선: 모델 카드, 기술 리포트, 라이선스 원문, 실적 발표 자료
- 벤치마크는 독립 측정만 인용: Artificial Analysis, Epoch AI, LMArena
- 가격/성능 수치는 3개월 이내 자료만 인용. AI 영역에서 6개월 전 수치는 틀린 수치다
- 밸류에이션과 라운드는 최소 2개 출처 교차확인 후 문서화
