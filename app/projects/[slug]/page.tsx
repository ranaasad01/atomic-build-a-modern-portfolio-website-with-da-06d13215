import { projects } from '@/lib/projectsData';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  return <ProjectDetailClient project={project} />;
}
