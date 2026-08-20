import type { TeachingOrg } from "@/data/education";

function Mark({ org }: { org: TeachingOrg }) {
  const content = org.logo ? (
    <img src={org.logo} alt={org.name} className="h-8 w-auto max-w-[150px] object-contain" />
  ) : (
    <span className="hd text-[15px] tracking-[.06em] text-ink-dark">{org.name}</span>
  );

  if (!org.url) {
    return <div className="logo-mark flex h-8 items-center">{content}</div>;
  }

  return (
    <a
      href={org.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={org.name}
      className="logo-mark flex h-8 items-center no-underline"
    >
      {content}
    </a>
  );
}

export default function LogoBand({ label, orgs }: { label: string; orgs: TeachingOrg[] }) {
  if (orgs.length === 0) return null;

  return (
    <div className="bento flex flex-col gap-6 bg-cream px-8 py-7">
      <div className="text-[12.5px] font-bold uppercase tracking-[.2em] text-brand-base">{label}</div>
      <div className="flex flex-wrap items-center gap-x-12 gap-y-7">
        {orgs.map((org) => (
          <Mark key={org.name} org={org} />
        ))}
      </div>
    </div>
  );
}
