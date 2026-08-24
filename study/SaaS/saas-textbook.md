# The SaaS Textbook: History, Business Models, and Representative Companies

Author: Bosung Baik (Mashup Ventures)
Date: 2026-08-04
Purpose: Personal reference document for study
Companion doc: `saas-ai-era.md` (how AI rewrites this structure)

> Note on numbers: founding years and financial figures here are study-grade reference values. Cross-check against primary sources (S-1, 10-K, official announcements) before citing them in an IM or IC memo. Korean company founding years and funding figures in particular need verification.

---

## Table of Contents

- Part 0. Why Study SaaS
- Part 1. The History of SaaS (1960-2026)
- Part 2. Anatomy of the Business Model
- Part 3. Metrics Dictionary
- Part 4. Company Catalog
- Part 5. Early-Stage Diligence Checklist
- Part 6. Primary Sources

---

# Part 0. Why Study SaaS

SaaS is the name of a distribution method - selling software as a subscription. But what matters to a VC is the **financial structure** that method created.

Three things are core.

1. **Spend now, recover later.** You pay customer acquisition cost today and recover revenue over 24-36 months. So a growing SaaS company structurally runs out of cash, and that loss is not a bad loss. Making this distinction is where SaaS diligence begins.
2. **High marginal margin.** The incremental cost of serving one more customer is near zero (80-90% gross margin). So profitability explodes with scale.
3. **Revenue recurrence.** This year's revenue becomes the floor for next year's. Predictability itself is the valuation premium.

**Of these three, number 2 is what AI is shaking.** That is the subject of the companion doc. So this document is the work of understanding the original form precisely, in order to know exactly what is being destabilized.

---

# Part 1. The History of SaaS

## 1.0 Prehistory: Before SaaS (1960-1998)

| Period | Model | Description |
| --- | --- | --- |
| 1960s-70s | Time-sharing | Renting mainframe access by the hour. Conceptually the first "computing as a service" |
| 1980s-90s | Perpetual license | Sell a permanent license plus 18-22% annual maintenance. The Oracle, SAP, Microsoft model |
| Late 1990s | ASP (Application Service Provider) | Host existing packaged software and operate it on the customer's behalf. No multi-tenancy, so each customer got a separate instance. Costs never came down, and most ASPs failed |

**The failure of the ASP model is what defined SaaS.** It is not simply hosting. It requires **multi-tenancy**: a single codebase and infrastructure shared across all customers. Only then do unit costs fall. That is the technical essence of SaaS.

## 1.1 Genesis (1999-2005): "No Software"

**Enabling conditions**: browser adoption, broadband, and falling development cost from the LAMP stack.

| Year | Company | Significance |
| --- | --- | --- |
| 1993 | Concur | Expense management. Early business app moving to the web |
| 1996 | WebEx | Web conferencing. Prototype of subscription communications |
| 1998 | NetSuite | Cloud ERP. Larry Ellison was an early backer |
| 1999 | **Salesforce** | The company that created the category. Framed on-premise as the enemy with its "No Software" campaign |
| 2001 | Guidewire | Insurance core systems. Early vertical case |
| 2002 | Atlassian | Grew self-serve with no sales organization. The prototype of PLG |
| 2003 | ServiceNow | ITSM, later expanded into an enterprise workflow platform |
| 2005 | Workday | HR and finance. The second wave of enterprise cloud after Salesforce |

**The core narrative of this era** was the fight to convince CIOs that you could use software without owning it. The objections were "security" and "customization." Twenty years later, the exact same objections recur in AI adoption.

## 1.2 Diffusion (2006-2012): The Collapse of Startup Cost

**Enabling condition**: AWS launched S3 and EC2 in 2006. Server capex turned into usage-based opex, and the capital needed to start a SaaS company fell by orders of magnitude. The modern concept of a seed round was standardized in this period.

| Year | Company | Significance |
| --- | --- | --- |
| 2006 | AWS, HubSpot, Shopify | Infrastructure commoditized / inbound marketing / commerce platform |
| 2007 | Zendesk, Veeva, Dropbox, MongoDB (10gen) | CS SaaS / first large vertical / consumer-entry B2B / open core |
| 2008 | Twilio | Selling an API as a product. The prototype of usage-based pricing |
| 2009 | Cloudflare | Infrastructure SaaS |
| 2010 | Stripe, Datadog | Payments API / infrastructure monitoring |
| 2011 | Zoom, Toast, nCino | Video / restaurant vertical / banking vertical |
| 2012 | Snowflake, Figma, Airtable, Monday, HashiCorp, Elastic | Data warehouse / collaborative design / no-code / work OS / infra tooling |

