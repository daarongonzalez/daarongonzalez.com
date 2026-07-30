interface ApproachCardProps {
  title: string;
  description: string;
}

export default function ApproachCard({ title, description }: ApproachCardProps) {
  return (
    <div className="bento flex flex-col gap-2.5 bg-cream p-8">
      <div className="hd text-lg">{title}</div>
      <p className="m-0 text-[14.5px] leading-relaxed text-ink-dark">{description}</p>
    </div>
  );
}
