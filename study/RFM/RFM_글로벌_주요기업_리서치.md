# 로봇 파운데이션 모델(RFM) 글로벌 주요 기업 리서치

작성: 백보성 (Mashup Ventures)
작성일: 2026-05-19
대상: 파트너십 내부 공유용

---

## Executive Summary

- **로봇 파운데이션 모델(Robot Foundation Model, RFM)**은 자연어 명령과 시각 입력을 받아 로봇의 행동을 출력하는 범용 AI 모델을 말한다. 2024년 이후 GPT급 LLM에 비견되는 "범용성"을 로봇 분야에서 달성하려는 흐름이 본격화되며, 이를 'Physical AI'라는 상위 개념으로 묶는 추세다.
- 글로벌 시장은 (1) 모델 전용형, (2) 하드웨어 수직통합형, (3) 데이터 인프라형 세 갈래로 분화 중이다. 모델 전용형 대표는 Physical Intelligence와 Skild AI, 수직통합형 대표는 Figure AI와 1X Technologies, 데이터 인프라형 대표는 Config과 Carbon Robotics다.
- 자본 집중도가 매우 높다. Figure AI는 390억 달러 valuation을 기록했고 Skild AI는 140억 달러, Physical Intelligence는 시리즈 라운드를 기점으로 50억 달러 이상이 거론된다. 한국 기업 중에서는 RLWRLD가 누적 4,200만 달러, Config이 누적 3,500만 달러를 모집했다.
- 한국 정부는 2026년 5월 504억 원 규모의 'K-Humanoid' 핵심기술 개발 사업을 출범했고, LG전자와 WIRobotics 등이 주관 기업으로 참여한다. 삼성, 현대, SKT, LG가 RLWRLD와 Config 양쪽에 모두 전략 투자한 점도 주목할 부분이다.
- Mashup Ventures 관점에서는 RFM 자체 모델보다는 (a) 산업/도메인 특화 데이터 수집/라벨링, (b) 시뮬레이션-실데이터 브리지, (c) 한국 제조업 특화 후공정 통합 영역에서 deal flow를 발굴하는 것이 자본 효율적이다.

---

## 1. RFM이란 무엇인가

### 1.1 정의

로봇 파운데이션 모델은 대규모 다중 모달(영상-텍스트-행동) 데이터로 사전학습된 단일 정책 모델이다. 핵심 구성은 다음과 같다.

- **입력**: RGB-D 카메라 영상, 자연어 지시, 관절 상태값(proprioception)
- **출력**: 로봇 관절 토크/속도/엔드이펙터 트라젝토리
- **학습 데이터**: 텔레오퍼레이션 시연(demonstration), 시뮬레이션, 인터넷 영상

RFM이라는 명칭은 Covariant가 2024년 3월 RFM-1을 공개하며 대중화되었으며, NVIDIA가 GR00T(2025), Physical Intelligence가 π 시리즈(2024-2026)를 출시하며 일반화되었다.

### 1.2 기술 스택 분류

| 분류                           | 설명                                            | 대표 모델                                  |
| ---------------------------- | --------------------------------------------- | -------------------------------------- |
| VLA (Vision-Language-Action) | Transformer 기반 단일 정책, 영상+언어를 토큰화 후 action 디코딩 | Google RT-2, Figure Helix, OpenVLA     |
| Diffusion Policy             | 행동 분포를 확산 모델로 학습, 다중 모달 행동 표현에 강점             | TRI Diffusion Policy, π0               |
| 계층형(Hierarchical)            | 상위(VLM)는 추론, 하위(LLM-free 정책)는 모터 제어           | Figure Helix(System 1/2), NVIDIA GR00T |
| 월드 모델 기반                     | 환경 dynamics를 학습한 후 정책 미세조정                    | World Labs, Sakana, DeepMind Genie     |

### 1.3 RFM이 풀어야 할 4대 난제

1. **데이터 부족**: LLM 대비 학습 데이터가 6-7자릿수 부족하다. RT-X 데이터셋이 100만 trajectory 수준, π0 학습 데이터는 약 1만 시간으로 추정.
2. **Sim2Real Gap**: 시뮬레이션 학습 정책의 실제 환경 성능 저하.
3. **하드웨어 이질성(Embodiment Gap)**: 모델이 학습된 로봇과 다른 폼팩터에서의 zero-shot transfer.
4. **장기 자율성**: 분 단위 태스크는 시연 가능하나, 시간 단위 self-correction은 미해결.

