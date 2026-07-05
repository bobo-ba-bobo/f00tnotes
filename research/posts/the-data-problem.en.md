# The Data Problem: Why the Robot Foundation Model Wars Will Be Won on Data

The industry is pouring its best capital and talent into humanoid hardware and ever-smarter robot models. This is the wrong bet. In RFM, the model is the layer that commoditizes fast, exactly as it did in LLMs, and the hardware is the layer that only burns capital. The one layer that compounds over time and that no one can copy is physical interaction data. The winners of this cycle will not be the company that built the best-walking robot or the smartest model. They will be the company that accumulated the most real-world data.

> Robotics / Physical AI
> Reading Time: ~13 min
> Draft: 2026-06-29

---

## Rundown

- Every Robot Wakes Up Data-Starved
- The Three Camps, and Where the Money Is Flowing
- The Model Is Already Commoditizing
- Hardware Burns, It Does Not Own
- The Data Problem
- Why Config Calls Itself a 'TSMC'
- Where Korea Should Bet

---

## Every Robot Wakes Up Data-Starved

LLMs were born on top of a vast pre-existing training set: the internet. Text had been accumulating in digital form for decades, and the model simply ate it. Robots have no such luck. The action data for a robot picking up an object, seating a cable, or cleaning an unfamiliar kitchen barely exists online. Someone has to create it, one teleoperated demonstration at a time.

That gap is not a metaphor. It is a matter of orders of magnitude. LLMs train on trillions of tokens, but the flagship robotics dataset, RT-X, is on the order of one million trajectories, and Physical Intelligence's π0 is estimated to have trained on roughly ten thousand hours. RFMs start out short of LLMs by six to seven orders of magnitude in training data. Of the four hard problems an RFM must solve (data scarcity, the Sim2Real gap, embodiment gap, and long-horizon autonomy) this is the most fundamental bottleneck.

The industry's standard answer is that as models get better, data efficiency improves and the problem resolves itself. This piece argues the reverse. The model is the commodity. The data is the moat. And the ratio of attention flowing to each of them right now is the single most mispriced thing in the RFM stack.

---

## The Three Camps, and Where the Money Is Flowing

The RFM market is splitting into three camps. The first is model-only: no hardware, just the policy model itself. Physical Intelligence and Skild AI lead here, and in Korea, RLWRLD. The second is vertically integrated: build both the hardware and the model. Figure AI, 1X Technologies, Apptronik, Neura, and Tesla Optimus sit here. The third is data infrastructure: build neither the model nor the hardware, and bet instead on collecting, labeling, and supplying training data. Config and Carbon Robotics are the archetypes.

```
Raw demo data -> [data infra] -> [model] -> [hardware] -> real-world action
                   Config        PI/Skild   Figure/1X
                 (mid capital eff) (compute-bound) (CapEx explodes)
```

Map where the money flows and something strange appears. Almost all of it pools in the second camp, vertically integrated humanoids. Figure AI jumped from a $2.6B valuation in February 2024 to $39B by September 2025, a 15x move in eighteen months. Skild AI is at $14B, and Physical Intelligence is discussed at over $5B in follow-on rounds. The pitch decks talk about steadier gaits and more dexterous hands, and the demos fold laundry and assemble car bodies.

These are precisely the two layers most exposed to commoditization. The model layer is becoming something everyone can buy at the same quality, and the hardware layer only burns capital without preventing copying. The industry is sprinting toward the parts of the stack that are about to stop being defensible.

---

## The Model Is Already Commoditizing

The model layer is the one people point to when they say "the robot AI." It is also the layer standardizing fastest.

The clearest evidence is in the slogans the model companies raise themselves. Skild AI's tagline is "One brain, any body": one general-purpose policy that works on a humanoid, a quadruped, or a manipulator alike. Physical Intelligence builds no hardware of its own and transfers the same π policy across form factors like ARX-5, Trossen, and Franka. π0.5 was shown cleaning a home it had never seen from a single voice command, and π0.7 handled an air fryer that appeared in its training data only twice, zero-shot. The value proposition of the model itself is that it can be swapped onto any body. And to be swappable is, by definition, to be tied to no single company.

Open source compounds this. Hugging Face acquired Pollen Robotics in 2024 and, through the LeRobot project, became the anchor of the open-source RFM camp. NVIDIA's GR00T and Neura's Neuraverse aim at RFM marketplaces where outside developers register and distribute skills. The moment model capability becomes a component traded in a marketplace, it stops being anyone's moat.

This is the textbook shape of commoditization: a capability that was scarce and bespoke becomes abundant and standardized. Just as reasoning did in LLMs, the generalization ability of a robot policy is becoming table stakes. A startup whose only edge is model capability is building on a layer that the next foundation model release will partly absorb, for free, for everyone. Worse, model-only companies are compute-bound and capital-inefficient. Expensive to run, impossible to own. The worst combination in the stack.

---

## Hardware Burns, It Does Not Own

Vertical integration is dangerous in a different way. Software at least has low marginal cost; hardware burns the capital itself.

While Figure's valuation rose 15x in eighteen months, its most advanced commercial deployment is a single BMW body-assembly pilot. 1X takes NEO pre-orders at $20,000 with 2026 delivery promised, but nothing has shipped. Even Tesla Optimus's real differentiator is not the model but manufacturing: the ability to mass-produce ten thousand units a year and thereby lead on data collection scale. That fact, paradoxically, proves the point. What the humanoid giants ultimately compete on is not the elegance of the hardware but the volume of data that hardware generates in the real world.

