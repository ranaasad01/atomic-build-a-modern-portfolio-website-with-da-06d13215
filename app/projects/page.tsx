"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ArrowLeft, Code2 as Github, Eye, Star, Calendar, Tag, X } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import type { Project, ProjectCategory } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    slug: "luminary-ui",
    title: "Luminary UI",
    tagline: "A modern React component library",
    description:
      "A comprehensive, accessible React component library built with TypeScript and Tailwind CSS. Ships with 60+ components, dark mode support, and full Storybook documentation.",
    longDescription:
      "Luminary UI was born out of the need for a truly accessible, beautifully designed component library that doesn't sacrifice developer experience. Every component is built with WAI-ARIA compliance, keyboard navigation, and screen-reader support baked in from the ground up.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Radix UI"],
    category: "oss",
    image: "/images/luminary-ui-component-library.jpg",
    liveUrl: "https://luminary-ui.dev",
    githubUrl: "https://github.com/alexmorgan/luminary-ui",
    featured: true,
    year: 2024,
    highlights: [
      "60+ accessible components",
      "Full TypeScript support",
      "Dark mode out of the box",
      "Storybook documentation",
    ],
  },
  {
    slug: "nova-dashboard",
    title: "Nova Dashboard",
    tagline: "Real-time analytics for SaaS products",
    description:
      "A full-stack SaaS analytics dashboard with real-time data visualization, user segmentation, funnel analysis, and custom report builder.",
    longDescription:
      "Nova Dashboard helps SaaS founders understand their users better. Built with Next.js, Prisma, and PostgreSQL, it processes millions of events per day and surfaces actionable insights through beautiful, interactive charts.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Recharts", "tRPC"],
    category: "web",
    image: "/images/nova-saas-analytics-dashboard.jpg",
    liveUrl: "https://nova-dashboard.app",
    githubUrl: "https://github.com/alexmorgan/nova-dashboard",
    featured: true,
    year: 2024,
    highlights: [
      "Real-time event processing",
      "Custom report builder",
      "User segmentation",
      "Funnel analysis",
    ],
  },
  {
    slug: "pulse-mobile",
    title: "Pulse",
    tagline: "Mindfulness & habit tracking app",
    description:
      "A cross-platform mobile app for mindfulness and habit tracking. Features guided meditations, streak tracking, mood journaling, and personalized insights.",
    longDescription:
      "Pulse was designed to make mindfulness accessible to everyone. The app uses React Native with Expo, integrating with Apple Health and Google Fit for a holistic wellness picture.",
    tags: ["React Native", "Expo", "TypeScript", "Reanimated", "SQLite"],
    category: "mobile",
    image: "/images/pulse-mindfulness-mobile-app.jpg",
    liveUrl: "https://apps.apple.com/pulse",
    githubUrl: "https://github.com/alexmorgan/pulse",
    featured: true,
    year: 2023,
    highlights: [
      "iOS & Android support",
      "Guided meditations",
      "Streak tracking",
      "Health app integration",
    ],
  },
  {
    slug: "arcadia-ecommerce",
    title: "Arcadia",
    tagline: "Headless e-commerce storefront",
    description:
      "A blazing-fast headless e-commerce storefront built with Next.js and Shopify Storefront API. Achieves perfect Lighthouse scores with ISR and edge caching.",
    longDescription:
      "Arcadia demonstrates the power of headless commerce. By decoupling the frontend from Shopify's backend, we achieved sub-second page loads and a 40% increase in conversion rate for our client.",
    tags: ["Next.js", "Shopify", "GraphQL", "Framer Motion", "Vercel"],
    category: "web",
    image: "/images/arcadia-headless-ecommerce-storefront.jpg",
    liveUrl: "https://arcadia-store.vercel.app",
    githubUrl: "https://github.com/alexmorgan/arcadia",
    featured: false,
    year: 2023,
    highlights: [
      "Perfect Lighthouse score",
      "ISR + edge caching",
      "40% conversion lift",
      "Shopify integration",
    ],
  },
  {
    slug: "designsync",
    title: "DesignSync",
    tagline: "Figma-to-code design system bridge",
    description:
      "A design system tool that syncs Figma tokens directly to your codebase. Supports CSS variables, Tailwind config, and Style Dictionary output formats.",
    longDescription:
      "DesignSync eliminates the painful handoff between designers and developers. Connect your Figma file, map your tokens, and push updates directly to your repository via GitHub Actions.",
    tags: ["Figma API", "Node.js", "Style Dictionary", "GitHub Actions", "CLI"],
    category: "design",
    image: "/images/designsync-figma-design-system-tool.jpg",
    githubUrl: "https://github.com/alexmorgan/designsync",
    featured: false,
    year: 2023,
    highlights: [
      "Figma token sync",
      "Multi-format output",
      "GitHub Actions CI",
      "CLI + GUI",
    ],
  },
  {
    slug: "codestream",
    title: "CodeStream",
    tagline: "Live collaborative code editor",
    description:
      "A real-time collaborative code editor with syntax highlighting, multi-cursor support, video chat, and AI-powered code suggestions.",
    longDescription:
      "CodeStream brings the Google Docs experience to coding. Built with Yjs for CRDT-based collaboration, it supports 20+ languages and integrates with GitHub for seamless PR reviews.",
    tags: ["Yjs", "Monaco Editor", "WebRTC", "Node.js", "Redis"],
    category: "web",
    image: "/images/codestream-collaborative-code-editor.jpg",
    liveUrl: "https://codestream.dev",
    githubUrl: "https://github.com/alexmorgan/codestream",
    featured: false,
    year: 2022,
    highlights: [
      "Real-time collaboration",
      "20+ languages",
      "Video chat built-in",
      "AI suggestions",
    ],
  },
  {
    slug: "orbit-design-system",
    title: "Orbit Design System",
    tagline: "Enterprise-grade design language",
    description:
      "A comprehensive design system for enterprise products, including a Figma component library, React implementation, and detailed documentation site.",
    longDescription:
      "Orbit was created to unify the visual language across a suite of enterprise products. The system covers typography, color, spacing, motion, and 80+ components with full accessibility compliance.",
    tags: ["Figma", "React", "Storybook", "Chromatic", "Zeroheight"],
    category: "design",
    image: "/images/orbit-enterprise-design-system.jpg",
    liveUrl: "https://orbit.design",
    featured: false,
    year: 2022,
    highlights: [
      "80+ components",
      "Figma + React parity",
      "WCAG 2.1 AA",
      "Automated visual testing",
    ],
  },
  {
    slug: "fluxnote",
    title: "FluxNote",
    tagline: "Markdown notes with AI superpowers",
    description:
      "A local-first markdown note-taking app with AI summarization, semantic search, and automatic knowledge graph generation.",
    longDescription:
      "FluxNote is built for developers and researchers who live in markdown. It uses a local SQLite database with vector embeddings for semantic search, and integrates with OpenAI for intelligent summarization.",
    tags: ["Electron", "React", "SQLite", "OpenAI", "TypeScript"],
    category: "oss",
    image: "/images/fluxnote-markdown-notes-app.jpg",
    githubUrl: "https://github.com/alexmorgan/fluxnote",
    featured: false,
    year: 2022,
    highlights: [
      "Local-first storage",
      "Semantic search",
      "AI summarization",
      "Knowledge graph",
    ],
  },
  {
    slug: "waypoint-travel",
    title: "Waypoint",
    tagline: "AI-powered travel planning app",
    description:
      "A mobile travel planning app that uses AI to generate personalized itineraries, discover hidden gems, and manage bookings in one place.",
    longDescription:
      "Waypoint reimagines travel planning by combining AI itinerary generation with real booking data. Users describe their ideal trip and Waypoint builds a day-by-day plan with restaurant reservations, activity bookings, and transport.",
    tags: ["React Native", "Expo", "OpenAI", "Google Maps", "Stripe"],
    category: "mobile",
    image: "/images/waypoint-travel-planning-mobile-app.jpg",
    liveUrl: "https://waypointapp.travel",
    featured: false,
    year: 2021,
    highlights: [
      "AI itinerary generation",
      "Real booking integration",
      "Offline maps",
      "Group trip planning",
    ],
  },
];

