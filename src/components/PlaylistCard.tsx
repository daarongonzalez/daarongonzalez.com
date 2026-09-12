import { useEffect, useRef, useState } from "react";
import type { PlaylistData } from "@/lib/spotify";

interface PlaylistCardProps {
  /** Null when Spotify could not be reached — the card links out instead. */
  data: PlaylistData | null;
  fallbackName: string;
  fallbackTrackTitle: string;
  playlistUrl: string;
}

export default function PlaylistCard({
  data,
  fallbackName,
  fallbackTrackTitle,
  playlistUrl,
}: PlaylistCardProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const name = data?.name || fallbackName;
  const cover = data?.coverUrl ?? null;
  const track = data?.track ?? null;
  const href = data?.playlistUrl ?? playlistUrl;

  const trackLine = track
    ? [track.title, track.artist].filter(Boolean).join(" — ")
    : fallbackTrackTitle;

  // A clip that ends should reset the card rather than leave it looking paused
  // mid-track.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [track?.previewUrl]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    // Autoplay policy can still refuse this; a rejected promise must not leave
    // the card animating with no sound.
    void audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  return (
    // Deliberately not a .bento — this card keeps a flat radius on hover and
    // carries no hairline border, so it reads as the one off-duty tile in the
    // services row.
    <div className="bokashi-cool relative flex min-h-[250px] flex-col gap-4 overflow-hidden rounded-2xl bg-brand-base p-6 text-cream shadow-[0_4px_20px_rgba(25,25,25,.07)]">
      {/* The artwork carried across the whole card — blurred well past
          recognition and blended into the navy, so it tints the field without
          competing with the sleeve up front or costing the text its contrast. */}
      {cover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-40 mix-blend-soft-light blur-2xl"
          style={{ backgroundImage: `url(${cover})` }}
        />
      )}

      <div className="relative flex flex-1 flex-col gap-4">
        {/* Vinyl assembly — sleeve in front, disc behind and to the right. */}
        <div className="relative aspect-[1.56/1] w-full max-w-[200px]">
          <div
            className="playlist-disc-shift absolute left-[44%] top-[3%] h-[94%] w-[60%] transition-transform duration-500 ease-out"
            style={{ transform: playing ? "translateX(14%)" : "translateX(0)" }}
          >
            <div
              className="playlist-disc h-full w-full rounded-full border border-[rgba(247,241,227,.2)]"
              style={{ animationPlayState: playing ? "running" : "paused" }}
            >
              <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-base" />
              <div className="absolute left-1/2 top-1/2 h-[7%] w-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-base" />
            </div>
          </div>

          <div className="absolute left-0 top-0 aspect-square w-[64%] overflow-hidden rounded-md shadow-[0_10px_24px_rgba(0,0,0,.35)]">
            {cover ? (
              <img
                src={cover}
                alt={`${name} playlist cover`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-brand-dark" />
            )}
          </div>
        </div>

        <div className="hd text-xl leading-[1.05] text-sun-base">{name}</div>

        <div className="mt-auto flex items-center gap-[11px]">
          {track ? (
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? `Pause ${track.title}` : `Play a clip of ${track.title}`}
              aria-pressed={playing}
              className="flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center rounded-full bg-sun-base text-xs text-ink-darker transition-transform duration-150 hover:scale-[1.07]"
            >
              {playing ? "❚❚" : "▶"}
            </button>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${name} on Spotify`}
              className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-sun-base text-xs text-ink-darker transition-transform duration-150 hover:scale-[1.07]"
            >
              ▶
            </a>
          )}

          <div className="min-w-0 flex-1">
            <div className="mb-[5px] overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold">
              {trackLine}
            </div>
            <div className="relative h-[3px] rounded-full bg-[rgba(247,241,227,.25)]">
              <div
                className="absolute bottom-0 left-0 top-0 rounded-full bg-sun-base transition-[width] duration-200 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {track && (
        <audio ref={audioRef} src={track.previewUrl} preload="none" className="hidden" />
      )}
    </div>
  );
}
