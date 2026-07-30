import Button from "./Button";

interface CTAPanelProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  tone?: "navy" | "cream";
  padding?: string;
  headingClassName?: string;
  descriptionClassName?: string;
}

export default function CTAPanel({
  title,
  description,
  buttonLabel,
  buttonHref,
  tone = "navy",
  padding = "p-11",
  headingClassName = "text-2xl",
  descriptionClassName = "text-[15px]",
}: CTAPanelProps) {
  const isNavy = tone === "navy";

  return (
    <div
      className={`bento flex flex-wrap items-center justify-between gap-6 ${padding} ${
        isNavy ? "bg-brand-base text-white" : "bg-cream text-ink-darker"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className={`hd ${headingClassName}`}>{title}</div>
        <p className={`m-0 max-w-[420px] leading-relaxed ${descriptionClassName} ${isNavy ? "text-brand-lighter" : "text-ink-dark"}`}>
          {description}
        </p>
      </div>
      <Button href={buttonHref} variant={isNavy ? "accent" : "primary"} className="px-[34px] py-4">
        {buttonLabel}
      </Button>
    </div>
  );
}
