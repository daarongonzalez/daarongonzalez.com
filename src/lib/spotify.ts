/**
 * Playlist data for the homepage "Kid from Lindsay CA" card.
 *
 * Source is Spotify's public embed page, not the Web API. The Web API stopped
 * populating `track.preview_url` for apps registered after late 2024, and the
 * Web Playback SDK would put an OAuth flow and a Premium account in front of
 * every visitor. The embed page still ships the whole playlist — cover art,
 * track titles, artists, and a 30-second clip per track — as a JSON blob, needs
 * no credentials, and is the same pipeline that serves the embedded player.
 *
 * The tradeoff: it is undocumented, so the JSON shape can move without notice.
 * Nothing here reads a fixed key path for that reason — `collectTracks` walks
 * the tree looking for the shape of a track instead. A parse that finds nothing
 * returns null and the card renders its static fallback.
 */

const EMBED_BASE = "https://open.spotify.com/embed/playlist";

/** Spotify is a third party on the render path, so it gets a short leash. */
const FETCH_TIMEOUT_MS = 4000;

/** Playlists change rarely; re-fetching per request would be wasteful. */
const CACHE_TTL_MS = 60 * 60 * 1000;

export interface PlaylistTrack {
  title: string;
  artist: string;
  previewUrl: string;
}

export interface PlaylistData {
  name: string;
  coverUrl: string | null;
  /** The track the card plays. */
  track: PlaylistTrack;
  playlistUrl: string;
}

interface CacheEntry {
  value: PlaylistData | null;
  expires: number;
}

/**
 * Module scope, so it lives as long as the isolate does. Cloudflare may recycle
 * that at any time — this is a hit-rate optimization, never a guarantee.
 */
const cache = new Map<string, CacheEntry>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

/**
 * Pull the JSON out of the embed page. Spotify has shipped it under a couple of
 * different script ids over time, so match the container loosely and let
 * JSON.parse reject anything that is not actually JSON.
 */
function extractEmbedJson(html: string): unknown {
  const scripts = html.matchAll(
    /<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  for (const match of scripts) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    try {
      return JSON.parse(raw);
    } catch {
      // Not the blob we want — keep looking rather than failing the whole parse.
    }
  }
  return null;
}

/**
 * A track is any node carrying a playable clip plus a title. Walking for that
 * shape means a rename anywhere above it (`pageProps`, `state`, `entity`, …)
 * costs us nothing.
 */
function collectTracks(node: unknown, found: PlaylistTrack[] = []): PlaylistTrack[] {
  if (Array.isArray(node)) {
    for (const item of node) collectTracks(item, found);
    return found;
  }
  if (!isRecord(node)) return found;

  const preview =
    asString(node.audioPreviewUrl) ??
    (isRecord(node.audioPreview) ? asString(node.audioPreview.url) : null);
  const title = asString(node.title) ?? asString(node.name);

  if (preview && title) {
    // `subtitle` is the artist line in the embed payload; the nested artist
    // array is the older shape.
    const artists = Array.isArray(node.artists)
      ? node.artists
          .map((artist) => (isRecord(artist) ? asString(artist.name) : null))
          .filter((name): name is string => Boolean(name))
          .join(", ")
      : null;
    found.push({
      title,
      artist: asString(node.subtitle) ?? artists ?? "",
      previewUrl: preview,
    });
  }

  for (const value of Object.values(node)) collectTracks(value, found);
  return found;
}

/**
 * Cover art arrives as a set of sources at different widths. Take the widest —
 * the card renders it small, but it also sits behind a blur at full card size.
 */
function findCoverUrl(node: unknown): string | null {
  const candidates: { url: string; width: number }[] = [];

  const walk = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (!isRecord(value)) return;

    const sources = isRecord(value.coverArt) ? value.coverArt.sources : null;
    if (Array.isArray(sources)) {
      for (const source of sources) {
        if (!isRecord(source)) continue;
        const url = asString(source.url);
        if (url) {
          candidates.push({
            url,
            width: typeof source.width === "number" ? source.width : 0,
          });
        }
      }
    }
    Object.values(value).forEach(walk);
  };

  walk(node);
  if (!candidates.length) return null;
  return candidates.sort((a, b) => b.width - a.width)[0].url;
}

function findPlaylistName(node: unknown): string | null {
  // The entity node is the one carrying both a name and a track list.
  const walk = (value: unknown): string | null => {
    if (Array.isArray(value)) {
      for (const item of value) {
        const hit = walk(item);
        if (hit) return hit;
      }
      return null;
    }
    if (!isRecord(value)) return null;

    if (Array.isArray(value.trackList) && value.trackList.length) {
      const name = asString(value.name) ?? asString(value.title);
      if (name) return name;
    }
    for (const child of Object.values(value)) {
      const hit = walk(child);
      if (hit) return hit;
    }
    return null;
  };
  return walk(node);
}

/**
 * Pick the track the card should play. An exact (case-insensitive) title match
 * wins; a prefix match covers remasters and "- Live" suffixes. Falling through
 * to the first playable track keeps the card working if the song is ever
 * removed from the playlist.
 */
function selectTrack(tracks: PlaylistTrack[], preferredTitle?: string): PlaylistTrack | null {
  if (!tracks.length) return null;
  if (preferredTitle) {
    const wanted = preferredTitle.trim().toLowerCase();
    const exact = tracks.find((track) => track.title.trim().toLowerCase() === wanted);
    if (exact) return exact;
    const prefixed = tracks.find((track) => track.title.trim().toLowerCase().startsWith(wanted));
    if (prefixed) return prefixed;
  }
  return tracks[0];
}

export interface FetchPlaylistOptions {
  playlistId: string;
  /** Title of the track to feature. Falls back to the first playable track. */
  preferredTrack?: string;
}

/**
 * Returns null rather than throwing — the homepage renders whether or not
 * Spotify answers, and a playlist card is not worth a 500.
 */
export async function fetchPlaylist({
  playlistId,
  preferredTrack,
}: FetchPlaylistOptions): Promise<PlaylistData | null> {
  const cacheKey = `${playlistId}::${preferredTrack ?? ""}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return cached.value;

  let result: PlaylistData | null = null;

  try {
    const response = await fetch(`${EMBED_BASE}/${playlistId}`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        // The embed page serves a slimmer payload to clients it does not
        // recognize as browsers.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (response.ok) {
      const data = extractEmbedJson(await response.text());
      const track = selectTrack(collectTracks(data), preferredTrack);
      if (track) {
        result = {
          name: findPlaylistName(data) ?? "",
          coverUrl: findCoverUrl(data),
          track,
          playlistUrl: `https://open.spotify.com/playlist/${playlistId}`,
        };
      }
    }
  } catch {
    // Timeout, network error, or a payload we could not read. The caller's
    // fallback copy covers all three identically.
  }

  // Cache the miss too, so an outage does not mean a slow fetch on every
  // request. A shorter TTL gets us back to live data reasonably soon.
  cache.set(cacheKey, {
    value: result,
    expires: Date.now() + (result ? CACHE_TTL_MS : 5 * 60 * 1000),
  });

  return result;
}
