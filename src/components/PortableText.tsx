import { PortableText as PortableTextReact, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-base leading-relaxed text-ink-dark">{children}</p>,
    h2: ({ children }) => <h2 className="hd mb-3 mt-8 text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="hd mb-2 mt-6 text-xl">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal pl-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="font-bold underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PortableText({ value }: { value?: unknown[] }) {
  if (!value?.length) {
    return <p className="m-0 text-base leading-relaxed text-ink-dark">Content coming soon.</p>;
  }
  return <PortableTextReact value={value as never} components={components} />;
}
