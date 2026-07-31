import { useState } from "react";
import type { Review, ReviewPair } from "@/data/site";

function Avatar({ review, size }: { review: Review; size: number }) {
  const style = { width: size, height: size };
  if (review.avatar) {
    return (
      <img
        src={review.avatar}
        alt={review.name}
        style={style}
        className="flex-none rounded-full object-cover"
      />
    );
  }
  return <div style={style} className="flex-none rounded-full bg-cream/[.14]" />;
}

export default function ReviewBand({ sets }: { sets: ReviewPair[] }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = sets.length > 1;
  const { primary, secondary } = sets[index % sets.length];

  return (
    <section className="mt-14 flex flex-col gap-8">
      <div className="flex items-center gap-5">
        <div className="whitespace-nowrap text-[13px] font-bold tracking-[.18em] text-brand-base">
          04 / PRAISE
        </div>
        <div className="h-1 flex-1 bg-sun-base" />
        {hasMultiple && (
          <div className="whitespace-nowrap text-[13px] font-bold tracking-[.14em] text-ink-base">
            SET {index + 1} OF {sets.length}
          </div>
        )}
      </div>

      <div className="relative pt-[26px]">
        <div className="grid grid-cols-1 gap-11 rounded-2xl bg-brand-base p-8 text-cream sm:p-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-5 pr-20 sm:pr-0">
            <div className="hd h-[50px] text-[130px] leading-[.5] text-sun-base opacity-30">&ldquo;</div>
            <div className="hd text-[34px] leading-[1.12] tracking-tight">{primary.lead}</div>
            <p className="m-0 text-[15px] leading-relaxed text-brand-lighter">{primary.body}</p>
            <div className="mt-0.5 flex items-center gap-3">
              <Avatar review={primary} size={52} />
              <div>
                <div className="text-[15px] font-bold">{primary.name}</div>
                <div className="text-[13px] text-brand-meta">{primary.role}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-white/[.18] pt-0 lg:border-l lg:pt-[74px] lg:pl-9">
            <div className="text-xs font-bold tracking-[.18em] text-sun-base">ALSO SAID</div>
            <p className="m-0 text-base leading-relaxed text-cream-deep">{secondary.body}</p>
            <div className="mt-0.5 flex items-center gap-3">
              <Avatar review={secondary} size={44} />
              <div>
                <div className="text-sm font-bold">{secondary.name}</div>
                <div className="text-[12.5px] text-brand-meta">{secondary.role}</div>
              </div>
            </div>
            {hasMultiple && (
              <div className="mt-3.5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev + 1) % sets.length)}
                  className="pill-btn bg-sun-base text-ink-darker"
                >
                  More reviews →
                </button>
                <div className="flex gap-2">
                  {sets.map((_, i) => (
                    <span
                      key={i}
                      className={`h-[9px] w-[9px] rounded-full ${i === index ? "bg-sun-base" : "bg-cream/30"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-3 top-0 flex h-[84px] w-[84px] rotate-[-11deg] items-center justify-center rounded-full bg-sun-base shadow-[0_8px_22px_rgba(25,25,25,.2)] sm:right-[34px] sm:h-[132px] sm:w-[132px]">
          <div className="hd text-center text-[10px] leading-[1.25] text-ink-darker sm:text-sm">
            Booking
            <br />
            Q3 2026
          </div>
        </div>
      </div>
    </section>
  );
}
