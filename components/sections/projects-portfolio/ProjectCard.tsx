import type { Project } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <RevealOnScroll className="group/project relative aspect-[4/5] overflow-hidden rounded-2xl">
      <OptimizedImage
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        containerClassName="absolute inset-0"
      />
      {/* Touch devices (no real hover) get a permanently darker scrim so the
          detail block below is always legible — desktop keeps the reveal-on-hover. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent [@media(hover:hover)]:via-navy/20 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover/project:from-navy/95 [@media(hover:hover)]:group-hover/project:via-navy/60" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-orange">
          {project.year}
        </span>
        <h3 className="font-heading text-xl font-medium text-white">{project.name}</h3>
        <p className="text-sm text-white/60">{project.location}</p>

        {/* Always visible where there's no real hover (touch); reveal-on-hover elsewhere. */}
        <div className="mt-3 max-h-32 opacity-100 [@media(hover:hover)]:mt-0 [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:overflow-hidden [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-all [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover/project:mt-3 [@media(hover:hover)]:group-hover/project:max-h-32 [@media(hover:hover)]:group-hover/project:opacity-100">
          <p className="text-xs uppercase tracking-[0.15em] text-white/50">
            {project.buildingType}
          </p>
          <p className="mt-2 text-sm text-white/80">{project.productsUsed.join(" · ")}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
}