---

## 2. 시장 규모 및 투자 트렌드

- 2025년 Physical AI 영역 글로벌 누적 투자액은 80억 달러 이상으로 추정되며, 2026년 1분기에만 50백만 달러 이상 라운드를 클로징한 스타트업이 27곳에 달한다.
- 가장 큰 자본 집중처는 미국 빅테크 인접 휴머노이드 스타트업이다. Figure AI는 2024년 2월 26억 달러 valuation에서 2025년 9월 390억 달러까지 15배 점프했다.
- 한국, 중국, 독일이 미국 다음 세 축을 형성한다. 한국은 RLWRLD/Config 양 축, 중국은 Unitree/AgiBot/Galbot, 독일은 Neura Robotics가 중심이다.
- LP/CVC 측에서 삼성벤처투자, SKT, LG테크놀로지벤처스, 현대 ZER01NE, 미쓰이화학, KDDI 같은 산업 자본이 모델 전용형 RFM 스타트업에 모두 동시 베팅하는 패턴이 관찰된다.

---

## 3. 미국 RFM 기업

### 3.1 Physical Intelligence (PI, π)

| 항목        | 내용                                                                         |
| --------- | -------------------------------------------------------------------------- |
| 설립        | 2024                                                                       |
| 본사        | 샌프란시스코, 미국                                                                 |
| 창업자       | Sergey Levine, Chelsea Finn, Karol Hausman 등 (Stanford/UC Berkeley/Google) |
| 대표 모델     | π0 (2024), π0.5 (2025-04), π0.7 (2026-04)                                  |
| 누적 투자     | 4억 달러 이상 (Bezos Expeditions, OpenAI Startup Fund, Khosla, Lux)             |
| Valuation | 28억 달러 (시리즈 A 기준), 후속 라운드에서 50억 달러 이상 거론                                   |

**핵심 차별점**

- 모델 전용형 노선의 본진. 자체 하드웨어를 만들지 않고 ARX-5, Trossen WX250s, Franka 등 다양한 로봇 폼팩터에 동일 정책을 transfer한다.
- π0.5는 한 번도 본 적 없는 가정 환경(낯선 부엌, 침실)에서 음성 명령 1회만으로 청소 태스크 수행을 시연했다.
- π0.7(2026-04)은 학습 데이터에 두 번만 등장한 에어프라이어 조작 같은 zero-shot generalization을 입증.

**Mashup 관점 코멘트**: 한국 LP/CVC가 직접 진입하기 어려운 라운드. 다만 π 모델을 한국 산업 로봇에 fine-tuning하는 application 레이어 스타트업이 향후 deal flow가 될 수 있다.

### 3.2 Skild AI

| 항목 | 내용 |
|---|---|
| 설립 | 2023 |
| 본사 | 피츠버그/팔로알토 |
| 창업자 | Deepak Pathak, Abhinav Gupta (CMU 로보틱스 교수) |
| 대표 모델 | Skild Brain (범용 액션 폴리시) |
| 누적 투자 | 14억 달러 (SoftBank, NVIDIA, Lightspeed, Coatue, Bezos Expeditions) |
| Valuation | 140억 달러 (2025) |

**핵심 차별점**

- "One brain, any body" 슬로건으로 휴머노이드/4족/매니퓰레이터를 가리지 않는 범용 정책을 표방.
- CMU의 self-supervised learning 연구 자산을 기반으로, 인터넷 영상에서 motor skill을 추출하는 접근.
- 하드웨어 OEM과 모두 파트너십을 추진(SoftBank의 Pepper, Boston Dynamics 등 가능성).

**리스크**: Valuation 대비 검증 가능한 상용 deployment는 아직 제한적. 2026년 하반기 첫 enterprise pilot 공개 여부가 분기점.

### 3.3 Figure AI

