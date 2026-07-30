import ImagePlaceholder from "./ImagePlaceholder";
import { urlFor, type SanityPost } from "@/lib/sanity";
import { formatDate, estimateReadTime } from "@/lib/format";

export default function BlogCard({ post }: { post: SanityPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="bento flex flex-col overflow-hidden bg-cream text-inherit no-underline"
    >
      {post.coverImage ? (
        <img
          src={urlFor(post.coverImage).width(500).height(360).url()}
          alt={post.title}
          className="h-[180px] w-full object-cover"
        />
      ) : (
        <ImagePlaceholder label={post.title} className="h-[180px]" />
      )}
      <div className="flex flex-col gap-2 p-[22px]">
        {post.category && (
          <span className="tag-pill w-fit bg-sun-lighter text-sun-darker">{post.category}</span>
        )}
        <div className="hd text-[17px]">{post.title}</div>
        <div className="text-[12.5px] text-ink-base">
          {formatDate(post.publishedAt)} · {estimateReadTime(post.body as never)}
        </div>
      </div>
    </a>
  );
}
