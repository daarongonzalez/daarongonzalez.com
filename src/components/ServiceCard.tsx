import { icons, type IconName } from "./icons";

interface ServiceCardProps {
  icon: IconName;
  swatch: string;
  iconColor: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, swatch, iconColor, title, description }: ServiceCardProps) {
  const Icon = icons[icon];
  return (
    <div className="bento flex flex-col gap-3 bg-white p-8">
      <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${swatch}`}>
        <Icon color={iconColor} />
      </div>
      <div className="hd text-xl">{title}</div>
      <p className="m-0 text-[14.5px] leading-relaxed text-ink-dark">{description}</p>
    </div>
  );
}
