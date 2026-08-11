import type { NavLink } from "@/data/site";

export default function Footer({ navLinks, copyright }: { navLinks: NavLink[]; copyright: string }) {
  return (
    <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink-darker pt-8">
      <div className="hd text-base text-brand-base">D&apos;AARON GONZALEZ</div>
      <div className="flex gap-7 text-sm font-bold">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="text-ink-darker">
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-[13px] text-ink-base">{copyright}</div>
    </footer>
  );
}
