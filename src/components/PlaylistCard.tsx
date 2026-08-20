import { useCallback, useEffect, useRef, useState } from "react";
import { playlist } from "@/data/playlist";

/**
 * Minimal shape of the bits of Spotify's IFrame Embed API we actually use.
 * https://developer.spotify.com/documentation/embeds/references/iframe-api
 */
interface SpotifyController {
  loadUri: (uri: string) => void;
  play: () => void;
  togglePlay: () => void;
  destroy: () => void;
  addListener: (event: "ready" | "playback_update", cb: (e: { data: PlaybackData }) => void) => void;
}

interface PlaybackData {
  isPaused: boolean;
  isBuffering: boolean;
  position: number;
  duration: number;
}

interface SpotifyIFrameApi {
  createController: (
    element: HTMLElement,
    options: { uri: string; width: string | number; height: string | number },
    callback: (controller: SpotifyController) => void,
  ) => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameApi) => void;
  }
}

const IFRAME_API_SRC = "https://open.spotify.com/embed/iframe-api/v1";

/**
 * Spotify's script is only fetched the first time someone presses play, so the
 * homepage never pays for a third-party request the visitor didn't ask for.
 */
let apiPromise: Promise<SpotifyIFrameApi> | null = null;

function loadIFrameApi(): Promise<SpotifyIFrameApi> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = IFRAME_API_SRC;
    script.async = true;
    document.body.appendChild(script);
  });
  return apiPromise;
}

const trackUri = (id: string) => `spotify:track:${id}`;

export default function PlaylistCard() {
  const { tracks } = playlist;
  const hasTracks = tracks.length > 0;

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const controllerRef = useRef<SpotifyController | null>(null);
  const embedRef = useRef<HTMLDivElement | null>(null);

  const track = hasTracks ? tracks[index % tracks.length] : undefined;

  useEffect(() => {
    return () => controllerRef.current?.destroy();
  }, []);

  /** First press: spin up the hidden Spotify player pointed at the current track. */
  const activate = useCallback(async () => {
    if (!embedRef.current || !track) return;
    setIsLoading(true);
    const api = await loadIFrameApi();
    api.createController(
      embedRef.current,
      { uri: trackUri(track.id), width: "100%", height: 80 },
      (controller) => {
        controllerRef.current = controller;
        controller.addListener("playback_update", ({ data }) => {
          setIsPlaying(!data.isPaused);
          setIsLoading(data.isBuffering);
        });
        controller.play();
        setIsLoading(false);
      },
    );
  }, [track]);

  const handleToggle = useCallback(() => {
    if (!hasTracks) return;
    if (controllerRef.current) {
      controllerRef.current.togglePlay();
      return;
    }
    void activate();
  }, [activate, hasTracks]);

  const handleNext = useCallback(() => {
    if (!hasTracks) return;
    const next = (index + 1) % tracks.length;
    setIndex(next);

    const controller = controllerRef.current;
    if (!controller) return;
    controller.loadUri(trackUri(tracks[next].id));
    // loadUri swaps the track but leaves the player paused, and the new track isn't
    // ready to accept play() on the same tick — so nudge it once the swap settles.
    window.setTimeout(() => controller.play(), 350);
  }, [hasTracks, index, tracks]);

  return (
    <div className="bento group relative flex min-h-[250px] flex-col justify-between gap-5 overflow-hidden bg-brand-base p-8 text-cream">
      {/* Same soft geometry as the hero, so the card reads as part of that family. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-[70px] -top-[80px] h-[200px] w-[200px] rounded-full bg-sun-base opacity-[.08]" />
      </div>

      <Record isPlaying={isPlaying} />

      <div className="relative flex flex-col gap-1">
        <div className="text-[12.5px] font-bold uppercase tracking-[.2em] text-sun-base">
          {playlist.eyebrow}
        </div>
        <a
          href={playlist.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-[13px] font-bold text-brand-lighter no-underline hover:text-cream"
        >
          {playlist.name} on Spotify ↗
        </a>
      </div>

      <div className="relative flex flex-col gap-4">
        {track ? (
          <div className="flex flex-col gap-0.5 pr-16">
            <div className="hd truncate text-[19px] leading-tight" title={track.title}>
              {track.title}
            </div>
            <div className="truncate text-[13.5px] text-brand-lighter" title={track.artist}>
              {track.artist}
            </div>
          </div>
        ) : (
          <p className="m-0 max-w-[240px] text-[14.5px] leading-relaxed text-brand-lighter">
            {playlist.blurb}
          </p>
        )}

        {hasTracks && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggle}
              aria-label={isPlaying ? `Pause ${track?.title}` : `Play ${track?.title}`}
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-sun-base text-ink-darker transition-[transform,box-shadow] duration-300 ease-in-out hover:scale-105 hover:shadow-[0_6px_18px_rgba(253,181,21,.35)] active:scale-95"
            >
              {isLoading ? <LoadingGlyph /> : isPlaying ? <PauseGlyph /> : <PlayGlyph />}
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next track"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-cream/30 text-cream transition-[transform,border-color] duration-300 ease-in-out hover:border-sun-base active:scale-95"
            >
              <NextGlyph />
            </button>
            <div className="text-[12px] font-bold tracking-[.14em] text-brand-meta">
              {String(index + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
            </div>
          </div>
        )}
      </div>

      {/* Spotify's real player lives here, off-screen — it does the audio, our UI does the rest. */}
      <div className="pointer-events-none absolute -left-[9999px] h-20 w-[300px] opacity-0" aria-hidden="true">
        <div ref={embedRef} />
      </div>
    </div>
  );
}

function Record({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -right-9 top-7 h-[104px] w-[104px] transition-[transform,opacity] duration-500 ease-in-out ${
        isPlaying ? "translate-x-0 scale-100 opacity-100" : "translate-x-10 scale-90 opacity-0"
      }`}
    >
      <svg viewBox="0 0 100 100" className={isPlaying ? "record-spin" : undefined}>
        <circle cx="50" cy="50" r="49" fill="#101010" />
        <circle cx="50" cy="50" r="49" fill="none" stroke="var(--color-sun-base)" strokeWidth="1" opacity=".45" />
        {[40, 33, 26].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="var(--color-cream)" strokeWidth=".5" opacity=".18" />
        ))}
        <circle cx="50" cy="50" r="18" fill="var(--color-sun-base)" />
        {/* Off-centre mark so the rotation actually reads as spin. */}
        <circle cx="50" cy="38" r="2.5" fill="var(--color-brand-base)" opacity=".5" />
        <circle cx="50" cy="50" r="3.5" fill="var(--color-brand-base)" />
      </svg>
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg width="15" height="17" viewBox="0 0 15 17" fill="currentColor" aria-hidden="true">
      <path d="M14 7.13a1.6 1.6 0 0 1 0 2.74l-11 6.6A1.6 1.6 0 0 1 .6 15.1V1.9A1.6 1.6 0 0 1 3 .53l11 6.6Z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="5" height="16" rx="1.6" />
      <rect x="9" y="0" width="5" height="16" rx="1.6" />
    </svg>
  );
}

function NextGlyph() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor" aria-hidden="true">
      <path d="M1 1.2a1.2 1.2 0 0 1 1.85-1l7.2 5.8a1.2 1.2 0 0 1 0 2l-7.2 5.8A1.2 1.2 0 0 1 1 12.8V1.2Z" />
      <rect x="12.5" y="0.6" width="2.6" height="12.8" rx="1.3" />
    </svg>
  );
}

function LoadingGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-spin">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2" opacity=".25" />
      <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
