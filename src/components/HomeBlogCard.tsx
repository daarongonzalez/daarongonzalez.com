import ImagePlaceholder from "./ImagePlaceholder";
import { urlFor, type SanityPost } from "@/lib/sanity";
import { formatDate, estimateReadTime } from "@/lib/format";

const toneClasses = {
  blue: "bg-brand-lightest text-brand-dark",
  sun: "bg-sun-lighter text-sun-darker",
};

export default function HomeBlogCard({ post, tone = "sun" }: { post: SanityPost; tone?: "blue" | "sun" }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="bento flex flex-col overflow-hidden bg-cream text-inherit no-underline"
    >
      {post.coverImage ? (
        <img
          src={urlFor(post.coverImage).width(700).height(400).url()}
          alt={post.title}
          className="h-[200px] w-full object-cover"
        />
      ) : (
        <ImagePlaceholder label={post.title} className="h-[200px]" />
      )}
      <div className="flex flex-col gap-2 p-6">
        {post.category && (
          <span className={`tag-pill w-fit ${toneClasses[tone]}`}>{post.category}</span>
        )}
        <div className="hd text-xl leading-[1.15]">{post.title}</div>
        <div className="text-[13px] text-ink-base">
          {formatDate(post.publishedAt)} · {estimateReadTime(post.body as never)}
        </div>
      </div>
    </a>
  );
}
