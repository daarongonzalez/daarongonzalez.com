import ImagePlaceholder from "./ImagePlaceholder";
import { urlFor, type SanityPost } from "@/lib/sanity";
import { formatDate, estimateReadTime } from "@/lib/format";

export default function FeaturedBlogCard({ post }: { post: SanityPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="bento grid grid-cols-1 overflow-hidden text-inherit no-underline sm:grid-cols-[1.1fr_1fr]"
    >
      {post.coverImage ? (
        <img
          src={urlFor(post.coverImage).width(700).height(440).url()}
          alt={post.title}
          className="h-[220px] w-full object-cover sm:h-full"
        />
      ) : (
        <ImagePlaceholder label={post.title} className="h-[220px] sm:h-full" />
      )}
      <div className="flex flex-col justify-center gap-3 p-10">
        {post.category && (
          <span className="tag-pill w-fit bg-sun-lighter text-sun-darker">{post.category}</span>
        )}
        <div className="hd text-2xl leading-tight">{post.title}</div>
        <div className="text-[13px] text-ink-base">
          {formatDate(post.publishedAt)} · {estimateReadTime(post.body as never)}
        </div>
      </div>
    </a>
  );
}
