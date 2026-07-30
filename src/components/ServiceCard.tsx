interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
  return (
    <div className="bento group relative flex min-h-[250px] flex-col justify-end gap-3 overflow-hidden bg-cream p-8 text-ink-darker transition-[background-color,border-radius,border-color] duration-200 ease-out hover:border-sun-base hover:bg-sun-base">
      <div className="hd absolute -top-[22px] right-1.5 text-[110px] leading-none text-brand-base opacity-[.16] transition-opacity duration-200 ease-out group-hover:opacity-100">
        {number}
      </div>
      <div className="hd text-[26px]">{title}</div>
      <p className="m-0 text-[14.5px] leading-relaxed opacity-80">{description}</p>
    </div>
  );
}
