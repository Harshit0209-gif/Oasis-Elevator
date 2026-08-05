import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function ProjectsPortfolio() {
  return (
    <section className="bg-bg-secondary py-28 md:py-36">
      <div className="container-oasis mb-14">
        <SectionHeading
          eyebrow="Projects"
          title="Landmarks we've moved."
          description="A selection of the buildings where Oasis engineering meets everyday life."
        />
      </div>

      <div className="container-oasis grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
