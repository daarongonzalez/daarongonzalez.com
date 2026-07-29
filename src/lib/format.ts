export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface PortableTextSpan {
  text?: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextSpan[];
}

export function estimateReadTime(body: PortableTextBlock[] = []): string {
  const words = body
    .filter((block) => block._type === "block")
    .flatMap((block) => block.children ?? [])
    .map((span) => span.text ?? "")
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
