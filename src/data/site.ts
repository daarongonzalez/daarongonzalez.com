import zackFore from "@/assets/images/zack-fore.jpg";
import jacksonMcKenna from "@/assets/images/jackson-mckenna.jpg";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/events" },
];

export const services = [
  {
    title: "Educator",
    description:
      "Live workshops and on-demand content that turn your staff into confident, independent contributors.",
  },
  {
    title: "Strategist",
    description:
      "Design sprints that establish your system and brand standards, so every build starts on solid ground.",
  },
  {
    title: "Developer",
    description: "Robust, scalable applications solving real problems. No shortcuts, no technical debt.",
  },
];

export const hero = {
  eyebrow: "AI enablement · training · builds",
  lines: ["Create", "your AI"],
  goldWord: "playbook",
  body: "D'Aaron here. I help you and your team find where AI tools actually pay off — and where they quietly waste a quarter. Years in technical training, and I'd love to help your business thrive.",
};

export const aboutStats = [
  { value: "10+", label: "Years building" },
  { value: "30+", label: "Teams trained" },
];

export interface Review {
  lead?: string;
  body: string;
  name: string;
  /** Omitted where the reviewer's title isn't confirmed — the band hides the line. */
  role?: string;
  avatar?: string;
}

export interface ReviewPair {
  primary: Review;
  secondary: Review;
}

export const reviewSets: ReviewPair[] = [
  {
    primary: {
      lead: "Not only understands AI, but explains it in a way that resonates.",
      body: "It's rare to come across an educator that genuinely wants you to win and enthusiastically shows up in 1:1 meetings ready to help you build, create and solve problems. D'Aaron has been instrumental in 10x-ing my AI education.",
      name: "Zack Fore",
      role: "AI Consultant",
      avatar: zackFore.src,
    },
    secondary: {
      body: "D'Aaron was incredibly helpful in walking me through what it would take to turn my idea into a real product. Very easy to work with — I highly recommend him.",
      name: "Jackson McKenna",
      role: "Owner, Two If By Sea",
      avatar: jacksonMcKenna.src,
    },
  },
  {
    primary: {
      lead: "He strives to understand the content and the customer to deliver a high-value experience for all.",
      body: "I've been working with D'Aaron for 6+ months. He is very knowledgeable about AI, tools, platforms, and business. He has led multiple technical workshops — all were a huge success. The workshops are well planned and engaging for all participants, and I've learned so much from him during them, in online interactions, and in 1:1 conversations.",
      name: "Hilda S.",
    },
    secondary: {
      body: "D'Aaron is an exceptional instructor who keeps our Stack community thriving. He seamlessly orchestrates live workshops and updates, and what truly sets him apart is his hands-on approach to teaching the tool sessions himself. Whenever I need guidance, he is responsive, helpful, and a fantastic instructor.",
      name: "John N.",
    },
  },
  {
    primary: {
      lead: "There are teachers who care, and teachers who teach because it's their calling. D'Aaron is the textbook definition of the latter.",
      body: "He could be doing anything in AI, but chooses to spend his time sharing his knowledge, making it easy and fun to understand and always going above and beyond. Anyone would be lucky to work with him.",
      name: "Stefan B.",
    },
    secondary: {
      body: "I'm working on getting an AI certification, and I always rely on D'Aaron for any strategic or AI customization questions I have. I attended a few of the online workshops he taught about Claude and found him to be very knowledgeable. He responds to the numerous questions I ask about starting my AI consulting business — he's committed to helping his students succeed.",
      name: "Gentille B.",
    },
  },
];

export const timeline = [
  {
    number: "01",
    title: "Design",
    description: "Started in visual and product design, learning to see systems before pixels.",
  },
  {
    number: "02",
    title: "Development",
    description: "Moved into full-stack builds for agencies and startups, no-shortcuts philosophy.",
  },
  {
    number: "03",
    title: "Teaching",
    description: "Began running workshops, realizing the biggest gap was confidence, not tools.",
  },
  {
    number: "04",
    title: "Today",
    description: "Helping companies turn AI licenses into real orchestration — design, build, teach.",
    highlight: true,
  },
];

export const approach = [
  {
    title: "No Jargon, Just Results",
    description:
      "I skip the buzzwords and get to what actually moves your business — process audits, systems thinking, and tooling that fits.",
  },
  {
    title: "Built to Outlast Me",
    description:
      "Every engagement ends with your team able to maintain and extend the work — not dependent on outside help.",
  },
];