| 항목        | 내용                                                      |
| --------- | ------------------------------------------------------- |
| 설립        | 2022                                                    |
| 본사        | 서니베일, 미국                                                |
| 창업자       | Brett Adcock (전 Archer Aviation)                        |
| 제품        | Figure 02 휴머노이드, 자체 RFM인 Helix(2024), Helix 02(2026-01) |
| 누적 투자     | 시리즈 B 6.75억 달러, 2025년 후속 라운드                            |
| Valuation | 390억 달러 (2025-09)                                       |

**핵심 차별점**

- 2024년 OpenAI 협력에서 결별 후 자체 RFM Helix 개발로 선회. System 1(저속 모터 제어) + System 2(고속 VLM 추론) 계층형 아키텍처.
- Helix 02(2026-01)는 상체 한정에서 전신 제어로 확장. BMW와의 차체 조립 라인 파일럿이 가장 진전된 상용 사례.
- Microsoft, NVIDIA, Bezos, Intel Capital이 직접 투자.

**리스크**: valuation이 18개월 만에 15배 상승. 실제 매출 가시화 전까지 valuation 정당화 압력이 누적되어 있다.

### 3.4 1X Technologies

| 항목 | 내용 |
|---|---|
| 설립 | 2014 (Halodi Robotics 전신) |
| 본사 | 팔로알토 + 노르웨이 모스(제조) |
| 제품 | NEO 가정용 휴머노이드 ($20,000 사전예약) |
| 누적 투자 | 1.5억 달러 이상 (OpenAI Startup Fund, Tiger Global, Samsung NEXT) |
| Valuation | 100억 달러 이상 타게팅 (2025-09, 10억 달러 라운드 협상) |

**핵심 차별점**

- 가정용 use case에 베팅한 유일한 메이저 휴머노이드 기업. 2026년 사전예약자 대상 배송 예정.
- 자체 RFM 'Redwood'를 개발 중이며, 텐던 구동(tendon drive) 메커니즘으로 인간 안전성에 강점.
- 2025년 12월 가정용 휴머노이드를 공장/물류 환경에도 deploy하는 계약 체결, 가정-산업 양면 활용 가능성 확보.

### 3.5 Apptronik

| 항목    | 내용                                                     |
| ----- | ------------------------------------------------------ |
| 설립    | 2016 (UT Austin Human Centered Robotics Lab 스핀오프)      |
| 본사    | 오스틴, 미국                                                |
| 제품    | Apollo 휴머노이드                                           |
| 파트너   | Google DeepMind (RFM 공동 개발), Mercedes-Benz (생산 라인 파일럿) |
| 누적 투자 | 시리즈 A 3.5억 달러 (2025)                                   |

**핵심 차별점**

- DeepMind와의 정식 공동개발 계약으로 Gemini 기반 RFM을 Apollo에 통합. 빅테크 RFM-하드웨어 결합형 사례.
- Mercedes-Benz 생산 라인에서 부품 운반 태스크 실증.
- NASA Valkyrie 휴머노이드 기술자산 보유.

### 3.6 Covariant (Amazon 흡수, 2024)

- Pieter Abbeel(UC Berkeley) 창업. 2024년 3월 RFM-1을 공개하며 "RFM" 용어를 대중화.
- 2024년 8월 핵심 인력과 RFM 기술이 Amazon으로 흡수. 잔존 법인은 라이선스 사업만 유지.
- 향후 Amazon FC(물류센터)의 무인화에 RFM-1 후속 모델이 적용될 가능성.

### 3.7 Carbon Robotics (사용자가 언급한 'carbon6'와 동일하거나 인접)

| 항목 | 내용 |
|---|---|
| 설립 | 2018 |
| 본사 | 시애틀 |
| 제품 | LaserWeeder G2 (제초 농기계) |
| 대표 모델 | Large Plant Model (1.5억 장 식물 이미지 학습) |

**핵심 차별점**

- 휴머노이드가 아닌 농업 특화 도메인 RFM의 대표 사례. 미국/유럽 100여 농장에서 1.5억 장 식물 이미지를 직접 수집.
- 새로운 잡초 종을 발견하면 iPad 상에서 24시간 → 수 분 내 재학습이 가능한 fine-tuning 워크플로우 제공.
- 일반 휴머노이드보다 ROI 가시화가 빨라(농가 인건비 절감) 매출이 발생하는 RFM 비즈니스 모델로 분류된다.

