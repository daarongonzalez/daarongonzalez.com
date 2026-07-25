import ImagePlaceholder from "./ImagePlaceholder";
import type { Post } from "@/data/posts";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="bento flex flex-col overflow-hidden bg-white text-inherit no-underline"
    >
      <ImagePlaceholder label={post.imageLabel} className="h-[180px]" />
      <div className="flex flex-col gap-2 p-[22px]">
        <span className="tag-pill w-fit bg-sun-lighter text-sun-darker">{post.category}</span>
        <div className="hd text-[17px]">{post.title}</div>
        <div className="text-[12.5px] text-ink-base">
          {post.date} · {post.readTime}
        </div>
      </div>
    </a>
  );
}
