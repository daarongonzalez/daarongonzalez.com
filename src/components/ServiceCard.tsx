import { icons, type IconName } from "./icons";

interface ServiceCardProps {
  icon: IconName;
  swatch: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, swatch, title, description }: ServiceCardProps) {
  const Icon = icons[icon];
  return (
    <div className="card card-bordered flex flex-col gap-3 bg-cream p-8">
      <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${swatch}`}>
        <Icon />
      </div>
      <div className="hd text-xl">{title}</div>
      <p className="m-0 text-[14.5px] leading-relaxed text-ink-dark">{description}</p>
    </div>
  );
}
