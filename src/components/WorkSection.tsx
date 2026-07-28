import { useState } from "react";
import WorkCard from "./WorkCard";
import type { Project } from "@/data/projects";

export default function WorkSection({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((prev) => !prev);

  return (
    <>
      <div className="mb-5 flex items-baseline justify-between">
        <div className="hd text-3xl">Work I&apos;ve Done</div>
        <a href="#work" onClick={(e) => { e.preventDefault(); toggle(); }} className="font-bold">
          {expanded ? "Show less" : "View all"} →
        </a>
      </div>
      <div
        className={
          expanded
            ? "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 pb-2"
            : "flex gap-6 overflow-x-auto pb-2"
        }
      >
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} fixedWidth={!expanded} />
        ))}
        <div
          onClick={toggle}
          className={`card card-bordered flex cursor-pointer items-center justify-center bg-cream ${
            expanded ? "w-full" : "w-[200px] flex-none"
          }`}
        >
          <div className="text-center font-bold">
            {expanded ? "Show less" : <>More projects<br />→</>}
          </div>
        </div>
      </div>
    </>
  );
}
