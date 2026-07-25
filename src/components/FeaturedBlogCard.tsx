import ImagePlaceholder from "./ImagePlaceholder";
import type { Post } from "@/data/posts";

export default function FeaturedBlogCard({ post }: { post: Post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="bento grid grid-cols-1 overflow-hidden text-inherit no-underline sm:grid-cols-[1.1fr_1fr]"
    >
      <ImagePlaceholder label={post.imageLabel} className="h-[220px] sm:h-full" />
      <div className="flex flex-col justify-center gap-3 p-10">
        <span className="tag-pill w-fit bg-sun-lighter text-sun-darker">{post.category}</span>
        <div className="hd text-2xl leading-tight">{post.title}</div>
        <div className="text-[13px] text-ink-base">
          {post.date} · {post.readTime}
        </div>
      </div>
    </a>
  );
}
