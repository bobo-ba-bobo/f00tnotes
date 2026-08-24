# SaaS in the AI Era: What Changes and What Does Not

Author: Bosung Baik (Mashup Ventures)
Date: 2026-08-04
Prerequisite doc: `saas-textbook.md` (the history and structure of the SaaS original form)
Purpose: A judgment framework for early-stage deals

> This document contains predictions. So Part 5 explicitly separates **observed facts** from **claims that are still only narrative**. Preserve that distinction when citing it.

---

## One-Sentence Summary

AI does not substantially change SaaS **distribution** (what you sell and how), but it does change the **cost structure, the billing unit, and the definition of TAM**. So "AI kills SaaS" is a false proposition, and "AI rewrites the margin profile and metric language of SaaS" is the correct one.

---

## Table of Contents

- Part 1. Five Axes of Structural Change
- Part 2. Rewriting the Metric Language
- Part 3. Pricing Model Migration Map
- Part 4. Winners and Losers
- Part 5. Observed Fact vs Narrative
- Part 6. Early-Stage Judgment Framework
- Part 7. Counter-Scenarios
- Part 8. What to Verify Over the Next 12-24 Months

---

# Part 1. Five Axes of Structural Change

## Axis 1. Cost Structure: The End of the 90% Margin

Traditional SaaS gross margin was 75-85%, approaching 90% at the best companies, because the marginal cost of adding one customer was essentially zero.

AI products are different. Every request a user sends incurs inference cost. When usage rises, cost rises proportionally.

| Item | Traditional SaaS | AI-native product |
| --- | --- | --- |
| Gross margin | 75-90% | 40-70% (a wide observed range) |
| Marginal cost | Near zero | Proportional to usage |
| Heavy users | Profit source (flat seat fee) | Loss source (cost only rises) |
| Free tier | A distribution expense | Actual cash outflow |
| Economies of scale | Strong | Weak. Depends instead on model price cuts |

**Two forces pull in opposite directions.**

- Downward pressure: usage keeps growing and more products spend reasoning tokens, raising cost per request
- Upward improvement: at constant capability, token prices have fallen steeply and continuously. Caching, batching, routing to smaller models, and quantization also allow self-driven optimization

**Early-stage judgment point**: a currently low margin is not itself the problem. The problem is **whether margin improvement comes from the company's own engineering or from waiting on the model vendor's price cuts.** If it is the latter, every competitor gets the same improvement. That is not a moat.

Related study topic: `../topics.md` #1 (inference economics)

## Axis 2. The Billing Unit: The Logical Collapse of the Seat

Seat pricing assumes that the number of people using the software is proportional to value delivered. When an agent performs the work instead of a person, that assumption inverts. **The more successful the product, the fewer seats and the less revenue.**

Three responses are observable.

| Response | Method | Problem |
| --- | --- | --- |
| Hybrid | Base subscription plus usage overage | Customers cannot forecast cost, so they hesitate to adopt |
| Credit | Wraps usage in an abstract unit | Dissatisfaction when credits run out. Used as a covert price increase, which erodes trust |
| Outcome | Per resolution or per closed item | Hard to agree on measurement, and if it fails only the cost remains |
| Agent SKU | "AI employee" flat monthly fee | Repackaged seat pricing. Puts itself in direct comparison with a human salary |

**An important observation**: seat pricing is logically broken but still alive in practice. The reason is procurement. Corporate buyers want a predictable fixed fee and budget annually. An unpredictable usage invoice struggles to pass procurement at all. **So the transition is running far slower than the logic suggests.**

This is directly usable in diligence. When a company says "we price on outcomes, so alignment is perfect," ask: how many customers actually signed on those terms, and how many measurement disputes have you had.

## Axis 3. Redefining TAM: From Software Budget to Labor Budget

Traditional SaaS TAM was the IT software budget. Services-as-software targets **payroll and outsourcing budgets**. The market does not grow by a single-digit multiple but by tens of times.

| | Traditional SaaS | Services-as-software |
| --- | --- | --- |
| Budget source | IT / SaaS budget | Payroll, outsourcing, BPO budget |
| Compared against | Competing software | Human hourly rates, outsourcing rates |
| Price ceiling | Competitor pricing | A fraction of the labor cost displaced |
| TAM | Small but well-defined | Large but slow to penetrate |
| Real competitor | Other SaaS | Consultancies, BPOs, law firms, accounting firms |

**Two traps.**

