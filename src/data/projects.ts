import rapidschemaThumb from "@/assets/images/rapidschema-thumb.png";
import socialscouterThumb from "@/assets/images/socialscouter-thumb.png";
import arvoriThumb from "@/assets/images/arvori-thumb.png";
import rapidschemaHero from "@/assets/images/rapidschema-hero.png";
import rapidschemaSchemaEditor from "@/assets/images/rapidschema-schema-editor.png";

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
  };
}

export const projects: Project[] = [
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

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous: projects[index - 1],
    next: projects[index + 1],
  };
}
