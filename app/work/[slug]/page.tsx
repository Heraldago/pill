import { notFound } from "next/navigation";
import { PROJECT_DETAILS, ProjectDetail } from "@/data/caseStudiesData";
import ProjectCaseStudyView from "@/components/sections/ProjectCaseStudyView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECT_DETAILS[slug];
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} - Case Study - Herald Ago`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project: ProjectDetail | undefined = PROJECT_DETAILS[slug];

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyView project={project} />;
}