**This is the era when the quantitative language of SaaS was invented.**

- David Skok's `SaaS Metrics 2.0` (around 2012): codified CAC, LTV, and the cash flow trough
- Scale Venture Partners' **Magic Number**: how much new ARR each dollar of sales and marketing generates
- Bessemer's `State of the Cloud`: the de facto annual industry textbook

## 1.3 Maturation (2013-2021): PLG and Liquidity

**Three currents ran simultaneously.**

### (1) PLG (Product-Led Growth)
The product, not the sales team, brings in customers. The core machinery is self-serve credit card checkout, a free tier, and viral spread inside a team. Slack (2013), Zoom, Figma, Notion, Canva, Airtable, and Linear are the representative cohort. "Bottom-up penetration followed by enterprise upsell" became the standard playbook.

### (2) Vertical SaaS
Instead of going horizontal (functions common to all industries), go deep on a single industry. Veeva (pharma), Toast (restaurants), Procore (construction), ServiceTitan (field services), Samsara (fleet), nCino (banking), Mindbody (fitness). TAM is smaller but competition is thinner and churn is lower. The biggest discovery of this era was that **you can attach payments and financial services to multiply revenue per customer.**

### (3) Usage-based pricing
Charge on consumption rather than seats. Snowflake (compute), Twilio (messages), Datadog (hosts), MongoDB Atlas. When customers grow, revenue grows automatically, making NDR of 130-160% possible.

### And liquidity
In the zero-rate environment of 2020-2021, public SaaS valuations went to an extreme. Median public EV/ARR ran 15-20x, top performers exceeded 40x, and Snowflake traded up toward roughly 100x shortly after IPO. "Growth at all costs" became the norm.

## 1.4 Correction (2022-2023): The SaaSacre

Rate hikes collapsed valuation multiples. Median public SaaS fell to roughly 5-7x EV/ARR, a 70-80% decline from the peak.

**Where the norms flipped.**

| Before (2021) | After (2023) |
| --- | --- |
| 40%+ growth excuses any loss | Rule of 40 (growth rate + operating margin >= 40) |
| Headcount growth as a success metric | Revenue per employee |
| Burn is evidence of growth | Burn multiple (net burn / net new ARR) |
| Seat expansion = expansion revenue | Seat contraction actually happened |

At the same time a structural phenomenon surfaced. Companies ran SaaS sprawl audits and cut redundant tools, which confirmed the pattern that **point solutions get cut and suites survive**. That logic fed the post-2024 "compound startup" discourse (launching multiple products from the start).

## 1.5 AI Incursion (2023-2026)

The period after ChatGPT in late 2022. It breaks into three stages.

| Stage | Timing | Characteristics |
| --- | --- | --- |
| 1. Feature | 2023 | Existing SaaS bolts on "AI features." Notion AI, Microsoft Copilot. Mostly add-on pricing |
| 2. Copilot | 2024 | Assists human work. Still compatible with seat-based pricing |
| 3. Agent | 2025-2026 | Performs the work itself. Seat pricing logically breaks and outcome pricing experiments begin |

From here the story continues in `saas-ai-era.md`.

## 1.6 Era Summary

| Era | Years | Trigger | Dominant model | Representative companies |
| --- | --- | --- | --- | --- |
| Prehistory | -1998 | none | Perpetual license, ASP | Oracle, SAP |
| Genesis | 1999-2005 | Browser, broadband | Seat subscription + field sales | Salesforce, NetSuite |
| Diffusion | 2006-2012 | AWS | Seat subscription + inside sales | Zendesk, HubSpot, Twilio |
| Maturation | 2013-2021 | Mobile, zero rates | PLG, vertical, usage-based | Slack, Snowflake, Toast |
| Correction | 2022-2023 | Rate hikes | Efficient growth, suite consolidation | Industry-wide |
| AI incursion | 2023-2026 | Foundation models | Hybrid, outcome pricing experiments | Sierra, Cursor, Harvey |

---

# Part 2. Anatomy of the Business Model

A SaaS business model is a combination of four independent axes. When evaluating a deal, ask about each one separately.