1. **TAM self-deception.** "US legal payroll is $X trillion, and even 1% of that..." is not an argument. What actually has to be broken open is not a budget but an **accountability structure**. If nobody has determined who is responsible when the output is wrong, the payroll budget does not open.
2. **You inherit the margin profile of a services business.** To displace labor, a human still has to do the last 20% (review, exception handling, customer communication), and that persists as an FDE team or an operations team. The financials start to resemble a services business rather than SaaS. **That is why you have to read revenue per employee alongside gross margin.**

## Axis 4. The Migration of the Moat

What AI commoditized and what it made scarce split cleanly.

| Commoditized (not a moat) | Newly scarce (a moat) |
| --- | --- |
| Model capability itself | Proprietary data access |
| UI/UX polish | Legacy system integration (EMR, ERP, bank core) |
| Feature velocity | Regulatory approval, security certification, audit readiness |
| Prompt engineering | Distribution channels and existing customer relationships |
| Generic workflows | Permission to actually take action |
| The code itself | An in-house eval set and domain ground-truth data |

**"Features get replicated within six months"** is the rule of this period. The cost of producing software has fallen, so the product itself is not a defensive line. The defensive line sits outside the product.

The question that tests this at seed: **what does this company hold that cannot be bought with capital and time?** If the answer is "our team moves fast," there is no moat.

## Axis 5. Organization and Capital Structure

- **Small teams, large revenue.** Cases of 10-20 people generating tens of millions in ARR are being reported. Revenue per employee has become a new quality metric
- **FDE (Forward Deployed Engineer).** Engineers embed with customers and perform integration and customization directly. The Palantir model spread to AI startups. Its scalability is debated, but early on it is often the only way to break through adoption friction
- **Polarized capital requirements.** The application layer reaches revenue on less capital than before, while the model and infrastructure layers demand capital that has no historical comparison. Seed VC's place is the former
- **Distorted revenue velocity.** Time from $0 to meaningful ARR is the shortest in history. Yet the durability of that revenue is unverified. **Not mistaking speed for quality is the core discipline of seed diligence in 2026**

---

# Part 2. Rewriting the Metric Language

## 2.1 New Things to Measure

| Metric | Why it is needed | Baseline |
| --- | --- | --- |
| AI COGS, broken out | Mixing inference cost into general infrastructure hides the margin trend | Track as % of revenue, quarterly |
| Gross margin trajectory | Direction matters more than level. Does it improve with scale | Improving every quarter |
| Cost per unit of value | Cost to resolve one ticket, process one document | Must trend down |
| Revenue per employee | Verifies whether the small-team structure is real | $300K+ is notable |
| ARR quality decomposition | Experimental-budget revenue vs settled-budget revenue | Pilot share under 30% |
| Deflection / automation rate | Share completed with no human intervention | The improvement trend is what matters |
| Human-in-the-loop cost | Review and exception-handling labor | Must grow slower than revenue |

## 2.2 Metrics Whose Meaning Changed

| Metric | Traditional reading | AI-era reading |
| --- | --- | --- |
| ARR | Effectively locked-in revenue | With a large usage-priced component, closer to a forecast |
| NDR | Evidence of expansion | May just be usage growth, which also means cost growth |
| GRR | Churn indicator | Under structural pressure as seat contraction compounds |
| Gross margin | A near-fixed constant | The key variable. The line item to press hardest in diligence |
| Rule of 40 | Composite health metric | Not comparable across companies with different cost structures. Demoted to a reference figure |
| CAC payback | Payback period on gross profit | Gross profit is variable, so the payback period is variable too |

## 2.3 Translated into Diligence Questions

- Show me the trend in inference cost as a share of revenue over the last six months
- Is contribution margin positive for the heaviest 10% of customers
- How much has the human-intervention rate fallen over the last six months
- What share of revenue is pilots and PoCs, and what is the pilot-to-annual-contract conversion rate

---

# Part 3. Pricing Model Migration Map

| Existing model | Pressure from AI | Observed direction of travel | Examples |
| --- | --- | --- | --- |
| Per-seat | Fewer people = less revenue | Seat plus AI add-on, or restructured into platform tiers | Microsoft Copilot (seat add-on), Salesforce mixing seats and conversations |
| Freemium | Free users generate cost | Usage caps on the free tier, or a shrunken free tier | Most AI products keep free only in limited form |
| Tiered | Tier differences redefined by usage | Tier = credit allowance | Credit tiers at Cursor, Lovable, and similar |
| Usage-based | Already favorable | Spreading | AI infrastructure broadly |
| Take rate | If agents transact on the buyer's behalf, the gateway moves | Supporting agent payment protocols becomes a survival condition | Shopify's agentic commerce response |
| Outcome | Becomes feasible for the first time | Early adoption in measurable categories | Intercom Fin (per resolution), Sierra |
| New: Agent SKU | Compared directly against salary | "One AI worker, $X per month" | Enterprise agent product lines |

