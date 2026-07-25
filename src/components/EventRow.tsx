import Button from "./Button";

interface EventRowProps {
  title: string;
  date: string;
  variant?: "upcoming" | "past";
}

export default function EventRow({ title, date, variant = "upcoming" }: EventRowProps) {
  const isPast = variant === "past";
  return (
    <div
      className={`bento flex flex-wrap items-center justify-between gap-3 bg-white px-7 ${
        isPast ? "py-5 opacity-75" : "py-[22px]"
      }`}
    >
      <div>
        <div className={`hd ${isPast ? "text-base" : "text-[17px]"}`}>{title}</div>
        <div className="mt-1 text-[13px] text-ink-base">{date}</div>
      </div>
      {isPast ? (
        <a href="#" className="text-sm font-bold">
          Watch recap →
        </a>
      ) : (
        <Button href="#" variant="secondary">
          Register
        </Button>
      )}
    </div>
  );
}