When a valuation outruns revenue by 15x in eighteen months, the pressure to justify the gap accumulates somewhere. The only thing that relieves it is not the next model but the compounding data that deployed robots produce every day. Hardware is merely the instrument for collecting that data; on its own it is not a moat. It burns CapEx no Korean VC round could carry, while the defensible asset piles up in a different layer entirely.

If the model is commoditizing and the hardware just burns capital, a question remains. What is the one thing the model, however good it gets, structurally cannot absorb?

---

## The Data Problem

It cannot absorb your data. More precisely, it cannot absorb the record of what your specific robot learned handling your specific parts on your specific factory floor over months. That is data, and it has a property no other layer has: it compounds.

Every other layer is roughly as good on day one as on day five hundred. A model's generalization does not get smarter for having run a year. Hardware only wears down with use. But a data asset is unconditionally more valuable on day five hundred than on day one, because it now holds five hundred days of demonstrations, failures and corrections, edge cases, and domain specifics that no competitor can copy. Data is the only layer where time is an asset instead of a liability.

The kinds of physical data matter, too. Teleoperated demonstrations are the most expensive and accurate, made by hand. Simulation data is cheap and mass-produced but has to cross the Sim2Real gap before it is usable. Field-operation logs are the data a deployed robot generates by itself every day, owned by that company alone. The genuinely hard, still-unsolved problem is how to collect, clean, and fuse these three inside one model. Dumping demonstration video into a vector store does not solve it. You have to decide what to keep as a demonstration and what to discard, how to bridge the distribution gap between simulation and reality, and how to retrain a new task in minutes rather than days. This is real infrastructure, and it is badly under-built relative to its importance, precisely because the field's attention is pointed at the layers that demo well.

A few companies have realized this is the actual frontier. Carbon Robotics does not build humanoids. It collected 150 million plant images directly from more than a hundred farms across the US and Europe to build its Large Plant Model, and when it finds a new weed species it retrains in minutes, not days, on an iPad. That is why its ROI materializes faster than a general humanoid's, and why it is classified as an RFM business that actually generates revenue. Config is more blatant still: it builds neither robots nor models, scaling a million-hour data-collection operation across Vietnam and Seoul to supply every robot company with data.

None of these companies compete on intelligence. They all rent the same models everyone else does. They compete on the layer the model cannot eat, data. And while the consensus still treats it as a feature rather than a business, they are already early to the category.

---

## Why Config Calls Itself a 'TSMC'

The clearest evidence for the data thesis is in Korea. Config calls itself the "TSMC of robot data." Just as TSMC fabricates chips for every fabless company, Config proposes to supply RFM training data, on contract, to every robot company.

What matters is not the analogy but the cap table. Samsung Venture Investment led, and Hyundai's ZER01NE, LG Technology Ventures, and SKT America all entered the same round. Korea's four largest conglomerates betting on a single round together is highly unusual. The same four are also in RLWRLD, the model-only player.

The pattern says something clear. Korean manufacturing giants prefer to secure data infrastructure through a supplier rather than build their own RFM. The model is commoditizing anyway, and in humanoid hardware Korea trails the US and China by five to seven years outside of Boston Dynamics. Where Korea is structurally strong is neither the model nor the hardware, but the industrial data that comes off its factory floors and the infrastructure to collect it. The four conglomerates' capital has already reached that conclusion.

The fact that Korea's most conservative capital converged, all at once, not on the model layer with its shining benchmarks nor the hardware layer with its flashy demos, but on the least glamorous data layer. That is the signal.

---

## Where Korea Should Bet

If the thesis holds, a few things follow, and most of them cut against where attention is currently pointed.

For builders: stop trying to win on the layers the foundation labs will own. A better-walking robot and a smarter general policy are depreciating assets. On that layer, the next model release is your competitor, and it ships for free. Put the engineering into the layer that compounds. An application layer built on data collected and labeled from Korean manufacturing floors (semiconductor back-end, displays, batteries), fine-tuning a model from RLWRLD or Physical Intelligence on top. Sim2real bridge tooling that connects simulation to real data. Teleoperation and data-collection SaaS for robot OEMs. This is where capital efficiency is good and the barrier to entry accrues as data.

For investors: discount the model-layer and hardware-layer pitches and underwrite the compounding. The sharpest question to ask any RFM company is this: when the underlying model doubles in capability and halves in price next year, does that make you stronger or does it erase your edge? A company whose edge is model capability gets eroded by that release. A company accumulating proprietary data gets a free upgrade laid on top of a moat the upgrade cannot touch. The first kind rents its advantage from a lab. The second owns what the lab will never have: the compounding record of one specific floor.

The model layer is where the magic appears to happen, and that is exactly why it is commoditizing. The hardware layer is where the demos dazzle, and that is exactly why it burns capital. The data layer is unglamorous, under-funded, and technically unfinished. And it is the only layer in the stack where time is on your side. Foundation models will keep getting smarter, cheaper, and more alike. The one thing they will never do is remember your factory for you. That is the layer left standing, and almost no one is building it as if the company's life depended on it. The ones who do are the ones still here after the model beneath them becomes a commodity.

---

*Draft for f00tnotes. Company figures, funding details, and valuations to be verified before publication. Research basis: internal research 'RFM Global Key Players' (2026-05-19); TechCrunch 'Korea's biggest manufacturers back Config' (2026-05-11); The Robot Report 'Physical Intelligence raises $400M'; public reporting on Carbon Robotics, Skild AI, Figure AI, and 1X.*
