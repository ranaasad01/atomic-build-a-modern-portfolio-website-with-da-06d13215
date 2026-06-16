"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ExternalLink, Code2 as Github, Search, Filter, ArrowRight, Star, Calendar, Tag } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import type { Project, ProjectCategory } from "@/lib/data";

const projects: Project[] = [
  {
    slug: "lumina-design-system",
    title: "Lumina Design System",
    tagline: "A comprehensive, accessible component library for modern web apps.",
    description:
      "Lumina is a fully accessible, themeable design system built with React, TypeScript, and Radix UI primitives. It ships with 60+ components, dark mode support, and detailed Storybook documentation.",
    longDescription:
      "Lumina was born out of the need for a consistent, accessible UI foundation across multiple product teams. It covers everything from atomic elements like buttons and inputs to complex patterns like data tables, command palettes, and date pickers. Every component meets WCAG 2.1 AA standards.",
    tags: ["React", "TypeScript", "Radix UI", "Storybook", "Tailwind CSS"],
    category: "oss",
    image: "https://s3-alpha.figma.com/hub/file/6242084878/41995a36-8793-43c4-b9a6-9a1d752455c9-cover.png",
    liveUrl: "https://lumina.design",
    githubUrl: "https://github.com/alexmorgan/lumina",
    featured: true,
    year: 2024,
    highlights: [
      "60+ accessible components",
      "Full dark mode support",
      "Storybook documentation",
      "Tree-shakeable ESM build",
    ],
  },
  {
    slug: "nova-analytics",
    title: "Nova Analytics",
    tagline: "Real-time product analytics dashboard for SaaS teams.",
    description:
      "Nova is a real-time analytics platform that helps SaaS companies understand user behavior, track funnels, and measure retention — all without sending data to third parties.",
    longDescription:
      "Built with Next.js 14, Prisma, and ClickHouse for blazing-fast aggregations. Nova processes millions of events per day with sub-second query latency. The dashboard features interactive charts, cohort analysis, and customizable reports.",
    tags: ["Next.js", "ClickHouse", "Prisma", "Recharts", "tRPC"],
    category: "web",
    image: "https://tibydesignstudio.ca/_next/image?url=%2Fimages%2Fnova-dash%2Fnova-hero-dashboard-device.png&w=3840&q=75",
    liveUrl: "https://nova-analytics.app",
    githubUrl: "https://github.com/alexmorgan/nova",
    featured: true,
    year: 2024,
    highlights: [
      "Sub-second query latency",
      "Cohort & funnel analysis",
      "Self-hostable",
      "GDPR compliant",
    ],
  },
  {
    slug: "pulse-mobile",
    title: "Pulse Mobile",
    tagline: "Habit tracking app with smart streaks and insights.",
    description:
      "Pulse is a React Native habit tracker that uses machine learning to surface personalized insights and predict when you're likely to break a streak — so you can intervene early.",
    longDescription:
      "Pulse combines a beautiful, gesture-driven UI with a lightweight on-device ML model trained on anonymized habit data. It syncs across devices via a Supabase backend and supports widgets on both iOS and Android.",
    tags: ["React Native", "Expo", "Supabase", "TensorFlow Lite", "Reanimated"],
    category: "mobile",
    image: "https://routinespulse.com/_next/image?url=%2Fiphone%2FiPhone-1.jpg&w=640&q=75",
    liveUrl: "https://apps.apple.com/pulse",
    githubUrl: "https://github.com/alexmorgan/pulse",
    featured: true,
    year: 2023,
    highlights: [
      "On-device ML predictions",
      "iOS & Android widgets",
      "Gesture-driven UI",
      "Cross-device sync",
    ],
  },
  {
    slug: "craft-cms-theme",
    title: "Craft CMS Theme",
    tagline: "A premium, performance-first theme for content-heavy sites.",
    description:
      "A fully customizable Craft CMS theme optimized for editorial teams. Features a visual page builder, SEO toolkit, and 100/100 Lighthouse scores out of the box.",
    longDescription:
      "Designed for publishers and marketing teams who need speed without sacrificing flexibility. The theme ships with 20+ layout blocks, a custom image optimization pipeline, and structured data support for rich search results.",
    tags: ["Craft CMS", "Twig", "Alpine.js", "Vite", "GSAP"],
    category: "web",
    image: "https://cdn.craft.cloud/032c8560-18a8-45ba-a958-a03804e5cb66/assets/post-content/wordpress-starter-draft.png?fit=cover&width=960&s=2rPKa5xylczwrpH4mtOrLfXY4IgiprhgRhT78YNUV-w",
    liveUrl: "https://crafttheme.dev",
    githubUrl: "https://github.com/alexmorgan/craft-theme",
    featured: false,
    year: 2023,
    highlights: [
      "100/100 Lighthouse score",
      "Visual page builder",
      "Structured data / SEO",
      "20+ layout blocks",
    ],
  },
  {
    slug: "vector-icons",
    title: "Vector Icons CLI",
    tagline: "Generate optimized SVG icon sets from Figma in seconds.",
    description:
      "A CLI tool that connects to the Figma API, exports icon frames as optimized SVGs, and generates typed React components, Vue components, or raw SVG sprites — all in one command.",
    longDescription:
      "Vector Icons CLI eliminates the tedious manual export workflow. It reads a Figma file ID, fetches all frames in a designated icons page, runs them through SVGO, and outputs framework-specific components with full TypeScript types.",
    tags: ["Node.js", "TypeScript", "Figma API", "SVGO", "Commander.js"],
    category: "oss",
    image: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/figma-color.png",
    githubUrl: "https://github.com/alexmorgan/vector-icons",
    featured: false,
    year: 2023,
    highlights: [
      "Figma API integration",
      "React & Vue output",
      "TypeScript types",
      "SVGO optimization",
    ],
  },
  {
    slug: "folio-ui",
    title: "Folio UI",
    tagline: "Minimal portfolio UI kit for designers and developers.",
    description:
      "A Figma UI kit and Next.js starter template for building stunning portfolio sites. Includes 40+ screens, a dark/light mode system, and a one-click Vercel deploy.",
    longDescription:
      "Folio UI was designed to lower the barrier for creatives who want a polished online presence without spending weeks on design. The Figma file ships with auto-layout components, a robust color system, and detailed usage guidelines.",
    tags: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "design",
    image: "https://market-resized.envatousercontent.com/themeforest.net/files/435318016/Cover-Image.jpg?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=533d1b50936225ccc2ac5bbcc591e9e7aef971a1469d0e6de3345451f1a57451",
    liveUrl: "https://folio-ui.design",
    featured: false,
    year: 2022,
    highlights: [
      "40+ Figma screens",
      "Dark & light mode",
      "One-click Vercel deploy",
      "Auto-layout components",
    ],
  },
  {
    slug: "shipfast-boilerplate",
    title: "ShipFast Boilerplate",
    tagline: "Production-ready Next.js SaaS starter with auth, billing & more.",
    description:
      "ShipFast is an opinionated Next.js 14 boilerplate that wires up authentication, Stripe billing, transactional email, and a full admin panel so you can focus on your product.",
    longDescription:
      "Includes NextAuth.js with magic links and OAuth, Stripe subscriptions with a customer portal, Resend for transactional email, Prisma + PostgreSQL, and a shadcn/ui-based admin dashboard. Deployed to Vercel in under 5 minutes.",
    tags: ["Next.js", "NextAuth.js", "Stripe", "Prisma", "Resend"],
    category: "web",
    image: "https://res.cloudinary.com/boilerplatehubcom/image/upload/v1726162775/shipfa.st__via%3Dboilerplatehub_dark.png.png",
    liveUrl: "https://shipfast.dev",
    githubUrl: "https://github.com/alexmorgan/shipfast",
    featured: false,
    year: 2022,
    highlights: [
      "Auth with magic links & OAuth",
      "Stripe subscriptions",
      "Transactional email",
      "Admin dashboard",
    ],
  },
];

const CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Design", value: "design" },
  { label: "Open Source", value: "oss" },
];

function ProjectCard({ project, shouldReduceMotion }: { project: Project; shouldReduceMotion: boolean | null }) {
  return (
    <motion.article
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/90 text-white text-xs font-semibold">
            <Star size={10} className="fill-white" />
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/70 text-xs capitalize">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200">
            {project.title}
          </h3>
          <span className="flex items-center gap-1 text-xs text-white/40 shrink-0">
            <Calendar size={11} />
            {project.year}
          </span>
        </div>

        <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{project.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/30">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 pt-1 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 text-xs font-medium text-white transition-colors duration-200"
            >
              <ExternalLink size={11} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              <Github size={11} />
              Source
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto inline-flex items-center gap-1 text-xs text-white/40 hover:text-indigo-400 transition-colors duration-200 group/link"
          >
            Details
            <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : {
          variants,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center space-y-6"
          >
            <motion.div
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest"
            >
              <Filter size={11} />
              All Projects
            </motion.div>

            <motion.h1
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Things I&apos;ve{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Built
              </span>
            </motion.h1>

            <motion.p
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="text-lg text-white/50 max-w-2xl mx-auto"
            >
              A curated collection of projects spanning web apps, mobile experiences, open-source tools, and design systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all duration-200"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <Search size={32} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No projects match your search.</p>
            </div>
          ) : (
            <motion.div
              {...motionProps(staggerContainer)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center space-y-6"
          >
            <motion.h2
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="text-3xl sm:text-4xl font-bold"
            >
              Have a project in mind?
            </motion.h2>
            <motion.p
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
              className="text-white/50 max-w-xl mx-auto"
            >
              I&apos;m always open to interesting collaborations. Let&apos;s build something great together.
            </motion.p>
            <motion.div
              {...(shouldReduceMotion ? {} : { variants: fadeInUp })}
            >
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/20"
              >
                Get in touch
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
