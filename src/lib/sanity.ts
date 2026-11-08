import { sanityClient } from "sanity:client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { Review } from "@/data/site";
import type { Project } from "@/data/projects";
import type { Workshop, SessionPhoto } from "@/data/work";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  body?: unknown[];
  publishedAt: string;
  seoDescription?: string;
  featured?: boolean;
}

export interface SanityEvent {
  _id: string;
  title: string;
  slug: string;
  startsAt: string;
  location?: string;
  description?: string;
  coverImage?: SanityImageSource;
  lumaUrl: string;
  status: "upcoming" | "past";
}

const postProjection = `{
  _id, title, "slug": slug.current, category, excerpt, coverImage, body,
  publishedAt, seoDescription, featured
}`;

const eventProjection = `{
  _id, title, "slug": slug.current, startsAt, location, description,
  coverImage, lumaUrl, status
}`;

export function getAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postProjection}`,
  );
}

export function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] ${postProjection}`,
    { slug },
  );
}

export function getAllEvents(): Promise<SanityEvent[]> {
  return sanityClient.fetch(
    `*[_type == "event" && defined(slug.current)] | order(startsAt desc) ${eventProjection}`,
  );
}

export function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  return sanityClient.fetch(
    `*[_type == "event" && slug.current == $slug][0] ${eventProjection}`,
    { slug },
  );
}

export interface CtaPanelContent {
  title?: string;
  description?: string;
  buttonLabel?: string;
}

export type FetchedReview = Partial<Omit<Review, "avatar">>;

export interface FetchedReviewPair {
  primary?: FetchedReview;
  secondary?: FetchedReview;
}

export interface SiteSettings {
  hero?: { eyebrow?: string; lines?: string[]; goldWord?: string; body?: string };
  services?: { title: string; description: string }[];
  homeAboutStrip?: string;
  aboutStats?: { value: string; label: string }[];
  homeSections?: {
    workHeading?: string;
    workBlurb?: string;
    blogHeading?: string;
    blogBlurb?: string;
  };
  reviewSets?: FetchedReviewPair[];
  homeCta?: CtaPanelContent;
  aboutIntro?: { heading?: string; body?: string };
  timeline?: { number: string; title: string; description: string; highlight?: boolean }[];
  approach?: { title: string; description: string }[];
  aboutCta?: CtaPanelContent;
}

const siteSettingsProjection = `{
  hero, services, homeAboutStrip, aboutStats, homeSections,
  reviewSets, homeCta, aboutIntro, timeline, approach, aboutCta
}`;

export function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(`*[_type == "siteSettings"][0] ${siteSettingsProjection}`);
}

// ── Work: projects, workshops and session photos ────────────────────────────
// Fetched documents are mapped onto the same shapes the local fallback data in
// src/data uses, so the cards and case-study page don't care where content came from.


interface SanityImageWithAlt {
  asset?: { _ref: string };
  alt?: string;
  aspectRatio?: number;
}

const imageFields = `asset, hotspot, crop, alt, "aspectRatio": asset->metadata.dimensions.aspectRatio`;

const projectProjection = `{
  title, "slug": slug.current, shortDescription, featured,
  tags[]{ label, tone },
  thumbnail{ ${imageFields} },
  caseStudy{
    description, problemLabel, problem, solutionLabel, solution,
    heroImage{ ${imageFields} },
    gallery[]{ label, image },
    results[]{ value, label }
  }
}`;

interface FetchedProject {
  title: string;
  slug: string;
  shortDescription?: string;
  featured?: boolean;
  tags?: { label: string; tone?: "blue" | "sun" }[];
  thumbnail?: SanityImageWithAlt;
  caseStudy?: {
    description?: string;
    heroImage?: SanityImageWithAlt;
    problemLabel?: string;
    problem?: string;
    solutionLabel?: string;
    solution?: string;
    gallery?: { label: string; image?: SanityImageSource }[];
    results?: { value: string; label: string }[];
  };
}

const imageUrl = (image: SanityImageWithAlt | SanityImageSource | undefined, width: number) =>
  image && (image as SanityImageWithAlt).asset ? urlFor(image).width(width).auto("format").url() : undefined;

function toProject(doc: FetchedProject): Project {
  const cs = doc.caseStudy;
  return {
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription ?? "",
    tags: (doc.tags ?? []).map((tag) => ({ label: tag.label, tone: tag.tone ?? "blue" })),
    imageLabel: doc.thumbnail?.alt ?? `${doc.title} screenshot`,
    image: imageUrl(doc.thumbnail, 720),
    featured: Boolean(doc.featured),
    caseStudy:
      cs && (cs.description || cs.problem || cs.solution)
        ? {
            description: cs.description ?? doc.shortDescription ?? "",
            heroImageLabel: cs.heroImage?.alt ?? `${doc.title} hero screenshot`,
            heroImage: imageUrl(cs.heroImage, 1600),
            problemLabel: cs.problemLabel ?? "The Problem",
            problem: cs.problem ?? "",
            solutionLabel: cs.solutionLabel ?? "The Solution",
            solution: cs.solution ?? "",
            gallery: (cs.gallery ?? []).map((item) => ({ label: item.label, src: imageUrl(item.image, 1000) })),
            results: cs.results ?? [],
          }
        : undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const docs: FetchedProject[] = await sanityClient.fetch(
    `*[_type == "project" && defined(slug.current)] | order(sortOrder asc, _createdAt asc) ${projectProjection}`,
  );
  return docs.map(toProject);
}

export async function getWorkshops(): Promise<Workshop[]> {
  const docs: {
    title: string;
    eyebrow?: string;
    description?: string;
    thumbnail?: SanityImageWithAlt;
    url?: string;
    featured?: boolean;
  }[] = await sanityClient.fetch(
    `*[_type == "workshop" && defined(title)] | order(sortOrder asc, _createdAt asc){
      title, eyebrow, description, url, featured, thumbnail{ ${imageFields} }
    }`,
  );
  return docs.map((doc) => ({
    title: doc.title,
    eyebrow: doc.eyebrow ?? "Workshop",
    description: doc.description,
    image: imageUrl(doc.thumbnail, 1200),
    aspectRatio: doc.thumbnail?.aspectRatio,
    url: doc.url,
    featured: Boolean(doc.featured),
  }));
}

export async function getSessionPhotos(): Promise<SessionPhoto[]> {
  const docs: { caption: string; photo?: SanityImageWithAlt; featured?: boolean }[] = await sanityClient.fetch(
    `*[_type == "sessionPhoto" && defined(photo.asset)] | order(sortOrder asc, _createdAt asc){
      caption, featured, photo{ ${imageFields} }
    }`,
  );
  return docs.map((doc) => ({
    caption: doc.caption,
    alt: doc.photo?.alt ?? doc.caption,
    image: imageUrl(doc.photo, 1000)!,
    orientation: (doc.photo?.aspectRatio ?? 1) < 1 ? "portrait" : "landscape",
    featured: Boolean(doc.featured),
  }));
}
