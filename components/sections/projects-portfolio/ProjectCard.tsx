import type { Project } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <RevealOnScroll className="group/project relative aspect-[4/5] overflow-hidden">
      <OptimizedImage
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        containerClassName="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent transition-opacity duration-500 group-hover/project:from-bg-primary/95 group-hover/project:via-bg-primary/60" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
        <span className="text-xs uppercase tracking-[0.2em] text-gold">{project.year}</span>
        <h3 className="font-heading text-xl font-medium text-bg-light">{project.name}</h3>
        <p className="text-sm text-bg-light/60">{project.location}</p>

        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover/project:mt-3 group-hover/project:max-h-32 group-hover/project:opacity-100">
          <p className="text-xs uppercase tracking-[0.15em] text-bg-light/50">
            {project.buildingType}
          </p>
          <p className="mt-2 text-sm text-bg-light/80">{project.productsUsed.join(" · ")}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
}
