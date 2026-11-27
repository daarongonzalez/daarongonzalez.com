// Long-form story for the "Getting Started with the Decisions API" case study,
// written as Portable Text so the local fallback renders the same way Sanity content does.
// No imports here on purpose: the same blocks can be copied into Sanity as-is.

let keyCount = 0;
const key = () => `dapi${(keyCount++).toString(36)}`;

const block = (text: string, style = "normal", listItem?: "bullet" | "number") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  ...(listItem ? { listItem, level: 1 } : {}),
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const h2 = (text: string) => block(text, "h2");
const p = (text: string) => block(text);
const bullets = (items: string[]) => items.map((item) => block(item, "normal", "bullet"));
/** A paragraph with one linked phrase in the middle. */
const link = (before: string, linkText: string, href: string, after: string) => {
  const markKey = key();
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [{ _type: "link", _key: markKey, href }],
    children: [
      { _type: "span", _key: key(), text: before, marks: [] },
      { _type: "span", _key: key(), text: linkText, marks: [markKey] },
      { _type: "span", _key: key(), text: after, marks: [] },
    ],
  };
};
const numbered = (items: string[]) => items.map((item) => block(item, "normal", "number"));

export const decisionsApiBody = [
  h2("Why I hosted this"),
  p(
    "As AI Instructor for Leland's AI Builder Program, I hosted a Codex Community event at Leland HQ in Lehi, Utah, all about the OpenAI Decisions API.",
  ),
  p(
    "The people in the room were early in their builder journeys. They were starting to build software, but speed, token efficiency and cost were still new ideas. For most of them, this was a first step into decision models.",
  ),

  h2("What a decision model does"),
  p(
    "Many of the questions we ask AI every day have a short, fixed answer. Does this listing break a rule? Which team should get this ticket? Is this portfolio ready? A large, general-purpose model can answer them, but you pay for a model built to write long replies when all you needed was a yes or no.",
  ),
  p("The Decisions API is made for these questions:"),
  ...bullets([
    "Write one question for each thing you're checking.",
    "Send the evidence: page text, screenshots, a listing, a ticket.",
    "Get a typed answer back: a yes or no, a category from your list, or a score.",
    "Each answer comes with a probability, so you can see how sure it is.",
  ]),
  p(
    "Answers always come back in the same shape, so your code can act on them directly. There's no charge for the answer itself, so cost mostly depends on how much evidence you send.",
  ),

  h2("The traditional way: Airbnb's policy classifier"),
  p(
    "To show what this replaces, I walked through how Airbnb's engineering team built a custom classifier. Its job was to screen listings for Airbnb's pricing and payment transparency policy. It gets called thousands of times per minute, and each score has to come back within 200 milliseconds. Here's what they did:",
  ),
  ...bullets([
    "Labeled hundreds of thousands of examples.",
    "Fine-tuned a small model on them.",
    "Tested it on 10,000 held-out examples it had never seen.",
    "Ran it on their own GPUs, the specialized chips that power AI models.",
    "Tuned it to answer within that 200-millisecond limit.",
  ]),
  p(
    "It paid off. Quality, measured with a score called F1 that balances catching problems against false alarms, went from 0.563 to 0.902. A typical answer took about 35 milliseconds, compared to about 900 for top frontier models. That wait time is what engineers call latency. At high volume, it ran at about 1% of the cost.",
  ),
  p(
    "There's an honest catch. The same post points out that at low volume, under roughly 15 to 30 requests per minute, a frontier model with a good prompt is cheaper. Fine-tuning pays off only when you have high volume, tight speed limits and lots of labeled data.",
  ),
  p(
    "Airbnb's benchmark also found that decision models, which return a probability instead of writing out an answer, were the most accurate ready-made option they tested under 100 milliseconds, and you can tune them with a simple threshold. The one they tested came from a different vendor, not OpenAI, but the idea is the same.",
  ),
  p(
    "That's the point for most of us. Leland's portfolio grading happens weekly, at low volume. For work like that, a few well-written questions and a few rounds of testing get most of the value, without a months-long training project.",
  ),
  link(
    "These are Airbnb's numbers for their task, not a Decisions API benchmark. Source: ",
    "Frontier quality at 1% of the cost: a production benchmark of LLM classifiers",
    "https://airbnb.tech/ai-ml/frontier-quality-at-1-of-the-cost-a-production-benchmark-of-llm-classifiers/",
    ", by Clay Gibson and Adel Elmalaha, Airbnb Engineering & Data Science.",
  ),

  h2("What I built with Codex: Builders Review"),
  p("At Leland, instructors reviewed every learner portfolio by hand against the same four checks:"),
  ...bullets([
    "Hosted: a real website anyone can reach, not a local file.",
    "Branding: visible effort and personality. It's not a design contest.",
    "Required builds: every required build has real evidence behind it.",
    "How I use AI: concrete examples, not just a list of tools.",
  ]),
  p("All four are required. There's no averaging, so great design can't make up for a missing build."),
  p("I used Codex to build a browser-based tool and a scheduled task that handle the first pass:"),
  ...bullets([
    "A browser opens each portfolio and captures it: screenshots plus the page text.",
    "One Decisions API call answers 12 rubric questions about that evidence.",
    "Each portfolio lands in one of three buckets: Pass, Team review or Redo required.",
    "Anything uncertain goes to a person, whether it's a low-confidence answer, a capture problem or a missing item.",
    "It handles batches of up to 100 portfolios and exports results to CSV.",
    "It runs every Friday as a scheduled Codex task.",
  ]),
  p(
    "Before trusting it, I ran it on portfolios instructors had already graded and read every case where it disagreed.",
  ),

  h2("Your turn"),
  p(
    "The lesson I wanted everyone to leave with: you don't need a training pipeline to get a reliable, low-cost decision. Start small:",
  ),
  ...numbered([
    "Pick a judgment you make every week.",
    "Write one question per criterion.",
    "Check it against 20 examples you've already graded.",
    "When it's wrong, fix the questions, not the model.",
  ]),
];
