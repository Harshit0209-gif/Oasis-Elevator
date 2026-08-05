import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { ProjectCard } from "@/components/sections/projects-portfolio/ProjectCard";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "A selection of the buildings where Oasis engineering meets everyday life.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Landmarks we've moved."
        description="A selection of the buildings where Oasis engineering meets everyday life."
      />

      <section className="bg-bg-primary py-24">
        <div className="container-oasis grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Have a building in mind?"
        description="Let's discuss how Oasis can engineer the right solution for your next project."
      />
    </>
  );
}
