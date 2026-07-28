import ImagePlaceholder from "./ImagePlaceholder";
import TagPill from "./TagPill";
import type { Project } from "@/data/projects";

interface WorkCardProps {
  project: Project;
  fixedWidth?: boolean;
}

export default function WorkCard({ project, fixedWidth = true }: WorkCardProps) {
  return (
    <a
      href={`/work/${project.slug}`}
      className={`card card-bordered flex flex-col overflow-hidden text-inherit no-underline ${
        fixedWidth ? "w-[340px] flex-none" : "w-full"
      }`}
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
