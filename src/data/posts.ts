export interface Post {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  imageLabel: string;
  featured?: boolean;
}

export const posts: Post[] = [
  {
    slug: "why-your-team-defaults-to-basic-chat",
    category: "AI Strategy",
    title: "Why Your Team Defaults to Basic Chat (and How to Fix It)",
    date: "July 18, 2026",
    readTime: "6 min read",
    imageLabel: "Featured post image",
    featured: true,
  },
  {
    slug: "designing-a-workshop-people-remember",
    category: "Education",
    title: "Designing a Workshop People Actually Remember",
    date: "July 3, 2026",
    readTime: "4 min read",
    imageLabel: "Post image",
  },
  {
    slug: "no-shortcuts-technical-debt",
    category: "Dev Notes",
    title: "No Shortcuts: What Technical Debt Really Costs",
    date: "June 21, 2026",
    readTime: "5 min read",
    imageLabel: "Post image",
  },
  {
    slug: "choosing-the-right-ai-tool",
    category: "AI Strategy",
    title: "Choosing the Right AI Tool for Your Team's Size",
    date: "June 10, 2026",
    readTime: "7 min read",
    imageLabel: "Post image",
  },
  {
    slug: "from-licenses-to-literacy",
    category: "Education",
    title: "From Licenses to Literacy: Training That Sticks",
    date: "May 28, 2026",
    readTime: "5 min read",
    imageLabel: "Post image",
  },
];

export const categories = ["All", "AI Strategy", "Education", "Dev Notes"];
