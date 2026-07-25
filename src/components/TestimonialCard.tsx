import ImagePlaceholder from "./ImagePlaceholder";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export default function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="bento flex flex-col justify-center gap-4 bg-white p-10">
      <div className="text-4xl leading-none text-sun-base">&ldquo;</div>
      <p className="m-0 text-lg leading-relaxed text-ink-darker italic">{quote}</p>
      <div className="mt-2 flex items-center gap-3">
        <ImagePlaceholder label="Photo" shape="circle" className="h-12 w-12" />
        <div>
          <div className="text-sm font-bold">{name}</div>
          <div className="text-[13px] text-ink-base">{role}</div>
        </div>
      </div>
    </div>
  );
}
