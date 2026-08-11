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
  role: string;
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