**주의**: 사용자가 언급한 'carbon6'가 다른 회사일 가능성도 있다(예: 휴머노이드 컴포넌트 회사 Carbon Origins 등). 본 페이퍼에서는 Carbon Robotics가 가장 부합하는 후보로 포함했다.

### 3.8 Tesla Optimus (참고)

- 별도 모델 전용 RFM 발표는 없으나 FSD(Full Self-Driving) 자율주행 스택을 휴머노이드 모터 제어에 전용하는 접근.
- 2025년 사내 시연에서 의류 접기, 보행 안정성 진전. 다만 정식 외부 출시 일정은 미정.
- 가장 큰 차별점은 제조 능력. Optimus를 2026-2027년 연산 1만 대 양산할 경우 학습 데이터 수집 규모에서 우위.

---

## 4. 유럽 RFM 기업

### 4.1 Neura Robotics (독일)

| 항목 | 내용 |
|---|---|
| 설립 | 2019 |
| 본사 | 메칭겐, 독일 |
| 창업자 | David Reger |
| 제품 | 4NE-1 휴머노이드 (3세대, CES 2026 공개), MiPA 가정용, MAiRA 코봇 |
| 컨셉 | 'Cognitive Robotics' 자체 정의 + Neuraverse 오픈 에코시스템 |

**핵심 차별점**

- 유럽 최대 휴머노이드 스타트업. 2026년 CES에서 Porsche가 디자인한 4NE-1 Gen 3와 4NE-1 Mini를 공개.
- Bosch와 전략적 파트너십. 독일 제조업 생태계와의 결합도가 높다.
- 'Neuraverse'는 NVIDIA의 GR00T와 유사한 RFM 오픈 마켓플레이스 전략. 외부 개발자가 스킬을 등록/배포하는 구조.
- 자체 Omnisensor(시각+청각+촉각 융합)로 인간 식별 및 안전성 강조.

### 4.2 Wandelbots (독일)

- no-code 로봇 프로그래밍 플랫폼. 엄밀히는 RFM 회사가 아니나, 다양한 산업 로봇 위에 동일한 정책 인터페이스를 추상화한다는 점에서 RFM 인접 데이터/툴링 레이어.
- 2024년 NVIDIA, Microsoft, 폭스바겐과의 협력 발표.

### 4.3 Pollen Robotics (프랑스, Hugging Face 인수)

- 휴머노이드 Reachy 2 제작. 2024년 Hugging Face가 인수.
- Hugging Face의 LeRobot 오픈소스 RFM 프로젝트(2024-2025)와 결합되어 오픈소스 진영의 표준 하드웨어가 되고 있다.
- 유럽발 'open-source RFM' 진영의 구심점.

---

## 5. 한국 RFM 기업

### 5.1 RLWRLD (리얼월드)

| 항목     | 내용                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------ |
| 설립     | 2024                                                                                                   |
| 본사     | 서울                                                                                                     |
| 창업자    | 류중희 (前 Olaworks, Intel Korea CTO)                                                                      |
| 대표 모델  | RLDX-1 (산업용 dexterity 특화 RFM, 2026 발표)                                                                 |
| 누적 투자  | 4,200만 달러 (Seed 1: 1,480만 달러, Seed 2: 2,600만 달러)                                                       |
| 주요 투자자 | Hashed, Mirae Asset, Global Brain, Headline Asia, LY Z Venture Capital, LG전자, SKT, 아모레퍼시픽, 미쓰이화학, KDDI |

**핵심 차별점**

- 한국 1호 RFM 스타트업. 가정용/휴머노이드가 아니라 **산업 환경의 dexterity(미세 조작)**를 메인 타깃으로 잡았다. 정밀 조립, 와이어 하니스, 후공정 등.
- RLDX-1은 데이터 수집 파이프라인, 학습 아키텍처, 배포 환경까지 통합 시스템으로 패키징된 점이 강조된다. 모델 단독이 아닌 풀스택 솔루션.
- 류중희 대표는 Olaworks를 인텔에 매각한 한국 AI 1세대로, LG/SKT 같은 한국 대기업과 일본 KDDI/미쓰이 같은 산업 파트너를 동시에 확보한 점이 강점.
- 산업 deployment 일정은 2028년 본격화로 가이드.

