interface TimelineCardProps {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export default function TimelineCard({ number, title, description, highlight }: TimelineCardProps) {
  return (
    <div
      className={`bento flex flex-col gap-2 p-7 ${
        highlight ? "bg-brand-base text-white" : "bg-white text-ink-darker"
      }`}
    >
      <div className={`hd text-[13px] ${highlight ? "text-sun-base" : "text-brand-base"}`}>{number}</div>
      <div className="hd text-[17px]">{title}</div>
      <p className={`m-0 text-[13.5px] leading-relaxed ${highlight ? "text-brand-lighter" : "text-ink-dark"}`}>
        {description}
      </p>
    </div>
  );
}
