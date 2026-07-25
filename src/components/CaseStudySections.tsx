import ImagePlaceholder from "./ImagePlaceholder";
import type { Project, ProjectStat } from "@/data/projects";

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

export function Gallery({ images }: { images: string[] }) {
  return (
    <section className="mt-6">
      <div className="hd mb-4 text-[22px]">Process &amp; Screens</div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {images.map((label) => (
          <div key={label} className="bento overflow-hidden">
            <ImagePlaceholder label={label} className="h-[220px]" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ResultsStrip({ results }: { results: ProjectStat[] }) {
  return (
    <section className="mt-6">
      <div className="bento grid grid-cols-1 gap-6 bg-brand-base p-10 text-center text-white sm:grid-cols-3">
        {results.map((stat) => (
          <div key={stat.label}>
            <div className="hd text-[34px] text-sun-base">{stat.value}</div>
            <div className="mt-1 text-[13px] text-brand-lighter">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PrevNextNav({ previous, next }: { previous?: Project; next?: Project }) {
  if (!previous && !next) return null;
  return (
    <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {previous ? (
        <a href={`/work/${previous.slug}`} className="bento flex flex-col gap-1 bg-white p-6 text-inherit no-underline">
          <div className="text-xs font-bold text-ink-base">← PREVIOUS</div>
          <div className="hd text-lg">{previous.title}</div>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={`/work/${next.slug}`}
          className="bento flex flex-col items-end gap-1 bg-white p-6 text-right text-inherit no-underline"
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
