import type { NavLink } from "@/data/site";

export default function Footer({ navLinks, copyright }: { navLinks: NavLink[]; copyright: string }) {
  return (
    <footer className="mt-14">
      <div className="hatch-rule" aria-hidden="true" />
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
        <div className="hd text-base text-brand-base">D&apos;AARON GONZALEZ</div>
        <div className="flex gap-7 text-sm font-bold">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-ink-darker">
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-[13px] text-ink-base">{copyright}</div>
      </div>
    </footer>
  );
}