**Mashup 관점 코멘트**: 국내 RFM 분야에서 가장 명확한 thesis. 다만 valuation/round size가 빠르게 커지고 있어 follow-on이 어려울 수 있다.

### 5.2 Config (컨피그)

| 항목 | 내용 |
|---|---|
| 설립 | 2025-01 |
| 본사 | 서울 + 산호세 |
| 창업자 | 서민준 CEO (前 Meta, TwelveLabs 수석연구원) 외 공동창업자 3인 (Waymo, Google, Naver 출신) |
| 포지션 | 'TSMC of robot data' - 로봇 학습 데이터의 파운드리 |
| 누적 투자 | 3,500만 달러 (시드 2,700만 달러, 2026-05) |
| Valuation | 2억 달러 이상 |
| 주요 투자자 | 삼성벤처투자(리드), 현대 ZER01NE, LG테크놀로지벤처스, SKT America |

**핵심 차별점**

- 로봇 하드웨어/모델을 직접 만들지 않고 **데이터 인프라**에 베팅. TSMC가 모든 팹리스 칩을 위탁생산하듯, RFM 학습/추론 데이터를 모든 로봇 회사에 공급한다는 비유.
- 베트남과 서울에서 100만 시간 규모 데이터 수집 운영을 스케일링 중.
- 2027년까지 enterprise 플랫폼 사업 ARR 1,000만 달러 목표.
- Robot-as-a-Service(RaaS) - 클라우드에서 Config의 파운데이션 모델을 호스팅, 온보드 GPU 없이 호출 가능한 형태로 출시 예정.

**Mashup 관점 코멘트**: 한국 4대 그룹(삼성, 현대, LG, SK)이 한 라운드에 모두 들어온 매우 이례적 케이스. 한국 제조 대기업이 자체 RFM을 만들기보다 Config을 인프라로 활용할 가능성을 시사. 한국발 글로벌 RFM 인프라 회사로 성장 가능성이 높다.

### 5.3 네이버랩스 + Naver D2SF 포트폴리오

- **네이버랩스(Naver Labs)**: ARC(Ambient Robot Cloud) 기반 자율주행/실내 로봇 운용. 1784 사옥의 'Rookie' 배달 로봇이 대표 사례. 자체 RFM 발표는 아직 없으나 시뮬레이터(LAREL) 및 데이터 자산 보유.
- **Naver D2SF**: 2026년 3월 Physical AI 스타트업 Chameleon, Anywhere Robotics에 신규 투자.
- **Clobot(클로봇)**: Naver D2SF 포트폴리오. 국내 로봇 SW 회사 중 KOSDAQ 1호 상장. RFM 자체보다는 운용 SW 레이어.

### 5.4 Holiday Robotics, WIRobotics, ROBROS, AeiRobot

- 정부 'K-Humanoid' 사업과 연계되어 부상한 차세대 한국 휴머노이드/RFM 스타트업 군.
- **WIRobotics(위로보틱스)**: 웨어러블 로봇에서 출발하여 휴머노이드/RFM 영역으로 확장. K-Humanoid 504억 원 사업 주관사 중 하나.
- **Holiday Robotics**: 범용 휴머노이드 플랫폼 지향.
- **ROBROS / AeiRobot**: 초기 단계 RFM 스타트업으로 정보가 제한적이나 시장 등장 모니터링 필요.

### 5.5 현대차그룹 + Boston Dynamics + RAI Institute

- 현대차 그룹이 Boston Dynamics(미국)와 RAI Institute(Robotics & AI Institute, 매사추세츠)를 양대 R&D 거점으로 보유.
- Atlas 휴머노이드 전동 버전을 2024-2025년 공개. Spot 4족 로봇은 이미 글로벌 수십개국 배포.
- CES 2026에서 그룹 차원의 AI Robotics Strategy 발표 예정.
- 그룹사 차원에서는 한국 최대 규모 휴머노이드/RFM 자산. 다만 스타트업 deal 대상은 아님.

