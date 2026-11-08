import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "outline-light";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-base text-white",
  secondary: "bg-white text-ink-darker border-2 border-ink-darker",
  accent: "bg-sun-base text-ink-darker",
  "outline-light": "bg-transparent text-cream border-2 border-[rgba(247,241,227,.5)]",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  // Links off-site (like the booking page) open in a new tab so the visitor keeps their place here.
  const external = typeof props.href === "string" && /^https?:\/\//.test(props.href);
  return (
    <a
      className={`pill-btn ${variantClasses[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
