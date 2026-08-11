import type { ReviewPair } from "@/data/site";
import type { FetchedReviewPair } from "@/lib/sanity";

/** Use a Sanity value when present and non-empty, otherwise fall back to the hardcoded default. */
export function pick<T>(fetched: T | null | undefined, fallback: T): T {
  if (fetched == null) return fallback;
  if (typeof fetched === "string") return (fetched.trim() ? fetched : fallback) as T;
  if (Array.isArray(fetched)) return (fetched.length ? fetched : fallback) as T;
  return fetched;
}

/**
 * Reviews keep their avatar images out of Sanity (they're local assets), so fetched
 * review text is merged onto the default at the same index — falling back to the
 * last default pair's avatar if more sets are added in Sanity than exist locally.
 */
export function mergeReviewSets(
  fetched: FetchedReviewPair[] | undefined,
  defaults: ReviewPair[],
): ReviewPair[] {
  if (!fetched?.length) return defaults;
  return fetched.map((pair, i) => {
    const fallback = defaults[i] ?? defaults[defaults.length - 1];
    return {
      primary: { ...fallback.primary, ...pair.primary },
      secondary: { ...fallback.secondary, ...pair.secondary },
    };
  });
}
