export interface PlaylistTrack {
  title: string;
  artist: string;
  /** Spotify track ID — the part after /track/ in a Spotify share link. */
  id: string;
}

/**
 * The homepage playlist card.
 *
 * Playback runs through Spotify's IFrame Embed API, which needs no API key and no
 * server-side auth: the visitor's browser loads a hidden Spotify player and we drive
 * it with our own controls. Visitors who aren't signed into Spotify hear a 30-second
 * preview; signed-in Premium listeners hear the full track. That's Spotify's rule for
 * every embed, not something this component chooses.
 *
 * To add a track: open it in Spotify → Share → Copy Song Link, then take the ID out of
 * https://open.spotify.com/track/<id>?si=... and add an entry below. Order here is the
 * order the "next" button walks through.
 */
export const playlist = {
  name: "The Kid from Lindsay CA",
  eyebrow: "Off the clock",
  blurb: "The playlist I actually work to. Hit play — it's the fastest way to get to know me.",
  url: "https://open.spotify.com/playlist/7tO8OmVfYNPLFhYZEl4wh4",
  uri: "spotify:playlist:7tO8OmVfYNPLFhYZEl4wh4",
  tracks: [] as PlaylistTrack[],
};