### 5.6 정부 'K-Humanoid' 504억 원 사업 (2026-05 출범)

- 한국 정부가 LG전자, WIRobotics 등 민간과 합작하여 504억 원 규모로 출범. 의료/돌봄 분야 휴머노이드 실증이 1차 목표.
- 해외 플랫폼(Optimus, Figure, NEO)에 대한 의존도를 줄이고 국산 휴머노이드 산업 기반을 마련한다는 목표.
- 2026년 5월 기준 출범 단계로, 향후 3-5년간 컨소시엄 deal flow가 발생할 가능성이 있다.

---

## 6. 참고: 아시아 경쟁권 (중국/일본)

본 페이퍼의 주 범위는 미국/유럽/한국이나, 경쟁 구도 이해를 위해 간략 정리한다.

### 6.1 중국

- **Unitree Robotics**: G1, H1 휴머노이드. 가격 경쟁력(G1 1.6만 달러대)으로 글로벌 연구실 표준 하드웨어가 되고 있음. 자체 RFM은 후발.
- **AgiBot(智元机器人)**: 화웨이/상하이 정부 자본. 2025년 100억 위안 valuation 거론.
- **Galbot(银河通用)**: 베이징대 발 RFM 스타트업. 시뮬레이션 기반 학습.
- **XPENG Iron**: 자동차 OEM XPENG의 휴머노이드.
- **Fourier Intelligence**, **LimX Dynamics**, **UBTech**: 휴머노이드 하드웨어 중심.

### 6.2 일본

- **Toyota Research Institute(TRI)**: Diffusion Policy 논문 자체가 TRI 발(2023). 학계 기여 중심.
- **Preferred Networks**: 산업 로봇 + 시뮬레이션 자산.
- **Sakana AI**: 모델 전반에 베팅. RFM 직접 진출은 미관측.

---

## 7. 기술/사업 모델 비교

### 7.1 사업 모델 3분류

| 모델 | 정의 | 대표 기업 | 자본 효율성 | 한국 진입 가능성 |
|---|---|---|---|---|
| 모델 전용형 | RFM 자체에만 집중, 하드웨어는 파트너십 | Physical Intelligence, Skild AI, RLWRLD | 낮음 (compute 의존) | 중 (RLWRLD가 사례) |
| 수직통합형 | 하드웨어 + 모델 양쪽 자체 개발 | Figure AI, 1X, Apptronik, Neura, Tesla | 매우 낮음 (CapEx 큼) | 낮음 (대기업 영역) |
| 데이터 인프라형 | 데이터 수집/라벨링/플랫폼 | Config, Carbon Robotics | 중 (운영 사업 가능) | **높음** |

### 7.2 한국이 강한 포지션

1. **데이터 인프라**: Config의 한국 4대 그룹 동시 투자는 한국 제조 대기업이 자체 데이터 운영보다 인프라 외주를 선호한다는 시그널.
2. **산업 dexterity**: RLWRLD가 자리잡은 영역. 한국 제조업의 정밀 후공정/조립 노하우와 결합 시 deployment 우위.
3. **시뮬레이션-실데이터 브리지**: 한국은 게임 엔진 인재 풀이 풍부. Unity/Unreal 기반 sim 자산화 가능.

### 7.3 한국이 약한 포지션

1. **휴머노이드 하드웨어**: 하드웨어 자체 개발은 보스턴다이내믹스(현대 그룹사)를 제외하면 미국/중국에 비해 5-7년 격차.
2. **VLM 백본**: GPT-4V/Gemini/Claude 급의 멀티모달 LLM이 RFM의 'System 2' 추론을 담당하는 추세인데, 한국은 자체 멀티모달 LLM이 약하다.
3. **GPU 인프라**: 학습용 H100/B200 풀 확보가 미국 대비 제한적.

---

## 8. Mashup Ventures 관점 시사점

### 8.1 Deal Sourcing 우선순위 제안

