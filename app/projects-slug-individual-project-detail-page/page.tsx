"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Code2 as Github, Eye, Calendar, Tag, CheckCircle, ArrowRight, Star, GitBranch, Activity, Users, Layers } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
} from "@/lib/motion";

// ─── Mock project data ────────────────────────────────────────────────────────

interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  year: number;
  highlights: string[];
  stats: { label: string; value: string }[];
  techStack: { name: string; role: string; color: string }[];
  screenshots: { src: string; caption: string }[];
  timeline: { phase: string; duration: string; description: string }[];
  relatedProjects: { slug: string; title: string; tagline: string; image: string; tags: string[] }[];
}

const PROJECT: ProjectDetail = {
  slug: "nova-dashboard",
  title: "Nova Dashboard",
  tagline: "Real-time analytics platform for modern SaaS teams",
  description:
    "A comprehensive analytics dashboard built for high-growth SaaS companies. Nova aggregates data from dozens of sources, surfaces actionable insights, and helps teams make faster, data-driven decisions.",
  longDescription:
    "Nova Dashboard was born out of frustration with fragmented analytics tools. Product teams were juggling five different tabs just to understand what was happening in their app. I designed and built Nova as a unified command center — pulling in data from Stripe, Mixpanel, Intercom, and custom event streams, then presenting it in a clean, fast interface that actually makes sense.\n\nThe frontend is built with Next.js 14 and React Server Components for near-instant page loads. Real-time updates flow through WebSockets, keeping every chart and metric live without manual refreshes. The backend is a Node.js/Fastify API backed by TimescaleDB for time-series data and Redis for caching hot queries.\n\nDesign-wise, I focused on information density without clutter — a challenge that required dozens of iterations on the chart library and layout system. The result is a dashboard that surfaces the right numbers at a glance while letting power users drill down into granular cohorts and funnels.",
  tags: ["Next.js", "TypeScript", "Node.js", "TimescaleDB", "Redis", "WebSockets", "Tailwind CSS"],
  category: "web",
  image: "https://tibydesignstudio.ca/_next/image?url=%2Fimages%2Fnova-dash%2Fnova-hero-dashboard-device.png&w=3840&q=75",
  liveUrl: "https://nova-dashboard.demo",
  githubUrl: "https://github.com/alexmorgan/nova-dashboard",
  featured: true,
  year: 2024,
  highlights: [
    "Reduced average time-to-insight from 12 minutes to under 90 seconds",
    "Handles 50 million+ events per day with sub-200ms query latency",
    "Integrated with 14 third-party data sources via a plugin architecture",
    "Shipped a white-label mode adopted by 3 enterprise customers",
    "Achieved 99.97% uptime over 8 months of production operation",
    "Open-sourced the charting primitives — 1.2k GitHub stars in 6 weeks",
  ],
  stats: [
    { label: "GitHub Stars", value: "1.2k" },
    { label: "Daily Events", value: "50M+" },
    { label: "Query Latency", value: "<200ms" },
    { label: "Uptime", value: "99.97%" },
  ],
  techStack: [
    { name: "Next.js 14", role: "Frontend framework", color: "from-white/20 to-white/5" },
    { name: "TypeScript", role: "Type safety", color: "from-blue-500/20 to-blue-500/5" },
    { name: "Fastify", role: "API server", color: "from-yellow-500/20 to-yellow-500/5" },
    { name: "TimescaleDB", role: "Time-series storage", color: "from-orange-500/20 to-orange-500/5" },
    { name: "Redis", role: "Caching layer", color: "from-red-500/20 to-red-500/5" },
    { name: "WebSockets", role: "Real-time updates", color: "from-green-500/20 to-green-500/5" },
    { name: "Tailwind CSS", role: "Styling", color: "from-cyan-500/20 to-cyan-500/5" },
    { name: "Recharts", role: "Data visualization", color: "from-purple-500/20 to-purple-500/5" },
  ],
  screenshots: [
    { src: "/images/nova-dashboard-overview-screen.jpg", caption: "Main overview — KPIs, revenue trend, and active users at a glance" },
    { src: "/images/nova-dashboard-funnel-analysis.jpg", caption: "Funnel analysis with cohort breakdowns and drop-off annotations" },
    { src: "/images/nova-dashboard-realtime-events.jpg", caption: "Live event stream with filtering, search, and property inspection" },
  ],
  timeline: [
    { phase: "Discovery & Design", duration: "3 weeks", description: "User interviews with 12 product managers, competitive analysis, and high-fidelity Figma prototypes." },
    { phase: "Core Infrastructure", duration: "4 weeks", description: "TimescaleDB schema design, ingestion pipeline, and Fastify API with OpenAPI docs." },
    { phase: "Frontend Build", duration: "6 weeks", description: "Next.js app, chart library integration, real-time WebSocket layer, and responsive layout." },
    { phase: "Integrations", duration: "3 weeks", description: "Plugin system for Stripe, Mixpanel, Intercom, and custom event SDKs." },
    { phase: "Beta & Polish", duration: "2 weeks", description: "Closed beta with 5 teams, performance tuning, accessibility audit, and launch prep." },
  ],
  relatedProjects: [
    {
      slug: "pulse-api",
      title: "Pulse API",
      tagline: "Lightweight event ingestion microservice",
      image: "/images/pulse-api-event-ingestion.jpg",
      tags: ["Node.js", "Kafka", "Docker"],
    },
    {
      slug: "chartkit",
      title: "ChartKit",
      tagline: "Open-source React charting primitives",
      image: "/images/chartkit-react-charting-library.jpg",
      tags: ["React", "D3", "TypeScript"],
    },
    {
      slug: "dataflow-etl",
      title: "DataFlow ETL",
      tagline: "Visual ETL pipeline builder for non-engineers",
      image: "/images/dataflow-etl-pipeline-builder.jpg",
      tags: ["Next.js", "PostgreSQL", "Python"],
    },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, index }: { label: string; value: string; index: number }) {
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
      {/* Line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 mt-1 shrink-0" />
        {index < total - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/40 to-transparent mt-2" />
        )}
      </div>
      {/* Content */}
      <div className="pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="text-base font-semibold text-white">{phase}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
            {duration}
          </span>
        </div>
        <p className="text-sm text-white/55 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function RelatedCard({
  slug,
  title,
  tagline,
  image,
  tags,
}: {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  tags: string[];
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
        <p className="text-xs text-white/50 mb-3 leading-relaxed">{tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {(tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-white/8 text-white/50 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link
        href={`/projects/${slug}`}
        className="absolute inset-0"
        aria-label={`View ${title}`}
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const project = PROJECT;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1" />
              All Projects
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <motion.div
              variants={shouldReduceMotion ? {} : staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Category + year */}
              <motion.div
                variants={shouldReduceMotion ? {} : fadeInUp}
                className="flex items-center gap-3"
              >
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-medium uppercase tracking-wider">
                  <Layers size={11} />
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                  <Calendar size={11} />
                  {project.year}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    <Star size={10} />
                    Featured
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={shouldReduceMotion ? {} : fadeInUp}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                {project.title}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={shouldReduceMotion ? {} : fadeInUp}
                className="text-lg text-white/60 leading-relaxed"
              >
                {project.tagline}
              </motion.p>

              {/* Tags */}
              <motion.div
                variants={shouldReduceMotion ? {} : fadeInUp}
                className="flex flex-wrap gap-2"
              >
                {(project.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-white/8 text-white/60 border border-white/10"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                variants={shouldReduceMotion ? {} : fadeInUp}
                className="flex flex-wrap gap-3 pt-2"
              >
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/25"
                  >
                    <Eye size={15} />
                    Live Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 hover:bg-white/12 text-white text-sm font-medium border border-white/10 transition-colors duration-200"
                  >
                    <Github size={15} />
                    Source Code
                  </motion.a>
                )}
              </motion.div>
            </motion.div>

            {/* Right — hero image */}
            <motion.div
              variants={shouldReduceMotion ? {} : scaleIn}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.background =
                      "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />
              </div>
              {/* Floating stat badge */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -bottom-4 -left-4 bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-green-400" />
                  <span className="text-xs text-white/70">
                    <span className="text-white font-semibold">99.97%</span> uptime
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="absolute -top-4 -right-4 bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-yellow-400" />
                  <span className="text-xs text-white/70">
                    <span className="text-white font-semibold">1.2k</span> stars
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {(project.stats ?? []).map((stat, i) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Long description */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-3 space-y-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <h2 className="text-2xl font-bold text-white">About the Project</h2>
              </div>
              {project.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="text-white/60 leading-relaxed text-[15px]">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                  <h2 className="text-2xl font-bold text-white">Highlights</h2>
                </div>
                <motion.ul
                  variants={shouldReduceMotion ? {} : staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="space-y-3"
                >
                  {(project.highlights ?? []).map((h, i) => (
                    <motion.li
                      key={i}
                      variants={shouldReduceMotion ? {} : fadeInUp}
                      className="flex items-start gap-3 text-sm text-white/65 leading-relaxed"
                    >
                      <CheckCircle
                        size={15}
                        className="text-indigo-400 mt-0.5 shrink-0"
                      />
                      {h}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
              <h2 className="text-2xl font-bold text-white">Screenshots</h2>
            </div>
            <p className="text-white/50 text-sm ml-4">
              A visual walkthrough of key screens and interactions.
            </p>
          </motion.div>

          {/* Main screenshot */}
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 mb-4"
          >
            <img
              src={project.screenshots[activeScreenshot]?.src ?? ""}
              alt={project.screenshots[activeScreenshot]?.caption ?? "Screenshot"}
              className="w-full h-80 sm:h-[420px] object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.background =
                  "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm text-white/80">
                {project.screenshots[activeScreenshot]?.caption ?? ""}
              </p>
            </div>
          </motion.div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {(project.screenshots ?? []).map((shot, i) => (
              <button
                key={i}
                onClick={() => setActiveScreenshot(i)}
                className={`relative shrink-0 rounded-xl overflow-hidden border transition-all duration-200 ${
                  activeScreenshot === i
                    ? "border-indigo-500 ring-2 ring-indigo-500/30"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <img
                  src={shot.src}
                  alt={shot.caption}
                  className="w-32 h-20 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.background =
                      "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)";
                  }}
                />
                {activeScreenshot === i && (
                  <div className="absolute inset-0 bg-indigo-500/15" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
              <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
            </div>
            <p className="text-white/50 text-sm ml-4">
              Every tool chosen for a specific reason — no cargo-culting.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {(project.techStack ?? []).map((tech) => (
              <TechBadge key={tech.name} {...tech} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              variants={shouldReduceMotion ? {} : fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <h2 className="text-2xl font-bold text-white">Build Timeline</h2>
              </div>
              <p className="text-white/50 text-sm ml-4 mb-10">
                From first sketch to production launch — 18 weeks total.
              </p>

              <motion.div
                variants={shouldReduceMotion ? {} : staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {(project.timeline ?? []).map((item, i) => (
                  <TimelineItem
                    key={item.phase}
                    {...item}
                    index={i}
                    total={project.timeline.length}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Lessons learned */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <h2 className="text-2xl font-bold text-white">Lessons Learned</h2>
              </div>

              {[
                {
                  title: "Schema design is everything",
                  body: "TimescaleDB's hypertable partitioning strategy made or broke query performance. Getting the chunk interval right early saved weeks of later migration pain.",
                },
                {
                  title: "WebSockets need backpressure",
                  body: "Naive broadcasting to all connected clients caused memory spikes under load. Implementing per-client queues with overflow shedding was non-trivial but essential.",
                },
                {
                  title: "Design for the 80th percentile user",
                  body: "Power users wanted every knob exposed; casual users wanted simplicity. Progressive disclosure — hiding advanced options behind a 'More' toggle — satisfied both groups.",
                },
                {
                  title: "Open-sourcing creates a flywheel",
                  body: "Releasing the charting primitives as OSS drove inbound interest in the full product. Community contributions also caught edge-case bugs faster than any QA process.",
                },
              ].map((lesson, i) => (
                <motion.div
                  key={i}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="rounded-xl border border-white/8 bg-white/4 p-5"
                >
                  <h3 className="text-sm font-semibold text-white mb-1.5">{lesson.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{lesson.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <h2 className="text-2xl font-bold text-white">Related Projects</h2>
              </div>
              <p className="text-white/50 text-sm ml-4">More work you might find interesting.</p>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group"
            >
              View all
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(project.relatedProjects ?? []).map((rp) => (
              <RelatedCard key={rp.slug} {...rp} />
            ))}
          </motion.div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent p-10 sm:p-14 text-center"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-[80px]" />
            </div>

            <div className="relative space-y-5">
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 mb-2">
                <Users size={12} />
                Open to new collaborations
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Have a project in mind?
              </h2>
              <p className="text-white/55 max-w-xl mx-auto leading-relaxed">
                I&apos;m always interested in ambitious projects that push the boundaries of what&apos;s possible on the web. Let&apos;s build something remarkable together.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/25"
                  >
                    Get in Touch
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/12 text-white text-sm font-medium border border-white/10 transition-colors duration-200"
                  >
                    <GitBranch size={15} />
                    More Projects
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}