# NVIDIA GTC 2025: It's Not About the Chips Anymore

**f00tnotes** | Week 12, 2026
**Category:** Semiconductors / AI Infrastructure

---

NVIDIA's annual GPU Technology Conference has always been a product showcase. This year, it was something else — a declaration of structural dominance. Here's what mattered.

---

## 1. A $1 Trillion Pipeline

Jensen Huang put a number on NVIDIA's ambition: **$1 trillion** in combined order pipeline through 2027, covering both Blackwell (the current-gen GPU) and Rubin (its successor). That's double what was projected at GTC 2025.

For context, hyperscalers — AWS, Azure, Google, Oracle — are expected to collectively spend **$600 billion** on capital expenditure in 2026 alone. NVIDIA is essentially saying it intends to capture a disproportionate share of that spend.

---

## 2. Vera Rubin: This Is Not Just a Better Chip

**Vera Rubin**, NVIDIA's next-generation AI supercomputing platform, is already deploying on Azure and rolling out across AWS, Google, and Oracle.

The headline specs are impressive on their own:

- First platform to use **HBM4** (6th-gen high-bandwidth memory)
- Up to **10x better inference throughput** per watt
- **10x lower cost** per token

But the more important story is the **Vera CPU**.

Compared to the Grace CPU (Blackwell generation), Vera delivers **2x performance per watt** — and will ship as a standalone 256-CPU rack. Why does this matter?

Agentic AI workloads — orchestration, scheduling, memory management — don't parallelize well. They're sequential by nature, which is where CPUs excel. We're moving toward a world where the **CPU-to-GPU ratio approaches 1:1**, and NVIDIA is quietly positioning itself to compete head-to-head with AMD and Intel in the CPU market.

---

## 3. The LPU: Completing the Stack

**Groq 3 LPU** — a decode-specialized processor with 500MB SRAM and 150TB/s bandwidth — ships in Q3. Samsung is manufacturing it (confirmed at GTC).

To understand why this matters, consider how AI inference actually works:

| Stage | What it does | Best hardware |
|-------|-------------|---------------|
| Training | Model learning | GPU |
| Prefill | Reading the prompt | GPU |
| Decode | Generating tokens | LPU |

Custom chips from Google (TPUs) and Amazon (Trainium/Inferentia) are optimized for one of these stages. None cover all three coherently.

NVIDIA now does: **Rubin GPU handles training and prefill. The LPU handles decode. Both run on the same software stack.** No competitor has this today.

---

## 4. Replicating the CUDA Playbook: NemoClaw

Jensen's thesis: "Just as Linux and HTML were non-negotiable infrastructure layers in the internet era, every company now needs an AI agent system strategy."

**NemoClaw** is NVIDIA's answer — an enterprise AI agent platform that lets companies deploy multi-step AI agents without being locked into any single cloud vendor or model provider.

NVIDIA's data center market share will likely compress over time. That's expected. But the moat isn't the hardware — it's the **software ecosystem**:

**CUDA → NemoClaw → Dynamo (inference orchestration)**

This stack took a decade to build. It can't be replicated by throwing capital at chip fabs.

---

## 5. What's Next

**Feynman Architecture (2028)**
- 1.6nm process node
- Next-gen GPU, LPU, and CPU
- The post-Rubin generation, officially roadmapped

**Kyber**
- Vertical rack architecture: **144 GPUs per rack** (vs. horizontal layouts today)
- Applied to Vera Rubin Ultra
- Ships H2 2027
- Higher density, lower latency — a physical-layer innovation

---

## The Takeaway

Chips can be replicated with enough capital and time. Software ecosystems can't.

NVIDIA's structural advantage isn't measured in benchmark scores or market share percentages. It's measured in the depth of a platform that millions of developers, researchers, and enterprises have built on top of — and have no credible path to migrate away from.

The competition is building better hammers. NVIDIA is building the construction industry.

---

*Source: Capital EDGE*
*Compiled by f00tnotes*