1. **산업/도메인 특화 RFM application 레이어**: 한국 제조 현장(반도체 후공정, 디스플레이, 배터리)에 fine-tuning된 RFM application. 모델은 Physical Intelligence/Skild/RLWRLD를 leverage하고, 도메인 데이터와 라벨링/배포 노하우로 진입 장벽 구축.
2. **시뮬레이션-실데이터 브리지 툴링**: domain randomization, sim2real adapter, 데이터 합성 툴. 자본 효율 우수.
3. **로봇 텔레오퍼레이션/데이터 수집 인프라**: Config의 한 단계 아래 layer. 한국 로봇 OEM 대상 SaaS 가능.
4. **검증/안전성 레이어**: 휴머노이드/협동로봇 안전 인증, 평가 벤치마크. 글로벌 시장 진입에 필요한 신뢰성 레이어.

### 8.2 회피하거나 신중해야 할 영역

- 휴머노이드 하드웨어 자체 개발: 자본 요구량이 한국 VC 라운드 사이즈로 감당 어려움.
- 범용 RFM 모델 자체: RLWRLD 이후 진입자가 동일 thesis로 한국 LP 자본을 확보하기 어려워졌음.
- 클라우드 GPU 의존도가 높은 추론 인프라: 미국 빅테크 직접 경쟁 영역.

### 8.3 관찰 지표 (2026-2027)

- Figure AI / 1X / NEO의 실제 매출 가시화 여부
- π0.7 후속 모델의 zero-shot generalization 한계
- 한국 K-Humanoid 504억 원 사업의 컨소시엄 deal flow
- Config의 RaaS 출시 및 한국 대기업 도입 사례
- RLWRLD RLDX-1의 실제 산업 deployment(2026 하반기 추정)

---

## 9. 결론

RFM 시장은 2024년 Covariant RFM-1 발표 이후 2년 만에 미국 자본 집중형으로 재편되었다. Figure AI 390억 달러, Skild AI 140억 달러 같은 valuation은 LLM 초기(2021-2022 OpenAI valuation)와 유사한 곡선을 그린다. 한국은 RLWRLD가 모델 영역에서, Config이 데이터 인프라 영역에서 자리를 잡았으며, 양쪽 모두 한국 4대 그룹(삼성/현대/LG/SK)의 전략 투자를 동시 확보한 점이 이례적이다.

Mashup Ventures 입장에서는 (a) 한국 산업 데이터 자산이 곧 진입 장벽이 되는 application 레이어, (b) 자본 효율이 높은 데이터/툴링 인프라, (c) K-Humanoid 사업 연계 컨소시엄에 우선 집중하는 전략이 합리적이다. 범용 RFM 자체 개발은 한국 VC 단독 라운드로 감당 어려운 영역으로 분류한다.

---

## 부록 A. 주요 출처

- TechCrunch, "Korea's biggest manufacturers back Config, the TSMC of robot data" (2026-05-11)
- TechCrunch, "RLWRLD raises $14.8M to build a foundation model for robotics" (2025-04-14)
- GlobeNewswire, "RLWRLD Raises $26M Seed 2" (2026-02-26)
- The Robot Report, "Physical Intelligence raises $400M for foundation models for robotics"
- Seoul Economic Daily, "Korea Launches 50.4 Billion Won Push to Develop Homegrown AI Humanoid Robots" (2026-05-18)
- The Robot Report, "AW 2026 features Korea humanoid debuts as industry seeks digital transformation"
- Humanoids Daily, "NEURA Robotics Unleashes Next-Gen Humanoids and Cognitive Ecosystem at Automatica 2025"
- Sifted, "OpenAI-backed startup aims to deliver in-home humanoid robots in 2026"
- KraneShares, "Humanoid Robotics In 2026: The Race From Pilot To Platform"
- Pebblous Report, "Physical AI Industry Landscape"
- IEEE T-RO Special Issue on Foundation Models for Robotics

## 부록 B. 추가 확인 필요 사항

- 사용자 언급 'carbon6'는 Carbon Robotics(농업 RFM)로 추정하여 포함했다. 다른 기업(예: 휴머노이드 부품 회사)을 지칭한 것이라면 확인 후 추가 작성 필요.
- ROBROS, AeiRobot 등 한국 초기 단계 기업은 공개 정보가 제한적이므로 별도 deal review가 필요하다.
- 2026년 하반기 Figure 03, Optimus V3, NEO 가정용 출하 시기에 시장 재편 가능성이 높아 분기별 업데이트 권고.
