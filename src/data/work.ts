import { projects, type Project } from "@/data/projects";
import firstProductClaudeCode from "@/assets/images/work/workshop-first-product-claude-code.webp";
import claudeSkills from "@/assets/images/work/workshop-claude-skills.webp";
import intermediateClaudeCode from "@/assets/images/work/workshop-intermediate-claude-code.webp";
import claudeCowork from "@/assets/images/work/workshop-claude-cowork.webp";
import pluralsightSummit from "@/assets/images/work/photo-pluralsight-author-summit.webp";
import siliconSlopesStage from "@/assets/images/work/photo-silicon-slopes-stage.webp";
import siliconSlopesDesk from "@/assets/images/work/photo-silicon-slopes-desk.webp";

export interface Workshop {
  title: string;
  /** Small line above the title, e.g. who hosted it or where it sits in a series. */
  eyebrow: string;
  description?: string;
  /** Session thumbnail. Without one, the card draws a branded title panel instead. */
  image?: string;
  /** Recording, sign-up or recap page. Without one, the card isn't a link. */
  url?: string;
  /** Show on the homepage "Work" row. */
  featured: boolean;
}

export interface SessionPhoto {
  caption: string;
  alt: string;
  image: string;
  orientation: "portrait" | "landscape";
  featured: boolean;
}

export const workshops: Workshop[] = [
  {
    title: "Building and Deploying your First Product with Claude Code",
    eyebrow: "Stack · Live workshop",
    image: firstProductClaudeCode.src,
    featured: true,
  },
  {
    title: "Introduction to Claude Skills",
    eyebrow: "Stack · Live workshop",
    image: claudeSkills.src,
    featured: true,
  },
  {
    title: "Intermediate Development with Claude Code",
    eyebrow: "Stack · Live workshop",
    image: intermediateClaudeCode.src,
    featured: true,
  },
  {
    title: "Getting Started with Claude Cowork",
    eyebrow: "Stack · Live workshop",
    image: claudeCowork.src,
    featured: true,
  },
  // Four-part build series, January 2025. Thumbnails still to be added.
  {
    title: "Visualizing and Writing",
    eyebrow: "Skill #1 · Jan 10, 2025",
    description: "Practice clearly communicating your idea, and mapping your build.",
    featured: false,
  },
  {
    title: "Brand and Design",
    eyebrow: "Skill #2 · Jan 17, 2025",
    description: "Use Figma to practice hierarchy, color theory, layout, and build a design system.",
    featured: false,
  },
  {
    title: "Data and Development",
    eyebrow: "Skill #3 · Jan 24, 2025",
    description: "Develop your designs, use popular stacks, set up version control, and design a database.",
    featured: false,
  },
  {
    title: "Secure and Deploy",
    eyebrow: "Skill #4 · Jan 31, 2025",
    description: "Understand all costs associated with hosting, run a security checklist, and deploy.",
    featured: false,
  },
];

export const sessionPhotos: SessionPhoto[] = [
  {
    caption: "Live session at Silicon Slopes, Utah",
    alt: "D'Aaron presenting from a laptop on the Silicon Slopes stage",
    image: siliconSlopesStage.src,
    orientation: "portrait",
    featured: true,
  },
  {
    caption: "“Making Your Content Go Further with AI” · Pluralsight Author Summit",
    alt: "D'Aaron presenting a talk on AI to a room at the Pluralsight Author Summit",
    image: pluralsightSummit.src,
    orientation: "landscape",
    featured: true,
  },
  {
    caption: "Walking through a live demo at Silicon Slopes",
    alt: "D'Aaron teaching from the desk on the Silicon Slopes stage",
    image: siliconSlopesDesk.src,
    orientation: "portrait",
    featured: true,
  },
];

export type WorkItem =
  | { kind: "project"; project: Project }
  | { kind: "workshop"; workshop: Workshop }
  | { kind: "photo"; photo: SessionPhoto };

/**
 * Weaves projects, workshops and photos into one feed so no single type bunches
 * up. Each group's items are spread evenly across the length of the feed, every
 * group starts at the front, and ties go to projects, then workshops, then photos.
 */
function interleave(groups: WorkItem[][]): WorkItem[] {
  return groups
    .flatMap((group, groupIndex) =>
      group.map((item, i) => ({ item, position: i / group.length, groupIndex })),
    )
    .sort((a, b) => a.position - b.position || a.groupIndex - b.groupIndex)
    .map(({ item }) => item);
}

function buildFeed(onlyFeatured: boolean): WorkItem[] {
  const keep = <T extends { featured: boolean }>(list: T[]) =>
    onlyFeatured ? list.filter((entry) => entry.featured) : list;
  return interleave([
    // Projects without a screenshot yet stay off the showcase until they have one.
    keep(projects.filter((project) => project.image)).map((project) => ({ kind: "project" as const, project })),
    keep(workshops).map((workshop) => ({ kind: "workshop" as const, workshop })),
    keep(sessionPhotos).map((photo) => ({ kind: "photo" as const, photo })),
  ]);
}

/** Homepage row: featured items only. */
export const featuredWorkFeed = buildFeed(true);
/** /work page: everything. */
export const workFeed = buildFeed(false);