```
Axis 1. Pricing model  = what unit you charge on
Axis 2. GTM model      = how you acquire customers
Axis 3. Market axis    = who you sell to (horizontal/vertical, size)
Axis 4. Product scope  = one thing deeply (point) vs bundled (suite/platform)
```

## 2.1 Axis 1: Eight Pricing Models

### (1) Per-seat
A flat monthly fee per user. The SaaS default.

- Pros: easy for customers to understand, easy to forecast. Expands automatically as the customer's headcount grows
- Cons: usage and value are decoupled. Creates an incentive to share or hide seats
- Representative: Salesforce, Slack, Zoom, Notion, Figma
- **The AI-era problem**: if software replaces human work, seats shrink and revenue shrinks

### (2) Tiered
Packages like Starter / Pro / Enterprise. Usually combined with per-seat rates.

- The core craft is **feature gating**: which features sit in which tier *is* the real pricing policy
- The usual gate that pushes customers up a tier is SSO, audit logs, permissions, and SLAs. In other words, the upgrade driver is security and governance, not features
- Representative: nearly every SaaS company

### (3) Freemium
A permanently free tier with some conversion to paid. Must be distinguished from a free trial.

- Preconditions: marginal serving cost must be near zero, and free users must function as a distribution channel (invites, sharing, public links)
- Conversion benchmark: 2-5% is typical for self-serve, above 10% is excellent
- Representative: Dropbox, Figma, Canva, Notion, Slack
- **The AI-era problem**: free users generate inference cost. The premise of freemium breaks

### (4) Usage-based / Consumption
Charge per unit consumed: API calls, storage, compute time, message volume.

- Pros: value and price align. Customer growth becomes revenue growth (NDR of 130%+ is achievable)
- Cons: revenue is hard to forecast and drops immediately in a downturn. Snowflake and Twilio experienced this downside exposure in 2022-2023
- Representative: Snowflake, Twilio, AWS, Datadog, Cloudflare

### (5) Hybrid (platform fee + usage)
A base subscription sets a floor, with overages charged on usage. Currently the most common compromise and the default choice for AI companies.

- Representative: Twilio Flex, HubSpot, most AI startups

### (6) Per-transaction / Take rate
A percentage of transaction volume. Works when software is bundled with payment infrastructure.

- The power of this model: most of Toast's or Shopify's revenue comes from **payment processing**, not software subscriptions. Distribute the software cheaply or free and recover on transactions
- Cons: low gross margin (because of payment cost of goods). Revenue scale is large but earnings quality differs
- Representative: Shopify, Toast, Block/Square, Mindbody

### (7) Outcome-based
Charge per resolved ticket, booked meeting, or processed claim.

- Precondition: the outcome must be **measurable in a way both sides accept**. In most deals this is the blocker
- Risk: no outcome means no revenue, but the cost has already been incurred
- Representative: Intercom Fin (per resolution), Sierra, some sales agent products
- Detailed discussion in the companion doc

### (8) Platform / Marketplace
Build a third-party ecosystem on top of your product and take a fee. A late-stage model, and early startups that imitate it generally fail.

- Representative: Salesforce AppExchange, Shopify App Store, Atlassian Marketplace

### Pricing Model Comparison

| Model | Predictability | Expansion (NDR) | Value alignment | Gross margin | Early-stage fit |
| --- | --- | --- | --- | --- | --- |
| Per-seat | High | Medium | Low | Very high | High |
| Tiered | High | Medium | Medium | Very high | High |
| Freemium | Low | Medium | Medium | High | Only with a distribution loop |
| Usage | Low | High | High | Medium-high | Good for infra products |
| Hybrid | Medium | High | High | Medium-high | AI default |
| Take rate | Medium | High | High | Low | Only if you own the transaction |
| Outcome | Low | High | Very high | Variable | Only if measurable |
| Platform | High | High | Medium | High | Poor fit |

## 2.2 Axis 2: GTM Models

| Model | ACV band | Sales cycle | CAC profile | Representative |
| --- | --- | --- | --- | --- |
| Self-serve / PLG | $100-$5K | Instant to 2 weeks | Low, marketing-driven | Notion, Canva, Linear |
| Product-led sales (PLS) | $5K-$50K | 2 weeks to 2 months | Medium, usage data qualifies leads | Figma, Datadog |
| Inside sales | $10K-$100K | 1-3 months | Medium-high, needs SDR/AE org | HubSpot, Zendesk |
| Enterprise / field sales | $100K+ | 6-18 months | Very high, needs solution engineers | Salesforce, Workday |
| Channel / partner | Variable | Variable | Low but uncontrollable | ERP ecosystems, Korean SI partnerships |

