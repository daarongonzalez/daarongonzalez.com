import type { EducationFormat } from "@/data/education";

export default function EducationCard({
  number,
  title,
  description,
  meta,
}: EducationFormat & { number: string }) {
  return (
    <div className="bento group relative flex min-h-[230px] flex-col gap-3 overflow-hidden bg-cream p-7 text-ink-darker transition-[border-color] duration-200 ease-out hover:border-sun-base">
      <div className="hd absolute -top-[18px] right-1.5 text-[86px] leading-none text-transparent [-webkit-text-stroke:2px_var(--color-sun-base)] opacity-40 transition-opacity duration-500 ease-out group-hover:opacity-100">
        {number}
      </div>
      <span className="tag-pill relative w-fit bg-sun-lighter text-sun-darker">{meta}</span>
      <div className="hd relative pr-10 text-[19px] leading-tight">{title}</div>
      <p className="relative m-0 text-[14px] leading-relaxed text-ink-dark">{description}</p>
    </div>
  );
}