**Practical rules for choosing a pricing model (when advising an early company)**

1. Can the outcome be **counted without dispute by both parties**? If not, outcome pricing only manufactures conflict
2. **Which budget line** does the customer pay from? IT budget favors fixed fees; operations or payroll budget makes per-unit pricing easier to pass
3. If cost scales with usage, **price must be linked to usage**. Flat fee with unlimited usage is the worst combination
4. Credits are useful for hiding cost structure, but they are **a loan against trust**. Repeated run-out experiences drive churn

---

# Part 4. Winners and Losers

## 4.1 Structurally Disadvantaged Positions

| Type | Why it is disadvantaged |
| --- | --- |
| Seat-based simple workflow tools | An obvious replacement target with no proprietary data |
| BPO / outsourcing that bills on headcount | Directly exposed to price destruction |
| Thin layer (UI on top of a model API) | Absorbed as a default feature by the model vendor |
| Businesses dependent on SEO / content traffic | Traffic structure itself is collapsing under AI search |
| Data-entry and transcription-centric software | The easiest work to automate |
| Late-stage point solutions | Hit by stack consolidation and AI absorption at once |

## 4.2 Structurally Advantaged Positions

| Type | Why it is advantaged |
| --- | --- |
| System of record | Holds the data, so it can attach AI features better than anyone |
| Regulated-industry vertical | Regulatory coverage is a barrier AI cannot replicate |
| Proprietary data holders | As models commoditize, data becomes the scarce asset |
| Execution / integration layer | Owns **action**, not judgment. Legacy integration is still hard |
| AI infrastructure and tooling | Demand arises regardless of which applications win |
| Trust, security, and audit layer | Demand grows as adoption grows |

## 4.3 The Incumbent SaaS Counterattack

This is the part early-stage VCs most often underweight. Incumbent SaaS already holds three things.

1. **Distribution.** They are already inside the customer and the procurement contract is already signed. A new startup burns 12-18 months here
2. **Data.** The raw material for AI features already sits in their database
3. **Bundling.** They can put AI features into existing plans without booking separate revenue, driving the standalone price of a startup's product to zero

**Therefore the seed diligence question**: what happens to this company if the incumbent offers this capability free as part of a bundle? If there is no answer, it is a feature, not a company.

---

# Part 5. Observed Fact vs Narrative

Drawing the line honestly. As of August 2026.

## 5.1 Substantially Supported by Evidence

- AI products carry lower gross margins than traditional SaaS. Repeatedly confirmed in disclosures and founder interviews
- Inference cost per unit of capability has fallen continuously
- Hybrid pricing (subscription plus usage) has become the default for AI startups
- Coding and customer support are verified categories where revenue actually materializes
- Time from zero to initial scale is the fastest in history
- Declining search traffic is doing real damage to content-dependent businesses

## 5.2 Still Closer to Narrative

- **Outcome pricing becomes the standard.** Cases are increasing but remain a minority. Most contracts are still fixed or hybrid
- **AI replaces SaaS.** Evidence of actual revenue decline at major public SaaS companies remains weak. Slowing growth and replacement are not the same thing
- **Payroll budgets shift to software.** The direction is right, but there is no evidence on the pace. Accountability and procurement habits are the bottleneck
- **The one-person unicorn.** High salience, extremely small sample
- **AI startup ARR is equivalent in quality to traditional SaaS ARR.** Churn data has not matured. You cannot know until the first renewal cycle passes
- **Agentic commerce reshapes distribution.** Protocol competition is ongoing and actual transaction volume is still negligible

**Discipline**: do not use items from 5.2 as evidence in an IC memo. State them as hypotheses and write the downside if the hypothesis proves wrong.

---

# Part 6. Early-Stage Judgment Framework

## 6.1 Ten Questions

1. **Cost**: what is inference cost as a share of revenue, and what is the six-month trend
2. **Source of margin improvement**: is it in-house optimization or waiting on model price cuts
3. **Pricing coherence**: is there any segment where cost scales with usage but price is flat
4. **Revenue quality**: pilot share, and pilot-to-annual-contract conversion rate
5. **Automation rate**: share completed without human intervention, and its improvement trend
6. **Accountability**: who is responsible when the output is wrong, and how is that written in the contract
7. **Moat**: what asset cannot be bought with capital and time
8. **Bundling risk**: what happens if an incumbent gives this away in a bundle
9. **Model dependency**: how many days to switch base models, and does the license permit this pricing model
10. **Evaluation**: is there an in-house eval set, and can performance improvement be shown numerically