**Core early-stage diligence point**: when the GTM model and the ACV are mismatched, the company dies. The classic failure pattern is **selling a $3K ACV product with a field sales team** - sales compensation exceeds contract value. The reverse also fails: trying to sell a $200K ACV product self-serve.

## 2.3 Axis 3: Market Axis

### Horizontal vs Vertical

| | Horizontal | Vertical |
| --- | --- | --- |
| Definition | Functions common across industries (CRM, HR, collaboration) | Built for one industry (pharma, construction, restaurants) |
| TAM | Large | Small |
| Competition | Brutal, global giants present | Thin, local SIs are the competitors |
| Churn | High (many substitutes) | Very low (embedded in workflow) |
| Expansion path | Adjacent functions | Attach payments, financial services, marketplace |
| Winning condition | Product experience, distribution | Domain knowledge, regulatory coverage |

**Implication for Korea**: Korean SMBs have low willingness to pay for software and the domestic market is small. So the two realistic paths are (a) go vertical and attach payments/financial services to raise revenue per customer, or (b) target global markets (especially Japan and Southeast Asia) from day one. Sendbird and Channel Talk are examples of the latter.

### By Customer Size

| Segment | ACV | Characteristics | Trap |
| --- | --- | --- | --- |
| SMB | Under $1K | Fast sales, high volume | 30-50% annual churn. A leaky bucket |
| Mid-market | $10K-$50K | The balance point | Enterprise-grade requirements on an SMB budget |
| Enterprise | $100K+ | Low churn, large expansion | Long cycles, customization demands turn the product into consulting |

## 2.4 Axis 4: Product Scope

- **Point solution**: one problem, deeply. Easy initial entry, but these were cut first during the post-2022 stack cleanup
- **Suite**: bundled functions. Integration advantages and higher price points, but each function tends to be inferior to the best point solution
- **Platform**: extensible foundation plus ecosystem. Closest thing to winner-take-most, but hard to reach
- **Compound startup**: launch multiple products simultaneously on one shared data model from the start. Rippling is the case usually cited. Demands substantial capital and execution

---

# Part 3. Metrics Dictionary

## 3.1 Revenue Metrics

| Metric | Definition | Watch out for |
| --- | --- | --- |
| MRR / ARR | Monthly / annual recurring revenue | One-time implementation and consulting fees must not be mixed in. This contamination is common at early-stage companies |
| ACV | Annual contract value per customer | The basis for judging GTM fit |
| Committed ARR | ARR locked in by contract | Can diverge sharply from actual ARR at usage-priced companies |
| Backlog / RPO | Contracted but unrecognized revenue | The real strength of an enterprise company |

## 3.2 Retention and Expansion Metrics

| Metric | Definition | Benchmark |
| --- | --- | --- |
| Logo churn | Share of customers lost | SMB 20-40% annually, enterprise 5-10% |
| GRR (Gross Revenue Retention) | Revenue retention excluding expansion | 90%+ is healthy. Capped at 100% |
| NDR / NRR | Revenue retention including expansion | Under 100% = leak, 110-120% healthy, 130%+ excellent |
| Expansion composition | Seat growth / upgrade / usage | Even with high NDR, the source matters |

**Always read NDR alongside GRR.** If GRR is 80% and NDR is 120%, a handful of top accounts are exploding while the long tail churns out. Lose one top account and it collapses.

## 3.3 Efficiency Metrics

| Metric | Calculation | Interpretation |
| --- | --- | --- |
| CAC payback | CAC / monthly gross profit | Under 12 months excellent, 12-18 healthy, 24+ risky |
| LTV / CAC | Lifetime value / acquisition cost | 3x is the conventional bar. Low reliability early due to thin data |
| Magic Number | Quarterly net new ARR / prior-quarter S&M spend | 0.75+ justifies stepping up sales investment |
| Burn Multiple | Net burn / net new ARR | Under 1x excellent, 1-2 healthy, 3x+ risky (David Sacks) |
| Rule of 40 | Growth rate (%) + operating margin (%) | Target 40+. A late-stage metric, inappropriate at seed |
| Gross margin | (Revenue - COGS) / revenue | Traditional SaaS 75-85%. This number is the main event of the AI era |
| Revenue per employee | ARR / headcount | Sharply more important since 2023. $200K+ is one baseline |

