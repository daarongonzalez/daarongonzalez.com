import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import type { SanityPost } from "@/lib/sanity";

export default function BlogFilter({ posts: gridPosts }: { posts: SanityPost[] }) {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(gridPosts.map((post) => post.category).filter((c): c is string => Boolean(c))),
    );
    return ["All", ...unique];
  }, [gridPosts]);

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
              active === category ? "bg-brand-base text-white" : "bg-cream text-ink-darker"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-ink-base">No posts in this category yet.</p>
        )}
      </div>
    </div>
  );
}
