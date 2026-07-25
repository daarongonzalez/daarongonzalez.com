import Button from "./Button";

interface CTAPanelProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  layout?: "compact" | "banner";
}

export default function CTAPanel({
  title,
  description,
  buttonLabel,
  buttonHref,
  layout = "banner",
}: CTAPanelProps) {
  if (layout === "compact") {
    return (
      <div className="bento flex flex-col justify-center gap-4 bg-brand-base p-10 text-white">
        <div className="hd text-2xl">{title}</div>
        <p className="m-0 text-[15px] leading-relaxed text-brand-lighter">{description}</p>
        <Button href={buttonHref} variant="accent" className="justify-center">
          {buttonLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="bento flex flex-wrap items-center justify-between gap-5 bg-brand-base p-10 text-white">
      <div>
        <div className="hd text-2xl">{title}</div>
        <p className="m-0 mt-1.5 text-[15px] text-brand-lighter">{description}</p>
      </div>
      <Button href={buttonHref} variant="accent">
        {buttonLabel}
      </Button>
    </div>
  );
}
