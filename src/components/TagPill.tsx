interface TagPillProps {
  label: string;
  tone?: "blue" | "sun";
}

const toneClasses = {
  blue: "bg-brand-lightest text-brand-dark",
  sun: "bg-sun-lighter text-sun-darker",
};

export default function TagPill({ label, tone = "blue" }: TagPillProps) {
  return <span className={`tag-pill ${toneClasses[tone]}`}>{label}</span>;
}