## 3.4 What to Look at by Stage

| Stage | What you can see | What you cannot see | What to look at instead |
| --- | --- | --- | --- |
| Pre-seed | Nothing | Everything | Specificity of the problem definition, founder's domain access |
| Seed | MRR trend, early retention | LTV, NDR (cohorts too young) | Weekly active usage, paid conversion, pilot-to-paid conversion |
| Series A | $1-3M ARR, early NDR, CAC payback | Long-run churn curve | Repeatability of revenue growth, whether one salesperson is reproducible |
| Series B+ | Everything | | Cohort expansion, unit economics by segment |

**The most common error at seed**: trusting a company that presents a calculated LTV/CAC. The LTV of a company whose oldest customer is six months old is a stack of assumptions. At this stage, **where the monthly retention curve flattens (the retention plateau)** is enough.

---

# Part 4. Company Catalog

## 4.1 Horizontal Enterprise

| Company | Founded | Domain | Pricing | Notes |
| --- | --- | --- | --- | --- |
| Salesforce | 1999 | CRM | Seat + tier | Created the category. Became a platform via AppExchange |
| Workday | 2005 | HR / finance | Seat | The second wave of enterprise cloud migration |
| ServiceNow | 2003 | ITSM / workflow | Seat + platform | Textbook expansion from IT tickets to a company-wide workflow platform |
| HubSpot | 2006 | Marketing / CRM | Tier + contact count | Captured SMB through inbound marketing |
| Atlassian | 2002 | Dev collaboration | Seat | Reached IPO with no sales organization. The ancestor of PLG |

## 4.2 The PLG Cohort

| Company | Founded | Distribution mechanism |
| --- | --- | --- |
| Dropbox | 2007 | Share links plus referral storage rewards |
| Slack | 2013 | Team invites. Viral inside the org |
| Zoom | 2011 | Every meeting participant is a prospect |
| Figma | 2012 | Browser-based collaboration, free viewers |
| Notion | 2013 | Public pages plus a template ecosystem |
| Canva | 2012 | Template SEO plus a free tier |
| Airtable | 2012 | Shared bases |
| Linear | 2019 | Product craft itself as marketing |

## 4.3 Usage-Based / Infrastructure

| Company | Founded | Billing unit |
| --- | --- | --- |
| Twilio | 2008 | Messages / calls |
| Snowflake | 2012 | Compute credits plus storage |
| Datadog | 2010 | Host count plus data volume |
| MongoDB | 2007 | Atlas cluster consumption |
| Cloudflare | 2009 | Hybrid (tier plus usage) |
| Stripe | 2010 | Percentage of transaction volume |

## 4.4 Vertical SaaS

| Company | Founded | Industry | Expansion method |
| --- | --- | --- | --- |
| Veeva | 2007 | Pharma / life sciences | Started on top of Salesforce, then broke out onto its own platform |
| Toast | 2011 | Restaurants | POS hardware plus payments plus lending. Most revenue is payments |
| Shopify | 2006 | Commerce | Payments, logistics, lending, app marketplace |
| Procore | 2002 | Construction | Onboards every project participant free (network effect) |
| ServiceTitan | 2012 | Field services / trades | Attaches payments and financing |
| nCino | 2011 | Bank lending | Regulatory coverage is the moat |
| Guidewire | 2001 | Insurance core | A rare successful on-premise to cloud transition |
| Samsara | 2015 | Fleet / field ops | Hardware (IoT) plus SaaS |
| Mindbody | 2001 | Fitness / wellness | Attaches a consumer marketplace |

**The common vertical SaaS playbook**: capture the workflow with software, then route payments through it, then attach financial services (lending, insurance) once data accumulates. The software subscription is the entry vehicle and the real revenue arrives behind it. When an early-stage VC evaluates a vertical deal, the key question is **whether there is a path to payments and financial services.**

## 4.5 Open Core / Developer Tools

| Company | Founded | Open source | Commercialization |
| --- | --- | --- | --- |
| MongoDB | 2007 | Database | Managed cloud (Atlas) |
| Elastic | 2012 | Search engine | Managed service plus paid features |
| GitLab | 2011 | DevOps | Paid features by tier |
| HashiCorp | 2012 | Infrastructure automation | Enterprise edition |
| Confluent | 2014 | Kafka | Managed cloud |
| Databricks | 2013 | Spark | Managed platform (lakehouse) |

