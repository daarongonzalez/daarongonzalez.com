import type { ReactNode } from "react";
import WorkCard from "./WorkCard";
import TagPill from "./TagPill";
import type { SessionPhoto, WorkItem, Workshop } from "@/data/work";

/**
 * One item in the mixed Work feed. "row" sizes cards for the homepage's
 * horizontal scroller; "grid" lets them fill the cells of the /work grid.
 */
type Layout = "row" | "grid";

/** Shape of the Stack session thumbnails; used for title panels and images of unknown size. */
const DEFAULT_THUMBNAIL_RATIO = 1024 / 366;

export default function WorkFeedCard({ item, layout }: { item: WorkItem; layout: Layout }) {
  if (item.kind === "project") {
    return (
      <WorkCard
        project={item.project}
        className={layout === "row" ? "w-[340px] flex-none" : "h-full w-full"}
      />
    );
  }
  if (item.kind === "workshop") return <WorkshopCard workshop={item.workshop} layout={layout} />;
  return <PhotoCard photo={item.photo} layout={layout} />;
}

function WorkshopCard({ workshop, layout }: { workshop: Workshop; layout: Layout }) {
  const size = layout === "row" ? "w-[min(560px,85vw)] flex-none" : "h-full w-full";
  const body = (
    <>
      {/* The frame takes each thumbnail's own proportions so none of it is cropped. */}
      <div
        className="w-full overflow-hidden bg-brand-base"
        style={{ aspectRatio: workshop.aspectRatio ?? DEFAULT_THUMBNAIL_RATIO }}
      >
        {workshop.image ? (
          <img src={workshop.image} alt={workshop.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="bokashi-cool flex h-full flex-col justify-center gap-2 px-7 text-cream">
            <div className="text-[11px] font-bold uppercase tracking-[.2em] text-sun-base">{workshop.eyebrow}</div>
            <div className="hd text-[clamp(22px,3vw,32px)] leading-[.95]">{workshop.title}</div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <TagPill label="Workshop" tone="sun" />
          <span className="text-[12.5px] font-bold text-ink-base">{workshop.eyebrow}</span>
        </div>
        <div className="hd text-lg leading-[1.15]">{workshop.title}</div>
        {workshop.description && (
          <p className="m-0 text-sm leading-relaxed text-ink-dark">{workshop.description}</p>
        )}
      </div>
    </>
  );

  return (
    <CardShell href={workshop.url} className={`bento flex flex-col overflow-hidden bg-cream ${size}`}>
      {body}
    </CardShell>
  );
}

function PhotoCard({ photo, layout }: { photo: SessionPhoto; layout: Layout }) {
  const rowWidth = photo.orientation === "portrait" ? "w-[260px]" : "w-[min(440px,85vw)]";
  const size = layout === "row" ? `${rowWidth} flex-none` : "h-full min-h-[340px] w-full";
  return (
    <figure className={`bento relative m-0 overflow-hidden bg-brand-darker ${size}`}>
      <img
        src={photo.image}
        alt={photo.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-gradient-to-t from-brand-darkest/90 via-brand-darkest/60 to-transparent px-5 pb-5 pt-12 text-cream">
        <span className="text-[11px] font-bold uppercase tracking-[.2em] text-sun-base">On stage</span>
        <span className="text-sm font-bold leading-snug">{photo.caption}</span>
      </figcaption>
    </figure>
  );
}

function CardShell({ href, className, children }: { href?: string; className: string; children: ReactNode }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} text-inherit no-underline`}>
      {children}
    </a>
  );
}
