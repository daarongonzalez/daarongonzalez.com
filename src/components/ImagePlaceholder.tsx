interface ImagePlaceholderProps {
  label: string;
  className?: string;
  shape?: "rect" | "circle";
}

export default function ImagePlaceholder({
  label,
  className = "",
  shape = "rect",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-[repeating-linear-gradient(135deg,#E5E9F1,#E5E9F1_10px,#F2F2F2_10px,#F2F2F2_20px)] text-center text-xs font-bold text-ink-dark ${
        shape === "circle" ? "rounded-full" : ""
      } ${className}`}
    >
      <span className="px-3">{label}</span>
    </div>
  );
}
