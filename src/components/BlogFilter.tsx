import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import { categories, type Post } from "@/data/posts";

export default function BlogFilter({ posts: gridPosts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? gridPosts : gridPosts.filter((post) => post.category === active)),
    [active, gridPosts],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`bento cursor-pointer px-5 py-2.5 text-[13px] font-bold ${
              active === category ? "bg-brand-base text-white" : "bg-white text-ink-darker"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-ink-base">No posts in this category yet.</p>
        )}
      </div>
    </div>
  );
}
