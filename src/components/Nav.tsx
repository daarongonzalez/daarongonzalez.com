import { useState } from "react";
import Button from "./Button";
import { navLinks } from "@/data/site";

export default function Nav({ currentPath = "" }: { currentPath?: string }) {
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/#work") return false;
    return currentPath === href || (href === "/" && currentPath === "");
  };

  return (
    <nav className="relative flex items-center justify-between py-7">
      <a href="/" className="hd text-xl text-brand-base">
        D&apos;AARON GONZALEZ
      </a>

      <div className="hidden items-center gap-9 text-[15px] font-bold md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? "text-brand-base" : "text-ink-darker"}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="hidden md:block">
        <Button href="/#contact" variant="primary">
          Book a Call
        </Button>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span
          className={`h-0.5 w-6 bg-ink-darker transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`h-0.5 w-6 bg-ink-darker transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-0.5 w-6 bg-ink-darker transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="bento absolute inset-x-5 top-24 z-20 flex flex-col gap-5 bg-white p-6 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-base font-bold ${isActive(link.href) ? "text-brand-base" : "text-ink-darker"}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button href="/#contact" variant="primary" className="justify-center">
            Book a Call
          </Button>
        </div>
      )}
    </nav>
  );
}
