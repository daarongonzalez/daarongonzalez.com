import ImagePlaceholder from "./ImagePlaceholder";
import { WIDE_RATIO, type CaseStudyPhoto, type GalleryImage, type Project, type ProjectStat } from "@/data/projects";

export function ProblemSolution({
  problemLabel,
  problem,
  solutionLabel,
  solution,
}: {
  problemLabel: string;
  problem: string;
  solutionLabel: string;
  solution: string;
}) {
  return (
    <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="bento flex flex-col gap-2.5 bg-sun-lightest p-9">
        <div className="hd text-[13px] text-sun-dark">{problemLabel}</div>
        <p className="m-0 text-[15.5px] leading-relaxed text-ink-darker">{problem}</p>
      </div>
      <div className="bento flex flex-col gap-2.5 bg-brand-lightest p-9">
        <div className="hd text-[13px] text-brand-dark">{solutionLabel}</div>
        <p className="m-0 text-[15.5px] leading-relaxed text-ink-darker">{solution}</p>
      </div>
    </section>
  );
}

const isWide = (image: GalleryImage) => Boolean(image.src && image.aspectRatio && image.aspectRatio >= WIDE_RATIO);

export function Gallery({ images }: { images: GalleryImage[] }) {
  // Slide decks: show every slide whole at its own shape, two across, so the text stays readable.
  if (images.length > 0 && images.every(isWide)) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {images.map((image, i) => (
          <figure key={`${i}-${image.label}`} className="bento m-0 overflow-hidden bg-white">
            <img
              src={image.src}
              alt={image.label}
              loading="lazy"
              draggable={false}
              className="block h-auto w-full object-contain"
              style={{ aspectRatio: String(image.aspectRatio) }}
            />
            <figcaption className="border-t border-ink-lighter px-4 py-3 text-[13px] text-ink-dark">
              {image.label}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {images.map((image) => (
        <div key={image.label} className="bento overflow-hidden">
          {image.src ? (
            <img src={image.src} alt={image.label} className="h-[220px] w-full object-cover" />
          ) : (
            <ImagePlaceholder label={image.label} className="h-[220px]" />
          )}
        </div>
      ))}
    </div>
  );
}

export function PhotoStrip({ photos }: { photos: CaseStudyPhoto[] }) {
  // All landscape: an even grid. On wide screens the first one or two rows use larger tiles,
  // so every row is full; on tablets an odd count lets the first photo span the row.
  if (photos.every((photo) => photo.orientation === "landscape")) {
    const n = photos.length;
    const wideCount = n % 3 === 2 ? 2 : n % 3 === 1 ? 4 : 0;
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className={`bento m-0 overflow-hidden bg-cream ${i < wideCount ? "lg:col-span-3" : "lg:col-span-2"} ${
              n % 2 === 1 && i === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" className="block aspect-[4/3] w-full object-cover" />
            {photo.caption && <figcaption className="px-4 py-3 text-[13px] text-ink-dark">{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }
  // Mixed or portrait: columns let each photo keep its own shape, without cropping.
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {photos.map((photo) => (
        <figure key={photo.src} className="bento m-0 mb-6 break-inside-avoid overflow-hidden bg-cream">
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className={`block w-full object-cover ${photo.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}
          />
          {photo.caption && <figcaption className="px-4 py-3 text-[13px] text-ink-dark">{photo.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export function ResultsStrip({ results, note }: { results: ProjectStat[]; note?: string }) {
  // Up to three stats keep the original single row; four or more wrap two across, then four.
  const columns = results.length > 3 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3";
  return (
    <section className="mt-6">
      <div className={`bento grid ${columns} gap-6 bg-brand-base p-10 text-center text-white`}>
        {results.map((stat) => (
          <div key={stat.label}>
            <div className="hd text-[34px] normal-case text-sun-base">{stat.value}</div>
            <div className="mt-1 text-[13px] text-brand-lighter">{stat.label}</div>
          </div>
        ))}
        {note && (
          <p className="col-span-full m-0 border-t border-brand-light pt-5 text-[13px] leading-relaxed text-brand-lighter">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}

export function PrevNextNav({ previous, next }: { previous?: Project; next?: Project }) {
  if (!previous && !next) return null;
  return (
    <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {previous ? (
        <a href={`/work/${previous.slug}`} className="bento flex flex-col gap-1 bg-cream p-6 text-inherit no-underline">
          <div className="text-xs font-bold text-ink-base">← PREVIOUS</div>
          <div className="hd text-lg">{previous.title}</div>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={`/work/${next.slug}`}
          className="bento flex flex-col items-end gap-1 bg-cream p-6 text-right text-inherit no-underline"
        >
          <div className="text-xs font-bold text-ink-base">NEXT →</div>
          <div className="hd text-lg">{next.title}</div>
        </a>
      ) : (
        <div />
      )}
    </section>
  );
}
