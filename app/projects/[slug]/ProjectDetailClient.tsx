'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  Code2 as Github,
  Eye,
  Calendar,
  Tag,
  CheckCircle,
  ArrowRight,
  Star,
  GitBranch,
  Activity,
  Users,
  Layers,
} from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
} from '@/lib/motion';
import type { ProjectDetail } from '@/lib/projectsData';

function StatCard({ label, value }: { label: string; value: string; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
      <p className="relative text-3xl font-bold text-white">{value}</p>
      <p className="relative mt-1 text-xs text-white/50 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}

function TechBadge({ name, role, color }: { name: string; role: string; color: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -3 }}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${color} p-4`}
    >
      <p className="text-sm font-semibold text-white">{name}</p>
      <p className="mt-0.5 text-xs text-white/50">{role}</p>
    </motion.div>
  );
}

function TimelineItem({
  phase,
  duration,
  description,
  index,
  total,
}: {
  phase: string;
  duration: string;
  description: string;
  index: number;
  total: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : fadeInLeft}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-indigo-500 mt-1 flex-shrink-0" />
        {index < total - 1 && (
          <div className="w-px flex-1 bg-white/10 mt-2" />
        )}
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-sm font-semibold text-white">{phase}</span>
          <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{duration}</span>
        </div>
        <p className="text-sm text-white/50">{description}</p>
      </div>
    </motion.div>
  );
}

export default function ProjectDetailClient({ project }: { project: ProjectDetail }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Back link */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
                Back to projects
              </Link>
            </motion.div>

            {/* Tags */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={shouldReduceMotion ? {} : fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? {} : fadeInUp}
              className="text-lg text-white/60 max-w-2xl"
            >
              {project.tagline}
            </motion.p>

            {/* Meta */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeInUp}
              className="flex flex-wrap items-center gap-4 text-sm text-white/40"
            >
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={13} />
                {project.category}
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors duration-200 shadow-lg shadow-indigo-500/20"
                >
                  <Eye size={15} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors duration-200"
                >
                  <Github size={15} />
                  View Source
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-white/5"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {project.stats.map((stat, i) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.h2 variants={shouldReduceMotion ? {} : fadeInUp} className="text-2xl font-bold">
              About the Project
            </motion.h2>
            {project.longDescription.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                variants={shouldReduceMotion ? {} : fadeInUp}
                className="text-white/60 leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.h3 variants={shouldReduceMotion ? {} : fadeInUp} className="text-lg font-semibold">
              Key Highlights
            </motion.h3>
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  className="flex items-start gap-2.5 text-sm text-white/60"
                >
                  <CheckCircle size={15} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.h2
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            Tech Stack
          </motion.h2>
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {project.techStack.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} role={tech.role} color={tech.color} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.h2
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            Project Timeline
          </motion.h2>
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {project.timeline.map((item, i) => (
              <TimelineItem
                key={item.phase}
                phase={item.phase}
                duration={item.duration}
                description={item.description}
                index={i}
                total={project.timeline.length}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      {project.relatedProjects.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-5xl mx-auto space-y-8">
            <motion.h2
              variants={shouldReduceMotion ? {} : fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl font-bold"
            >
              Related Projects
            </motion.h2>
            <motion.div
              variants={shouldReduceMotion ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {project.relatedProjects.map((rel) => (
                <motion.div
                  key={rel.slug}
                  variants={shouldReduceMotion ? {} : scaleIn}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <Link href={`/projects/${rel.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-white mb-1">{rel.title}</h3>
                      <p className="text-xs text-white/50 mb-3">{rel.tagline}</p>
                      <div className="flex flex-wrap gap-1">
                        {rel.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
