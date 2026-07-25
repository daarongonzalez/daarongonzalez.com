import ImagePlaceholder from "./ImagePlaceholder";
import TagPill from "./TagPill";
import type { Project } from "@/data/projects";

export default function WorkCard({ project }: { project: Project }) {
  return (
    <a
      href={`/work/${project.slug}`}
      className="bento flex w-[340px] flex-none flex-col overflow-hidden text-inherit no-underline"
    >
      <ImagePlaceholder label={project.imageLabel} className="h-[200px]" />
      <div className="flex flex-col gap-2 p-5">
        <div className="hd text-lg">{project.title}</div>
        <p className="m-0 text-sm leading-relaxed text-ink-dark">{project.shortDescription}</p>
        <div className="mt-1 flex gap-2">
          {project.tags.map((tag) => (
            <TagPill key={tag.label} label={tag.label} tone={tag.tone} />
          ))}
        </div>
      </div>
    </a>
  );
}