// ─── Category filter config ───────────────────────────────────────────────────

const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Apps" },
  { value: "mobile", label: "Mobile" },
  { value: "design", label: "Design" },
  { value: "oss", label: "Open Source" },
];

const CATEGORY_COLORS: Record<string, string> = {
  web: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  mobile: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  design: "bg-pink-500/15 text-pink-300 border-pink-500/20",
  oss: "bg-amber-500/15 text-amber-300 border-amber-500/20",
};

// ─── ProjectCard component (inline) ──────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={shouldReduceMotion ? {} : fadeInUp}
      whileHover={
        shouldReduceMotion
          ? {}
          : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
      }
      className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-colors duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/90 backdrop-blur-sm text-white text-xs font-medium">
            <Star size={10} className="fill-white" />
            Featured
          </div>
        )}

        {/* Category badge */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full border text-xs font-medium backdrop-blur-sm ${
            CATEGORY_COLORS[project.category] ?? "bg-white/10 text-white/70 border-white/10"
          }`}
        >
          {project.category.toUpperCase()}
        </div>

        {/* Year */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/50 text-xs">
          <Calendar size={10} />
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-indigo-400/80 mt-0.5">{project.tagline}</p>
        </div>

        <p className="text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(project.tags ?? []).slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/50 text-xs"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
          {(project.tags ?? []).length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/40 text-xs">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Highlights */}
        <ul className="grid grid-cols-2 gap-1">
          {(project.highlights ?? []).slice(0, 4).map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-xs text-white/40">
              <span className="w-1 h-1 rounded-full bg-indigo-500/60 flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors duration-200"
            >
              <Eye size={12} />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white text-xs font-medium transition-all duration-200 ${
                project.liveUrl ? "" : "flex-1"
              }`}
            >
              <Github size={12} />
              {project.liveUrl ? "Code" : "View Code"}
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Breadcrumb */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors duration-200 group"
          >
            <motion.span
              whileHover={shouldReduceMotion ? {} : { x: -3 }}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to Home
            </motion.span>
          </Link>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-14"
        >
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {projects.length} Projects · {featuredCount} Featured
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="text-lg text-white/50 max-w-2xl leading-relaxed"
          >
            A curated collection of web apps, mobile experiences, design systems, and open-source tools I've built — from side projects to production products serving thousands of users.
          </motion.p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10 space-y-4"
        >
          {/* Search input */}
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, tags, technologies…"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
            />
            {search !== "" && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count =
                cat.value === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === cat.value).length;
              const isActive = activeCategory === cat.value;
              return (
                <motion.button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/15"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-white/8 text-white/40"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-sm text-white/35">
            {filtered.length === 0
              ? "No projects found"
              : `Showing ${filtered.length} of ${projects.length} project${filtered.length !== 1 ? "s" : ""}`}
          </p>
          {(search !== "" || activeCategory !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              <X size={12} />
              Clear filters
            </button>
          )}
        </motion.div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${search}`}
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
              <Search size={24} className="text-white/20" />
            </div>
            <h3 className="text-lg font-semibold text-white/60 mb-2">
              No projects found
            </h3>
            <p className="text-sm text-white/35 max-w-xs">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="mt-5 px-4 py-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-200"
            >
              Reset filters
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-20 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Github size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  See more on GitHub
                </h3>
                <p className="text-sm text-white/45 max-w-xs">
                  These are just the highlights. Browse all my repositories, experiments, and contributions on GitHub.
                </p>
              </div>
              <motion.a
                href="https://github.com/alexmorgan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 border border-white/12 hover:bg-white/12 hover:border-white/20 text-white text-sm font-medium transition-all duration-200"
              >
                <Github size={15} />
                Visit GitHub Profile
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}