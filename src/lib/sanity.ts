import { sanityClient } from "sanity:client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { Review } from "@/data/site";

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
