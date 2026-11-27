import { PortableText as PortableTextReact, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

/**
 * An image block inside Portable Text. From Sanity it carries an asset reference
 * (plus optional alt and caption); local fallback content passes `src` and `aspectRatio` directly.
 */
export interface BodyImageValue {
  _type: "image";
  _key?: string;
  asset?: { _ref: string };
  src?: string;
  aspectRatio?: number;
  alt?: string;
  caption?: string;
}

/** Width ÷ height, from the value itself or from a Sanity asset id like "image-abc-1600x900-webp". */
function aspectRatioOf(value: BodyImageValue): number | undefined {
  if (value.aspectRatio) return value.aspectRatio;
  const match = value.asset?._ref?.match(/-(\d+)x(\d+)-[a-z]+$/);
  return match ? Number(match[1]) / Number(match[2]) : undefined;
}

/** Wide images such as 16:9 slides are never cropped; anything squarer is framed at 16:9 from tablet up. */
const WIDE = 1.7;

export function BodyImage({ value }: { value: BodyImageValue }) {
  const src = value.src ?? (value.asset ? urlFor(value).width(1600).auto("format").url() : undefined);
  if (!src) return null;
  const ratio = aspectRatioOf(value);
  const wide = ratio !== undefined && ratio >= WIDE;
  return (
    <figure className="bento m-0 overflow-hidden bg-white">
      <img
        src={src}
        alt={value.alt ?? value.caption ?? ""}
        loading="lazy"
        className={`block h-auto w-full ${wide ? "" : "object-cover md:aspect-video"}`}
        style={wide && ratio ? { aspectRatio: String(ratio) } : undefined}
      />
      {value.caption && (
        <figcaption className="border-t border-ink-lighter px-5 py-3 text-[13px] text-ink-dark">{value.caption}</figcaption>
      )}
    </figure>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-6">
        <BodyImage value={value as BodyImageValue} />
      </div>
    ),
  },
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
