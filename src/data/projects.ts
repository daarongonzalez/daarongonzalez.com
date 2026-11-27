import rapidschemaThumb from "@/assets/images/rapidschema-thumb.png";
import socialscouterThumb from "@/assets/images/socialscouter-thumb.png";
import arvoriThumb from "@/assets/images/arvori-thumb.png";
import rapidschemaHero from "@/assets/images/rapidschema-hero.png";
import rapidschemaSchemaEditor from "@/assets/images/rapidschema-schema-editor.png";
import decisionsApiThumb from "@/assets/images/decisions-api-thumb.webp";
import decisionsApiHero from "@/assets/images/decisions-api-hero.webp";
import decisionsSlide5 from "@/assets/images/decisions-api-slide-5.webp";
import lelandGroup from "@/assets/images/work/photo-leland-codex-group.webp";
import lelandPolicyClassifier from "@/assets/images/work/photo-leland-codex-policy-classifier.webp";
import { buildDecisionsApiBody } from "@/data/decisionsApiBody";

export interface ProjectTag {
  label: string;
  tone: "blue" | "sun";
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface GalleryImage {
  label: string;
  src?: string;
  /** Width ÷ height. Wide images (16:9 slides) are shown whole instead of cropped. */
  aspectRatio?: number;
}

/** Gallery images at least this wide (width ÷ height), like 16:9 slides, are shown whole instead of cropped. */
export const WIDE_RATIO = 1.7;

export interface CaseStudyPhoto {
  src: string;
  alt: string;
  caption?: string;
  orientation: "portrait" | "landscape";
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  tags: ProjectTag[];
  imageLabel: string;
  image?: string;
  /** Show on the homepage "Work" row. */
  featured: boolean;
  caseStudy?: {
    description: string;
    heroImageLabel: string;
    heroImage?: string;
    problemLabel: string;
    problem: string;
    solutionLabel: string;
    solution: string;
    gallery: GalleryImage[];
    results: ProjectStat[];
    /** Small line above the title, e.g. host, venue and date. */
    eyebrow?: string;
    subtitle?: string;
    /** Long-form story as Portable Text, shown after Problem / Solution. */
    body?: unknown[];
    photos?: CaseStudyPhoto[];
    /** Heading over the gallery. Defaults to "Process & screens". */
    galleryHeading?: string;
    /** Short note under the results strip, e.g. how numbers were measured. */
    resultsNote?: string;
  };
}

/** Local defaults, used until Sanity has projects. */
export const projects: Project[] = [
  {
    slug: "decisions-api",
    title: "Getting Started with the Decisions API",
    shortDescription:
      "A Codex Community session I hosted on the OpenAI Decisions API, plus a portfolio grader I built with Codex.",
    tags: [
      { label: "Workshop", tone: "sun" },
      { label: "Development", tone: "blue" },
    ],
    imageLabel: "Title card for Getting Started with the Decisions API",
    image: decisionsApiThumb.src,
    featured: true,
    caseStudy: {
      eyebrow: "Codex Community · Leland HQ, Lehi, UT · November 2026",
      subtitle: "Using decision models for better token usage and output",
      description:
        "A session I hosted at Leland HQ on getting predictable, low-cost answers to everyday decisions, and the portfolio grader I built to show it.",
      heroImageLabel: "Title card for Getting Started with the Decisions API",
      heroImage: decisionsApiHero.src,
      problemLabel: "The Problem",
      problem:
        "Many teams send repetitive decisions to large, general-purpose AI models. Those questions have short, predictable answers, but each one pays for a model built to write long replies. The result is slower, more expensive and harder to repeat than it needs to be.",
      solutionLabel: "The Solution",
      solution:
        "The Decisions API is made for these questions. Write one question per criterion, send the evidence, and get a typed answer back (a yes or no, a category or a score) with a probability for each. I showed the room how it works, then demoed a portfolio grader I built with Codex.",
      body: buildDecisionsApiBody({
        slide: decisionsSlide5,
        presenting: lelandPolicyClassifier,
        group: lelandGroup,
      }),
      gallery: [],
      results: [
        { value: "0.9s", label: "To grade one portfolio" },
        { value: "10.5s", label: "For a full run, from capture to verdict" },
        { value: "~1 hr", label: "Of manual review per cohort, 2–3 times a week, now automated" },
        { value: "100", label: "Portfolios per batch" },
      ],
      resultsNote:
        "Timings are from one real run. Capture is the browser opening a portfolio and saving screenshots and text; grading is the Decisions API call.",
    },
  },
  {
    slug: "marion-plastic-surgery",
    title: "Marion Plastic Surgery",
    shortDescription: "Case study coming soon.",
    tags: [],
    imageLabel: "Marion Plastic Surgery screenshot",
    featured: false,
  },
  {
    slug: "rapidschema",
    title: "RapidSchema",
    shortDescription:
      "Custom SEO tooling for a large e-commerce platform's schema markup workflows.",
    tags: [
      { label: "Design", tone: "blue" },
      { label: "Development", tone: "blue" },
    ],
    imageLabel: "RapidSchema screenshot",
    image: rapidschemaThumb.src,
    featured: true,
    caseStudy: {
      description:
        "Custom SEO tooling for a large e-commerce platform, built to streamline schema markup workflows across thousands of product pages.",
      heroImageLabel: "RapidSchema hero screenshot",
      heroImage: rapidschemaHero.src,
      problemLabel: "The Problem",
      problem:
        "Schema markup was managed by hand across a sprawling product catalog — slow, error-prone, and impossible to scale as SKUs grew.",
      solutionLabel: "The Solution",
      solution:
        "A custom tool that generates, validates, and deploys structured data automatically, giving the SEO team a single dashboard to manage it all.",
      gallery: [
        { label: "Dashboard screen" },
        { label: "Schema editor screen", src: rapidschemaSchemaEditor.src },
        { label: "Validation report screen" },
      ],
      results: [
        { value: "92%", label: "Faster markup turnaround" },
        { value: "10k+", label: "Product pages covered" },
        { value: "0", label: "Manual schema errors since launch" },
      ],
    },
  },
  {
    slug: "socialscouter",
    title: "SocialScouter",
    shortDescription:
      "Analytics platform for short-form video, with scheduled runs and data integrations.",
    tags: [
      { label: "Design", tone: "blue" },
      { label: "Development", tone: "blue" },
    ],
    imageLabel: "SocialScouter screenshot",
    image: socialscouterThumb.src,
    featured: true,
  },
  {
    slug: "arvori",
    title: "Arvori",
    shortDescription:
      "AI powered account agency management platform for client management and sales.",
    tags: [
      { label: "CMS", tone: "sun" },
      { label: "Membership", tone: "sun" },
    ],
    imageLabel: "Arvori screenshot",
    image: arvoriThumb.src,
    featured: true,
  },
];