## 6.2 Signals You Can Read at Seed

With no metrics available, read these instead.

| Good signal | Bad signal |
| --- | --- |
| The customer pays from a budget previously spent on people or outsourcing | The customer pays from an innovation or experimental budget |
| The founder answers their token unit cost immediately | The cost question is answered with "AWS credits cover it" |
| There is an in-house eval set and a failure log | There is only a demo, and no failure cases can be described |
| Domain access exists (data, certifications, relationships) | Team execution speed is the only differentiator |
| There is a declining curve in human-intervention rate | Operations headcount grows at the same rate as revenue |
| Some customers have passed a first renewal | Every customer was signed within the last three months |

## 6.3 On Valuation

Seed valuations with an AI label are forming above traditional SaaS seed levels. Two things actually matter here.

- **Back out what has to be proven at the next round** for this valuation to be justified. Growth is faster, but so are the expectations set for the next round
- **Pre-compute the downside valuation** if the margin profile does not improve. A 50% gross margin company and an 85% gross margin company get different multiples on identical ARR. This difference is the one most frequently ignored in the AI era

---

# Part 7. Counter-Scenarios

For intellectual honesty, here are the opposing arguments. **If these scenarios play out, half of the above is void.**

## 7.1 Inference Cost Becomes Irrelevant
If token prices keep falling, in five years AI COGS becomes a negligible line item like server hosting is today. Margins return to 85% and the pricing model debate disappears. Today's outcome pricing experiments will be recorded as a transitional artifact.

**Valid judgment under this scenario**: do not over-penalize low-margin companies today. Focus on growth and retention instead.

## 7.2 Procurement Habits Do Not Change
Corporate buyers want predictable fixed fees and accounting runs on annual cycles. SaaS procurement conventions took 20 years to build and will not change in three. In that case seat and fixed pricing continue to dominate and AI is absorbed as a feature inside them.

**Valid judgment under this scenario**: incumbents with distribution are the biggest winners. New entrants only succeed in verticals and regulated domains.

## 7.3 The Trust Bottleneck Does Not Clear
If agents make mistakes and accountability is never resolved, payroll budgets never open. The TAM argument for services-as-software collapses and AI stays a copilot.

**Valid judgment under this scenario**: investing in the audit, permissions, and security layer is safer than investing in applications.

## 7.4 In Conclusion
The highest-probability outcome is that all three scenarios partially materialize. So the practical stance is this.

> **Monitor margin and pricing, but do not make declarations about them.** Instead, select deals on the basis of assets that hold their value under any scenario: proprietary data access, integration difficulty, distribution, and accountability structure.

---

# Part 8. What to Verify Over the Next 12-24 Months

These are the indicators to check when updating this document.

| Item to check | Where to find it | What it tells you |
| --- | --- | --- |
| Public SaaS disclosure of seat vs usage revenue mix | 10-Q, earnings calls | The real pace of the pricing transition |
| Gross margin trend at AI-native companies | Disclosures from companies that file an S-1 | Whether margin improves or gets stuck |
| Number of outcome-pricing adoptions | Vendor pricing pages, case studies | Experiment or standardization |
| First-renewal retention data at AI startups | Benchmark reports | The substance of ARR quality |
| Correlation between public SaaS growth and AI exposure | Clouded Judgement, Meritech | Whether the replacement narrative holds |
| Inference price index | Artificial Analysis, Epoch AI | The direction of Axis 1 |
| Agent payment protocol transaction volume | Payment company disclosures | The pace of commerce restructuring |
| Outcomes of Korean AI legislation now in force | Government notices | Domestic compliance demand |

## Update Rules
- Reclassify Part 5 (fact vs narrative) every quarter. When a narrative becomes fact, move the item
- When a narrative is falsified, do not delete it. Keep it with the disconfirming evidence. A record of wrong predictions is an asset for the next judgment

---

## Related Documents

- `saas-textbook.md`: the history, models, and metrics of the SaaS original form
- `../topics.md`: the ten study topics (#1 inference economics, #5 agent stack, #6 SaaS business models connect directly to this doc)
- `../agent layers/agentlayers.md`: the technical layers of an agent