**The structural tension in open core**: the free version is the distribution channel, but if a cloud provider resells it as a service you lose the revenue. Elastic's and HashiCorp's license changes (SSPL, BUSL) were responses to this. The open weight debate in AI has the same structure.

## 4.6 Korean SaaS

Korea took a different path from the US because of constraints on SMB willingness to pay and market size.

| Company | Domain | Characteristics |
| --- | --- | --- |
| Sendbird | Chat API | Global developer market from the start. Usage-based pricing |
| Channel Corporation (Channel Talk) | CS messenger | A leading case of successful expansion into Japan |
| flex | HR | Standardized HR for Korean startups |
| Swit | Collaboration | Attacked global markets directly |
| Spoqa | In-store customer management | SMB vertical plus data |
| Madras Check (Flow) | Collaboration | Runs on-premise alongside cloud for Korean enterprises |
| Business Canvas | Documents / knowledge | Product-led approach |

> Founding years, cumulative funding, and revenue scale for the companies above need separate verification.

**Four structural constraints on Korean SaaS**

1. Low SMB willingness to pay. Free substitutes (KakaoTalk, Google Sheets, Excel) hold high share
2. Enterprise buyers have strong on-premise and SI habits, making pure SaaS sales difficult
3. The domestic market is roughly a tenth of the US, so a Korea-only product struggles to reach IPO scale
4. Therefore global expansion is not optional but mandatory, which demands an English-language product and overseas GTM as early as seed

---

# Part 5. Early-Stage Diligence Checklist

## 5.1 Revenue Quality

- Is ARR contaminated with one-time implementation, consulting, or PoC fees
- What percentage of revenue do the top 3 customers represent (over 30% is concentration risk)
- What is the contract term. If it is cancellable monthly, it is hard to call it ARR
- How many customers actually converted from free to paid. Separate pilots from paid contracts

## 5.2 Retention

- Request the monthly retention curve by cohort. Does it flatten anywhere
- Are there churn interviews on file. If not, the company does not know why customers leave
- What is the source of expansion revenue: seat growth, upgrades, or usage

## 5.3 Unit Economics

- How was CAC calculated. Does it include salaries (most exclusions make it look better than it is)
- What went into COGS. Does it include infrastructure, third-party APIs, and support salaries
- Is there at least one channel with CAC payback under 12 months

## 5.4 GTM Coherence

- Does ACV match the sales method
- Does sales depend on the founder alone. Has a hired rep ever hit quota
- Where do pipeline leads come from. If it is only the personal network, it is not reproducible

## 5.5 Red Flags

| Signal | Why it is risky |
| --- | --- |
| The ARR definition wobbles when questioned | Possible revenue contamination |
| Emphasizes LTV/CAC but will not show the retention curve | A number built from assumptions |
| Every customer is a startup | Fragile budgets, correlated churn |
| High NDR but low GRR | Dependence on a few accounts |
| Customization revenue keeps growing as a share | Converging into an SI shop, not SaaS |
| Gross margin under 60% with no explanation | The company does not understand its own cost structure |

---

# Part 6. Primary Sources

**Recurring publications**
- Bessemer Venture Partners, `State of the Cloud` (annual). The industry standard reference
- SaaS Capital, `Private SaaS Company Valuations` (annual). Private multiple benchmarks
- ICONIQ Growth, `Topline Growth and Operational Efficiency` (annual)
- ChartMogul, `SaaS Benchmarks Report`. Contains early-stage retention data, useful for seed diligence

**Original concept sources**
- David Skok (forEntrepreneurs), `SaaS Metrics 2.0`. The standard definitions of CAC, LTV, and the cash curve
- Brad Feld (2015), the original Rule of 40 post
- David Sacks (Craft Ventures), Burn Multiple
- a16z, `16 Startup Metrics` and `The New Business of AI`

**Live tracking**
- Jamin Ball, `Clouded Judgement` (newsletter). Weekly updates on public SaaS multiples
- Meritech Capital, public SaaS comparables table (free)

**Primary financials**
- Key S-1 filings: Snowflake (usage-based), Toast (take rate), Atlassian (PLG), Veeva (vertical). If you want to learn each model's financial structure from source documents, these four are the most efficient set

---

## Next

How this original form breaks down and reassembles under AI is covered in `saas-ai-era.md`.
